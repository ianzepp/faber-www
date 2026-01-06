import { join } from 'path'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const FABER_ROMANUS = join(ROOT, '..', 'faber-romanus')

interface CompilerInfo {
  source: string
  dest: string
  title: string
  description: string
  order: number
}

const compilers: CompilerInfo[] = [
  {
    source: join(FABER_ROMANUS, 'fons', 'faber', 'CHECKLIST.md'),
    dest: join(CONTENT_DIR, 'compilers', 'faber.md'),
    title: 'Faber (Reference)',
    description: 'Reference compiler implementation status',
    order: 0,
  },
  {
    source: join(FABER_ROMANUS, 'fons', 'rivus', 'CHECKLIST.md'),
    dest: join(CONTENT_DIR, 'compilers', 'rivus.md'),
    title: 'Rivus (Bootstrap)',
    description: 'Bootstrap compiler implementation status',
    order: 1,
  },
]

async function main() {
  console.log('Syncing compiler checklists from faber-romanus...')

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
