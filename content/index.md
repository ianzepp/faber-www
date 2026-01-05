---
title: Faber
description: A Latin programming language designed for LLM consumption
order: 0
---

<div class="hero">

# Faber

<p class="tagline">A Latin programming language designed for LLM consumption</p>

</div>

<div class="install-block">
Installation coming soon
</div>

<div class="links-block">

[GitHub](https://github.com/ianzepp/faber-romanus)

</div>

Faber is an intermediate language where LLMs generate human-readable Latin code that humans can review before compilation to TypeScript, Python, Zig, C++, or Rust.

## Why Latin?

- **Regular morphology** - Latin's grammatical structure maps cleanly to programming constructs
- **LLM priors** - Models trained on multilingual corpora have exposure to Latin patterns
- **Human readable** - Unlike machine-optimized IRs, Faber code is reviewable by humans
- **Compilation targets** - One source language, multiple output targets

## Quick Example

```faber
functio summa(a: numerus, b: numerus) -> numerus {
    redde a + b
}

fixum x = summa(3, 4)
scribe(x)
```

Compiles to TypeScript:

```typescript
function summa(a: number, b: number): number {
    return a + b
}

const x = summa(3, 4)
console.log(x)
```

## Links

- [Grammar Reference](/docs/grammar.html) - Complete language specification
- [Examples](/docs/examples.html) - Code examples by feature
- [Research](/research/results.html) - LLM learnability evaluation
- [GitHub](https://github.com/ianzepp/faber-romanus) - Source code
