---
title: Research Results
description: LLM learnability research from faber-trials
section: research
order: 1
---

# Research Results

Results from the faber-trials evaluation harness. Testing whether LLMs can learn Faber syntax from examples.

**Total evaluations:** 101

## By Model

| Model | Tests | Correct | Accuracy |
|-------|-------|---------|----------|
| llama-3.1-8b | 1 | 1 | 100% |
| claude-3-haiku | 1 | 1 | 100% |
| gpt-3.5-turbo | 70 | 37 | 53% |
| llama-3.2-3b | 13 | 2 | 15% |
| llama-3.2-1b | 16 | 2 | 13% |

## By N-shot (Learning Curve)

| Examples | Tests | Correct | Accuracy |
|----------|-------|---------|----------|
| 0-shot | 68 | 25 | 37% |
| 1-shot | 21 | 7 | 33% |
| 3-shot | 6 | 5 | 83% |
| 10-shot | 6 | 6 | 100% |

## By Task

| Task | Tests | Correct | Accuracy |
|------|-------|---------|----------|
| predict_simple_output | 7 | 6 | 86% |
| translate_simple_var | 14 | 10 | 71% |
| translate_mutable_var | 13 | 7 | 54% |
| translate_string_var | 13 | 6 | 46% |
| complete_return_statement | 7 | 3 | 43% |
| translate_for_of_loop | 11 | 4 | 36% |
| translate_array_literal | 6 | 2 | 33% |
| complete_variable_declaration | 8 | 2 | 25% |
| translate_conditional | 6 | 1 | 17% |
| translate_if_else | 6 | 1 | 17% |
| translate_function | 6 | 1 | 17% |
| translate_app_faber_to_ts | 4 | 0 | 0% |

## Methodology

- **Temperature:** 0.0 (deterministic)
- **Seed:** 42 (reproducible)
- **Dialects:** Latin keywords
- **Context levels:** examples-only, minimal, basic, complete

See [faber-trials](https://github.com/ianzepp/faber-trials) for raw data and methodology details.
