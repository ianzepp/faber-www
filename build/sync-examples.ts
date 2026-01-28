import { join, basename, dirname } from 'path'
import { Glob } from 'bun'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const FABER = join(ROOT, '..', 'faber')
const EXEMPLA_DIR = join(FABER, 'fons', 'exempla')

interface Example {
  category: string
  name: string
  code: string
  path: string
}

async function loadExamples(): Promise<Example[]> {
  const glob = new Glob('**/*.fab')
  const examples: Example[] = []

  for await (const path of glob.scan(EXEMPLA_DIR)) {
    const fullPath = join(EXEMPLA_DIR, path)
    const code = await Bun.file(fullPath).text()

    // Category from directory structure: statements/si/basic.fab -> si
    const parts = path.split('/')
    let category: string
    if (parts.length >= 2) {
      category = parts[parts.length - 2]
    }
    else {
      category = 'misc'
    }

    examples.push({
      category,
      name: basename(path, '.fab'),
      code: code.trim(),
      path,
    })
  }

  return examples
}

function generateExamplesPage(examples: Example[]): string {
  // Group by category
  const byCategory: Record<string, Example[]> = {}
  for (const ex of examples) {
    if (!byCategory[ex.category]) byCategory[ex.category] = []
    byCategory[ex.category].push(ex)
  }

  // Sort categories
  const sortedCategories = Object.keys(byCategory).sort()

  let content = `---
title: Examples
description: Faber code examples organized by feature
section: docs
order: 2
---

# Examples

Faber code examples from the \`exempla/\` directory, organized by feature category.

`

  for (const category of sortedCategories) {
    const categoryExamples = byCategory[category]
    content += `## ${category}\n\n`

    for (const ex of categoryExamples.slice(0, 5)) {
      // Limit to 5 examples per category for the main page
      content += `### ${ex.name}\n\n`
      content += '```faber\n'
      content += ex.code
      content += '\n```\n\n'
    }

    if (categoryExamples.length > 5) {
      content += `*${categoryExamples.length - 5} more examples in this category*\n\n`
    }
  }

  return content
}

function generateFullExamplesBundle(examples: Example[]): string {
  let content = `# Faber Examples - Complete Collection

This file contains all ${examples.length} examples from the Faber exempla/ directory.

`

  const byCategory: Record<string, Example[]> = {}
  for (const ex of examples) {
    if (!byCategory[ex.category]) byCategory[ex.category] = []
    byCategory[ex.category].push(ex)
  }

  for (const [category, categoryExamples] of Object.entries(byCategory).sort()) {
    content += `## ${category}\n\n`
    for (const ex of categoryExamples) {
      content += `### ${ex.name}\n\n`
      content += '```faber\n'
      content += ex.code
      content += '\n```\n\n'
    }
  }

  return content
}

async function main() {
  console.log('Syncing examples from faber...')
  console.log(`Source: ${EXEMPLA_DIR}`)
  console.log()

  const examples = await loadExamples()
  console.log(`Found ${examples.length} examples`)

  // Generate curated examples page
  const examplesPage = generateExamplesPage(examples)
  await Bun.write(join(CONTENT_DIR, 'docs', 'examples.md'), examplesPage)
  console.log('  created: docs/examples.md')

  // Generate full examples bundle for LLM consumption
  const fullBundle = generateFullExamplesBundle(examples)
  await Bun.write(join(CONTENT_DIR, 'docs', 'examples-full.md'), `---
title: All Examples
description: Complete collection of Faber examples
section: docs
order: 3
---

${fullBundle}`)
  console.log('  created: docs/examples-full.md')

  console.log()
  console.log('Done')
}

main().catch(console.error)
