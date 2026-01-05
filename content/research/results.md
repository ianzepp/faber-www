---
title: Research Results
description: LLM learnability research from faber-trials
section: research
order: 1
---

# Research Results

Results from the faber-trials evaluation harness. Testing whether LLMs can learn Faber syntax from examples.

| Metric | Value |
|--------|-------|
| Framework version | 1.1 |
| Total evaluations | 10,017 |
| Models tested | 17 |
| Total cost | $8.24 |
| Total tokens | 6.7M in / 412K out |
| Total time | 14322.1s |

## Model Comparison: Cost vs Speed vs Accuracy

| Model | Accuracy | Avg Latency | Cost | Tokens |
|-------|----------|-------------|------|--------|
| mistral-7b | 100% | 1.0s | <$0.01 | 10K |
| gpt-4o | 90% | 732ms | $1.20 | 449K |
| gpt-3.5-turbo | 89% | 489ms | $0.26 | 494K |
| qwen3-coder | 88% | 1.2s | $0.11 | 452K |
| claude-3.5-sonnet | 87% | 1.9s | $1.72 | 517K |
| gpt-4o-mini | 86% | 840ms | $0.07 | 449K |
| llama-3.1-70b | 85% | 1.1s | $0.16 | 456K |
| codestral | 85% | 417ms | $0.14 | 449K |
| gpt-5 | 85% | 7.5s | $2.38 | 279K |
| deepseek-v3.1 | 84% | 2.2s | $0.07 | 448K |
| claude-4.5-sonnet | 77% | 1.5s | $1.74 | 518K |
| llama-3.1-8b | 73% | 872ms | $0.03 | 535K |
| mercury-coder | 71% | 588ms | $0.17 | 655K |
| claude-3-haiku | 69% | 960ms | $0.17 | 576K |
| llama-3.2-3b | 55% | 2.8s | <$0.01 | 26K |
| llama-3.2-1b | 16% | 450ms | $0.02 | 606K |
| qwen2.5-coder-32b | 0% | 7.3s | $0.02 | 243K |

## Three-Level Grading Breakdown

**A** = typechecks, **B** = runs without error, **C** = correct output.

| Model | Tests | A (Typechecks) | B (Runs) | C (Correct) |
|-------|-------|----------------|----------|-------------|
| mistral-7b | 18 | 100% | 100% | 100% |
| gpt-4o | 672 | 94% | 94% | 90% |
| gpt-3.5-turbo | 757 | 92% | 91% | 89% |
| qwen3-coder | 672 | 93% | 93% | 88% |
| claude-3.5-sonnet | 672 | 94% | 94% | 87% |
| gpt-4o-mini | 672 | 92% | 92% | 86% |
| llama-3.1-70b | 672 | 91% | 91% | 85% |
| codestral | 672 | 92% | 92% | 85% |
| gpt-5 | 396 | 89% | 89% | 85% |
| deepseek-v3.1 | 672 | 94% | 93% | 84% |
| claude-4.5-sonnet | 672 | 93% | 93% | 77% |
| llama-3.1-8b | 840 | 90% | 90% | 73% |
| mercury-coder | 672 | 74% | 74% | 71% |
| claude-3-haiku | 756 | 91% | 91% | 69% |
| llama-3.2-3b | 22 | 64% | 64% | 55% |
| llama-3.2-1b | 909 | 45% | 44% | 16% |
| qwen2.5-coder-32b | 271 | 27% | 27% | 0% |

## By Context Level

How much documentation context helps models learn Faber.

| Context | Tests | Accuracy |
|---------|-------|----------|
| examples-only | 2520 | 60% |
| minimal | 2816 | 78% |
| basic | 2329 | 79% |
| complete | 2352 | 79% |

## By N-shot (Learning Curve)

Effect of few-shot examples on accuracy.

| Examples | Tests | Accuracy |
|----------|-------|----------|
| 0-shot | 2589 | 66% |
| 1-shot | 2455 | 70% |
| 3-shot | 2747 | 79% |
| 10-shot | 2226 | 80% |

## Error Distribution

Where failures occur (among failed trials only).

| Error Type | Count | % of Failures |
|------------|-------|---------------|
| wrong_output | 1100 | 42% |
| type_error | 1081 | 41% |
| no_response | 268 | 10% |
| syntax_error | 173 | 7% |
| runtime_error | 9 | 0% |

## By Task

| Task | Tests | Accuracy |
|------|-------|----------|
| faber_to_ts_functio_string | 241 | 95% |
| faber_to_ts_arithmetic | 237 | 93% |
| faber_to_ts_si_true | 241 | 92% |
| faber_to_ts_ex_pro | 240 | 92% |
| faber_to_ts_functio | 241 | 91% |
| faber_to_ts_string | 241 | 90% |
| faber_to_ts_si_false | 241 | 90% |
| faber_to_ts_fixum | 240 | 89% |
| faber_to_ts_varia | 241 | 89% |
| faber_to_ts_dum | 239 | 88% |
| predict_const_value | 237 | 87% |
| faber_to_ts_boolean | 237 | 84% |
| ts_to_faber_const | 241 | 80% |
| complete_const_keyword | 237 | 79% |
| ts_to_faber_string | 241 | 78% |
| ts_to_faber_arithmetic | 239 | 77% |
| complete_return_keyword | 237 | 77% |
| complete_let_keyword | 237 | 77% |
| complete_function_keyword | 236 | 77% |
| ts_to_faber_let | 240 | 76% |
| predict_simple_output | 237 | 76% |
| complete_while_keyword | 237 | 76% |
| predict_arithmetic_parens | 236 | 75% |
| predict_loop_sum | 236 | 75% |
| complete_print_keyword | 236 | 74% |
| ts_to_faber_if_false | 241 | 73% |
| predict_function_math | 237 | 73% |
| ts_to_faber_if_true | 241 | 72% |
| ts_to_faber_while | 240 | 72% |
| predict_conditional_true | 237 | 72% |
| complete_else_keyword | 236 | 72% |
| predict_conditional_false | 238 | 71% |
| complete_loop_keyword | 237 | 70% |
| predict_arithmetic_precedence | 237 | 66% |
| predict_loop_output | 236 | 65% |
| ts_to_faber_function | 241 | 64% |
| ts_to_faber_for_of | 241 | 63% |
| predict_function_call | 237 | 61% |
| ts_to_faber_function_string | 241 | 55% |
| ts_to_faber_boolean | 238 | 51% |
| predict_boolean_and | 237 | 10% |
| predict_boolean_or | 236 | 6% |

## Methodology

- **Temperature:** 0.0 (deterministic)
- **Seed:** 42 (reproducible)
- **Dialects:** Latin keywords
- **Context levels:** examples-only, minimal, basic, complete

See [faber-trials](https://github.com/ianzepp/faber-trials) for raw data and methodology details.
