import { join } from 'path'
import { Glob } from 'bun'
import yaml from 'js-yaml'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const FABER_ROMANUS = join(ROOT, '..', 'faber-romanus')
const RESULTS_DIR = join(FABER_ROMANUS, 'probationes', 'results')
const CONFIG_DIR = join(FABER_ROMANUS, 'probationes', 'config')

interface GradedResult {
  timestamp: string
  framework_version: string
  git_sha: string
  run_id: string
  task_id: string
  model: string
  n_shot: number
  dialect: string
  context: string
  level_a: boolean
  level_b: boolean
  level_c: boolean
  correct: boolean
  error_type?: string
  error_detail?: string
}

interface RawResponse {
  timestamp: string
  framework_version: string
  run_id: string
  task_id: string
  model: string
  n_shot: number
  dialect: string
  context: string
  tokens_in: number
  tokens_out: number
  latency_ms: number
}

interface ModelConfig {
  id: string
  cost_per_1m_input: number
  cost_per_1m_output: number
}

interface ModelsYaml {
  framework_version: string
  models: ModelConfig[]
}

interface ModelStats {
  model: string
  total: number
  correct: number
  accuracy: number
  level_a_pct: number
  level_b_pct: number
  level_c_pct: number
  tokens_in: number
  tokens_out: number
  total_latency_ms: number
  avg_latency_ms: number
  cost_usd: number
}

interface TaskStats {
  task_id: string
  total: number
  correct: number
  accuracy: number
}

interface NshotStats {
  n_shot: number
  total: number
  correct: number
  accuracy: number
}

interface ContextStats {
  context: string
  total: number
  correct: number
  accuracy: number
}

interface ErrorStats {
  error_type: string
  count: number
  pct: number
}

async function loadModelsConfig(): Promise<Map<string, ModelConfig>> {
  const configPath = join(CONFIG_DIR, 'models.yml')
  const content = await Bun.file(configPath).text()
  const config = yaml.load(content) as ModelsYaml

  const map = new Map<string, ModelConfig>()
  for (const model of config.models) {
    map.set(model.id, model)
  }
  return map
}

async function loadGradedResults(): Promise<GradedResult[]> {
  const results: GradedResult[] = []
  const glob = new Glob('*/graded_results.jsonl')

  for await (const path of glob.scan(RESULTS_DIR)) {
    const fullPath = join(RESULTS_DIR, path)
    const content = await Bun.file(fullPath).text()

    for (const line of content.split('\n')) {
      if (!line.trim()) continue
      try {
        const record = JSON.parse(line)
        if (record.framework_version && record.framework_version >= '1.1') {
          results.push(record)
        }
      }
      catch {
        // Skip malformed lines
      }
    }
  }

  return results
}

async function loadRawResponses(): Promise<RawResponse[]> {
  const results: RawResponse[] = []
  const glob = new Glob('*/raw_responses.jsonl')

  for await (const path of glob.scan(RESULTS_DIR)) {
    const fullPath = join(RESULTS_DIR, path)
    const content = await Bun.file(fullPath).text()

    for (const line of content.split('\n')) {
      if (!line.trim()) continue
      try {
        const record = JSON.parse(line)
        if (record.framework_version && record.framework_version >= '1.1') {
          results.push(record)
        }
      }
      catch {
        // Skip malformed lines
      }
    }
  }

  return results
}

function computeModelStats(
  gradedResults: GradedResult[],
  rawResponses: RawResponse[],
  pricing: Map<string, ModelConfig>
): ModelStats[] {
  // Aggregate graded results
  const byModel: Record<string, {
    total: number
    correct: number
    level_a: number
    level_b: number
    level_c: number
  }> = {}

  for (const r of gradedResults) {
    if (!byModel[r.model]) {
      byModel[r.model] = { total: 0, correct: 0, level_a: 0, level_b: 0, level_c: 0 }
    }
    byModel[r.model].total++
    if (r.correct) byModel[r.model].correct++
    if (r.level_a) byModel[r.model].level_a++
    if (r.level_b) byModel[r.model].level_b++
    if (r.level_c) byModel[r.model].level_c++
  }

  // Aggregate raw responses for tokens/latency
  const tokensByModel: Record<string, {
    tokens_in: number
    tokens_out: number
    total_latency_ms: number
    count: number
  }> = {}

  for (const r of rawResponses) {
    if (!tokensByModel[r.model]) {
      tokensByModel[r.model] = { tokens_in: 0, tokens_out: 0, total_latency_ms: 0, count: 0 }
    }
    tokensByModel[r.model].tokens_in += r.tokens_in || 0
    tokensByModel[r.model].tokens_out += r.tokens_out || 0
    tokensByModel[r.model].total_latency_ms += r.latency_ms || 0
    tokensByModel[r.model].count++
  }

  // Combine into ModelStats
  const models = Object.keys(byModel)
  const stats: ModelStats[] = []

  for (const model of models) {
    const graded = byModel[model]
    const tokens = tokensByModel[model] || { tokens_in: 0, tokens_out: 0, total_latency_ms: 0, count: 0 }
    const price = pricing.get(model)

    // Compute cost
    let cost_usd = 0
    if (price) {
      cost_usd = (tokens.tokens_in / 1_000_000) * price.cost_per_1m_input +
                 (tokens.tokens_out / 1_000_000) * price.cost_per_1m_output
    }

    stats.push({
      model,
      total: graded.total,
      correct: graded.correct,
      accuracy: Math.round((graded.correct / graded.total) * 100),
      level_a_pct: Math.round((graded.level_a / graded.total) * 100),
      level_b_pct: Math.round((graded.level_b / graded.total) * 100),
      level_c_pct: Math.round((graded.level_c / graded.total) * 100),
      tokens_in: tokens.tokens_in,
      tokens_out: tokens.tokens_out,
      total_latency_ms: tokens.total_latency_ms,
      avg_latency_ms: tokens.count > 0 ? Math.round(tokens.total_latency_ms / tokens.count) : 0,
      cost_usd,
    })
  }

  return stats
    .filter(s => s.total >= 100)
    .sort((a, b) => b.accuracy - a.accuracy)
}

function computeTaskStats(results: GradedResult[]): TaskStats[] {
  const byTask: Record<string, { correct: number; total: number }> = {}

  for (const r of results) {
    if (!byTask[r.task_id]) byTask[r.task_id] = { correct: 0, total: 0 }
    byTask[r.task_id].total++
    if (r.correct) byTask[r.task_id].correct++
  }

  return Object.entries(byTask)
    .map(([task_id, s]) => ({
      task_id,
      total: s.total,
      correct: s.correct,
      accuracy: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => b.accuracy - a.accuracy)
}

function computeNshotStats(results: GradedResult[]): NshotStats[] {
  const byNshot: Record<number, { correct: number; total: number }> = {}

  for (const r of results) {
    if (!byNshot[r.n_shot]) byNshot[r.n_shot] = { correct: 0, total: 0 }
    byNshot[r.n_shot].total++
    if (r.correct) byNshot[r.n_shot].correct++
  }

  return Object.entries(byNshot)
    .map(([n, s]) => ({
      n_shot: parseInt(n),
      total: s.total,
      correct: s.correct,
      accuracy: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => a.n_shot - b.n_shot)
}

function computeContextStats(results: GradedResult[]): ContextStats[] {
  const byContext: Record<string, { correct: number; total: number }> = {}

  for (const r of results) {
    if (!byContext[r.context]) byContext[r.context] = { correct: 0, total: 0 }
    byContext[r.context].total++
    if (r.correct) byContext[r.context].correct++
  }

  const contextOrder = ['examples-only', 'grammar-only', 'minimal', 'basic', 'complete']

  return Object.entries(byContext)
    .map(([context, s]) => ({
      context,
      total: s.total,
      correct: s.correct,
      accuracy: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => contextOrder.indexOf(a.context) - contextOrder.indexOf(b.context))
}

function computeErrorStats(results: GradedResult[]): ErrorStats[] {
  const failures = results.filter(r => !r.correct)
  const byError: Record<string, number> = {}

  for (const r of failures) {
    const errType = r.error_type || 'unknown'
    byError[errType] = (byError[errType] || 0) + 1
  }

  const total = failures.length

  return Object.entries(byError)
    .map(([error_type, count]) => ({
      error_type,
      count,
      pct: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
}

interface Stats {
  modelStats: ModelStats[]
  taskStats: TaskStats[]
  nshotStats: NshotStats[]
  contextStats: ContextStats[]
  errorStats: ErrorStats[]
  total: number
  frameworkVersion: string
  modelsCount: number
  totalCost: number
  totalTokensIn: number
  totalTokensOut: number
  totalLatencyMs: number
}

function computeStats(
  gradedResults: GradedResult[],
  rawResponses: RawResponse[],
  pricing: Map<string, ModelConfig>
): Stats {
  const frameworkVersion = gradedResults[0]?.framework_version || 'unknown'
  const modelStats = computeModelStats(gradedResults, rawResponses, pricing)

  const totalCost = modelStats.reduce((sum, m) => sum + m.cost_usd, 0)
  const totalTokensIn = modelStats.reduce((sum, m) => sum + m.tokens_in, 0)
  const totalTokensOut = modelStats.reduce((sum, m) => sum + m.tokens_out, 0)
  const totalLatencyMs = modelStats.reduce((sum, m) => sum + m.total_latency_ms, 0)

  return {
    modelStats,
    taskStats: computeTaskStats(gradedResults),
    nshotStats: computeNshotStats(gradedResults),
    contextStats: computeContextStats(gradedResults),
    errorStats: computeErrorStats(gradedResults),
    total: gradedResults.length,
    frameworkVersion,
    modelsCount: modelStats.length,
    totalCost,
    totalTokensIn,
    totalTokensOut,
    totalLatencyMs,
  }
}

function formatCost(usd: number): string {
  if (usd < 0.01) return '<$0.01'
  return `$${usd.toFixed(2)}`
}

function formatLatency(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

function generateResearchPage(stats: Stats): string {
  const {
    modelStats,
    taskStats,
    nshotStats,
    contextStats,
    errorStats,
    total,
    frameworkVersion,
    modelsCount,
    totalCost,
    totalTokensIn,
    totalTokensOut,
    totalLatencyMs,
  } = stats

  let content = `---
title: Thesis and Trials
description: LLM learnability research for Faber
section: research
order: 0
---

# Thesis and Trials

Can LLMs learn Faber effectively? The [faber-romanus](https://github.com/ianzepp/faber-romanus) project includes an evaluation harness to test this systematically.

## Hypothesis

Faber's design choices - Latin vocabulary, regular morphology, consistent syntax - should make it easier for LLMs to learn from few examples compared to languages optimized for human ergonomics.

## Evaluation

The trials test:

- **Multiple models** - From GPT-3.5 to Llama 3.2 1B
- **N-shot learning** - 0, 1, 3, and 10 example configurations
- **Task types** - Translation, completion, prediction, explanation
- **Context levels** - From examples-only to complete documentation

## Trial Results

| Metric | Value |
|--------|-------|
| Framework version | ${frameworkVersion} |
| Total evaluations | ${total.toLocaleString()} |
| Models tested | ${modelsCount} |
| Total cost | ${formatCost(totalCost)} |
| Total tokens | ${formatTokens(totalTokensIn)} in / ${formatTokens(totalTokensOut)} out |
| Total time | ${formatLatency(totalLatencyMs)} |

## Model Comparison: Cost vs Speed vs Accuracy

| Model | Accuracy | Avg Latency | Cost | Tokens |
|-------|----------|-------------|------|--------|
`

  for (const m of modelStats) {
    content += `| ${m.model} | ${m.accuracy}% | ${formatLatency(m.avg_latency_ms)} | ${formatCost(m.cost_usd)} | ${formatTokens(m.tokens_in + m.tokens_out)} |\n`
  }

  content += `
## Three-Level Grading Breakdown

**A** = typechecks, **B** = runs without error, **C** = correct output.

| Model | Tests | A (Typechecks) | B (Runs) | C (Correct) |
|-------|-------|----------------|----------|-------------|
`

  for (const m of modelStats) {
    content += `| ${m.model} | ${m.total} | ${m.level_a_pct}% | ${m.level_b_pct}% | ${m.level_c_pct}% |\n`
  }

  content += `
## By Context Level

How much documentation context helps models learn Faber.

| Context | Tests | Accuracy |
|---------|-------|----------|
`

  for (const c of contextStats) {
    content += `| ${c.context} | ${c.total} | ${c.accuracy}% |\n`
  }

  content += `
## By N-shot (Learning Curve)

Effect of few-shot examples on accuracy.

| Examples | Tests | Accuracy |
|----------|-------|----------|
`

  for (const n of nshotStats) {
    content += `| ${n.n_shot}-shot | ${n.total} | ${n.accuracy}% |\n`
  }

  content += `
## Error Distribution

Where failures occur (among failed trials only).

| Error Type | Count | % of Failures |
|------------|-------|---------------|
`

  for (const e of errorStats) {
    content += `| ${e.error_type} | ${e.count} | ${e.pct}% |\n`
  }

  content += `
## By Task

| Task | Tests | Accuracy |
|------|-------|----------|
`

  for (const t of taskStats) {
    content += `| ${t.task_id} | ${t.total} | ${t.accuracy}% |\n`
  }

  content += `
## Methodology

- **Temperature:** 0.0 (deterministic)
- **Seed:** 42 (reproducible)
- **Dialects:** Latin keywords
- **Context levels:** examples-only, minimal, basic, complete

See [faber-romanus](https://github.com/ianzepp/faber-romanus) for raw data and methodology details.
`

  return content
}

async function main() {
  console.log('Syncing research from faber-romanus...')
  console.log(`Source: ${RESULTS_DIR}`)
  console.log()

  const [gradedResults, rawResponses, pricing] = await Promise.all([
    loadGradedResults(),
    loadRawResponses(),
    loadModelsConfig(),
  ])

  console.log(`Found ${gradedResults.length} graded results (framework >= 1.1)`)
  console.log(`Found ${rawResponses.length} raw responses (framework >= 1.1)`)
  console.log(`Loaded ${pricing.size} model configs`)

  if (gradedResults.length === 0) {
    console.log('No results to process')
    return
  }

  const stats = computeStats(gradedResults, rawResponses, pricing)
  const page = generateResearchPage(stats)

  await Bun.write(join(CONTENT_DIR, 'research', 'index.md'), page)
  console.log('  created: research/index.md')

  console.log()
  console.log(`Total cost: ${formatCost(stats.totalCost)}`)
  console.log('Done')
}

main().catch(console.error)
