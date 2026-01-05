import { join } from 'path'
import { Glob } from 'bun'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const FABER_TRIALS = join(ROOT, '..', 'faber-trials')
const RESULTS_DIR = join(FABER_TRIALS, 'results')

interface GradedResult {
  timestamp: string
  run_id: string
  task_id: string
  model: string
  n_shot: number
  dialect: string
  context: string
  correct: boolean
  error_type?: string
  notes?: string
}

interface ModelStats {
  model: string
  total: number
  correct: number
  accuracy: number
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

async function loadResults(): Promise<GradedResult[]> {
  const results: GradedResult[] = []
  const glob = new Glob('*/graded_results.jsonl')

  for await (const path of glob.scan(RESULTS_DIR)) {
    const fullPath = join(RESULTS_DIR, path)
    const content = await Bun.file(fullPath).text()

    for (const line of content.split('\n')) {
      if (!line.trim()) continue
      try {
        results.push(JSON.parse(line))
      }
      catch {
        // Skip malformed lines
      }
    }
  }

  return results
}

function computeStats(results: GradedResult[]) {
  // By model
  const byModel: Record<string, { correct: number; total: number }> = {}
  for (const r of results) {
    if (!byModel[r.model]) byModel[r.model] = { correct: 0, total: 0 }
    byModel[r.model].total++
    if (r.correct) byModel[r.model].correct++
  }

  const modelStats: ModelStats[] = Object.entries(byModel)
    .map(([model, s]) => ({
      model,
      total: s.total,
      correct: s.correct,
      accuracy: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => b.accuracy - a.accuracy)

  // By task
  const byTask: Record<string, { correct: number; total: number }> = {}
  for (const r of results) {
    if (!byTask[r.task_id]) byTask[r.task_id] = { correct: 0, total: 0 }
    byTask[r.task_id].total++
    if (r.correct) byTask[r.task_id].correct++
  }

  const taskStats: TaskStats[] = Object.entries(byTask)
    .map(([task_id, s]) => ({
      task_id,
      total: s.total,
      correct: s.correct,
      accuracy: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => b.accuracy - a.accuracy)

  // By n-shot
  const byNshot: Record<number, { correct: number; total: number }> = {}
  for (const r of results) {
    if (!byNshot[r.n_shot]) byNshot[r.n_shot] = { correct: 0, total: 0 }
    byNshot[r.n_shot].total++
    if (r.correct) byNshot[r.n_shot].correct++
  }

  const nshotStats: NshotStats[] = Object.entries(byNshot)
    .map(([n, s]) => ({
      n_shot: parseInt(n),
      total: s.total,
      correct: s.correct,
      accuracy: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => a.n_shot - b.n_shot)

  return { modelStats, taskStats, nshotStats, total: results.length }
}

function generateResearchPage(stats: ReturnType<typeof computeStats>): string {
  const { modelStats, taskStats, nshotStats, total } = stats

  let content = `---
title: Research Results
description: LLM learnability research from faber-trials
section: research
order: 1
---

# Research Results

Results from the faber-trials evaluation harness. Testing whether LLMs can learn Faber syntax from examples.

**Total evaluations:** ${total}

## By Model

| Model | Tests | Correct | Accuracy |
|-------|-------|---------|----------|
`

  for (const m of modelStats) {
    content += `| ${m.model} | ${m.total} | ${m.correct} | ${m.accuracy}% |\n`
  }

  content += `
## By N-shot (Learning Curve)

| Examples | Tests | Correct | Accuracy |
|----------|-------|---------|----------|
`

  for (const n of nshotStats) {
    content += `| ${n.n_shot}-shot | ${n.total} | ${n.correct} | ${n.accuracy}% |\n`
  }

  content += `
## By Task

| Task | Tests | Correct | Accuracy |
|------|-------|---------|----------|
`

  for (const t of taskStats) {
    content += `| ${t.task_id} | ${t.total} | ${t.correct} | ${t.accuracy}% |\n`
  }

  content += `
## Methodology

- **Temperature:** 0.0 (deterministic)
- **Seed:** 42 (reproducible)
- **Dialects:** Latin keywords
- **Context levels:** examples-only, minimal, basic, complete

See [faber-trials](https://github.com/ianzepp/faber-trials) for raw data and methodology details.
`

  return content
}

async function main() {
  console.log('Syncing research from faber-trials...')
  console.log(`Source: ${RESULTS_DIR}`)
  console.log()

  const results = await loadResults()
  console.log(`Found ${results.length} graded results`)

  if (results.length === 0) {
    console.log('No results to process')
    return
  }

  const stats = computeStats(results)
  const page = generateResearchPage(stats)

  await Bun.write(join(CONTENT_DIR, 'research', 'results.md'), page)
  console.log('  created: research/results.md')

  console.log()
  console.log('Done')
}

main().catch(console.error)
