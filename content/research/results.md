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
| Total evaluations | 12,696 |
| Models tested | 17 |
| Total cost | $11.50 |
| Total tokens | 9.0M in / 520K out |
| Total time | 18088.3s |

## Model Comparison: Cost vs Speed vs Accuracy

| Model | Accuracy | Avg Latency | Cost | Tokens |
|-------|----------|-------------|------|--------|
| mistral-7b | 100% | 1.0s | <$0.01 | 10K |
| gpt-4o | 91% | 711ms | $1.53 | 576K |
| qwen3-coder | 90% | 1.4s | $0.20 | 842K |
| gpt-5 | 89% | 6.7s | $4.37 | 584K |
| gpt-4o-mini | 88% | 814ms | $0.09 | 576K |
| claude-3.5-sonnet | 88% | 1.8s | $2.21 | 667K |
| gpt-3.5-turbo | 88% | 490ms | $0.38 | 721K |
| llama-3.1-70b | 86% | 1.1s | $0.21 | 584K |
| codestral | 86% | 416ms | $0.18 | 580K |
| deepseek-v3.1 | 85% | 2.0s | $0.09 | 582K |
| claude-4.5-sonnet | 77% | 1.5s | $1.74 | 518K |
| mercury-coder | 73% | 589ms | $0.22 | 834K |
| llama-3.1-8b | 73% | 875ms | $0.03 | 663K |
| claude-3-haiku | 69% | 950ms | $0.21 | 728K |
| llama-3.2-3b | 55% | 2.8s | <$0.01 | 26K |
| llama-3.2-1b | 16% | 480ms | $0.03 | 749K |
| qwen2.5-coder-32b | 0% | 7.2s | $0.02 | 253K |

## Three-Level Grading Breakdown

**A** = typechecks, **B** = runs without error, **C** = correct output.

| Model | Tests | A (Typechecks) | B (Runs) | C (Correct) |
|-------|-------|----------------|----------|-------------|
| mistral-7b | 18 | 100% | 100% | 100% |
| gpt-4o | 840 | 95% | 95% | 91% |
| qwen3-coder | 1008 | 95% | 95% | 90% |
| gpt-5 | 672 | 93% | 93% | 89% |
| gpt-4o-mini | 840 | 93% | 93% | 88% |
| claude-3.5-sonnet | 840 | 95% | 95% | 88% |
| gpt-3.5-turbo | 1133 | 91% | 91% | 88% |
| llama-3.1-70b | 840 | 92% | 92% | 86% |
| codestral | 840 | 93% | 93% | 86% |
| deepseek-v3.1 | 840 | 94% | 94% | 85% |
| claude-4.5-sonnet | 672 | 93% | 93% | 77% |
| mercury-coder | 840 | 76% | 76% | 73% |
| llama-3.1-8b | 1008 | 90% | 90% | 73% |
| claude-3-haiku | 924 | 92% | 92% | 69% |
| llama-3.2-3b | 22 | 64% | 64% | 55% |
| llama-3.2-1b | 1077 | 44% | 44% | 16% |
| qwen2.5-coder-32b | 282 | 29% | 29% | 0% |

## By Context Level

How much documentation context helps models learn Faber.

| Context | Tests | Accuracy |
|---------|-------|----------|
| examples-only | 2604 | 61% |
| grammar-only | 2226 | 82% |
| minimal | 2924 | 78% |
| basic | 2466 | 79% |
| complete | 2476 | 79% |

## By N-shot (Learning Curve)

Effect of few-shot examples on accuracy.

| Examples | Tests | Accuracy |
|----------|-------|----------|
| 0-shot | 3343 | 70% |
| 1-shot | 3012 | 72% |
| 3-shot | 3401 | 80% |
| 10-shot | 2940 | 81% |

## Error Distribution

Where failures occur (among failed trials only).

| Error Type | Count | % of Failures |
|------------|-------|---------------|
| wrong_output | 1330 | 43% |
| type_error | 1248 | 40% |
| no_response | 312 | 10% |
| syntax_error | 192 | 6% |
| runtime_error | 13 | 0% |

## By Task

| Task | Tests | Accuracy |
|------|-------|----------|
| faber_to_ts_functio_string | 304 | 95% |
| faber_to_ts_arithmetic | 302 | 94% |
| faber_to_ts_ex_pro | 303 | 93% |
| faber_to_ts_si_true | 304 | 92% |
| faber_to_ts_functio | 304 | 92% |
| faber_to_ts_fixum | 303 | 91% |
| faber_to_ts_string | 304 | 91% |
| faber_to_ts_si_false | 304 | 91% |
| faber_to_ts_varia | 304 | 90% |
| faber_to_ts_dum | 302 | 90% |
| predict_const_value | 302 | 87% |
| faber_to_ts_boolean | 302 | 85% |
| ts_to_faber_const | 304 | 82% |
| complete_const_keyword | 301 | 82% |
| ts_to_faber_string | 304 | 81% |
| ts_to_faber_arithmetic | 303 | 80% |
| complete_return_keyword | 301 | 79% |
| complete_let_keyword | 301 | 79% |
| complete_function_keyword | 300 | 79% |
| complete_while_keyword | 300 | 79% |
| ts_to_faber_let | 303 | 78% |
| predict_simple_output | 302 | 77% |
| complete_print_keyword | 299 | 77% |
| ts_to_faber_if_false | 304 | 76% |
| predict_arithmetic_parens | 301 | 76% |
| predict_function_math | 301 | 76% |
| ts_to_faber_if_true | 304 | 75% |
| ts_to_faber_while | 303 | 75% |
| predict_loop_sum | 301 | 75% |
| complete_else_keyword | 300 | 75% |
| predict_conditional_true | 302 | 73% |
| complete_loop_keyword | 301 | 72% |
| predict_conditional_false | 303 | 71% |
| predict_arithmetic_precedence | 302 | 68% |
| ts_to_faber_for_of | 304 | 67% |
| predict_loop_output | 301 | 65% |
| predict_function_call | 301 | 65% |
| ts_to_faber_function | 304 | 62% |
| ts_to_faber_boolean | 303 | 56% |
| ts_to_faber_function_string | 304 | 55% |
| predict_boolean_and | 301 | 16% |
| predict_boolean_or | 300 | 13% |

## Methodology

- **Temperature:** 0.0 (deterministic)
- **Seed:** 42 (reproducible)
- **Dialects:** Latin keywords
- **Context levels:** examples-only, minimal, basic, complete

See [faber-trials](https://github.com/ianzepp/faber-trials) for raw data and methodology details.
