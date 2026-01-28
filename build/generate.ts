import { marked } from 'marked'
import matter from 'gray-matter'
import { join, relative, dirname, basename } from 'path'
import { Glob } from 'bun'

const ROOT = join(import.meta.dir, '..')
const CONTENT_DIR = join(ROOT, 'content')
const DIST_DIR = join(ROOT, 'dist')
const TEMPLATES_DIR = join(ROOT, 'templates')

interface Heading {
  level: number
  text: string
  id: string
}

interface PageMeta {
  title: string
  description?: string
  order?: number
  section?: string
}

interface Page {
  path: string
  meta: PageMeta
  content: string
  html: string
  url: string
  headings: Heading[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = []
  const regex = /^(#{2,3})\s+(.+)$/gm
  let match

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = slugify(text)
    headings.push({ level, text, id })
  }

  return headings
}

// Configure marked to add IDs to headings
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = tokens.map(t => ('text' in t ? t.text : '')).join('')
      const id = slugify(text)
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    }
  }
})

async function loadTemplate(name: string): Promise<string> {
  const path = join(TEMPLATES_DIR, `${name}.html`)
  return Bun.file(path).text()
}

async function loadPages(): Promise<Page[]> {
  const glob = new Glob('**/*.md')
  const pages: Page[] = []

  for await (const path of glob.scan(CONTENT_DIR)) {
    const fullPath = join(CONTENT_DIR, path)
    const raw = await Bun.file(fullPath).text()
    const { data, content } = matter(raw)

    const meta: PageMeta = {
      title: data.title || basename(path, '.md'),
      description: data.description,
      order: data.order,
      section: data.section,
    }

    // Convert .md path to .html URL
    let url = '/' + path.replace(/\.md$/, '.html')
    if (path === 'index.md') url = '/index.html'
    if (path.endsWith('/index.md')) url = '/' + path.replace(/\/index\.md$/, '/index.html')

    const headings = extractHeadings(content)

    pages.push({
      path,
      meta,
      content,
      html: await marked(content),
      url,
      headings,
    })
  }

  return pages.sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99))
}

function buildNav(pages: Page[], currentPage: Page): string {
  const sections: Record<string, Page[]> = {}
  const sectionOrder = ['compilers', 'docs']

  for (const page of pages) {
    if (page.path === 'index.md') continue
    const section = page.meta.section || dirname(page.path) || 'root'
    if (!sections[section]) sections[section] = []
    sections[section].push(page)
  }

  // Sort sections by defined order
  const orderedSections = Object.keys(sections).sort((a, b) => {
    const aIndex = sectionOrder.indexOf(a)
    const bIndex = sectionOrder.indexOf(b)
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  let nav = '<nav class="site-nav">\n'

  for (const section of orderedSections) {
    const sectionPages = sections[section]
    if (section !== 'root') {
      nav += `  <div class="nav-section">${section}</div>\n`
    }
    for (const page of sectionPages) {
      const isActive = page.url === currentPage.url
      const activeClass = isActive ? ' class="active"' : ''
      nav += `  <a href="${page.url}"${activeClass}>${page.meta.title}</a>\n`

      // Show subheadings for active page
      if (isActive && page.headings.length > 0) {
        nav += '  <div class="nav-subheadings">\n'
        for (const h of page.headings) {
          const indent = h.level === 3 ? ' class="nav-h3"' : ''
          nav += `    <a href="${page.url}#${h.id}"${indent}>${h.text}</a>\n`
        }
        nav += '  </div>\n'
      }
    }
  }

  nav += '</nav>'
  return nav
}

async function generateLlmBundle(pages: Page[]): Promise<void> {
  // Concatenate all content for LLM consumption
  let bundle = '# Faber Language - Complete Documentation\n\n'
  bundle += 'This document contains the complete Faber language documentation.\n\n'
  bundle += '---\n\n'

  for (const page of pages) {
    if (page.path === 'index.md') continue
    bundle += `# ${page.meta.title}\n\n`
    bundle += page.content
    bundle += '\n\n---\n\n'
  }

  await Bun.write(join(DIST_DIR, 'faber-complete.md'), bundle)

  // Generate llms.txt
  const llmsTxt = `# Faber Language
> A Latin programming language designed for LLM consumption

This site documents the Faber programming language.

## Documentation
- Full documentation: /faber-complete.md
- Grammar reference: /docs/grammar.html
- Examples: /docs/examples.html

## Source
- Language: https://github.com/ianzepp/faber-romanus
- Research: https://github.com/ianzepp/faber-romanus
`

  await Bun.write(join(DIST_DIR, 'llms.txt'), llmsTxt)
}

async function generate(): Promise<void> {
  console.log('Loading pages...')
  const pages = await loadPages()
  console.log(`Found ${pages.length} pages`)

  console.log('Loading template...')
  const layout = await loadTemplate('layout')

  // Ensure dist directory exists
  await Bun.write(join(DIST_DIR, '.gitkeep'), '')

  console.log('Generating pages...')
  for (const page of pages) {
    const nav = buildNav(pages, page)

    const html = layout
      .replace('{{title}}', page.meta.title)
      .replace('{{description}}', page.meta.description || 'Faber programming language documentation')
      .replace('{{nav}}', nav)
      .replace('{{content}}', page.html)

    const outPath = join(DIST_DIR, page.url)
    await Bun.write(outPath, html)
    console.log(`  ${page.url}`)
  }

  // Copy CSS
  const css = await Bun.file(join(ROOT, 'styles', 'main.css')).text()
  await Bun.write(join(DIST_DIR, 'styles.css'), css)

  // Generate LLM bundle
  console.log('Generating LLM bundle...')
  await generateLlmBundle(pages)
  console.log('  /faber-complete.md')
  console.log('  /llms.txt')

  console.log('Done!')
}

generate().catch(console.error)
