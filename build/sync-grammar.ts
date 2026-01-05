import { join } from 'path'
import { Glob } from 'bun'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const FABER_ROMANUS = join(ROOT, '..', 'faber-romanus')

interface SyncResult {
  file: string
  action: 'created' | 'updated' | 'unchanged'
}

async function syncGrammar(): Promise<SyncResult[]> {
  const results: SyncResult[] = []

  // Sync main GRAMMAR.md
  const grammarSource = join(FABER_ROMANUS, 'GRAMMAR.md')
  const grammarDest = join(CONTENT_DIR, 'docs', 'grammar.md')

  const sourceContent = await Bun.file(grammarSource).text()

  // Transform: add frontmatter, potentially restructure
  const transformed = `---
title: Grammar Reference
description: Complete Faber language grammar specification
section: docs
order: 1
---

${sourceContent}
`

  await Bun.write(grammarDest, transformed)
  results.push({ file: 'docs/grammar.md', action: 'updated' })

  // Sync grammatica/ directory (auto-generated topic guides)
  const grammaticaDir = join(FABER_ROMANUS, 'grammatica')
  const glob = new Glob('*.md')

  const topicOrder: Record<string, number> = {
    'fundamenta.md': 10,
    'typi.md': 11,
    'operatores.md': 12,
    'structurae.md': 13,
    'regimen.md': 14,
    'functiones.md': 15,
    'importa.md': 16,
    'errores.md': 17,
    'preamble.md': 18,
  }

  for await (const file of glob.scan(grammaticaDir)) {
    const sourcePath = join(grammaticaDir, file)
    const content = await Bun.file(sourcePath).text()

    // Extract title from first heading or filename
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '')

    const destPath = join(CONTENT_DIR, 'docs', file)
    const order = topicOrder[file] ?? 50

    const transformed = `---
title: ${title}
section: docs
order: ${order}
---

${content}
`

    await Bun.write(destPath, transformed)
    results.push({ file: `docs/${file}`, action: 'updated' })
  }

  return results
}

async function main() {
  console.log('Syncing grammar from faber-romanus...')
  console.log(`Source: ${FABER_ROMANUS}`)
  console.log()

  const results = await syncGrammar()

  for (const r of results) {
    console.log(`  ${r.action}: ${r.file}`)
  }

  console.log()
  console.log(`Synced ${results.length} files`)
}

main().catch(console.error)
