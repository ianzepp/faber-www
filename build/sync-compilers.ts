import { join } from 'path'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const FABER = join(ROOT, '..', 'faber')

interface CompilerInfo {
  source: string
  dest: string
  title: string
  description: string
  order: number
}

const compilers: CompilerInfo[] = [
  {
    source: join(FABER, 'fons', 'nanus-ts', 'README.md'),
    dest: join(CONTENT_DIR, 'compilers', 'nanus-ts.md'),
    title: 'nanus-ts (TypeScript)',
    description: 'TypeScript compiler implementation',
    order: 0,
  },
  {
    source: join(FABER, 'fons', 'nanus-go', 'README.md'),
    dest: join(CONTENT_DIR, 'compilers', 'nanus-go.md'),
    title: 'nanus-go (Go)',
    description: 'Go compiler implementation',
    order: 1,
  },
  {
    source: join(FABER, 'fons', 'rivus', 'CHECKLIST.md'),
    dest: join(CONTENT_DIR, 'compilers', 'rivus.md'),
    title: 'rivus (Bootstrap)',
    description: 'Bootstrap compiler implementation status',
    order: 2,
  },
]

async function main() {
  console.log('Syncing compiler checklists from faber...')

  // Ensure compilers directory exists
  const compilersDir = join(CONTENT_DIR, 'compilers')
  await Bun.write(join(compilersDir, '.gitkeep'), '')

  for (const compiler of compilers) {
    const sourceContent = await Bun.file(compiler.source).text()

    // Strip the first H1 heading if present (we'll use our title)
    const contentWithoutH1 = sourceContent.replace(/^# .+\n\n?/, '')

    const transformed = `---
title: ${compiler.title}
description: ${compiler.description}
section: compilers
order: ${compiler.order}
---

# ${compiler.title}

${contentWithoutH1}`

    await Bun.write(compiler.dest, transformed)
    console.log(`  synced: ${compiler.dest.replace(CONTENT_DIR + '/', '')}`)
  }

  // Clean up .gitkeep
  const { unlink } = await import('fs/promises')
  await unlink(join(compilersDir, '.gitkeep')).catch(() => {})

  console.log('Done')
}

main()
