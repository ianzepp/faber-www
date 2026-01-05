---
title: Research
description: LLM learnability research for Faber
section: research
order: 0
---

# Research

Can LLMs learn Faber effectively? The [faber-trials](https://github.com/ianzepp/faber-trials) project evaluates this systematically.

## Hypothesis

Faber's design choices - Latin vocabulary, regular morphology, consistent syntax - should make it easier for LLMs to learn from few examples compared to languages optimized for human ergonomics.

## Evaluation

The trials test:

- **Multiple models** - From GPT-3.5 to Llama 3.2 1B
- **N-shot learning** - 0, 1, 3, and 10 example configurations
- **Task types** - Translation, completion, prediction, explanation
- **Context levels** - From examples-only to complete documentation

## Results

See [Research Results](/research/results.html) for current data.

## Methodology

- Deterministic: temperature 0.0, seed 42
- Reproducible: all prompts and responses logged
- Transparent: raw JSONL data available

Source: [faber-trials on GitHub](https://github.com/ianzepp/faber-trials)
