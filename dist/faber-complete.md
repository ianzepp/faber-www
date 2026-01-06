# Faber Language - Complete Documentation

This document contains the complete Faber language documentation.

---

# Documentation


# Documentation

Faber language documentation, synced from the [faber-romanus](https://github.com/ianzepp/faber-romanus) repository.

## Language Reference

- [Grammar Reference](/docs/grammar.html) - Complete syntax specification
- [Examples](/docs/examples.html) - Code examples by feature category

## Topic Guides

Generated from the compiler's grammar documentation:

- Fundamenta - Language fundamentals
- Typi - Type system
- Operatores - Operators
- Structurae - Data structures
- Regimen - Control flow
- Functiones - Functions
- Importa - Module imports
- Errores - Error handling

## For LLMs

If you're an LLM learning Faber, the most efficient path is:

1. Read [/faber-complete.md](/faber-complete.md) - concatenated full documentation
2. Study the [examples](/docs/examples.html) for syntax patterns
3. Reference the [grammar](/docs/grammar.html) for specific constructs

The grammar specification uses consistent patterns and explicit examples designed for LLM consumption.


---

# Research


# Research

Can LLMs learn Faber effectively? The [faber-romanus](https://github.com/ianzepp/faber-romanus) project includes an evaluation harness to test this systematically.

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

Source: [faber-romanus on GitHub](https://github.com/ianzepp/faber-romanus)


---

# Grammar Reference


# Faber Language Specification

Formal grammar for the Faber programming language. This is the authoritative specification that both faber (TypeScript) and rivus (Faber) compilers implement.

---

## Program Structure

```ebnf
program     := statement*
statement   := importDecl | varDecl | funcDecl | genusDecl | pactumDecl
             | typeAliasDecl | enumDecl | discretioDecl
             | ifStmt | whileStmt | exStmt | deStmt | inStmt
             | eligeStmt | discerneStmt | guardStmt | curaStmt
             | tryStmt | returnStmt | breakStmt | continueStmt | throwStmt
             | assertStmt | outputStmt | adStmt | incipitStmt
             | probandumDecl | probaStmt | blockStmt | exprStmt
blockStmt   := '{' statement* '}'
```

---

## Declarations

### Variables

```ebnf
varDecl      := ('fixum' | 'varia' | 'figendum' | 'variandum') typeAnnotation? IDENTIFIER ('=' expression)?
arrayDestruct := ('fixum' | 'varia') arrayPattern '=' expression
objectDestruct := ('fixum' | 'varia') objectPattern '=' expression
```

- `fixum` = const, `varia` = let
- `figendum`/`variandum` = const/let with await

### Functions

```ebnf
funcDecl     := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause? blockStmt
paramList    := (typeParamDecl ',')* (parameter (',' parameter)*)?
typeParamDecl := 'prae' 'typus' IDENTIFIER
parameter    := ('de' | 'in' | 'ex')? 'si'? 'ceteri'? typeAnnotation? IDENTIFIER ('ut' IDENTIFIER)? ('vel' expression)?
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
returnClause := ('->' | 'fit' | 'fiet' | 'fiunt' | 'fient') typeAnnotation
lambdaExpr   := ('pro' | 'fit' | 'fiet') params? ('->' type)? (':' expression | blockStmt)
```

- Return verbs: `fit` (sync), `fiet` (async), `fiunt` (generator), `fient` (async generator)
- Parameter prefixes: `de` (read), `in` (mutate), `ex` (consume)
- `si` marks optional, `ceteri` marks rest parameter

### Classes

```ebnf
genusDecl    := 'abstractus'? 'genus' IDENTIFIER typeParams? ('sub' IDENTIFIER)? ('implet' IDENTIFIER (',' IDENTIFIER)*)? '{' genusMember* '}'
genusMember  := annotation* (fieldDecl | methodDecl)
fieldDecl    := 'generis'? 'nexum'? typeAnnotation IDENTIFIER (':' expression)?
methodDecl   := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause? blockStmt?
annotation   := '@' IDENTIFIER+
```

- `sub` = extends, `implet` = implements
- `generis` = static, `nexum` = bound/property

### Interfaces

```ebnf
pactumDecl   := 'pactum' IDENTIFIER typeParams? '{' pactumMethod* '}'
pactumMethod := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause?
```

### Type Aliases

```ebnf
typeAliasDecl := 'typus' IDENTIFIER '=' typeAnnotation
```

### Enums

```ebnf
enumDecl   := 'ordo' IDENTIFIER '{' enumMember (',' enumMember)* ','? '}'
enumMember := IDENTIFIER ('=' ('-'? NUMBER | STRING))?
```

### Tagged Unions

```ebnf
discretioDecl := 'discretio' IDENTIFIER typeParams? '{' variant (',' variant)* ','? '}'
variant       := IDENTIFIER ('{' variantFields '}')?
variantFields := (typeAnnotation IDENTIFIER (',' typeAnnotation IDENTIFIER)*)?
```

### Imports

```ebnf
importDecl    := 'ex' (STRING | IDENTIFIER) 'importa' (specifierList | '*')
specifierList := specifier (',' specifier)*
specifier     := IDENTIFIER ('ut' IDENTIFIER)?
```

---

## Types

```ebnf
typeAnnotation := ('de' | 'in')? IDENTIFIER typeParams? '?'? arrayBrackets*
typeParams     := '<' typeParameter (',' typeParameter)* '>'
typeParameter  := typeAnnotation | NUMBER | MODIFIER
arrayBrackets  := '[]' '?'?
```

### Primitive Types

| Faber | Meaning |
|-------|---------|
| `textus` | string |
| `numerus` | integer |
| `fractus` | float |
| `bivalens` | boolean |
| `nihil` | null |
| `vacuum` | void |
| `numquam` | never |
| `ignotum` | unknown |
| `octeti` | bytes |

### Generic Collections

| Faber | Meaning |
|-------|---------|
| `lista<T>` | array |
| `tabula<K,V>` | map |
| `copia<T>` | set |
| `promissum<T>` | promise |
| `cursor<T>` | iterator |
| `unio<A,B>` | union |

---

## Control Flow

### Conditionals

```ebnf
ifStmt     := 'si' expression (blockStmt | 'ergo' statement | 'reddit' expression)
              ('cape' IDENTIFIER blockStmt)? (elseClause | 'sin' ifStmt)?
elseClause := 'secus' (ifStmt | blockStmt | statement)
```

- `si` = if, `sin` = else-if, `secus` = else
- `ergo` for one-liners, `reddit` for early return

### Loops

```ebnf
whileStmt := 'dum' expression (blockStmt | 'ergo' statement | 'reddit' expression) ('cape' IDENTIFIER blockStmt)?
exStmt    := 'ex' expression (forBinding | destructBinding)
forBinding := ('pro' | 'fit' | 'fiet') IDENTIFIER (blockStmt | 'ergo' statement | 'reddit' expression) catchClause?
deStmt    := 'de' expression ('pro' | 'fit' | 'fiet') IDENTIFIER (blockStmt | 'ergo' statement) catchClause?
```

- `dum` = while
- `ex...pro` = for-of (values)
- `de...pro` = for-in (keys)

### Switch/Match

```ebnf
eligeStmt    := 'elige' expression '{' eligeCase* defaultCase? '}' catchClause?
eligeCase    := 'casu' expression (blockStmt | 'ergo' statement | 'reddit' expression)
defaultCase  := 'ceterum' (blockStmt | statement)
```

### Pattern Matching

```ebnf
discerneStmt := 'discerne' discriminants '{' variantCase* '}'
discriminants := expression (',' expression)*
variantCase  := 'casu' patterns (blockStmt | 'ergo' statement | 'reddit' expression)
patterns     := pattern (',' pattern)*
pattern      := '_' | (IDENTIFIER patternBind?)
patternBind  := ('ut' IDENTIFIER) | ('pro' IDENTIFIER (',' IDENTIFIER)*)
```

### Guards

```ebnf
guardStmt   := 'custodi' '{' guardClause+ '}'
guardClause := 'si' expression (blockStmt | 'ergo' statement | 'reddit' expression)
```

### Resource Management

```ebnf
curaStmt    := 'cura' curatorKind? expression? ('pro' | 'fit' | 'fiet') typeAnnotation? IDENTIFIER blockStmt catchClause?
curatorKind := 'arena' | 'page'
```

### Control Transfer

```ebnf
returnStmt   := 'redde' expression?
breakStmt    := 'rumpe'
continueStmt := 'perge'
```

---

## Error Handling

```ebnf
tryStmt     := 'tempta' blockStmt ('cape' IDENTIFIER blockStmt)? ('demum' blockStmt)?
throwStmt   := ('iace' | 'mori') expression
catchClause := 'cape' IDENTIFIER blockStmt
assertStmt  := 'adfirma' expression (',' expression)?
```

- `tempta` = try, `cape` = catch, `demum` = finally
- `iace` = throw (recoverable), `mori` = panic (fatal)

---

## Expressions

### Operators (by precedence, lowest to highest)

```ebnf
expression := assignment
assignment := ternary (('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=') assignment)?
ternary    := or (('?' expression ':' | 'sic' expression 'secus') ternary)?
or         := and (('||' | 'aut') and)* | and ('vel' and)*
and        := equality (('&&' | 'et') equality)*
equality   := comparison (('==' | '!=' | '===' | '!==' | 'est' | 'non' 'est') comparison)*
comparison := bitwiseOr (('<' | '>' | '<=' | '>=' | 'intra' | 'inter') bitwiseOr)*
bitwiseOr  := bitwiseXor ('|' bitwiseXor)*
bitwiseXor := bitwiseAnd ('^' bitwiseAnd)*
bitwiseAnd := shift ('&' shift)*
shift      := range (('<<' | '>>') range)*
range      := additive (('..' | 'ante' | 'usque') additive ('per' additive)?)?
additive   := multiplicative (('+' | '-') multiplicative)*
multiplicative := unary (('*' | '/' | '%') unary)*
unary      := ('!' | '-' | 'non' | 'nulla' | 'nonnulla' | 'nihil' | 'nonnihil' | 'negativum' | 'positivum' | 'cede' | 'novum' | 'finge') unary | cast
cast       := call ('qua' typeAnnotation | 'innatum' typeAnnotation)*
```

### Call and Member Access

```ebnf
call          := primary (callSuffix | memberSuffix | optionalSuffix | nonNullSuffix)*
callSuffix    := '(' argumentList ')'
memberSuffix  := '.' IDENTIFIER | '[' expression ']'
optionalSuffix := '?.' IDENTIFIER | '?[' expression ']' | '?(' argumentList ')'
nonNullSuffix := '!.' IDENTIFIER | '![' expression ']' | '!(' argumentList ')'
argumentList  := (argument (',' argument)*)?
argument      := 'sparge'? expression
```

### Primary Expressions

```ebnf
primary := IDENTIFIER | NUMBER | STRING | TEMPLATE_STRING
         | 'ego' | 'verum' | 'falsum' | 'nihil'
         | arrayLiteral | objectLiteral
         | '(' expression ')'
```

### Special Expressions

```ebnf
newExpr       := 'novum' IDENTIFIER ('(' argumentList ')')? (objectLiteral | 'de' expression)?
fingeExpr     := 'finge' IDENTIFIER ('{' fieldList '}')? ('qua' IDENTIFIER)?
praefixumExpr := 'praefixum' (blockStmt | '(' expression ')')
scriptumExpr  := 'scriptum' '(' STRING (',' expression)* ')'
legeExpr      := 'lege' 'lineam'?
regexLiteral  := 'sed' STRING IDENTIFIER?
```

---

## Patterns

```ebnf
objectPattern  := '{' patternProperty (',' patternProperty)* '}'
patternProperty := 'ceteri'? IDENTIFIER (':' IDENTIFIER)?
arrayPattern   := '[' arrayPatternElement (',' arrayPatternElement)* ']'
arrayPatternElement := '_' | 'ceteri'? IDENTIFIER
```

---

## Output

```ebnf
outputStmt := ('scribe' | 'vide' | 'mone') expression (',' expression)*
```

- `scribe` = log, `vide` = debug, `mone` = warn

---

## Entry Points

```ebnf
incipitStmt  := 'incipit' (blockStmt | 'ergo' statement | 'reddit' expression)
incipietStmt := 'incipiet' (blockStmt | 'ergo' statement | 'reddit' expression)
```

- `incipit` = sync entry, `incipiet` = async entry

---

## Testing

```ebnf
probandumDecl := 'probandum' STRING '{' probandumBody '}'
probandumBody := (praeparaBlock | probandumDecl | probaStmt)*
probaStmt     := 'proba' probaModifier? STRING blockStmt
probaModifier := 'omitte' STRING | 'futurum' STRING
praeparaBlock := ('praepara' | 'praeparabit' | 'postpara' | 'postparabit') 'omnia'? blockStmt
```

---

## Endpoint Dispatch

```ebnf
adStmt        := 'ad' STRING '(' argumentList ')' adBinding? blockStmt? catchClause?
adBinding     := adBindingVerb typeAnnotation? 'pro' IDENTIFIER ('ut' IDENTIFIER)?
adBindingVerb := 'fit' | 'fiet' | 'fiunt' | 'fient'
```

---

## DSL Transforms

```ebnf
dslExpr      := 'ex' expression dslTransforms
dslTransforms := dslTransform (',' dslTransform)*
dslTransform := dslVerb expression?
dslVerb      := 'prima' | 'ultima' | 'summa'

abExpr := 'ab' expression filter? (',' dslTransform)*
filter := 'non'? ('ubi' condition | IDENTIFIER)
```

---

## Fac Block

```ebnf
facBlockStmt := 'fac' blockStmt ('cape' IDENTIFIER blockStmt)? ('dum' expression)?
```

- Creates scope, optionally with catch or do-while

---

## Mutation Block

```ebnf
inStmt := 'in' expression blockStmt
```

---

## Keyword Reference

| Category | Faber | Meaning |
|----------|-------|---------|
| **Declarations** | `fixum` | const |
| | `varia` | let |
| | `functio` | function |
| | `genus` | class |
| | `pactum` | interface |
| | `typus` | type alias |
| | `ordo` | enum |
| | `discretio` | tagged union |
| **Control Flow** | `si` / `sin` / `secus` | if / else-if / else |
| | `dum` | while |
| | `ex...pro` | for-of |
| | `de...pro` | for-in |
| | `elige` / `casu` | switch / case |
| | `discerne` | pattern match |
| | `custodi` | guard |
| | `redde` | return |
| | `rumpe` | break |
| | `perge` | continue |
| **Error Handling** | `tempta` | try |
| | `cape` | catch |
| | `demum` | finally |
| | `iace` | throw |
| | `mori` | panic |
| | `adfirma` | assert |
| **Async** | `futura` | async modifier |
| | `cede` | await |
| **Boolean** | `verum` | true |
| | `falsum` | false |
| | `et` | and |
| | `aut` | or |
| | `non` | not |
| | `vel` | nullish coalescing |
| **Objects** | `ego` | this/self |
| | `novum` | new |
| | `finge` | construct variant |
| **Output** | `scribe` | log |
| | `vide` | debug |
| | `mone` | warn |

---

## Critical Syntax Rules

1. **Type-first parameters**: `functio f(numerus x)` NOT `functio f(x: numerus)`
2. **Type-first declarations**: `fixum textus name` NOT `fixum name: textus`
3. **For-of loops**: `ex collection pro item { }` (collection first)
4. **Parentheses around conditions are valid but not idiomatic**: prefer `si x > 0 { }` or `si positivum x { }` over `si (x > 0) { }`
5. **Output keywords are statements**, not functions — `scribe x` works, `scribe(x)` also works (parentheses group the expression), but `scribe` is not a callable value



---

# Research Results


# Research Results

Results from the Faber evaluation harness. Testing whether LLMs can learn Faber syntax from examples.

| Metric | Value |
|--------|-------|
| Framework version | 1.1 |
| Total evaluations | 13,270 |
| Models tested | 15 |
| Total cost | $12.04 |
| Total tokens | 9.5M in / 563K out |
| Total time | 18980.8s |

## Model Comparison: Cost vs Speed vs Accuracy

| Model | Accuracy | Avg Latency | Cost | Tokens |
|-------|----------|-------------|------|--------|
| gpt-4o | 89% | 829ms | $1.94 | 707K |
| qwen3-coder | 89% | 1.4s | $0.22 | 926K |
| gpt-3.5-turbo | 89% | 521ms | $0.40 | 762K |
| gpt-5 | 89% | 6.7s | $4.37 | 584K |
| gpt-4o-mini | 88% | 869ms | $0.10 | 630K |
| claude-3.5-sonnet | 88% | 1.8s | $2.21 | 667K |
| llama-3.1-70b | 86% | 1.1s | $0.21 | 609K |
| codestral | 86% | 541ms | $0.24 | 737K |
| deepseek-v3.1 | 85% | 2.0s | $0.10 | 617K |
| claude-4.5-sonnet | 77% | 1.5s | $1.74 | 518K |
| mercury-coder | 73% | 589ms | $0.22 | 834K |
| llama-3.1-8b | 73% | 915ms | $0.04 | 717K |
| claude-3-haiku | 70% | 970ms | $0.22 | 769K |
| llama-3.2-1b | 15% | 486ms | $0.03 | 778K |
| qwen2.5-coder-32b | 0% | 7.2s | $0.02 | 253K |

## Three-Level Grading Breakdown

**A** = typechecks, **B** = runs without error, **C** = correct output.

| Model | Tests | A (Typechecks) | B (Runs) | C (Correct) |
|-------|-------|----------------|----------|-------------|
| gpt-4o | 952 | 93% | 93% | 88% |
| qwen3-coder | 1068 | 94% | 94% | 89% |
| gpt-3.5-turbo | 1166 | 91% | 91% | 89% |
| gpt-5 | 672 | 93% | 93% | 89% |
| gpt-4o-mini | 895 | 93% | 93% | 88% |
| claude-3.5-sonnet | 840 | 95% | 95% | 88% |
| llama-3.1-70b | 870 | 91% | 91% | 86% |
| codestral | 964 | 93% | 92% | 86% |
| deepseek-v3.1 | 862 | 95% | 94% | 85% |
| claude-4.5-sonnet | 672 | 93% | 93% | 77% |
| mercury-coder | 840 | 76% | 76% | 73% |
| llama-3.1-8b | 1063 | 90% | 90% | 73% |
| claude-3-haiku | 946 | 92% | 92% | 70% |
| llama-3.2-1b | 1138 | 43% | 43% | 15% |
| qwen2.5-coder-32b | 282 | 29% | 29% | 0% |

## By Context Level

How much documentation context helps models learn Faber.

| Context | Tests | Accuracy |
|---------|-------|----------|
| examples-only | 2681 | 61% |
| grammar-only | 2662 | 82% |
| minimal | 2985 | 77% |
| basic | 2466 | 79% |
| complete | 2476 | 79% |

## By N-shot (Learning Curve)

Effect of few-shot examples on accuracy.

| Examples | Tests | Accuracy |
|----------|-------|----------|
| 0-shot | 3343 | 70% |
| 1-shot | 3073 | 71% |
| 3-shot | 3914 | 80% |
| 10-shot | 2940 | 81% |

## Error Distribution

Where failures occur (among failed trials only).

| Error Type | Count | % of Failures |
|------------|-------|---------------|
| type_error | 1360 | 42% |
| wrong_output | 1345 | 42% |
| no_response | 312 | 10% |
| syntax_error | 201 | 6% |
| runtime_error | 14 | 0% |

## By Task

| Task | Tests | Accuracy |
|------|-------|----------|
| faber_to_ts_functio_string | 305 | 95% |
| faber_to_ts_arithmetic | 303 | 94% |
| faber_to_ts_ex_pro | 304 | 93% |
| faber_to_ts_si_true | 305 | 92% |
| faber_to_ts_functio | 305 | 92% |
| complex_ts_to_faber_factorial | 12 | 92% |
| complex_ts_to_faber_fibonacci | 12 | 92% |
| complex_ts_to_faber_multi_function | 12 | 92% |
| complex_ts_to_faber_ternary_chain | 12 | 92% |
| complex_ts_to_faber_string_ops | 12 | 92% |
| complex_ts_to_faber_early_return | 12 | 92% |
| complex_ts_to_faber_accumulator | 12 | 92% |
| complex_ts_to_faber_prime_check | 12 | 92% |
| faber_to_ts_fixum | 304 | 91% |
| faber_to_ts_string | 305 | 91% |
| faber_to_ts_si_false | 305 | 91% |
| faber_to_ts_varia | 305 | 90% |
| faber_to_ts_dum | 303 | 89% |
| predict_const_value | 303 | 87% |
| faber_to_ts_boolean | 303 | 85% |
| ts_to_faber_const | 333 | 84% |
| complex_ts_to_faber_if_in_loop | 12 | 83% |
| complex_ts_to_faber_typed_params | 12 | 83% |
| complex_ts_to_faber_find_max | 12 | 83% |
| ts_to_faber_string | 332 | 82% |
| ts_to_faber_arithmetic | 331 | 82% |
| complete_const_keyword | 302 | 81% |
| ts_to_faber_let | 331 | 80% |
| complete_return_keyword | 302 | 79% |
| complete_let_keyword | 302 | 79% |
| ts_to_faber_if_false | 332 | 78% |
| complete_function_keyword | 301 | 78% |
| complete_while_keyword | 301 | 78% |
| ts_to_faber_if_true | 332 | 77% |
| predict_simple_output | 303 | 77% |
| complete_print_keyword | 300 | 77% |
| ts_to_faber_while | 331 | 76% |
| predict_function_math | 302 | 76% |
| predict_arithmetic_parens | 302 | 75% |
| predict_loop_sum | 302 | 75% |
| complex_ts_to_faber_fizzbuzz | 12 | 75% |
| complete_else_keyword | 301 | 74% |
| predict_conditional_true | 303 | 73% |
| complete_loop_keyword | 302 | 72% |
| predict_conditional_false | 304 | 71% |
| ts_to_faber_for_of | 332 | 67% |
| predict_arithmetic_precedence | 303 | 67% |
| complex_ts_to_faber_array_type | 12 | 67% |
| ts_to_faber_function | 332 | 65% |
| predict_loop_output | 302 | 65% |
| predict_function_call | 302 | 65% |
| ts_to_faber_boolean | 331 | 59% |
| complex_ts_to_faber_guard_clause | 12 | 58% |
| ts_to_faber_function_string | 332 | 57% |
| complex_ts_to_faber_loop_in_loop | 14 | 43% |
| complex_ts_to_faber_nested_if | 14 | 29% |
| predict_boolean_and | 302 | 16% |
| predict_boolean_or | 301 | 13% |
| complex_ts_to_faber_higher_order | 12 | 0% |
| complex_ts_to_faber_gcd | 12 | 0% |
| complex_ts_to_faber_binary_search | 14 | 0% |

## Methodology

- **Temperature:** 0.0 (deterministic)
- **Seed:** 42 (reproducible)
- **Dialects:** Latin keywords
- **Context levels:** examples-only, minimal, basic, complete

See [faber-romanus](https://github.com/ianzepp/faber-romanus) for raw data and methodology details.


---

# Examples


# Examples

Faber code examples from the `exempla/` directory, organized by feature category.

## adfirma

### in-functio

```faber
# Assertions in functions for preconditions and postconditions
#
# adfirma <condition>
# adfirma <condition>, "error message"

# Precondition: validate input at function start
functio divide(numerus a, numerus b) fit numerus {
    adfirma b != 0, "divisor must not be zero"
    redde a / b
}

# Multiple preconditions
functio calculateAge(numerus birthYear, numerus currentYear) fit numerus {
    adfirma birthYear > 0, "birth year must be positive"
    adfirma currentYear >= birthYear, "current year must be >= birth year"
    redde currentYear - birthYear
}

# Postcondition: validate result before returning
functio absoluteValue(numerus n) fit numerus {
    varia result = n
    si n < 0 {
        result = -n
    }
    adfirma result >= 0, "result must be non-negative"
    redde result
}

incipit {
    fixum quotient = divide(20, 4)
    adfirma quotient == 5

    fixum age = calculateAge(1990, 2024)
    adfirma age == 34

    fixum abs = absoluteValue(-42)
    adfirma abs == 42
}
```

### basic

```faber
# Basic adfirma (assert) statements
#
# adfirma <condition>
# adfirma <condition>, "error message"

incipit {
    fixum x = 10

    # Simple assertion without message
    adfirma x > 0

    # Assertion with custom error message
    adfirma x == 10, "x must equal 10"

    # Multiple assertions
    fixum name = "Marcus"
    adfirma name == "Marcus"
    adfirma name != "", "name must not be empty"

    # Boolean assertions
    fixum active = verum
    adfirma active
    adfirma active == verum, "must be active"
}
```

## cura

### nested

```faber
# Nested allocator scopes
#
# cura arena fit <outer> { cura arena fit <inner> { } }
#
# Allocator scopes can nest. Inner scopes free before outer scopes.

incipit {
    cura arena fit outer {
        varia textus[] a = ["one"]

        cura arena fit inner {
            varia textus[] b = ["two"]
            scribe "Inner:", b
        }
        # inner freed here

        a.adde("three")
        scribe "Outer:", a
    }
    # outer freed here
}
```

### arena

```faber
# Arena allocator scope
#
# cura arena fit <identifier> { <body> }
#
# Arena allocators provide fast allocation with bulk deallocation.
# All memory is freed when the scope exits.
# On GC targets (TS, Python), allocator blocks are ignored.

incipit {
    cura arena fit mem {
        # All allocations in this block use the arena
        varia textus[] items = ["hello", "world"]
        scribe items
    }
    # Arena freed, all allocations released

    # Page allocator variant
    cura page fit pageMem {
        scribe "Using page allocator"
    }
}
```

## custodi

### basic

```faber
# Basic custodi (guard clause) statement
#
# custodi { si <condition> { <early-return> } }
#
# Groups early-exit checks at function start to separate
# validation from main logic.

functio divide(a, b) -> numerus {
    custodi {
        si b == 0 {
            redde 0
        }
    }

    redde a / b
}

functio processValue(x) -> numerus {
    custodi {
        si x < 0 {
            redde -1
        }
        si x > 100 {
            redde -1
        }
    }

    # Main logic, clearly separated from guards
    redde x * 2
}

functio clamp(value, min, max) -> numerus {
    custodi {
        si value < min {
            redde min
        }
        si value > max {
            redde max
        }
    }

    redde value
}

incipit {
    scribe divide(10, 2)
    scribe divide(10, 0)

    scribe processValue(50)
    scribe processValue(-10)
    scribe processValue(150)

    scribe clamp(5, 0, 10)
    scribe clamp(-5, 0, 10)
    scribe clamp(15, 0, 10)
}
```

### validation

```faber
# Input validation patterns with custodi
#
# Use custodi to group related precondition checks.
# Each guard should return early or throw on invalid input.

functio processAge(age) -> textus {
    custodi {
        si age < 0 {
            redde "Invalid: negative age"
        }
        si age > 150 {
            redde "Invalid: age too high"
        }
    }

    si age < 18 {
        redde "Minor"
    }
    secus {
        redde "Adult"
    }
}

functio createUser(name, email, age, curator alloc) -> textus {
    custodi {
        si name == nihil aut name == "" {
            redde "Error: name required"
        }
        si email == nihil aut email == "" {
            redde "Error: email required"
        }
        si age < 13 {
            redde "Error: must be 13 or older"
        }
        si age > 120 {
            redde "Error: invalid age"
        }
    }

    redde scriptum("User created: §", name)
}

# Guards can throw instead of returning
functio sqrt(n) -> numerus {
    custodi {
        si n < 0 {
            iace "Cannot compute square root of negative number"
        }
    }

    redde n
}

incipit ergo cura arena {
    scribe processAge(-5)
    scribe processAge(200)
    scribe processAge(25)
    scribe processAge(12)

    scribe createUser("Marcus", "marcus@roma.com", 30)
    scribe createUser("", "test@test.com", 25)
    scribe createUser("Julia", "julia@roma.com", 10)

    scribe sqrt(16)
}
```

## de-pro

### basic

```faber
# Basic de...pro (for-in) key iteration
#
# de <object> pro <key> { <body> }
# de <array> pro <index> { <body> }

incipit ergo cura arena {
    # Iterate over object keys
    fixum persona = { nomen: "Marcus", aetas: 30, urbs: "Roma" }

    de persona pro clavis {
        scribe clavis
    }

    # Access values using the key
    de persona pro clavis {
        scribe scriptum("§: §", clavis, persona[clavis])
    }

    # Iterate over array indices
    fixum numeri = [10, 20, 30]

    de numeri pro index {
        scribe scriptum("Index §: §", index, numeri[index])
    }

    # One-liner form with ergo
    fixum data = { alpha: 1, beta: 2 }
    de data pro k ergo scribe k
}
```

## destructure

### array

```faber
# Array destructuring patterns
#
# fixum [a, b, c] = array         -- destructure into immutable bindings
# varia [x, y, z] = array         -- destructure into mutable bindings
# fixum [first, ceteri rest] = arr -- with rest pattern
# fixum [_, second, _] = arr      -- skip elements with underscore

incipit {
    # Basic array destructuring
    fixum numbers = [1, 2, 3]
    fixum [a, b, c] = numbers

    scribe a
    scribe b
    scribe c

    # Destructure inline array literal
    fixum [first, second, third] = [10, 20, 30]

    scribe first
    scribe second
    scribe third

    # Mutable destructuring with varia
    fixum coords = [100, 200]
    varia [x, y] = coords

    scribe x
    scribe y

    x = x + 50
    y = y + 50

    scribe x
    scribe y

    # Partial destructuring (fewer variables than elements)
    fixum values = [1, 2, 3, 4, 5]
    fixum [one, two] = values

    scribe one
    scribe two

    # Rest pattern with ceteri
    fixum items = [1, 2, 3, 4, 5]
    fixum [head, ceteri tail] = items

    scribe head
    scribe tail

    # Skip elements with underscore
    fixum triple = [10, 20, 30]
    fixum [_, middle, _] = triple

    scribe middle

    # Nested arrays
    fixum matrix = [[1, 2], [3, 4]]
    fixum [row1, row2] = matrix

    scribe row1
    scribe row2
}
```

### object

```faber
# Object destructuring patterns
#
# ex obj fixum field1, field2     -- extract fields into immutable bindings
# ex obj varia field1, field2     -- extract into mutable bindings
# ex obj fixum field ut alias     -- extract with alias (rename)
# ex obj fixum field, ceteri rest -- extract with rest pattern

incipit {
    # Basic field extraction
    fixum person = { name: "Marcus", age: 30, city: "Roma" }
    ex person fixum name, age

    scribe name
    scribe age

    # Extract with alias using 'ut'
    fixum user = { name: "Julia", email: "julia@roma.com" }
    ex user fixum name ut userName, email ut userEmail

    scribe userName
    scribe userEmail

    # Mutable destructuring with varia
    fixum data = { count: 100, active: verum }
    ex data varia count, active

    scribe count
    scribe active

    count = 200
    active = falsum

    scribe count
    scribe active

    # Mixed alias and regular fields
    fixum config = { host: "localhost", port: 8080, secure: verum }
    ex config fixum host, port ut serverPort, secure

    scribe host
    scribe serverPort
    scribe secure

    # Rest pattern with ceteri
    fixum fullUser = { id: 1, name: "Gaius", email: "g@roma.com", role: "admin" }
    ex fullUser fixum id, ceteri details

    scribe id
    scribe details

    # Destructure from nested access
    fixum response = { data: { user: { name: "Claudia", verified: verum } } }
    ex response.data.user fixum name ut nestedName, verified

    scribe nestedName
    scribe verified

    # Single field extraction
    fixum settings = { theme: "dark", lang: "la" }
    ex settings fixum theme

    scribe theme
}
```

## discerne

### basic

```faber
# Pattern matching with discerne (discriminate/distinguish)
#
# discerne <value> {
#     casu <Variant> { <body> }
#     casu <Variant> ut <alias> { <body> }
#     casu <Variant> pro <bindings> { <body> }
# }

# Define discretio (tagged union) types
discretio Status {
    Active,
    Inactive,
    Pending
}

discretio Event {
    Click { numerus x, numerus y },
    Keypress { textus key },
    Quit
}

# Functions demonstrating discerne
functio describe_status(Status s) -> textus {
    discerne s {
        casu Active { redde "active" }
        casu Inactive { redde "inactive" }
        casu Pending { redde "pending" }
    }
}

functio handle_event(Event e) -> nihil {
    discerne e {
        casu Click pro x, y {
            scribe scriptum("Clicked at §, §", x, y)
        }
        casu Keypress pro key {
            scribe scriptum("Key: §", key)
        }
        casu Quit {
            scribe "quit"
        }
    }
}

incipit {
    scribe "discerne patterns defined"
}
```

## discretio

### basic

```faber
# Basic discretio (discriminated union/tagged union)
#
# discretio Name {
#     Variant1 { type field1, type field2 }
#     Variant2 { type field }
#     Variant3
# }

# Discretio with payload variants
discretio Result {
    Success { textus message }
    Failure { textus error }
}

# Discretio with mixed unit and payload variants
discretio Event {
    Click { numerus x, numerus y }
    Keypress { textus key }
    Quit
}

# Discretio with many fields per variant
discretio Shape {
    Rectangle { numerus x, numerus y, numerus width, numerus height }
    Circle { numerus cx, numerus cy, numerus radius }
    Point { numerus x, numerus y }
}

incipit {
    scribe "Discretio types defined"
}
```

## dum

### in-functio

```faber
# While loops inside functions

functio factorial(numerus n) -> numerus {
    varia numerus result = 1
    varia numerus current = n

    dum current > 1 {
        result = result * current
        current = current - 1
    }

    redde result
}

functio nextPowerOf2(numerus n) -> numerus {
    varia numerus power = 1

    dum power <= n {
        power = power * 2
    }

    redde power
}

incipit {
    scribe "5! =", factorial(5)
    scribe "10! =", factorial(10)

    scribe "Next power of 2 after 100:", nextPowerOf2(100)
    scribe "Next power of 2 after 1000:", nextPowerOf2(1000)
}
```

### basic

```faber
# Basic dum (while) loop with counter
#
# dum <condition> { <body> }

incipit {
    varia numerus counter = 0

    dum counter < 5 {
        scribe counter
        counter = counter + 1
    }

    # Countdown example
    varia numerus countdown = 3

    dum countdown > 0 {
        scribe "Countdown:", countdown
        countdown = countdown - 1
    }

    scribe "Done!"
}
```

### complex-condition

```faber
# Dum with compound conditions
#
# dum <cond1> et <cond2> { }   -- both must be true
# dum <cond1> aut <cond2> { }  -- either must be true

incipit {
    # Using "et" (and) - loop while running AND attempts < limit
    varia bivalens running = verum
    varia numerus attempts = 0

    dum running et attempts < 5 {
        scribe "Attempt:", attempts
        attempts = attempts + 1

        si attempts >= 3 {
            running = falsum
        }
    }

    # Using "aut" (or) - loop while either condition holds
    varia numerus a = 5
    varia numerus b = 3

    dum a > 0 aut b > 0 {
        scribe "a:", a, "b:", b
        a = a - 1
        b = b - 1
    }
}
```

## elige

### in-functio

```faber
# Elige with early returns in functions
#
# elige <expr> {
#     casu <value> { redde ... }
#     casu <value> { redde ... }
#     ceterum { redde ... }
# }

functio getGreeting(textus language) fit textus {
    elige language {
        casu "latin" {
            redde "Salve"
        }
        casu "english" {
            redde "Hello"
        }
        casu "spanish" {
            redde "Hola"
        }
        casu "french" {
            redde "Bonjour"
        }
    }

    redde "Hi"
}

functio getHttpMessage(numerus code) fit textus {
    elige code {
        casu 200 {
            redde "OK"
        }
        casu 201 {
            redde "Created"
        }
        casu 400 {
            redde "Bad Request"
        }
        casu 404 {
            redde "Not Found"
        }
        casu 500 {
            redde "Internal Server Error"
        }
    }

    redde "Unknown"
}

incipit {
    scribe getGreeting("latin")
    scribe getGreeting("spanish")
    scribe getGreeting("unknown")

    scribe getHttpMessage(200)
    scribe getHttpMessage(404)
    scribe getHttpMessage(999)
}
```

### with-aliter

```faber
# Elige with default case (ceterum)
#
# elige <expr> {
#     casu <value> { <body> }
#     ceterum { <default> }
# }

incipit ergo cura arena {
    # ceterum handles unmatched cases
    fixum day = "wednesday"

    elige day {
        casu "monday" {
            scribe "Start of week"
        }
        casu "friday" {
            scribe "End of week"
        }
        ceterum {
            scribe "Midweek"
        }
    }

    # ceterum with error handling
    fixum command = "unknown"

    elige command {
        casu "start" {
            scribe "Starting..."
        }
        casu "stop" {
            scribe "Stopping..."
        }
        casu "restart" {
            scribe "Restarting..."
        }
        ceterum {
            scribe "Unknown command"
        }
    }

    # Multiple statements in ceterum
    fixum level = 99

    elige level {
        casu 1 {
            scribe "Beginner"
        }
        casu 2 {
            scribe "Intermediate"
        }
        casu 3 {
            scribe "Advanced"
        }
        ceterum {
            scribe "Custom level"
            scribe scriptum("Level: §", level)
        }
    }
}
```

### with-reddit

```faber
# Elige with reddit syntax
#
# 'reddit' is syntactic sugar for 'ergo redde' - a one-liner return.
# Use it when each case simply returns a value.
#
# casu <value> reddit <expression>
# ceterum reddit <expression>

# HTTP status code lookup using reddit
functio getStatusText(numerus code) -> textus {
    elige code {
        casu 200 reddit "OK"
        casu 201 reddit "Created"
        casu 204 reddit "No Content"
        casu 400 reddit "Bad Request"
        casu 401 reddit "Unauthorized"
        casu 403 reddit "Forbidden"
        casu 404 reddit "Not Found"
        casu 500 reddit "Internal Server Error"
        casu 502 reddit "Bad Gateway"
        casu 503 reddit "Service Unavailable"
        ceterum reddit "Unknown Status"
    }
}

# Type mapping using reddit
functio getTypeCode(textus name) -> numerus {
    elige name {
        casu "textus" reddit 1
        casu "numerus" reddit 2
        casu "fractus" reddit 3
        casu "bivalens" reddit 4
        ceterum reddit 0
    }
}

# Mixed reddit and blocks
# Use reddit for simple returns, blocks for complex logic
functio processCode(numerus code) -> textus {
    elige code {
        casu 1 reddit "simple"
        casu 2 {
            scribe "Processing code 2..."
            redde "complex"
        }
        casu 3 reddit "also simple"
        ceterum reddit "default"
    }
}

incipit {
    scribe getStatusText(200)    # OK
    scribe getStatusText(404)    # Not Found
    scribe getStatusText(999)    # Unknown Status

    scribe getTypeCode("textus")   # 1
    scribe getTypeCode("unknown")  # 0

    scribe processCode(1)  # simple
    scribe processCode(2)  # Processing code 2... complex
}
```

### basic

```faber
# Basic elige (switch) statement
#
# elige <expr> {
#     casu <value> { <body> }
#     casu <value> { <body> }
#     ceterum { <body> }
# }

incipit {
    # String matching
    fixum status = "active"

    elige status {
        casu "pending" {
            scribe "Waiting..."
        }
        casu "active" {
            scribe "Running"
        }
        casu "done" {
            scribe "Completed"
        }
    }

    # Number matching
    fixum code = 200

    elige code {
        casu 200 {
            scribe "OK"
        }
        casu 404 {
            scribe "Not Found"
        }
        casu 500 {
            scribe "Server Error"
        }
    }

    # Multiple statements per case
    fixum mode = "production"

    elige mode {
        casu "development" {
            scribe "Dev mode enabled"
            scribe "Verbose logging on"
        }
        casu "production" {
            scribe "Production mode"
            scribe "Optimizations enabled"
        }
    }
}
```

## ex

### nested

```faber
# Nested ex...pro loops

incipit {
    # Nested array iteration
    fixum rows = [1, 2, 3]
    fixum cols = ["A", "B", "C"]

    ex rows pro row {
        ex cols pro col {
            scribe row, col
        }
    }

    # Multiplication table
    ex 1..4 pro i {
        ex 1..4 pro j {
            scribe i, "*", j, "=", i * j
        }
    }

    # Nested ranges
    ex 0..3 pro x {
        ex 0..3 pro y {
            scribe x, y
        }
    }
}
```

### in-functio

```faber
# Using ex...pro inside functions

# Sum all numbers in an array
functio sumArray(numerus[] nums) -> numerus {
    varia numerus total = 0

    ex nums pro n {
        total = total + n
    }

    redde total
}

# Find the maximum value
functio maxValue(numerus[] nums) -> numerus {
    varia numerus max = nums[0]

    ex nums pro n {
        si n > max {
            max = n
        }
    }

    redde max
}

# Count items matching a condition
functio countAbove(numerus[] nums, numerus threshold) -> numerus {
    varia numerus count = 0

    ex nums pro n {
        si n > threshold {
            count = count + 1
        }
    }

    redde count
}

incipit {
    fixum numbers = [1, 2, 3, 4, 5]

    scribe sumArray(numbers)
    scribe maxValue(numbers)
    scribe countAbove(numbers, 3)

    scribe sumArray([10, 20, 30])
    scribe maxValue([5, 12, 8, 20, 3])
}
```

### array

```faber
# Iterating over arrays with ex...pro
#
# ex <collection> pro <item> { <body> }

incipit {
    # Iterate over number array
    fixum numbers = [1, 2, 3, 4, 5]

    ex numbers pro n {
        scribe n
    }

    # Iterate over string array
    fixum names = ["Marcus", "Julia", "Claudia"]

    ex names pro name {
        scribe name
    }

    # Process items
    fixum values = [10, 20, 30]

    ex values pro v {
        fixum doubled = v * 2
        scribe doubled
    }
}
```

### fiunt-iteration

```faber
# Iterating over fiunt/fient function returns with ex...pro
#
# This demonstrates that fiunt/fient functions produce iterable results
# that can be consumed with ex...pro loops

# Multi-value sync function that yields values via cede
functio rangeSync(numerus n) fiunt numerus {
    ex 0..n pro i {
        cede i
    }
}

# Multi-value async function that yields values via cede
functio rangeAsync(numerus n) fient numerus {
    ex 0..n pro i {
        cede i
    }
}

incipit {
    # Iterate over sync fiunt function results
    scribe "Sync fiunt iteration:"
    ex rangeSync(3) pro num {
        scribe scriptum("  num: {num}")
    }

    # Collect all results from fiunt function
    varia syncResults = []
    ex rangeSync(5) pro num {
        syncResults.adde(num * 2)
    }
    scribe("Sync collected:")
    scribe(syncResults)

    # Note: Async iteration would require async context
    # ex rangeAsync(3) fiunt num {
    #     scribe num
    # }
}
```

### range-step

```faber
# Ranges with step using per
#
# ex <start>..<end> per <step> pro <item> { }
# ex <start> usque <end> per <step> pro <item> { }

incipit {
    # Step by 2 (exclusive: 0, 2, 4, 6, 8)
    ex 0..10 per 2 pro i {
        scribe i
    }

    # Step by 2 (inclusive: 0, 2, 4, 6, 8, 10)
    ex 0 usque 10 per 2 pro i {
        scribe i
    }

    # Step by 3
    ex 0..15 per 3 pro i {
        scribe i
    }

    # Countdown with negative step
    ex 10..0 per -1 pro i {
        scribe i
    }

    # Countdown by 2
    ex 10..0 per -2 pro i {
        scribe i
    }
}
```

*1 more examples in this category*

## expressions

### scriptum

```faber
# Format string expressions using scriptum()

incipit ergo cura arena {
    fixum name = "Marcus"
    fixum age = 30

    # Single placeholder
    fixum greeting = scriptum("Salve, §!", name)
    scribe greeting

    # Multiple placeholders
    fixum info = scriptum("§ is § years old", name, age)
    scribe info

    # With expression
    fixum calc = scriptum("10 + 20 = §", 10 + 20)
    scribe calc
}
```

### regex

```faber
# Regex literals using sed keyword
# Syntax: sed "pattern" [flags]

incipit {
    # Simple patterns
    fixum digits = sed "\d+"
    fixum word = sed "\w+"

    # With flags (i = case insensitive, m = multiline)
    fixum insensitive = sed "hello" i
    fixum multiline = sed "^start" im

    # Complex patterns
    fixum email = sed "[^@]+@[^@]+"
    fixum paths = sed "/usr/local/.*"
}
```

### qua

```faber
# Type casting with qua: converts values between types

functio getData() -> lista<numerus> {
    redde [1, 2, 3]
}

functio getResponse() -> objectum {
    redde { body: "body" }
}

functio getValue() -> numerus {
    redde 42
}

incipit {
    # Cast to string
    fixum data = 42
    fixum asText = data qua textus
    scribe asText

    # Cast to number
    fixum input = "100"
    fixum asNum = input qua numerus
    scribe asNum

    # Cast to boolean
    fixum value = 1
    fixum asBool = value qua bivalens
    scribe asBool

    # Cast to nullable type
    fixum num = 10
    fixum maybe = num qua numerus?
    scribe maybe

    # Cast to array type
    fixum raw = getData()
    fixum items = raw qua lista<textus>
    scribe items

    # Cast with member access
    fixum response = getResponse()
    fixum body = response.body qua textus
    scribe body

    # Cast call result directly
    fixum result = getValue() qua textus
    scribe result

    # Cast in parenthesized expression for chaining
    fixum len = (data qua textus).length
    scribe len
}
```

### literal

```faber
# Literal expressions: numbers, strings, booleans, null, templates

incipit {
    # Numbers
    fixum integer = 42
    fixum decimal = 3.14
    fixum negative = -100

    # Strings
    fixum greeting = "hello"
    fixum single = 'single quotes'

    # Booleans
    fixum yes = verum
    fixum no = falsum

    # Null
    fixum nothing = nihil

    # Template literals
    fixum name = "Mundus"
    fixum message = `Hello ${name}`
}
```

### ab

```faber
# Ab expression - collection filtering DSL
# 'ab' provides declarative filtering with optional transforms

incipit {
    # Sample data - users with boolean properties
    fixum users = [
        { nomen: "Marcus", activus: verum, aetas: 25 },
        { nomen: "Julia", activus: falsum, aetas: 30 },
        { nomen: "Gaius", activus: verum, aetas: 17 }
    ]

    fixum items = [
        { valor: 10, visibilis: verum },
        { valor: 20, visibilis: falsum },
        { valor: 30, visibilis: verum },
        { valor: 40, visibilis: verum }
    ]

    # Boolean property shorthand - filter where property is true
    fixum active = ab users activus
    scribe(active)

    # Negated filter - filter where property is false
    fixum inactive = ab users non activus
    scribe(inactive)

    # Filter with prima transform (first N elements)
    fixum top2 = ab items visibilis, prima 2
    scribe(top2)

    # Filter with ultima transform (last N elements)
    fixum last2 = ab items visibilis, ultima 2
    scribe(last2)

    # Filter with summa transform (sum of results)
    fixum prices = [
        { pretium: 100, validum: verum },
        { pretium: 200, validum: verum },
        { pretium: 50, validum: falsum }
    ]
    fixum validPrices = ab prices validum
    scribe(validPrices)

    # Multiple transforms chained
    fixum result = ab items visibilis, prima 3, ultima 2
    scribe(result)

    # Without filter - just apply transforms to collection
    fixum nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    fixum firstFive = ab nums, prima 5
    scribe(firstFive)

    # Chain transforms without filter
    fixum sumFirst = ab nums, prima 5, summa
    scribe(sumFirst)

    # Complex source - member expression
    fixum data = { users: users }
    fixum dataActive = ab data.users activus
    scribe(dataActive)
}
```

*14 more examples in this category*

## fac

### basic

```faber
# Basic fac (do) scope blocks
#
# fac { <body> }

incipit {
    # Simple scope block
    fac {
        fixum x = 42
        scribe x
    }

    # Scope block isolates variables
    fac {
        fixum message = "Hello from fac block"
        scribe message
    }

    # Multiple statements in scope
    fac {
        fixum a = 10
        fixum b = 20
        fixum sum = a + b
        scribe sum
    }
}
```

### with-cape

```faber
# Fac blocks with error handling (cape)
#
# fac { <body> } cape <error> { <handler> }

incipit {
    # Basic fac with cape for error handling
    fac {
        fixum x = 10
        scribe x
    } cape err {
        scribe err
    }

    # Scope block that might throw
    fac {
        fixum value = 42
        scribe value
    } cape error {
        scribe "Error occurred:"
        scribe error
    }
}
```

## functio

### optional

```faber
# Optional parameters with si and vel
#
# si marks a parameter as optional
# vel provides a default value
#
# GRAMMAR:
#   parameter := (preposition)? 'si'? type name ('ut' alias)? ('vel' default)?

# Optional parameter without default (receives nihil if omitted)
functio greet(textus nomen, si textus titulus) -> textus {
    si titulus est nihil {
        redde scriptum("Salve, §!", nomen)
    }
    redde scriptum("Salve, § §!", titulus, nomen)
}

# Optional parameter with default value
functio paginate(si numerus pagina vel 1, si numerus per_pagina vel 10) -> textus {
    redde scriptum("Page § with § items", pagina, per_pagina)
}

# Preposition with optional: de si (borrowed, optional without default)
functio analyze(textus source, de si numerus depth) -> numerus {
    si depth est nihil {
        redde 3
    }
    redde depth
}

# Mixed required and optional parameters
functio createUser(textus nomen, si numerus aetas vel 0, si bivalens activus vel verum) -> textus {
    redde scriptum("User: §, age: §, active: §", nomen, aetas, activus)
}

incipit {
    # Without optional arg
    scribe greet("Marcus")

    # With optional arg
    scribe greet("Marcus", "Dominus")

    # Default pagination
    scribe paginate()

    # Custom pagination
    scribe paginate(2, 25)

    # Partial defaults
    scribe paginate(5)

    # With borrowed optional
    scribe analyze("code")
    scribe analyze("code", 5)

    # Mixed args
    scribe createUser("Julia")
    scribe createUser("Julia", 25)
    scribe createUser("Julia", 25, falsum)
}
```

### basic

```faber
# Basic function declarations
#
# functio <name>() { <body> }
# functio <name>() -> <type> { <body> }

# Function with no parameters, no return
functio saluta() {
    scribe "Salve, Mundus!"
}

# Function with parameter, no explicit return type
functio dic(verbum) {
    scribe verbum
}

# Function with return type
functio nomen() -> textus {
    redde "Marcus Aurelius"
}

# Function with parameter and return type
functio duplica(n) -> numerus {
    redde n * 2
}

incipit {
    saluta()

    dic("Bonum diem!")

    fixum rex = nomen()
    scribe rex

    scribe duplica(21)
}
```

### recursion

```faber
# Recursive functions
#
# Functions that call themselves with a base case

# Factorial: n! = n * (n-1)!
functio factorial(numerus n) -> numerus {
    si n <= 1 {
        redde 1
    }
    redde n * factorial(n - 1)
}

# Fibonacci: fib(n) = fib(n-1) + fib(n-2)
functio fibonacci(numerus n) -> numerus {
    si n <= 0 {
        redde 0
    }
    si n == 1 {
        redde 1
    }
    redde fibonacci(n - 1) + fibonacci(n - 2)
}

# Sum from 1 to n
functio summatio(numerus n) -> numerus {
    si n <= 0 {
        redde 0
    }
    redde n + summatio(n - 1)
}

incipit {
    # Factorial examples
    scribe factorial(0)
    scribe factorial(1)
    scribe factorial(5)
    scribe factorial(10)

    # Fibonacci examples
    scribe fibonacci(0)
    scribe fibonacci(1)
    scribe fibonacci(10)

    # Sum examples
    scribe summatio(5)
    scribe summatio(10)
}
```

### typed

```faber
# Functions with typed parameters
#
# functio <name>(type param, type param) -> type { <body> }

# Single typed parameter
functio quadratum(numerus n) -> numerus {
    redde n * n
}

# Multiple typed parameters
functio adde(numerus a, numerus b) -> numerus {
    redde a + b
}

# Mixed types
functio describe(textus nomen, numerus aetas) -> textus {
    redde scriptum("§ habet § annos", nomen, aetas)
}

# Boolean parameter and return
functio nega(bivalens valor) -> bivalens {
    redde non valor
}

# Function with fractus (float) type
functio media(fractus a, fractus b) -> fractus {
    redde (a + b) / 2.0
}

incipit {
    scribe quadratum(7)

    scribe adde(100, 200)

    scribe describe("Julius", 30)

    scribe nega(verum)
    scribe nega(falsum)

    scribe media(3.0, 7.0)
}
```

## genus

### basic

```faber
# Basic genus (class/struct) with properties
#
# genus <Name> {
#     <type> <property>
#     <type> <property>: <default>
# }

genus Punctum {
    numerus x
    numerus y
}

genus Persona {
    textus nomen
    numerus aetas: 0
    bivalens activus: verum
}

incipit {
    # Instantiate with all required fields
    fixum p = novum Punctum {
        x: 10,
        y: 20
    }

    scribe p.x
    scribe p.y

    # Instantiate with required + optional defaults
    fixum marcus = novum Persona {
        nomen: "Marcus"
    }

    scribe marcus.nomen
    scribe marcus.aetas
    scribe marcus.activus

    # Override defaults
    fixum julia = novum Persona {
        nomen: "Julia",
        aetas: 25,
        activus: falsum
    }

    scribe julia.nomen
    scribe julia.aetas
    scribe julia.activus
}
```

### methods

```faber
# Genus with methods using ego (self) reference
#
# genus <Name> {
#     <type> <property>
#     functio <method>() -> <type> { ... ego.<property> ... }
# }

genus Rectangle {
    numerus width: 1
    numerus height: 1

    functio area() -> numerus {
        redde ego.width * ego.height
    }

    functio perimeter() -> numerus {
        redde 2 * (ego.width + ego.height)
    }

    functio isSquare() -> bivalens {
        redde ego.width == ego.height
    }
}

genus Counter {
    numerus count: 0

    functio increment() {
        ego.count = ego.count + 1
    }

    functio getValue() -> numerus {
        redde ego.count
    }
}

incipit {
    # Methods that return values
    fixum rect = novum Rectangle {
        width: 10,
        height: 5
    }

    scribe rect.area()
    scribe rect.perimeter()
    scribe rect.isSquare()

    # Methods that modify state
    varia counter = novum Counter

    scribe counter.getValue()

    counter.increment()
    scribe counter.getValue()

    counter.increment()
    counter.increment()
    scribe counter.getValue()
}
```

### creo

```faber
# Genus with constructor hook (creo)
#
# genus <Name> {
#     <type> <property>: <default>
#     functio creo() { ... }
# }
#
# creo() runs after defaults and overrides are merged.
# Use for validation, clamping, or derived initialization.

genus BoundedValue {
    numerus value: 0

    functio creo() {
        si ego.value < 0 {
            ego.value = 0
        }

        si ego.value > 100 {
            ego.value = 100
        }
    }

    functio getValue() -> numerus {
        redde ego.value
    }
}

genus Circle {
    numerus radius: 1
    numerus diameter: 0
    numerus area: 0

    functio creo() {
        ego.diameter = ego.radius * 2
        ego.area = 3.14159 * ego.radius * ego.radius
    }
}

incipit {
    # Validation in creo
    fixum normal = novum BoundedValue {
        value: 50
    }

    scribe normal.getValue()

    fixum clamped = novum BoundedValue {
        value: 200
    }

    scribe clamped.getValue()

    # Derived initialization in creo
    fixum c = novum Circle {
        radius: 5
    }

    scribe c.radius
    scribe c.diameter
    scribe c.area
}
```

## iace

### basic

```faber
# Basic iace (throw) statement
#
# iace <expression>

incipit {
    # Throw with string literal
    tempta {
        iace "Something went wrong"
    }
    cape err {
        scribe "Caught:", err
    }

    # Throw with formatted message
    fixum code = 404
    tempta {
        iace scriptum("Error code: §", code)
    }
    cape err {
        scribe "Caught:", err
    }

    # Throw from conditional
    fixum value = -5
    tempta {
        si value < 0 {
            iace "Value must be non-negative"
        }
        scribe "Value is valid"
    }
    cape err {
        scribe "Validation failed:", err
    }
}
```

## importa

### basic

```faber
# Import statements (importa)
#
# ex <source> importa <names>           - named imports
# ex <source> importa <name> ut <alias> - import with alias
# ex <source> importa * ut <alias>      - wildcard import with alias

# Named imports
ex "lodash" importa map
ex "@hono/hono" importa Hono, Context
ex "utils" importa helper ut h
ex "db" importa connect, query ut q, close

# Wildcard import (alias required for TypeScript target)
ex "@std/crypto" importa * ut crypto

# Multiple imports from different sources
ex "@oak/oak" importa Application
ex "std/path" importa join, resolve

# Relative imports
ex "./utils" importa helper
ex "../shared/utils" importa formatter

# Many named items
ex "helpers" importa a, b, c, d, e, f

# Multiple aliases
ex "mod" importa foo ut f, bar ut b, baz ut z

incipit {
    scribe "Import statements are declarations at module scope"
}
```

## importa-local

### main

```faber
# Example of local file imports

# Import specific symbols from local file
ex "./utils" importa greet, ANSWER, Point

# Use the imported function
fixum textus message = greet("World")
scribe message

# Use the imported constant
scribe scriptum("The answer is §", ANSWER)

# Use the imported genus
fixum Point p = { x: 10, y: 20 } qua Point
```

### utils

```faber
# Example utility module for local import testing

# A simple greeting function
functio greet(textus name) -> textus {
    redde scriptum("Hello, §!", name)
}

# A constant value
fixum numerus ANSWER = 42

# A genus for testing
genus Point {
    numerus x
    numerus y
}
```

## in

### basic

```faber
# Basic in (mutation block) statements
#
# in <object> { <assignments> }

incipit {
    # Create an object with initial values
    varia user = { nomen: "", aetas: 0, active: falsum }

    # Mutation block: set multiple fields at once
    in user {
        nomen = "Marcus"
        aetas = 42
        active = verum
    }

    scribe user.nomen
    scribe user.aetas

    # Single-line mutation block
    varia stats = { count: 0 }
    in stats { count = 1 }

    scribe stats.count

    # Mutation with computed values
    fixum width = 10
    fixum height = 20
    varia rect = { w: 0, h: 0, area: 0 }

    in rect {
        w = width
        h = height
        area = width * height
    }

    scribe rect.area

    # Nested object mutation
    varia config = { server: { host: "", port: 0 } }

    in config.server {
        host = "localhost"
        port = 8080
    }

    scribe config.server.host
}
```

## incipit

### basic

```faber
# Basic incipit (entry point)
#
# incipit { <body> }

incipit {
    scribe "Salve, Munde!"
}
```

### with-functions

```faber
# Entry point with functions defined outside
#
# Functions declared outside incipit become module-level declarations.
# The incipit block calls them as needed.

functio greet(textus name) -> textus {
    redde scriptum("Salve, §!", name)
}

functio add(numerus a, numerus b) -> numerus {
    redde a + b
}

incipit {
    scribe greet("Marcus")
    scribe "Sum:", add(3, 5)
}
```

## ordo

### basic

```faber
# Basic ordo (enum) declaration
#
# ordo Name { Member1, Member2, Member3 }
# ordo Name { Member1 = value1, Member2 = value2 }

ordo Color { rubrum, viridis, caeruleum }

ordo Status { pendens = 0, actum = 1, finitum = 2 }

incipit {
    # Using enum values
    fixum color = Color.rubrum
    fixum status = Status.actum

    # Switch on enum
    elige color {
        casu Color.rubrum {
            scribe "Red"
        }
        casu Color.viridis {
            scribe "Green"
        }
        casu Color.caeruleum {
            scribe "Blue"
        }
    }

    # Switch on enum with numeric values
    elige status {
        casu Status.pendens {
            scribe "Pending"
        }
        casu Status.actum {
            scribe "Active"
        }
        casu Status.finitum {
            scribe "Finished"
        }
    }
}
```

## pactum

### basic

```faber
# Basic pactum (interface) definition and implementation
#
# pactum <Name> { functio <method>(<params>) -> <returnType> }
# genus <Name> implet <Pactum> { <implementation> }

pactum Drawable {
    functio draw() -> vacuum
}

genus Circle implet Drawable {
    numerus radius: 10

    functio draw() {
        scribe scriptum("Drawing circle with radius §", ego.radius)
    }
}

genus Square implet Drawable {
    numerus side: 5

    functio draw() {
        scribe scriptum("Drawing square with side §", ego.side)
    }
}

incipit {
    fixum circle = novum Circle { radius: 25 }
    fixum square = novum Square { side: 15 }

    circle.draw()
    square.draw()
}
```

## perge

### basic

```faber
# Continue (perge) in loops
#
# perge skips to the next iteration of the innermost loop

incipit ergo cura arena {
    # Skip even numbers
    varia i = 0

    dum i < 10 {
        i = i + 1

        si i % 2 == 0 {
            perge
        }

        scribe i
    }

    # Continue in nested loop (affects inner only)
    varia outer = 0

    dum outer < 3 {
        varia inner = 0

        dum inner < 5 {
            inner = inner + 1

            si inner == 3 {
                perge
            }

            scribe scriptum("outer=§, inner=§", outer, inner)
        }

        outer = outer + 1
    }
}
```

## proba

### basic

```faber
# Basic proba (test) statements
#
# proba "name" { body }

# Simple test with single assertion
proba "one plus one equals two" {
    adfirma 1 + 1 == 2
}

# Test with multiple assertions
proba "validates arithmetic" {
    adfirma 2 + 2 == 4
    adfirma 10 - 3 == 7
    adfirma 3 * 4 == 12
}

# Test with variables
proba "string concatenation works" {
    fixum greeting = "hello"
    fixum name = "world"
    fixum result = scriptum("§ §", greeting, name)
    adfirma result == "hello world"
}

# Test boolean conditions
proba "comparison operators" {
    fixum x = 10
    adfirma x > 5
    adfirma x < 20
    adfirma x >= 10
    adfirma x <= 10
}

# Test with negation
proba "negated assertions" {
    adfirma non falsum
    adfirma non (1 == 2)
}

# Test with complex logical assertion
proba "complex assertion" {
    fixum x = 50
    adfirma x > 0 et x < 100
}
```

### modifiers

```faber
# Test modifiers: omitte (skip) and futurum (todo)
#
# proba omitte "reason" "name" { body }
# proba futurum "reason" "name" { body }

# Skip a test with reason and name
proba omitte "blocked by issue #42" "database connection test" {
    adfirma falsum
}

# Todo test with reason and name
proba futurum "needs async support" "async file operations" {
    adfirma verum
}

# Regular test alongside modifiers
proba "this test runs normally" {
    adfirma 1 + 1 == 2
}

# Multiple skipped tests
proba omitte "flaky on CI" "network timeout test" {
    adfirma falsum
}

proba omitte "platform specific" "windows-only behavior" {
    adfirma falsum
}

# Multiple todo tests
proba futurum "needs new API" "graphql mutations" {
    adfirma verum
}

proba futurum "depends on feature X" "caching layer" {
    adfirma verum
}

# Skipped test with complex body
proba omitte "external service down" "api integration" {
    fixum status = 500
    adfirma status == 200
}

# Todo test with setup
proba futurum "needs database fixtures" "user creation flow" {
    varia userId = 0
    adfirma userId > 0
}
```

## redde

### basic

```faber
# Basic redde (return) statements
#
# redde <expression>   -- return a value
# redde                -- void return

functio add(numerus a, numerus b) fit numerus {
    redde a + b
}

functio greet(textus name) fit textus {
    redde "Hello, " + name
}

functio getFortyTwo() fit numerus {
    redde 42
}

functio doNothing() fit vacuum {
    redde
}

functio earlyExit(numerus x) fit numerus {
    si x < 0 {
        redde 0
    }
    redde x * 2
}

incipit {
    scribe add(10, 20)
    scribe greet("World")
    scribe getFortyTwo()
    doNothing()
    scribe earlyExit(-5)
    scribe earlyExit(10)
}
```

## rumpe

### basic

```faber
# Break (rumpe) in loops
#
# rumpe exits the innermost loop immediately

incipit ergo cura arena {
    # Break when reaching 5
    varia i = 0

    dum i < 10 {
        si i == 5 {
            rumpe
        }
        scribe i
        i = i + 1
    }

    # Break in nested loop (exits inner only)
    varia outer = 0

    dum outer < 3 {
        varia inner = 0

        dum inner < 10 {
            si inner == 2 {
                rumpe
            }
            scribe scriptum("outer=§, inner=§", outer, inner)
            inner = inner + 1
        }

        outer = outer + 1
    }
}
```

## scribe

### levels

```faber
# Output statements with different log levels
#
# scribe <expr>  -> console.log (standard output)
# vide <expr>    -> console.debug (debug output)
# mone <expr>    -> console.warn (warning output)

incipit {
    fixum status = "running"
    fixum count = 42

    # Standard output (console.log)
    scribe "Application started"
    scribe "Status:", status

    # Debug output (console.debug)
    vide "Debug: entering main loop"
    vide "Debug: count =", count

    # Warning output (console.warn)
    mone "Warning: deprecated feature used"
    mone "Warning: count exceeds threshold:", count
}
```

### basic

```faber
# Basic scribe (print) statements
#
# scribe <expr>
# scribe <expr>, <expr>, ...

incipit {
    # Simple string output
    scribe "Hello, world!"

    # Variable output
    fixum nomen = "Marcus"
    scribe nomen

    # Multiple arguments
    fixum aetas = 30
    scribe "Name:", nomen
    scribe "Age:", aetas

    # Expressions
    fixum x = 10
    fixum y = 20
    scribe "Sum:", x + y

    # Multiple values in one statement
    scribe "Coordinates:", x, y
}
```

## si

### nested

```faber
# Nested si conditionals

incipit {
    fixum isLoggedIn = verum
    fixum hasPermission = verum

    si isLoggedIn {
        si hasPermission {
            scribe "Access granted"
        }
        secus {
            scribe "Permission denied"
        }
    }
    secus {
        scribe "Please log in"
    }
}
```

### with-reddit

```faber
# Si with reddit syntax
#
# 'reddit' is syntactic sugar for 'ergo redde' - a one-liner return.
# Use it for early returns and guard clauses.
#
# si <condition> reddit <expression>
# sin <condition> reddit <expression>
# secus reddit <expression>

# Early return pattern
functio classify(numerus x) -> textus {
    si x < 0 reddit "negative"
    si x == 0 reddit "zero"
    redde "positive"
}

# Guard clause pattern
functio divide(numerus a, numerus b) -> numerus? {
    si b == 0 reddit nihil
    redde a / b
}

# Sin/secus chain with reddit
functio grade(numerus score) -> textus {
    si score >= 90 reddit "A"
    sin score >= 80 reddit "B"
    sin score >= 70 reddit "C"
    sin score >= 60 reddit "D"
    secus reddit "F"
}

# Find first in list (early return from loop)
functio findFirst(lista<numerus> items, numerus target) -> numerus? {
    ex items pro item {
        si item == target reddit item
    }
    redde nihil
}

# Check if key exists (early return from iteration)
functio hasKey(tabula<textus, numerus> obj, textus key) -> bivalens {
    de obj pro k {
        si k == key reddit verum
    }
    redde falsum
}

incipit {
    scribe classify(-5)   # negative
    scribe classify(0)    # zero
    scribe classify(10)   # positive

    scribe divide(10, 2)  # 5
    scribe divide(10, 0)  # nihil

    scribe grade(95)  # A
    scribe grade(85)  # B
    scribe grade(55)  # F

    fixum nums = [1, 2, 3, 4, 5]
    scribe findFirst(nums, 3)  # 3
    scribe findFirst(nums, 9)  # nihil
}
```

### si-aliter

```faber
# si-secus (if-else) conditionals
#
# si <condition> { <body> } secus { <body> }
# si <cond1> { } sin <cond2> { } secus { }

incipit {
    # Simple if-else
    fixum score = 85

    si score >= 90 {
        scribe "Grade: A"
    }
    secus {
        scribe "Grade: B or lower"
    }

    # Multiple statements in branches
    fixum temperature = 22

    si temperature > 30 {
        scribe "Hot"
        scribe "Stay hydrated"
    }
    secus {
        scribe "Comfortable"
        scribe "Enjoy the weather"
    }

    # If-else-if chain
    fixum grade = 75

    si grade >= 90 {
        scribe "A - Excellent"
    }
    sin grade >= 80 {
        scribe "B - Good"
    }
    sin grade >= 70 {
        scribe "C - Satisfactory"
    }
    sin grade >= 60 {
        scribe "D - Passing"
    }
    secus {
        scribe "F - Failing"
    }
}
```

### ergo

```faber
# One-liner conditionals with ergo
#
# si <condition> ergo <statement>
# si <condition> ergo <statement> secus <statement>
#
# ergo = "therefore, thus" (logical consequence)

incipit {
    fixum x = 10

    # Simple one-liner
    si x > 5 ergo scribe "x is big"

    # One-liner if-else
    fixum age = 25
    si age >= 18 ergo scribe "Adult" secus scribe "Minor"

    # Multiple conditions
    fixum score = 85
    si score >= 90 ergo scribe "A" secus scribe "Not A"

    # Simple validation
    fixum valid = verum
    si valid ergo scribe "OK"
}
```

### si-sin-secus

```faber
# si-sin-secus (poetic if-else-if chain)
#
# Poetic alternative to si/sin/secus:
#   si   = if
#   sin  = else if ("but if")
#   secus = else ("otherwise")

incipit {
    fixum hour = 14

    si hour < 6 {
        scribe "Late night"
    }
    sin hour < 12 {
        scribe "Morning"
    }
    sin hour < 18 {
        scribe "Afternoon"
    }
    sin hour < 22 {
        scribe "Evening"
    }
    secus {
        scribe "Night"
    }
}
```

*2 more examples in this category*

## statements

### si

```faber
# ============================================================================
# Si Statement (Conditionals)
# ============================================================================
#
# The 'si' statement provides conditional execution. It supports block form,
# one-liner form (ergo), else-if chains (sin), else clauses (secus), and
# inline error handling (cape).
#
# ----------------------------------------------------------------------------
# GRAMMAR: Si Statement
# ----------------------------------------------------------------------------
#
#   ifStmt := 'si' expression (blockStmt | 'ergo' statement)
#             ('cape' IDENTIFIER blockStmt)?
#             (elseClause | 'sin' ifStmt)?
#
#   elseClause := 'secus' (ifStmt | blockStmt | statement)
#
# Components:
#   - 'si' expression { }        — basic conditional
#   - 'si' expression ergo stmt  — one-liner form
#   - 'cape' err { }             — inline error handling
#   - 'sin' expression { }       — else-if branch
#   - 'secus' { }                — else branch
#
# ----------------------------------------------------------------------------
# KEYWORDS
# ----------------------------------------------------------------------------
#
#   si     = "if" (Latin: "if")
#   sin    = "else if" (Latin: "but if", contraction of 'si' + 'non')
#   secus  = "else" (Latin: "otherwise")
#   ergo   = "therefore" (Latin: enables one-liner consequent)
#   cape   = "catch" (Latin: "seize", inline error handling)
#
# ----------------------------------------------------------------------------
# READING THE CHAIN
# ----------------------------------------------------------------------------
#
# A complete conditional chain reads as classical Latin:
#
#   si x > 0 { positive() }      — "if x > 0..."
#   sin x < 0 { negative() }     — "but if x < 0..."
#   secus { zero() }             — "otherwise..."
#
# 'sin' is a contraction of 'si non' (if not / but if), common in Latin prose.
#
# ============================================================================
# LLM GUIDANCE
# ============================================================================
#
# ALWAYS use Latin keywords:
#   - 'si' not 'if'
#   - 'sin' not 'else if' or 'elif'
#   - 'secus' not 'else'
#   - 'ergo' for one-liners (no equivalent in JS/TS)
#
# NEVER use JavaScript/TypeScript patterns:
#   - 'if' does not exist
#   - 'else if' does not exist — use 'sin'
#   - 'else' does not exist — use 'secus'
#   - Parentheses around condition are NOT required: si x > 5 { }
#
# PREFER:
#   - Block form for multiple statements
#   - 'ergo' form for simple one-liners
#   - 'sin' chains over nested 'si' when checking related conditions
#
# ============================================================================
# EXAMPLES
# ============================================================================

incipit {
    # ==========================================================================
    # SECTION: Basic Conditionals
    # ==========================================================================
    #
    # si <condition> { <body> }
    #
    # The simplest form. Condition is evaluated, block executes if truthy.
    # No parentheses required around the condition.

    fixum x = 10

    si x > 5 {
        scribe "x is greater than 5"
    }

    si x > 20 {
        scribe "x is greater than 20"
    }

    # Multiple statements in block
    fixum age = 25

    si age >= 18 {
        scribe "Adult"
        scribe "Can vote"
    }

    # ==========================================================================
    # SECTION: One-liner Form (ergo)
    # ==========================================================================
    #
    # si <condition> ergo <statement>
    # si <condition> ergo <statement> secus <statement>
    #
    # 'ergo' (therefore) enables concise single-statement consequents.
    # Can be combined with 'secus' for one-liner if-else.

    # Simple one-liner
    si x > 5 ergo scribe "x is big"

    # One-liner if-else
    si age >= 18 ergo scribe "Adult" secus scribe "Minor"

    # Multiple conditions with ergo
    fixum score = 85
    si score >= 90 ergo scribe "A" secus scribe "Not A"

    # Simple validation
    fixum valid = verum
    si valid ergo scribe "OK"

    # ==========================================================================
    # SECTION: If-Else (secus)
    # ==========================================================================
    #
    # si <condition> { } secus { }
    #
    # 'secus' (otherwise) provides the else branch.

    si score >= 90 {
        scribe "Grade: A"
    }
    secus {
        scribe "Grade: B or lower"
    }

    # Multiple statements in branches
    fixum temperature = 22

    si temperature > 30 {
        scribe "Hot"
        scribe "Stay hydrated"
    }
    secus {
        scribe "Comfortable"
        scribe "Enjoy the weather"
    }

    # ==========================================================================
    # SECTION: If-Elseif-Else Chain (sin/secus)
    # ==========================================================================
    #
    # si <cond1> { } sin <cond2> { } sin <cond3> { } secus { }
    #
    # 'sin' (but if) chains multiple conditions. More readable than nested si.
    # Evaluates top-to-bottom, first match wins.

    fixum grade = 75

    si grade >= 90 {
        scribe "A - Excellent"
    }
    sin grade >= 80 {
        scribe "B - Good"
    }
    sin grade >= 70 {
        scribe "C - Satisfactory"
    }
    sin grade >= 60 {
        scribe "D - Passing"
    }
    secus {
        scribe "F - Failing"
    }

    # Time of day example
    fixum hour = 14

    si hour < 6 {
        scribe "Late night"
    }
    sin hour < 12 {
        scribe "Morning"
    }
    sin hour < 18 {
        scribe "Afternoon"
    }
    sin hour < 22 {
        scribe "Evening"
    }
    secus {
        scribe "Night"
    }

    # ==========================================================================
    # SECTION: Type Checking (est / non est)
    # ==========================================================================
    #
    # 'est' performs type/identity checks (like === for primitives).
    # 'non est' negates the check.
    # For null checks, prefer 'nihil x' or 'nonnihil x' unary forms.

    fixum textus? maybeName = nihil

    si maybeName est nihil {
        scribe "Name is null"
    }

    fixum active = verum

    si verum active {
        scribe "Is exactly true"
    }

    si non falsum active {
        scribe "Is not false"
    }

    # ==========================================================================
    # SECTION: Nested Conditionals
    # ==========================================================================
    #
    # Conditionals can be nested, but prefer sin chains when checking
    # related conditions to reduce nesting depth.

    fixum isLoggedIn = verum
    fixum hasPermission = verum

    si isLoggedIn {
        si hasPermission {
            scribe "Access granted"
        }
        secus {
            scribe "Permission denied"
        }
    }
    secus {
        scribe "Please log in"
    }

    # Better: use 'et' to combine conditions when possible
    si isLoggedIn et hasPermission {
        scribe "Access granted (combined check)"
    }

    # ==========================================================================
    # SECTION: Inline Error Handling (cape)
    # ==========================================================================
    #
    # si <condition> { } cape <error> { }
    #
    # 'cape' (catch/seize) provides inline error handling for expressions
    # that might throw. The error is bound to the identifier.

    si riskyOperation() {
        scribe "Operation succeeded"
    }
    cape err {
        scribe "Operation failed"
        scribe err
    }

    # Combined with else
    si anotherRiskyOp() {
        scribe "Success"
    }
    cape err {
        scribe "Caught error"
    }
    secus {
        scribe "Condition was falsy but no error"
    }

    # ==========================================================================
    # SECTION: Unary Condition Operators
    # ==========================================================================
    #
    # Faber provides Latin unary operators for common condition patterns.
    # These read more naturally and reduce symbolic noise.
    #
    # GRAMMAR (from unary):
    #   unary := ('non' | 'nulla' | 'nonnulla' | 'nihil' | 'nonnihil'
    #           | 'negativum' | 'positivum' | ...) unary
    #
    # Operators:
    #   non x       — logical not (replaces !x)
    #   nihil x     — x is null (replaces x === null)
    #   nonnihil x  — x is not null (replaces x !== null)
    #   nulla x     — x is empty/none (empty string, empty list, 0)
    #   nonnulla x  — x is non-empty/some
    #   negativum x — x < 0
    #   positivum x — x > 0

    fixum value = 42

    # Numeric sign checks
    si positivum value {
        scribe "value is positive"
    }

    si negativum value {
        scribe "value is negative"
    }

    # Compare: si value > 0 vs si positivum value
    # The unary form is more declarative

    # Null checks
    fixum textus? optionalName = nihil

    si nihil optionalName {
        scribe "name is null"
    }

    si nonnihil optionalName {
        scribe "name has a value"
    }

    # Empty checks
    fixum items = [] qua lista<numerus>

    si nulla items {
        scribe "list is empty"
    }

    fixum message = "hello"

    si nonnulla message {
        scribe "message is not empty"
    }

    # ==========================================================================
    # SECTION: Logical Operators in Conditions
    # ==========================================================================
    #
    # Use 'et' (and), 'aut' (or), 'non' (not) in conditions.
    # PREFER Latin operators over && || !

    fixum a = verum
    fixum b = falsum

    si a et b {
        scribe "Both true"
    }

    si a aut b {
        scribe "At least one true"
    }

    si non b {
        scribe "b is false"
    }

    # Combined conditions
    fixum userAge = 25
    fixum hasID = verum

    si userAge >= 21 et hasID {
        scribe "Can purchase alcohol"
    }

    si userAge < 13 aut userAge >= 65 {
        scribe "Eligible for discount"
    }
}

# ==========================================================================
# Helper functions for error handling examples
# ==========================================================================

functio riskyOperation() -> bivalens {
    redde verum
}

functio anotherRiskyOp() -> bivalens {
    redde falsum
}
```

## tempta-cape

### in-functio

```faber
# Error handling in functions
#
# Functions can use tempta-cape to handle errors internally
# or let errors propagate to callers

functio safeDivide(numerus a, numerus b) -> numerus {
    tempta {
        si b == 0 {
            iace "Division by zero"
        }
        redde a / b
    }
    cape err {
        scribe "Error:", err
        redde 0
    }
}

functio validatePositive(numerus value) -> numerus {
    tempta {
        si value < 0 {
            iace "Negative value not allowed"
        }
        redde value * 2
    }
    cape err {
        scribe "Validation failed:", err
        redde 0
    }
}

functio processWithCleanup(textus name) {
    varia resource = "pending"

    tempta {
        scribe "Opening:", name
        resource = name

        si name == "" {
            iace "Empty name"
        }

        scribe "Processing:", resource
    }
    cape err {
        scribe "Error:", err
    }
    demum {
        scribe "Closing:", resource
    }
}

functio withReturnInDemum() -> textus {
    tempta {
        scribe "Starting operation"
        redde "success"
    }
    cape err {
        redde "error"
    }
    demum {
        scribe "Demum runs before return"
    }
}

incipit {
    scribe "Safe divide 10/2:", safeDivide(10, 2)
    scribe "Safe divide 10/0:", safeDivide(10, 0)

    scribe "Validate 5:", validatePositive(5)
    scribe "Validate -3:", validatePositive(-3)

    processWithCleanup("data.txt")
    processWithCleanup("")

    scribe "Result:", withReturnInDemum()
}
```

### basic

```faber
# Basic tempta-cape (try-catch) with iace (throw)
#
# tempta { <body> }
# cape <errorName> { <handler> }
# iace <expression>

incipit {
    # Basic try-catch
    tempta {
        scribe "Attempting operation..."
        iace "Something went wrong"
        scribe "This line never runs"
    }
    cape err {
        scribe "Caught error:", err
    }

    # tempta-cape-demum (try-catch-finally)
    tempta {
        scribe "Opening resource..."
        iace "Failed to open"
    }
    cape err {
        scribe "Error occurred:", err
    }
    demum {
        scribe "Cleanup: always runs"
    }

    # demum without cape
    tempta {
        scribe "Operation succeeds"
    }
    demum {
        scribe "Cleanup runs anyway"
    }

    # Nested tempta blocks
    tempta {
        scribe "Outer try"

        tempta {
            scribe "Inner try"
            iace "Inner error"
        }
        cape inner {
            scribe "Caught inner:", inner
        }

        scribe "Continues after inner catch"
    }
    cape outer {
        scribe "Outer catch:", outer
    }
}
```

## typealias

### basic

```faber
# Basic type aliases
#
# typus Name = Type

# Primitive type aliases
typus UserId = numerus
typus Username = textus
typus IsActive = bivalens

# Generic type aliases
typus Names = lista<textus>
typus Scores = lista<numerus>
typus UserCache = tabula<textus, numerus>

# Nullable type alias
typus OptionalName = textus?

incipit {
    # Using the type aliases
    fixum UserId id = 42
    fixum Username name = "Marcus"
    fixum IsActive active = verum

    scribe id
    scribe name
    scribe active

    # Using generic type aliases
    fixum Names friends = ["Gaius", "Lucius", "Titus"]
    scribe friends

    fixum Scores points = [100, 95, 87]
    scribe points
}
```

## varia

### destructure

```faber
# Array destructuring declarations
#
# fixum [a, b, c] = array   -- destructure into immutable bindings
# varia [x, y, z] = array   -- destructure into mutable bindings

incipit {
    # Basic array destructuring
    fixum numbers = [1, 2, 3]
    fixum [a, b, c] = numbers

    scribe a
    scribe b
    scribe c

    # Destructure inline array
    fixum [first, second, third] = [10, 20, 30]

    scribe first
    scribe second
    scribe third

    # Mutable destructuring
    fixum coords = [100, 200]
    varia [x, y] = coords

    scribe x
    scribe y

    x = x + 50
    y = y + 50

    scribe x
    scribe y

    # Destructure with fewer variables (partial)
    fixum values = [1, 2, 3, 4, 5]
    fixum [one, two] = values

    scribe one
    scribe two

    # Nested arrays
    fixum matrix = [[1, 2], [3, 4]]
    fixum [row1, row2] = matrix

    scribe row1
    scribe row2
}
```

### basic

```faber
# Basic varia and fixum declarations
#
# varia <name> = <expr>   -- mutable binding
# fixum <name> = <expr>   -- immutable binding

incipit {
    # Mutable variable with varia
    varia counter = 0
    scribe counter

    counter = 1
    scribe counter

    counter = counter + 10
    scribe counter

    # Immutable variable with fixum
    fixum greeting = "Salve, Mundus!"
    scribe greeting

    # Multiple declarations
    fixum x = 10
    fixum y = 20
    fixum sum = x + y
    scribe sum

    # Mutable reassignment
    varia message = "Hello"
    message = "Goodbye"
    scribe message
}
```

### typed

```faber
# Typed variable declarations
#
# varia <type> <name> = <expr>   -- typed mutable
# fixum <type> <name> = <expr>   -- typed immutable

incipit {
    # Typed immutable declarations
    fixum numerus age = 30
    fixum textus name = "Marcus"
    fixum bivalens active = verum

    scribe age
    scribe name
    scribe active

    # Typed mutable declarations
    varia numerus count = 0
    varia textus status = "pending"
    varia bivalens running = falsum

    scribe count
    scribe status
    scribe running

    # Reassign mutable typed variables
    count = 100
    status = "complete"
    running = verum

    scribe count
    scribe status
    scribe running

    # Fractional numbers
    fixum fractus pi = 3.14159
    varia fractus rate = 0.05

    scribe pi
    scribe rate

    rate = 0.10
    scribe rate
}
```



---

# Framework 1.1 Results


# Framework 1.1 Trial Results

**Date**: 2026-01-05
**Framework Version**: 1.1
**Total Trials**: ~15,000 across 17 models

## Executive Summary

This document summarizes the results of LLM trials testing the learnability of Faber, a Latin-inspired programming language designed as an LLM-friendly intermediate representation.

**Key Findings:**

1. **Grammar-only context outperforms prose documentation** — Formal EBNF grammar yields 92-98% accuracy vs 81-88% for natural language descriptions
2. **Coding models match frontier models** — qwen3-coder (96%) rivals gpt-4o (98%) at 1/10th the cost
3. **Prediction tasks measure different skills** — Tasks requiring mental transpilation (predict_output) should be excluded from read/write competency metrics
4. **Small models struggle regardless of context** — Models under 8B parameters (llama-3.2-1b) remain below 20% accuracy

---

## Methodology

### Trial Configuration

- **Total Trials**: 13,092
- **Models Tested**: 17
- **Task Types**: 53 unique tasks
- **N-shot Variations**: 0, 1, 3, 10 examples
- **Context Types**: 5 (examples-only, grammar-only, minimal, basic, complete)
- **Temperature**: 0.0 (deterministic)
- **Dialect**: Latin only

### Models Tested

| Category | Models |
|----------|--------|
| OpenAI | gpt-3.5-turbo, gpt-4o-mini, gpt-4o, gpt-5 |
| Anthropic | claude-3-haiku, claude-3.5-sonnet, claude-4.5-sonnet |
| Meta | llama-3.1-8b, llama-3.1-70b, llama-3.2-1b, llama-3.2-3b |
| Coding-focused | codestral, deepseek-v3.1, mercury-coder, qwen3-coder, qwen2.5-coder-32b |
| Other | mistral-7b |

### Context Types

| Context | Description |
|---------|-------------|
| examples-only | No documentation, only n-shot examples |
| grammar-only | Formal EBNF grammar + keyword mappings |
| minimal | Brief keyword vocabulary list |
| basic | Quick reference with types, keywords, syntax rules |
| complete | Full grammar reference with all features |

### Task Categories

- **translate_ts_to_faber**: Write Faber given TypeScript
- **translate_faber_to_ts**: Write TypeScript given Faber
- **complete_code**: Fill in missing Faber keyword
- **predict_output**: Predict runtime output (excluded from primary metrics)

---

## Overall Results

### All Tasks (Including predict_output)

| Model | Passed | Total | Accuracy |
|-------|--------|-------|----------|
| gpt-4o | 761 | 840 | 91% |
| qwen3-coder | 903 | 1008 | 90% |
| gpt-5 | 595 | 672 | 89% |
| gpt-4o-mini | 736 | 840 | 88% |
| claude-3.5-sonnet | 739 | 840 | 88% |
| llama-3.1-70b | 726 | 840 | 86% |
| codestral | 725 | 840 | 86% |
| deepseek-v3.1 | 710 | 840 | 85% |
| gpt-3.5-turbo | 1252 | 1498 | 84% |
| claude-4.5-sonnet | 520 | 672 | 77% |
| mercury-coder | 614 | 840 | 73% |
| llama-3.1-8b | 733 | 1009 | 73% |
| claude-3-haiku | 638 | 925 | 69% |
| llama-3.2-1b | 173 | 1093 | 16% |

*Note: mistral-7b (100%, n=18), llama-3.2-3b (40%, n=35), qwen2.5-coder-32b (0%, n=282) excluded due to incomplete runs*

### Read/Write Tasks Only (Excluding predict_output)

The `predict_output` tasks test mental transpilation (understanding that `scribe(verum)` outputs `true`), which is a different skill than read/write competency. Excluding these:

| Model | Passed | Total | Accuracy |
|-------|--------|-------|----------|
| gpt-4o | 559 | 600 | 93% |
| qwen3-coder | 662 | 720 | 92% |
| deepseek-v3.1 | 550 | 600 | 92% |
| claude-3.5-sonnet | 552 | 600 | 92% |
| gpt-5 | 435 | 480 | 91% |
| claude-4.5-sonnet | 435 | 480 | 91% |
| codestral | 537 | 600 | 90% |
| gpt-4o-mini | 536 | 600 | 89% |
| llama-3.1-70b | 528 | 600 | 88% |
| claude-3-haiku | 581 | 661 | 88% |
| llama-3.1-8b | 604 | 721 | 84% |
| gpt-3.5-turbo | 882 | 1091 | 81% |
| mercury-coder | 479 | 600 | 80% |
| llama-3.2-1b | 118 | 787 | 15% |

**Observation**: Top models cluster tightly at 88-93% when measuring actual code generation ability.

---

## Results by Context Type

Excluding predict_output tasks:

| Context | Passed | Total | Accuracy |
|---------|--------|-------|----------|
| grammar-only | 1381 | 1590 | 87% |
| complete | 1572 | 1817 | 87% |
| basic | 1526 | 1801 | 85% |
| minimal | 1846 | 2218 | 83% |
| examples-only | 1162 | 1961 | 59% |

**Key Insight**: Formal EBNF grammar (grammar-only) matches the most verbose documentation (complete) while using fewer tokens. Examples alone without any documentation performs poorly (59%).

---

## Grammar-Only Context Analysis

The grammar-only context provides formal EBNF rules and keyword mappings. This section shows results for this context specifically, excluding predict_output tasks:

| Model | Passed | Total | Accuracy |
|-------|--------|-------|----------|
| gpt-4o | 117 | 120 | 98% |
| claude-3.5-sonnet | 117 | 120 | 98% |
| qwen3-coder | 231 | 240 | 96% |
| llama-3.1-70b | 114 | 120 | 95% |
| deepseek-v3.1 | 114 | 120 | 95% |
| gpt-4o-mini | 111 | 120 | 92% |
| codestral | 111 | 120 | 92% |
| claude-3-haiku | 108 | 120 | 90% |
| gpt-3.5-turbo | 133 | 150 | 89% |
| mercury-coder | 105 | 120 | 88% |
| llama-3.1-8b | 103 | 120 | 86% |
| llama-3.2-1b | 17 | 120 | 14% |

**Key Findings**:
- Frontier models (gpt-4o, claude-3.5-sonnet) achieve 98% accuracy
- Coding-focused model qwen3-coder (96%) nearly matches at ~10x lower cost
- Mid-tier models cluster at 86-92%
- Only llama-3.2-1b (1B params) fails to learn effectively

---

## Error Analysis

Excluding predict_output tasks:

| Error Type | Count | % of Failures |
|------------|-------|---------------|
| type_error | 1308 | 69% |
| no_response | 236 | 12% |
| syntax_error | 192 | 10% |
| wrong_output | 152 | 8% |
| runtime_error | 14 | <1% |

**Interpretation**: Most failures are type errors (likely TypeScript-style syntax like `x: number` instead of `numerus x`). Very few runtime errors, indicating models produce structurally valid code.

---

## Task Difficulty Analysis

### Hardest Tasks (Excluding predict_output)

| Task | Pass Rate | Notes |
|------|-----------|-------|
| translate_conditional | 17% | Complex control flow |
| translate_function | 17% | Function syntax |
| translate_if_else | 17% | Control flow |
| complete_variable_declaration | 25% | Type-first syntax |
| translate_array_literal | 33% | Collection syntax |
| ts_to_faber_function_string | 54% | Function + string return |
| ts_to_faber_boolean | 56% | Boolean handling |

### Easiest Tasks

| Task | Pass Rate | Notes |
|------|-----------|-------|
| faber_to_ts_functio_string | 95% | Reading Faber |
| faber_to_ts_arithmetic | 94% | Reading Faber |
| faber_to_ts_si_true | 93% | Reading Faber |
| faber_to_ts_ex_pro | 93% | Reading Faber |
| faber_to_ts_functio | 92% | Reading Faber |

**Key Pattern**: Reading Faber (faber_to_ts) is significantly easier than writing Faber (ts_to_faber). Models can interpret Faber keywords but struggle to produce them correctly.

---

## Cost Efficiency (Grammar-Only Context)

| Model | Accuracy | Time | Cost | Cost per Correct |
|-------|----------|------|------|------------------|
| qwen3-coder | 95% | 179s | $0.03 | $0.0002 |
| deepseek-v3.1 | 88% | 166s | $0.02 | $0.0001 |
| gpt-4o-mini | 93% | 119s | $0.02 | $0.0001 |
| codestral | 90% | 70s | $0.04 | $0.0003 |
| llama-3.1-70b | 91% | 180s | $0.05 | $0.0003 |
| gpt-3.5-turbo | 92% | 83s | $0.07 | $0.0005 |
| gpt-4o | 95% | 106s | $0.34 | $0.0021 |
| claude-3.5-sonnet | 93% | 289s | $0.49 | $0.0031 |

**Best Value**: qwen3-coder and deepseek-v3.1 provide 88-95% accuracy at <$0.03 per 168-task run.

**Fastest**: codestral (70s) with 90% accuracy.

**Highest Accuracy**: gpt-4o and qwen3-coder tie at 95%, but qwen3-coder is 11x cheaper.

---

## Conclusions

### Primary Findings

1. **Faber is learnable by LLMs**: With proper context (grammar-only), 11 of 12 tested models achieve 86%+ accuracy on read/write tasks.

2. **Formal grammar beats prose**: EBNF grammar (87%) matches verbose documentation (87%) and outperforms minimal descriptions (83%). Models trained on code prefer structured specifications.

3. **Reading > Writing**: Models achieve 90-95% on faber_to_ts but only 54-65% on ts_to_faber. Generating novel Faber syntax is harder than interpreting it.

4. **Coding models are cost-effective**: qwen3-coder (96%) and deepseek-v3.1 (95%) match or exceed gpt-4o (98%) on grammar-only context at 10-15x lower cost.

5. **predict_output tests different skills**: These tasks measure mental transpilation, not read/write competency. Excluding them gives a clearer picture of syntax learning.

### Recommendations for Future Trials

1. **Remove or reclassify predict_output tasks** — They test compilation semantics, not syntax competency.

2. **Focus on ts_to_faber tasks** — These are the hardest and most relevant for the "LLM drafts Faber" workflow.

3. **Use grammar-only context as default** — It's compact, effective, and preferred by coding models.

4. **Add Faber-English ablation** — To test whether Latin keywords specifically help, or just the regular structure.

5. **Add multi-pass refinement** — Test whether self-correction improves accuracy on hard tasks.

---

## Appendix: Trial Run Summary

Total cost across all trials: ~$15-20
Total time: ~4 hours wall clock (parallel runs)
Framework version: 1.1
Date: 2026-01-05


---

# All Examples


# Faber Examples - Complete Collection

This file contains all 82 examples from the Faber exempla/ directory.

## adfirma

### in-functio

```faber
# Assertions in functions for preconditions and postconditions
#
# adfirma <condition>
# adfirma <condition>, "error message"

# Precondition: validate input at function start
functio divide(numerus a, numerus b) fit numerus {
    adfirma b != 0, "divisor must not be zero"
    redde a / b
}

# Multiple preconditions
functio calculateAge(numerus birthYear, numerus currentYear) fit numerus {
    adfirma birthYear > 0, "birth year must be positive"
    adfirma currentYear >= birthYear, "current year must be >= birth year"
    redde currentYear - birthYear
}

# Postcondition: validate result before returning
functio absoluteValue(numerus n) fit numerus {
    varia result = n
    si n < 0 {
        result = -n
    }
    adfirma result >= 0, "result must be non-negative"
    redde result
}

incipit {
    fixum quotient = divide(20, 4)
    adfirma quotient == 5

    fixum age = calculateAge(1990, 2024)
    adfirma age == 34

    fixum abs = absoluteValue(-42)
    adfirma abs == 42
}
```

### basic

```faber
# Basic adfirma (assert) statements
#
# adfirma <condition>
# adfirma <condition>, "error message"

incipit {
    fixum x = 10

    # Simple assertion without message
    adfirma x > 0

    # Assertion with custom error message
    adfirma x == 10, "x must equal 10"

    # Multiple assertions
    fixum name = "Marcus"
    adfirma name == "Marcus"
    adfirma name != "", "name must not be empty"

    # Boolean assertions
    fixum active = verum
    adfirma active
    adfirma active == verum, "must be active"
}
```

## cura

### nested

```faber
# Nested allocator scopes
#
# cura arena fit <outer> { cura arena fit <inner> { } }
#
# Allocator scopes can nest. Inner scopes free before outer scopes.

incipit {
    cura arena fit outer {
        varia textus[] a = ["one"]

        cura arena fit inner {
            varia textus[] b = ["two"]
            scribe "Inner:", b
        }
        # inner freed here

        a.adde("three")
        scribe "Outer:", a
    }
    # outer freed here
}
```

### arena

```faber
# Arena allocator scope
#
# cura arena fit <identifier> { <body> }
#
# Arena allocators provide fast allocation with bulk deallocation.
# All memory is freed when the scope exits.
# On GC targets (TS, Python), allocator blocks are ignored.

incipit {
    cura arena fit mem {
        # All allocations in this block use the arena
        varia textus[] items = ["hello", "world"]
        scribe items
    }
    # Arena freed, all allocations released

    # Page allocator variant
    cura page fit pageMem {
        scribe "Using page allocator"
    }
}
```

## custodi

### basic

```faber
# Basic custodi (guard clause) statement
#
# custodi { si <condition> { <early-return> } }
#
# Groups early-exit checks at function start to separate
# validation from main logic.

functio divide(a, b) -> numerus {
    custodi {
        si b == 0 {
            redde 0
        }
    }

    redde a / b
}

functio processValue(x) -> numerus {
    custodi {
        si x < 0 {
            redde -1
        }
        si x > 100 {
            redde -1
        }
    }

    # Main logic, clearly separated from guards
    redde x * 2
}

functio clamp(value, min, max) -> numerus {
    custodi {
        si value < min {
            redde min
        }
        si value > max {
            redde max
        }
    }

    redde value
}

incipit {
    scribe divide(10, 2)
    scribe divide(10, 0)

    scribe processValue(50)
    scribe processValue(-10)
    scribe processValue(150)

    scribe clamp(5, 0, 10)
    scribe clamp(-5, 0, 10)
    scribe clamp(15, 0, 10)
}
```

### validation

```faber
# Input validation patterns with custodi
#
# Use custodi to group related precondition checks.
# Each guard should return early or throw on invalid input.

functio processAge(age) -> textus {
    custodi {
        si age < 0 {
            redde "Invalid: negative age"
        }
        si age > 150 {
            redde "Invalid: age too high"
        }
    }

    si age < 18 {
        redde "Minor"
    }
    secus {
        redde "Adult"
    }
}

functio createUser(name, email, age, curator alloc) -> textus {
    custodi {
        si name == nihil aut name == "" {
            redde "Error: name required"
        }
        si email == nihil aut email == "" {
            redde "Error: email required"
        }
        si age < 13 {
            redde "Error: must be 13 or older"
        }
        si age > 120 {
            redde "Error: invalid age"
        }
    }

    redde scriptum("User created: §", name)
}

# Guards can throw instead of returning
functio sqrt(n) -> numerus {
    custodi {
        si n < 0 {
            iace "Cannot compute square root of negative number"
        }
    }

    redde n
}

incipit ergo cura arena {
    scribe processAge(-5)
    scribe processAge(200)
    scribe processAge(25)
    scribe processAge(12)

    scribe createUser("Marcus", "marcus@roma.com", 30)
    scribe createUser("", "test@test.com", 25)
    scribe createUser("Julia", "julia@roma.com", 10)

    scribe sqrt(16)
}
```

## de-pro

### basic

```faber
# Basic de...pro (for-in) key iteration
#
# de <object> pro <key> { <body> }
# de <array> pro <index> { <body> }

incipit ergo cura arena {
    # Iterate over object keys
    fixum persona = { nomen: "Marcus", aetas: 30, urbs: "Roma" }

    de persona pro clavis {
        scribe clavis
    }

    # Access values using the key
    de persona pro clavis {
        scribe scriptum("§: §", clavis, persona[clavis])
    }

    # Iterate over array indices
    fixum numeri = [10, 20, 30]

    de numeri pro index {
        scribe scriptum("Index §: §", index, numeri[index])
    }

    # One-liner form with ergo
    fixum data = { alpha: 1, beta: 2 }
    de data pro k ergo scribe k
}
```

## destructure

### array

```faber
# Array destructuring patterns
#
# fixum [a, b, c] = array         -- destructure into immutable bindings
# varia [x, y, z] = array         -- destructure into mutable bindings
# fixum [first, ceteri rest] = arr -- with rest pattern
# fixum [_, second, _] = arr      -- skip elements with underscore

incipit {
    # Basic array destructuring
    fixum numbers = [1, 2, 3]
    fixum [a, b, c] = numbers

    scribe a
    scribe b
    scribe c

    # Destructure inline array literal
    fixum [first, second, third] = [10, 20, 30]

    scribe first
    scribe second
    scribe third

    # Mutable destructuring with varia
    fixum coords = [100, 200]
    varia [x, y] = coords

    scribe x
    scribe y

    x = x + 50
    y = y + 50

    scribe x
    scribe y

    # Partial destructuring (fewer variables than elements)
    fixum values = [1, 2, 3, 4, 5]
    fixum [one, two] = values

    scribe one
    scribe two

    # Rest pattern with ceteri
    fixum items = [1, 2, 3, 4, 5]
    fixum [head, ceteri tail] = items

    scribe head
    scribe tail

    # Skip elements with underscore
    fixum triple = [10, 20, 30]
    fixum [_, middle, _] = triple

    scribe middle

    # Nested arrays
    fixum matrix = [[1, 2], [3, 4]]
    fixum [row1, row2] = matrix

    scribe row1
    scribe row2
}
```

### object

```faber
# Object destructuring patterns
#
# ex obj fixum field1, field2     -- extract fields into immutable bindings
# ex obj varia field1, field2     -- extract into mutable bindings
# ex obj fixum field ut alias     -- extract with alias (rename)
# ex obj fixum field, ceteri rest -- extract with rest pattern

incipit {
    # Basic field extraction
    fixum person = { name: "Marcus", age: 30, city: "Roma" }
    ex person fixum name, age

    scribe name
    scribe age

    # Extract with alias using 'ut'
    fixum user = { name: "Julia", email: "julia@roma.com" }
    ex user fixum name ut userName, email ut userEmail

    scribe userName
    scribe userEmail

    # Mutable destructuring with varia
    fixum data = { count: 100, active: verum }
    ex data varia count, active

    scribe count
    scribe active

    count = 200
    active = falsum

    scribe count
    scribe active

    # Mixed alias and regular fields
    fixum config = { host: "localhost", port: 8080, secure: verum }
    ex config fixum host, port ut serverPort, secure

    scribe host
    scribe serverPort
    scribe secure

    # Rest pattern with ceteri
    fixum fullUser = { id: 1, name: "Gaius", email: "g@roma.com", role: "admin" }
    ex fullUser fixum id, ceteri details

    scribe id
    scribe details

    # Destructure from nested access
    fixum response = { data: { user: { name: "Claudia", verified: verum } } }
    ex response.data.user fixum name ut nestedName, verified

    scribe nestedName
    scribe verified

    # Single field extraction
    fixum settings = { theme: "dark", lang: "la" }
    ex settings fixum theme

    scribe theme
}
```

## discerne

### basic

```faber
# Pattern matching with discerne (discriminate/distinguish)
#
# discerne <value> {
#     casu <Variant> { <body> }
#     casu <Variant> ut <alias> { <body> }
#     casu <Variant> pro <bindings> { <body> }
# }

# Define discretio (tagged union) types
discretio Status {
    Active,
    Inactive,
    Pending
}

discretio Event {
    Click { numerus x, numerus y },
    Keypress { textus key },
    Quit
}

# Functions demonstrating discerne
functio describe_status(Status s) -> textus {
    discerne s {
        casu Active { redde "active" }
        casu Inactive { redde "inactive" }
        casu Pending { redde "pending" }
    }
}

functio handle_event(Event e) -> nihil {
    discerne e {
        casu Click pro x, y {
            scribe scriptum("Clicked at §, §", x, y)
        }
        casu Keypress pro key {
            scribe scriptum("Key: §", key)
        }
        casu Quit {
            scribe "quit"
        }
    }
}

incipit {
    scribe "discerne patterns defined"
}
```

## discretio

### basic

```faber
# Basic discretio (discriminated union/tagged union)
#
# discretio Name {
#     Variant1 { type field1, type field2 }
#     Variant2 { type field }
#     Variant3
# }

# Discretio with payload variants
discretio Result {
    Success { textus message }
    Failure { textus error }
}

# Discretio with mixed unit and payload variants
discretio Event {
    Click { numerus x, numerus y }
    Keypress { textus key }
    Quit
}

# Discretio with many fields per variant
discretio Shape {
    Rectangle { numerus x, numerus y, numerus width, numerus height }
    Circle { numerus cx, numerus cy, numerus radius }
    Point { numerus x, numerus y }
}

incipit {
    scribe "Discretio types defined"
}
```

## dum

### in-functio

```faber
# While loops inside functions

functio factorial(numerus n) -> numerus {
    varia numerus result = 1
    varia numerus current = n

    dum current > 1 {
        result = result * current
        current = current - 1
    }

    redde result
}

functio nextPowerOf2(numerus n) -> numerus {
    varia numerus power = 1

    dum power <= n {
        power = power * 2
    }

    redde power
}

incipit {
    scribe "5! =", factorial(5)
    scribe "10! =", factorial(10)

    scribe "Next power of 2 after 100:", nextPowerOf2(100)
    scribe "Next power of 2 after 1000:", nextPowerOf2(1000)
}
```

### basic

```faber
# Basic dum (while) loop with counter
#
# dum <condition> { <body> }

incipit {
    varia numerus counter = 0

    dum counter < 5 {
        scribe counter
        counter = counter + 1
    }

    # Countdown example
    varia numerus countdown = 3

    dum countdown > 0 {
        scribe "Countdown:", countdown
        countdown = countdown - 1
    }

    scribe "Done!"
}
```

### complex-condition

```faber
# Dum with compound conditions
#
# dum <cond1> et <cond2> { }   -- both must be true
# dum <cond1> aut <cond2> { }  -- either must be true

incipit {
    # Using "et" (and) - loop while running AND attempts < limit
    varia bivalens running = verum
    varia numerus attempts = 0

    dum running et attempts < 5 {
        scribe "Attempt:", attempts
        attempts = attempts + 1

        si attempts >= 3 {
            running = falsum
        }
    }

    # Using "aut" (or) - loop while either condition holds
    varia numerus a = 5
    varia numerus b = 3

    dum a > 0 aut b > 0 {
        scribe "a:", a, "b:", b
        a = a - 1
        b = b - 1
    }
}
```

## elige

### in-functio

```faber
# Elige with early returns in functions
#
# elige <expr> {
#     casu <value> { redde ... }
#     casu <value> { redde ... }
#     ceterum { redde ... }
# }

functio getGreeting(textus language) fit textus {
    elige language {
        casu "latin" {
            redde "Salve"
        }
        casu "english" {
            redde "Hello"
        }
        casu "spanish" {
            redde "Hola"
        }
        casu "french" {
            redde "Bonjour"
        }
    }

    redde "Hi"
}

functio getHttpMessage(numerus code) fit textus {
    elige code {
        casu 200 {
            redde "OK"
        }
        casu 201 {
            redde "Created"
        }
        casu 400 {
            redde "Bad Request"
        }
        casu 404 {
            redde "Not Found"
        }
        casu 500 {
            redde "Internal Server Error"
        }
    }

    redde "Unknown"
}

incipit {
    scribe getGreeting("latin")
    scribe getGreeting("spanish")
    scribe getGreeting("unknown")

    scribe getHttpMessage(200)
    scribe getHttpMessage(404)
    scribe getHttpMessage(999)
}
```

### with-aliter

```faber
# Elige with default case (ceterum)
#
# elige <expr> {
#     casu <value> { <body> }
#     ceterum { <default> }
# }

incipit ergo cura arena {
    # ceterum handles unmatched cases
    fixum day = "wednesday"

    elige day {
        casu "monday" {
            scribe "Start of week"
        }
        casu "friday" {
            scribe "End of week"
        }
        ceterum {
            scribe "Midweek"
        }
    }

    # ceterum with error handling
    fixum command = "unknown"

    elige command {
        casu "start" {
            scribe "Starting..."
        }
        casu "stop" {
            scribe "Stopping..."
        }
        casu "restart" {
            scribe "Restarting..."
        }
        ceterum {
            scribe "Unknown command"
        }
    }

    # Multiple statements in ceterum
    fixum level = 99

    elige level {
        casu 1 {
            scribe "Beginner"
        }
        casu 2 {
            scribe "Intermediate"
        }
        casu 3 {
            scribe "Advanced"
        }
        ceterum {
            scribe "Custom level"
            scribe scriptum("Level: §", level)
        }
    }
}
```

### with-reddit

```faber
# Elige with reddit syntax
#
# 'reddit' is syntactic sugar for 'ergo redde' - a one-liner return.
# Use it when each case simply returns a value.
#
# casu <value> reddit <expression>
# ceterum reddit <expression>

# HTTP status code lookup using reddit
functio getStatusText(numerus code) -> textus {
    elige code {
        casu 200 reddit "OK"
        casu 201 reddit "Created"
        casu 204 reddit "No Content"
        casu 400 reddit "Bad Request"
        casu 401 reddit "Unauthorized"
        casu 403 reddit "Forbidden"
        casu 404 reddit "Not Found"
        casu 500 reddit "Internal Server Error"
        casu 502 reddit "Bad Gateway"
        casu 503 reddit "Service Unavailable"
        ceterum reddit "Unknown Status"
    }
}

# Type mapping using reddit
functio getTypeCode(textus name) -> numerus {
    elige name {
        casu "textus" reddit 1
        casu "numerus" reddit 2
        casu "fractus" reddit 3
        casu "bivalens" reddit 4
        ceterum reddit 0
    }
}

# Mixed reddit and blocks
# Use reddit for simple returns, blocks for complex logic
functio processCode(numerus code) -> textus {
    elige code {
        casu 1 reddit "simple"
        casu 2 {
            scribe "Processing code 2..."
            redde "complex"
        }
        casu 3 reddit "also simple"
        ceterum reddit "default"
    }
}

incipit {
    scribe getStatusText(200)    # OK
    scribe getStatusText(404)    # Not Found
    scribe getStatusText(999)    # Unknown Status

    scribe getTypeCode("textus")   # 1
    scribe getTypeCode("unknown")  # 0

    scribe processCode(1)  # simple
    scribe processCode(2)  # Processing code 2... complex
}
```

### basic

```faber
# Basic elige (switch) statement
#
# elige <expr> {
#     casu <value> { <body> }
#     casu <value> { <body> }
#     ceterum { <body> }
# }

incipit {
    # String matching
    fixum status = "active"

    elige status {
        casu "pending" {
            scribe "Waiting..."
        }
        casu "active" {
            scribe "Running"
        }
        casu "done" {
            scribe "Completed"
        }
    }

    # Number matching
    fixum code = 200

    elige code {
        casu 200 {
            scribe "OK"
        }
        casu 404 {
            scribe "Not Found"
        }
        casu 500 {
            scribe "Server Error"
        }
    }

    # Multiple statements per case
    fixum mode = "production"

    elige mode {
        casu "development" {
            scribe "Dev mode enabled"
            scribe "Verbose logging on"
        }
        casu "production" {
            scribe "Production mode"
            scribe "Optimizations enabled"
        }
    }
}
```

## ex

### nested

```faber
# Nested ex...pro loops

incipit {
    # Nested array iteration
    fixum rows = [1, 2, 3]
    fixum cols = ["A", "B", "C"]

    ex rows pro row {
        ex cols pro col {
            scribe row, col
        }
    }

    # Multiplication table
    ex 1..4 pro i {
        ex 1..4 pro j {
            scribe i, "*", j, "=", i * j
        }
    }

    # Nested ranges
    ex 0..3 pro x {
        ex 0..3 pro y {
            scribe x, y
        }
    }
}
```

### in-functio

```faber
# Using ex...pro inside functions

# Sum all numbers in an array
functio sumArray(numerus[] nums) -> numerus {
    varia numerus total = 0

    ex nums pro n {
        total = total + n
    }

    redde total
}

# Find the maximum value
functio maxValue(numerus[] nums) -> numerus {
    varia numerus max = nums[0]

    ex nums pro n {
        si n > max {
            max = n
        }
    }

    redde max
}

# Count items matching a condition
functio countAbove(numerus[] nums, numerus threshold) -> numerus {
    varia numerus count = 0

    ex nums pro n {
        si n > threshold {
            count = count + 1
        }
    }

    redde count
}

incipit {
    fixum numbers = [1, 2, 3, 4, 5]

    scribe sumArray(numbers)
    scribe maxValue(numbers)
    scribe countAbove(numbers, 3)

    scribe sumArray([10, 20, 30])
    scribe maxValue([5, 12, 8, 20, 3])
}
```

### array

```faber
# Iterating over arrays with ex...pro
#
# ex <collection> pro <item> { <body> }

incipit {
    # Iterate over number array
    fixum numbers = [1, 2, 3, 4, 5]

    ex numbers pro n {
        scribe n
    }

    # Iterate over string array
    fixum names = ["Marcus", "Julia", "Claudia"]

    ex names pro name {
        scribe name
    }

    # Process items
    fixum values = [10, 20, 30]

    ex values pro v {
        fixum doubled = v * 2
        scribe doubled
    }
}
```

### fiunt-iteration

```faber
# Iterating over fiunt/fient function returns with ex...pro
#
# This demonstrates that fiunt/fient functions produce iterable results
# that can be consumed with ex...pro loops

# Multi-value sync function that yields values via cede
functio rangeSync(numerus n) fiunt numerus {
    ex 0..n pro i {
        cede i
    }
}

# Multi-value async function that yields values via cede
functio rangeAsync(numerus n) fient numerus {
    ex 0..n pro i {
        cede i
    }
}

incipit {
    # Iterate over sync fiunt function results
    scribe "Sync fiunt iteration:"
    ex rangeSync(3) pro num {
        scribe scriptum("  num: {num}")
    }

    # Collect all results from fiunt function
    varia syncResults = []
    ex rangeSync(5) pro num {
        syncResults.adde(num * 2)
    }
    scribe("Sync collected:")
    scribe(syncResults)

    # Note: Async iteration would require async context
    # ex rangeAsync(3) fiunt num {
    #     scribe num
    # }
}
```

### range-step

```faber
# Ranges with step using per
#
# ex <start>..<end> per <step> pro <item> { }
# ex <start> usque <end> per <step> pro <item> { }

incipit {
    # Step by 2 (exclusive: 0, 2, 4, 6, 8)
    ex 0..10 per 2 pro i {
        scribe i
    }

    # Step by 2 (inclusive: 0, 2, 4, 6, 8, 10)
    ex 0 usque 10 per 2 pro i {
        scribe i
    }

    # Step by 3
    ex 0..15 per 3 pro i {
        scribe i
    }

    # Countdown with negative step
    ex 10..0 per -1 pro i {
        scribe i
    }

    # Countdown by 2
    ex 10..0 per -2 pro i {
        scribe i
    }
}
```

### range

```faber
# Range expressions with ex...pro
#
# ex <start>..<end> pro <item> { }      # exclusive (end not included)
# ex <start> ante <end> pro <item> { }  # explicit exclusive
# ex <start> usque <end> pro <item> { } # inclusive (end included)

incipit {
    # Basic range (exclusive: 0, 1, 2, 3, 4)
    ex 0..5 pro i {
        scribe i
    }

    # Explicit exclusive with ante (same as ..)
    ex 0 ante 5 pro i {
        scribe i
    }

    # Inclusive range with usque (0, 1, 2, 3, 4, 5)
    ex 0 usque 5 pro i {
        scribe i
    }

    # Range starting from non-zero
    ex 5..10 pro i {
        scribe i
    }

    # Countdown (negative direction)
    ex 5..0 pro i {
        scribe i
    }
}
```

## expressions

### scriptum

```faber
# Format string expressions using scriptum()

incipit ergo cura arena {
    fixum name = "Marcus"
    fixum age = 30

    # Single placeholder
    fixum greeting = scriptum("Salve, §!", name)
    scribe greeting

    # Multiple placeholders
    fixum info = scriptum("§ is § years old", name, age)
    scribe info

    # With expression
    fixum calc = scriptum("10 + 20 = §", 10 + 20)
    scribe calc
}
```

### regex

```faber
# Regex literals using sed keyword
# Syntax: sed "pattern" [flags]

incipit {
    # Simple patterns
    fixum digits = sed "\d+"
    fixum word = sed "\w+"

    # With flags (i = case insensitive, m = multiline)
    fixum insensitive = sed "hello" i
    fixum multiline = sed "^start" im

    # Complex patterns
    fixum email = sed "[^@]+@[^@]+"
    fixum paths = sed "/usr/local/.*"
}
```

### qua

```faber
# Type casting with qua: converts values between types

functio getData() -> lista<numerus> {
    redde [1, 2, 3]
}

functio getResponse() -> objectum {
    redde { body: "body" }
}

functio getValue() -> numerus {
    redde 42
}

incipit {
    # Cast to string
    fixum data = 42
    fixum asText = data qua textus
    scribe asText

    # Cast to number
    fixum input = "100"
    fixum asNum = input qua numerus
    scribe asNum

    # Cast to boolean
    fixum value = 1
    fixum asBool = value qua bivalens
    scribe asBool

    # Cast to nullable type
    fixum num = 10
    fixum maybe = num qua numerus?
    scribe maybe

    # Cast to array type
    fixum raw = getData()
    fixum items = raw qua lista<textus>
    scribe items

    # Cast with member access
    fixum response = getResponse()
    fixum body = response.body qua textus
    scribe body

    # Cast call result directly
    fixum result = getValue() qua textus
    scribe result

    # Cast in parenthesized expression for chaining
    fixum len = (data qua textus).length
    scribe len
}
```

### literal

```faber
# Literal expressions: numbers, strings, booleans, null, templates

incipit {
    # Numbers
    fixum integer = 42
    fixum decimal = 3.14
    fixum negative = -100

    # Strings
    fixum greeting = "hello"
    fixum single = 'single quotes'

    # Booleans
    fixum yes = verum
    fixum no = falsum

    # Null
    fixum nothing = nihil

    # Template literals
    fixum name = "Mundus"
    fixum message = `Hello ${name}`
}
```

### ab

```faber
# Ab expression - collection filtering DSL
# 'ab' provides declarative filtering with optional transforms

incipit {
    # Sample data - users with boolean properties
    fixum users = [
        { nomen: "Marcus", activus: verum, aetas: 25 },
        { nomen: "Julia", activus: falsum, aetas: 30 },
        { nomen: "Gaius", activus: verum, aetas: 17 }
    ]

    fixum items = [
        { valor: 10, visibilis: verum },
        { valor: 20, visibilis: falsum },
        { valor: 30, visibilis: verum },
        { valor: 40, visibilis: verum }
    ]

    # Boolean property shorthand - filter where property is true
    fixum active = ab users activus
    scribe(active)

    # Negated filter - filter where property is false
    fixum inactive = ab users non activus
    scribe(inactive)

    # Filter with prima transform (first N elements)
    fixum top2 = ab items visibilis, prima 2
    scribe(top2)

    # Filter with ultima transform (last N elements)
    fixum last2 = ab items visibilis, ultima 2
    scribe(last2)

    # Filter with summa transform (sum of results)
    fixum prices = [
        { pretium: 100, validum: verum },
        { pretium: 200, validum: verum },
        { pretium: 50, validum: falsum }
    ]
    fixum validPrices = ab prices validum
    scribe(validPrices)

    # Multiple transforms chained
    fixum result = ab items visibilis, prima 3, ultima 2
    scribe(result)

    # Without filter - just apply transforms to collection
    fixum nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    fixum firstFive = ab nums, prima 5
    scribe(firstFive)

    # Chain transforms without filter
    fixum sumFirst = ab nums, prima 5, summa
    scribe(sumFirst)

    # Complex source - member expression
    fixum data = { users: users }
    fixum dataActive = ab data.users activus
    scribe(dataActive)
}
```

### novum

```faber
# Novum (instantiation) expressions
# Creates new instances of genus types

genus Point {
    numerus x
    numerus y
}

genus Person {
    textus name
    numerus age: 0
}

incipit {
    # Instantiate with all fields
    fixum p1 = novum Point { x: 10, y: 20 }
    scribe p1.x
    scribe p1.y

    # With default value
    fixum person = novum Person { name: "Marcus" }
    scribe person.name
    scribe person.age
}
```

### member

```faber
# Member access expressions: dot, bracket, chained, optional

incipit {
    # Object with dot access
    fixum point = { x: 10, y: 20 }
    scribe point.x
    scribe point.y

    # Array with bracket access
    fixum numbers = [1, 2, 3]
    scribe numbers[0]
    scribe numbers[2]

    # Object with bracket access (string key)
    fixum config = { name: "test", value: 42 }
    scribe config["name"]
    scribe config["value"]

    # Chained member access
    fixum nested = { outer: { inner: { deep: "found" } } }
    scribe nested.outer.inner.deep

    # Mixed dot and bracket access
    fixum data = { items: ["first", "second", "third"] }
    scribe data.items[0]
    scribe data.items[2]

    # Optional chaining
    fixum maybe = { present: { value: 100 } }
    scribe maybe?.present?.value

    # Optional chaining with nihil
    fixum empty = nihil
    scribe empty?.missing
}
```

### inter

```faber
# Set membership operator: inter

fixum status = "active"
fixum age = 21

# Basic inter with string array
si status inter ["pending", "active", "paused"] {
    scribe "valid status"
}

# inter with numeric array
si age inter [18, 21, 65] {
    scribe "milestone age"
}

incipit {
    scribe "inter operator examples"
}
```

### array

```faber
# Array literal expressions: empty, typed, nested, and spread

incipit {
    # Empty array
    fixum empty = []

    # Number array
    fixum numbers = [1, 2, 3, 4, 5]

    # String array
    fixum names = ["Marcus", "Julia", "Gaius"]

    # Boolean array
    fixum flags = [verum, falsum, verum]

    # Nested arrays
    fixum matrix = [[1, 2], [3, 4], [5, 6]]

    # Spread operator: combine arrays
    fixum first = [1, 2, 3]
    fixum second = [4, 5, 6]
    fixum combined = [sparge first, sparge second]

    # Spread with additional elements
    fixum extended = [0, sparge first, 99]

    scribe numbers
    scribe names
    scribe matrix
    scribe combined
}
```

### lambda

```faber
# Lambda expressions (arrow functions)
# Pattern: pro param: expr
# Pattern: pro param -> <type>: expr

incipit {
    # Simple lambda with single parameter
    fixum double = pro x: x * 2
    scribe(double(5))

    # Multi-parameter lambda
    fixum add = pro a, b -> numerus: a + b
    scribe(add(3, 4))

    # Lambda with array map
    fixum numbers = [1, 2, 3]
    fixum doubled = numbers.map(pro x: x * 2)
    scribe(doubled)

    # Lambda with array filter
    fixum evens = numbers.filter(pro x: x % 2 == 0)
    scribe(evens)

    # Lambda stored and reused
    fixum isPositive = pro n -> bivalens: n > 0
    scribe(isPositive(10))
    scribe(isPositive(-5))
}
```

### binary

```faber
# ============================================================================
# Binary Expressions
# ============================================================================
#
# Binary expressions combine two operands with an operator. This file covers
# arithmetic, comparison, logical, bitwise, and nullish coalescing operations.
#
# ----------------------------------------------------------------------------
# PRECEDENCE (lowest to highest)
# ----------------------------------------------------------------------------
#
# The precedence chain determines parsing order. Lower precedence binds last:
#
#   assignment < ternary < or < and < equality < comparison
#   < bitwiseOr < bitwiseXor < bitwiseAnd < shift < range
#   < additive < multiplicative < unary < call < primary
#
# ----------------------------------------------------------------------------
# GRAMMAR: Assignment
# ----------------------------------------------------------------------------
#
#   assignment := ternary (('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=') assignment)?
#
# Assignment is right-associative: a = b = c parses as a = (b = c).
# Compound assignment operators combine operation with assignment.
#
# ----------------------------------------------------------------------------
# GRAMMAR: Ternary
# ----------------------------------------------------------------------------
#
#   ternary := or (('?' expression ':' | 'sic' expression 'secus') ternary)?
#
# Two styles supported (do not mix within one expression):
#   - Symbolic: condition ? consequent : alternate
#   - Latin: condition sic consequent secus alternate
#
# Latin 'sic' means "thus/so", 'secus' means "otherwise".
#
# ----------------------------------------------------------------------------
# GRAMMAR: Logical Or
# ----------------------------------------------------------------------------
#
#   or := and (('||' | 'aut') and)* | and ('vel' and)*
#
# PREFER: 'aut' over '||' for logical or.
# PREFER: 'vel' for nullish coalescing (replaces JavaScript's '??').
#
# 'aut' and 'vel' cannot be mixed without parentheses (same restriction as
# JavaScript's || and ?? to prevent precedence confusion).
#
# Latin: 'aut' = "or" (exclusive sense), 'vel' = "or" (either/or, nullable).
#
# ----------------------------------------------------------------------------
# GRAMMAR: Logical And
# ----------------------------------------------------------------------------
#
#   and := equality ('&&' equality | 'et' equality)*
#
# PREFER: 'et' over '&&' for logical and.
#
# Latin: 'et' = "and".
#
# ----------------------------------------------------------------------------
# GRAMMAR: Equality
# ----------------------------------------------------------------------------
#
#   equality := comparison (('==' | '!=' | '===' | '!==' | 'est' | 'non' 'est') comparison)*
#
# Use '===' and '!==' for value equality (strict).
# Use 'est' for type checking (instanceof/typeof).
# Use 'non est' for negative type checking.
# Use 'nihil x' or 'nonnihil x' as unary prefix for null checks.
#
# Latin: 'est' = "is" (type), 'non' = "not".
#
# ----------------------------------------------------------------------------
# GRAMMAR: Comparison
# ----------------------------------------------------------------------------
#
#   comparison := bitwiseOr (('<' | '>' | '<=' | '>=') bitwiseOr)*
#
# Standard comparison operators. Chains left-to-right: a < b < c is valid.
#
# ----------------------------------------------------------------------------
# GRAMMAR: Bitwise Operators
# ----------------------------------------------------------------------------
#
#   bitwiseOr  := bitwiseXor ('|' bitwiseXor)*
#   bitwiseXor := bitwiseAnd ('^' bitwiseAnd)*
#   bitwiseAnd := shift ('&' shift)*
#   shift      := range (('<<' | '>>') range)*
#
# Bitwise precedence is ABOVE comparison (unlike C), so:
#   flags & MASK == 0  parses as  (flags & MASK) == 0
#
# This matches programmer intent and avoids subtle bugs.
#
# ----------------------------------------------------------------------------
# GRAMMAR: Range
# ----------------------------------------------------------------------------
#
#   range := additive (('..' | 'ante' | 'usque') additive ('per' additive)?)?
#
# Range operators for numeric iteration:
#   - '..' and 'ante': exclusive end (0..10 yields 0-9)
#   - 'usque': inclusive end (0 usque 10 yields 0-10)
#   - 'per': step value (0..10 per 2 yields 0, 2, 4, 6, 8)
#
# Latin: 'ante' = "before", 'usque' = "up to", 'per' = "by/through".
#
# ----------------------------------------------------------------------------
# GRAMMAR: Additive
# ----------------------------------------------------------------------------
#
#   additive := multiplicative (('+' | '-') multiplicative)*
#
# Standard addition and subtraction.
#
# ----------------------------------------------------------------------------
# GRAMMAR: Multiplicative
# ----------------------------------------------------------------------------
#
#   multiplicative := unary (('*' | '/' | '%') unary)*
#
# Standard multiplication, division, and modulo.
#
# ============================================================================
# LLM GUIDANCE
# ============================================================================
#
# ALWAYS prefer Latin keywords over symbols:
#   - 'et' over '&&'
#   - 'aut' over '||'
#   - 'vel' over '??' (nullish coalescing)
#   - 'non' over '!' (see unary.fab)
#   - 'sic...secus' over '?:' (ternary, when clarity helps)
#
# NEVER use JavaScript/TypeScript patterns:
#   - '??' does not exist — use 'vel'
#   - '&&' and '||' work but 'et' and 'aut' are preferred
#
# ============================================================================
# EXAMPLES
# ============================================================================

incipit {
    # --------------------------------------------------------------------------
    # Arithmetic operators: + - * / %
    # --------------------------------------------------------------------------

    fixum sum = 10 + 5
    scribe sum

    fixum diff = 10 - 5
    scribe diff

    fixum prod = 10 * 5
    scribe prod

    fixum quot = 10 / 5
    scribe quot

    fixum rem = 10 % 3
    scribe rem

    # --------------------------------------------------------------------------
    # Compound assignment: += -= *= /= &= |=
    # --------------------------------------------------------------------------

    varia counter = 0
    counter += 10
    counter -= 3
    counter *= 2
    scribe counter

    # --------------------------------------------------------------------------
    # Comparison operators: < > <= >= == != === !==
    # --------------------------------------------------------------------------

    fixum isEqual = 10 == 10
    scribe isEqual

    fixum isNotEqual = 10 != 5
    scribe isNotEqual

    fixum isStrictEqual = 10 === 10
    scribe isStrictEqual

    fixum isLess = 5 < 10
    scribe isLess

    fixum isGreater = 10 > 5
    scribe isGreater

    fixum isLessOrEqual = 5 <= 5
    scribe isLessOrEqual

    fixum isGreaterOrEqual = 10 >= 10
    scribe isGreaterOrEqual

    # Comparison chaining
    fixum inRange = 0 < 5 et 5 < 10
    scribe inRange

    # --------------------------------------------------------------------------
    # Logical operators: et (and), aut (or), non (not)
    # --------------------------------------------------------------------------
    # PREFER: 'et' over '&&', 'aut' over '||'

    fixum both = verum et verum
    scribe both

    fixum either = falsum aut verum
    scribe either

    fixum neither = falsum et falsum
    scribe neither

    # Short-circuit evaluation works as expected
    fixum shortCircuit = falsum et expensiveCheck()
    scribe shortCircuit

    # --------------------------------------------------------------------------
    # Nullish coalescing: vel (replaces ??)
    # --------------------------------------------------------------------------
    # PREFER: 'vel' — the '??' operator does not exist in Faber

    fixum textus? maybeName = nihil
    fixum name = maybeName vel "default"
    scribe name

    # Chain multiple fallbacks
    fixum textus? first = nihil
    fixum textus? second = nihil
    fixum textus third = "fallback"
    fixum result = first vel second vel third
    scribe result

    # --------------------------------------------------------------------------
    # Ternary: condition ? then : else  OR  condition sic then secus else
    # --------------------------------------------------------------------------
    # Both forms work. Latin form preferred when it improves readability.

    fixum age = 25
    fixum symbolic = age >= 18 ? "adult" : "minor"
    scribe symbolic

    fixum latin = age >= 18 sic "adult" secus "minor"
    scribe latin

    # Nested ternary (right-associative)
    fixum score = 85
    fixum grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"
    scribe grade

    # --------------------------------------------------------------------------
    # Bitwise operators: & | ^ << >>
    # --------------------------------------------------------------------------
    # Note: Bitwise has higher precedence than comparison (unlike C)

    fixum flags = 0b1010
    fixum mask = 0b1100

    fixum bitwiseAnd = flags & mask
    scribe bitwiseAnd

    fixum bitwiseOr = flags | mask
    scribe bitwiseOr

    fixum bitwiseXor = flags ^ mask
    scribe bitwiseXor

    fixum leftShift = 1 << 4
    scribe leftShift

    fixum rightShift = 16 >> 2
    scribe rightShift

    # Precedence: (flags & mask) == 0, not flags & (mask == 0)
    fixum checkMask = flags & mask == 0
    scribe checkMask
}

# --------------------------------------------------------------------------
# Helper function for short-circuit demonstration
# --------------------------------------------------------------------------

functio expensiveCheck() -> bivalens {
    scribe "This should not print if short-circuited"
    redde verum
}
```

### call

```faber
# Call expressions: simple, with arguments, method calls, chaining, spread

functio greet() {
    scribe "Salve!"
}

functio add(numerus a, numerus b) fit numerus {
    redde a + b
}

functio multiply(numerus x, numerus y) fit numerus {
    redde x * y
}

genus Calculator {
    numerus value: 0

    functio setValue(numerus n) fit Calculator {
        ego.value = n
        redde ego
    }

    functio double() fit Calculator {
        ego.value = ego.value * 2
        redde ego
    }

    functio getResult() fit numerus {
        redde ego.value
    }
}

incipit {
    # Simple call (no arguments)
    greet()

    # Call with arguments
    fixum sum = add(10, 20)
    scribe sum  # 30

    # Multiple arguments
    fixum product = multiply(5, 6)
    scribe product  # 30

    # Method call on object
    varia calc = novum Calculator()
    calc.setValue(10)
    scribe calc.getResult()  # 10

    # Chained method calls
    varia calc2 = novum Calculator()
    fixum result = calc2.setValue(5).double().double().getResult()
    scribe result  # 20

    # Call with spread operator
    fixum numerus[] numbers = [3, 7]
    fixum spreadSum = add(sparge numbers)
    scribe spreadSum  # 10
}
```

### intra

```faber
# Range containment operator: intra

fixum age = 25

# Basic intra with .. operator (exclusive end)
si age intra 0..100 {
    scribe "age is in valid range"
}

# intra with usque (inclusive end)
si age intra 18 usque 65 {
    scribe "working age"
}

# intra with ante (explicit exclusive)
si age intra 0 ante 18 {
    scribe "minor"
}

incipit {
    scribe "intra operator examples"
}
```

### object

```faber
# Object literal expressions

incipit {
    # Empty object
    fixum empty = {}
    scribe(empty)

    # Simple object with numeric values
    fixum point = { x: 10, y: 20 }
    scribe(point)

    # String keys
    fixum value = 42
    fixum withStringKey = { "key": value }
    scribe(withStringKey)

    # Properties from variables
    fixum name = "Marcus"
    fixum age = 30
    fixum person = { name: name, age: age }
    scribe(person)

    # Nested objects
    fixum nested = { outer: { inner: 1 } }
    scribe(nested)

    # Spread operator
    fixum base = { a: 1, b: 2 }
    fixum extended = { sparge base, c: 3 }
    scribe(extended)
}
```

### finge

```faber
# Finge (variant construction) expressions
# Creates discretio variant instances

# Define discretio types
discretio Status {
    Active,
    Inactive,
    Pending
}

discretio Event {
    Click { numerus x, numerus y },
    Keypress { textus key },
    Quit
}

discretio Result {
    Success { textus message },
    Failure { textus error }
}

incipit {
    # Unit variants with explicit type
    fixum Status s1 = finge Active qua Status
    fixum Status s2 = finge Pending qua Status

    # Payload variants with explicit type
    fixum Event e1 = finge Click { x: 100, y: 200 } qua Event
    fixum Event e2 = finge Keypress { key: "Enter" } qua Event
    fixum Event e3 = finge Quit qua Event

    # Result variants
    fixum Result r1 = finge Success { message: "Operation completed" } qua Result
    fixum Result r2 = finge Failure { error: "Something went wrong" } qua Result

    scribe "Finge expressions created"
}
```

### unary

```faber
# Unary operators: negation, logical not, and null/sign checks

incipit {
    # Numeric negation
    fixum x = 5
    fixum neg = -x
    scribe neg  # -5

    # Logical negation
    fixum flag = verum
    fixum notFlag = non flag
    scribe notFlag  # falsum

    # Positive/negative checks
    fixum a = 10
    fixum b = -3
    scribe positivum a   # verum
    scribe negativum a   # falsum
    scribe positivum b   # falsum
    scribe negativum b   # verum

    # Null checks
    fixum textus? maybe = nihil
    scribe nulla maybe      # verum (is null)
    scribe nonnulla maybe   # falsum (is not null)

    fixum textus? present = "salve"
    scribe nulla present    # falsum
    scribe nonnulla present # verum
}
```

### range

```faber
# Range expressions
# Demonstrates exclusive, inclusive, stepped, and descending ranges

incipit {
    # Exclusive range: 0..10 (0 to 9)
    ex 0..5 pro i {
        scribe i
    }

    # Inclusive range: 0 usque 10 (0 to 10)
    ex 0 usque 5 pro i {
        scribe i
    }

    # Explicit exclusive: 0 ante 10 (same as 0..10)
    ex 0 ante 5 pro i {
        scribe i
    }

    # With step: 0..10 per 2 (0, 2, 4, 6, 8)
    ex 0..10 per 2 pro i {
        scribe i
    }

    # Descending: 10..0 per -1 (10, 9, 8, ..., 1)
    ex 10..0 per -1 pro i {
        scribe i
    }

    # Descending with larger step
    ex 10 usque 0 per -2 pro i {
        scribe i
    }
}
```

### est

```faber
# Type checking with est, boolean checking with verum/falsum
#
# est = "is" (type check, like instanceof)
# verum x = "x is true" (strict boolean check)
# falsum x = "x is false" (strict boolean check)

incipit {
    # Null checking with est
    fixum numerus? maybeValue = nihil
    fixum isNull = maybeValue est nihil
    scribe isNull

    # Boolean true check with verum prefix
    fixum enabled = verum
    fixum isTrue = verum enabled
    scribe isTrue

    # Boolean false check with falsum prefix
    fixum disabled = falsum
    fixum isFalse = falsum disabled
    scribe isFalse

    # Chained with logical operators
    fixum textus? name = nihil
    fixum needsDefault = name est nihil et verum enabled
    scribe needsDefault

    # Parenthesized for clarity
    fixum bothNull = (maybeValue est nihil) et (name est nihil)
    scribe bothNull
}
```

### assignment

```faber
# Assignment expressions
# Simple and compound assignment operators

incipit {
    varia numerus x = 10

    # Simple assignment
    x = 20
    scribe x  # 20

    # Compound assignments
    x += 5
    scribe x  # 25

    x -= 10
    scribe x  # 15

    x *= 2
    scribe x  # 30

    x /= 3
    scribe x  # 10

    # String concatenation
    varia textus s = "hello"
    s += " world"
    scribe s  # hello world
}
```

## fac

### basic

```faber
# Basic fac (do) scope blocks
#
# fac { <body> }

incipit {
    # Simple scope block
    fac {
        fixum x = 42
        scribe x
    }

    # Scope block isolates variables
    fac {
        fixum message = "Hello from fac block"
        scribe message
    }

    # Multiple statements in scope
    fac {
        fixum a = 10
        fixum b = 20
        fixum sum = a + b
        scribe sum
    }
}
```

### with-cape

```faber
# Fac blocks with error handling (cape)
#
# fac { <body> } cape <error> { <handler> }

incipit {
    # Basic fac with cape for error handling
    fac {
        fixum x = 10
        scribe x
    } cape err {
        scribe err
    }

    # Scope block that might throw
    fac {
        fixum value = 42
        scribe value
    } cape error {
        scribe "Error occurred:"
        scribe error
    }
}
```

## functio

### optional

```faber
# Optional parameters with si and vel
#
# si marks a parameter as optional
# vel provides a default value
#
# GRAMMAR:
#   parameter := (preposition)? 'si'? type name ('ut' alias)? ('vel' default)?

# Optional parameter without default (receives nihil if omitted)
functio greet(textus nomen, si textus titulus) -> textus {
    si titulus est nihil {
        redde scriptum("Salve, §!", nomen)
    }
    redde scriptum("Salve, § §!", titulus, nomen)
}

# Optional parameter with default value
functio paginate(si numerus pagina vel 1, si numerus per_pagina vel 10) -> textus {
    redde scriptum("Page § with § items", pagina, per_pagina)
}

# Preposition with optional: de si (borrowed, optional without default)
functio analyze(textus source, de si numerus depth) -> numerus {
    si depth est nihil {
        redde 3
    }
    redde depth
}

# Mixed required and optional parameters
functio createUser(textus nomen, si numerus aetas vel 0, si bivalens activus vel verum) -> textus {
    redde scriptum("User: §, age: §, active: §", nomen, aetas, activus)
}

incipit {
    # Without optional arg
    scribe greet("Marcus")

    # With optional arg
    scribe greet("Marcus", "Dominus")

    # Default pagination
    scribe paginate()

    # Custom pagination
    scribe paginate(2, 25)

    # Partial defaults
    scribe paginate(5)

    # With borrowed optional
    scribe analyze("code")
    scribe analyze("code", 5)

    # Mixed args
    scribe createUser("Julia")
    scribe createUser("Julia", 25)
    scribe createUser("Julia", 25, falsum)
}
```

### basic

```faber
# Basic function declarations
#
# functio <name>() { <body> }
# functio <name>() -> <type> { <body> }

# Function with no parameters, no return
functio saluta() {
    scribe "Salve, Mundus!"
}

# Function with parameter, no explicit return type
functio dic(verbum) {
    scribe verbum
}

# Function with return type
functio nomen() -> textus {
    redde "Marcus Aurelius"
}

# Function with parameter and return type
functio duplica(n) -> numerus {
    redde n * 2
}

incipit {
    saluta()

    dic("Bonum diem!")

    fixum rex = nomen()
    scribe rex

    scribe duplica(21)
}
```

### recursion

```faber
# Recursive functions
#
# Functions that call themselves with a base case

# Factorial: n! = n * (n-1)!
functio factorial(numerus n) -> numerus {
    si n <= 1 {
        redde 1
    }
    redde n * factorial(n - 1)
}

# Fibonacci: fib(n) = fib(n-1) + fib(n-2)
functio fibonacci(numerus n) -> numerus {
    si n <= 0 {
        redde 0
    }
    si n == 1 {
        redde 1
    }
    redde fibonacci(n - 1) + fibonacci(n - 2)
}

# Sum from 1 to n
functio summatio(numerus n) -> numerus {
    si n <= 0 {
        redde 0
    }
    redde n + summatio(n - 1)
}

incipit {
    # Factorial examples
    scribe factorial(0)
    scribe factorial(1)
    scribe factorial(5)
    scribe factorial(10)

    # Fibonacci examples
    scribe fibonacci(0)
    scribe fibonacci(1)
    scribe fibonacci(10)

    # Sum examples
    scribe summatio(5)
    scribe summatio(10)
}
```

### typed

```faber
# Functions with typed parameters
#
# functio <name>(type param, type param) -> type { <body> }

# Single typed parameter
functio quadratum(numerus n) -> numerus {
    redde n * n
}

# Multiple typed parameters
functio adde(numerus a, numerus b) -> numerus {
    redde a + b
}

# Mixed types
functio describe(textus nomen, numerus aetas) -> textus {
    redde scriptum("§ habet § annos", nomen, aetas)
}

# Boolean parameter and return
functio nega(bivalens valor) -> bivalens {
    redde non valor
}

# Function with fractus (float) type
functio media(fractus a, fractus b) -> fractus {
    redde (a + b) / 2.0
}

incipit {
    scribe quadratum(7)

    scribe adde(100, 200)

    scribe describe("Julius", 30)

    scribe nega(verum)
    scribe nega(falsum)

    scribe media(3.0, 7.0)
}
```

## genus

### basic

```faber
# Basic genus (class/struct) with properties
#
# genus <Name> {
#     <type> <property>
#     <type> <property>: <default>
# }

genus Punctum {
    numerus x
    numerus y
}

genus Persona {
    textus nomen
    numerus aetas: 0
    bivalens activus: verum
}

incipit {
    # Instantiate with all required fields
    fixum p = novum Punctum {
        x: 10,
        y: 20
    }

    scribe p.x
    scribe p.y

    # Instantiate with required + optional defaults
    fixum marcus = novum Persona {
        nomen: "Marcus"
    }

    scribe marcus.nomen
    scribe marcus.aetas
    scribe marcus.activus

    # Override defaults
    fixum julia = novum Persona {
        nomen: "Julia",
        aetas: 25,
        activus: falsum
    }

    scribe julia.nomen
    scribe julia.aetas
    scribe julia.activus
}
```

### methods

```faber
# Genus with methods using ego (self) reference
#
# genus <Name> {
#     <type> <property>
#     functio <method>() -> <type> { ... ego.<property> ... }
# }

genus Rectangle {
    numerus width: 1
    numerus height: 1

    functio area() -> numerus {
        redde ego.width * ego.height
    }

    functio perimeter() -> numerus {
        redde 2 * (ego.width + ego.height)
    }

    functio isSquare() -> bivalens {
        redde ego.width == ego.height
    }
}

genus Counter {
    numerus count: 0

    functio increment() {
        ego.count = ego.count + 1
    }

    functio getValue() -> numerus {
        redde ego.count
    }
}

incipit {
    # Methods that return values
    fixum rect = novum Rectangle {
        width: 10,
        height: 5
    }

    scribe rect.area()
    scribe rect.perimeter()
    scribe rect.isSquare()

    # Methods that modify state
    varia counter = novum Counter

    scribe counter.getValue()

    counter.increment()
    scribe counter.getValue()

    counter.increment()
    counter.increment()
    scribe counter.getValue()
}
```

### creo

```faber
# Genus with constructor hook (creo)
#
# genus <Name> {
#     <type> <property>: <default>
#     functio creo() { ... }
# }
#
# creo() runs after defaults and overrides are merged.
# Use for validation, clamping, or derived initialization.

genus BoundedValue {
    numerus value: 0

    functio creo() {
        si ego.value < 0 {
            ego.value = 0
        }

        si ego.value > 100 {
            ego.value = 100
        }
    }

    functio getValue() -> numerus {
        redde ego.value
    }
}

genus Circle {
    numerus radius: 1
    numerus diameter: 0
    numerus area: 0

    functio creo() {
        ego.diameter = ego.radius * 2
        ego.area = 3.14159 * ego.radius * ego.radius
    }
}

incipit {
    # Validation in creo
    fixum normal = novum BoundedValue {
        value: 50
    }

    scribe normal.getValue()

    fixum clamped = novum BoundedValue {
        value: 200
    }

    scribe clamped.getValue()

    # Derived initialization in creo
    fixum c = novum Circle {
        radius: 5
    }

    scribe c.radius
    scribe c.diameter
    scribe c.area
}
```

## iace

### basic

```faber
# Basic iace (throw) statement
#
# iace <expression>

incipit {
    # Throw with string literal
    tempta {
        iace "Something went wrong"
    }
    cape err {
        scribe "Caught:", err
    }

    # Throw with formatted message
    fixum code = 404
    tempta {
        iace scriptum("Error code: §", code)
    }
    cape err {
        scribe "Caught:", err
    }

    # Throw from conditional
    fixum value = -5
    tempta {
        si value < 0 {
            iace "Value must be non-negative"
        }
        scribe "Value is valid"
    }
    cape err {
        scribe "Validation failed:", err
    }
}
```

## importa

### basic

```faber
# Import statements (importa)
#
# ex <source> importa <names>           - named imports
# ex <source> importa <name> ut <alias> - import with alias
# ex <source> importa * ut <alias>      - wildcard import with alias

# Named imports
ex "lodash" importa map
ex "@hono/hono" importa Hono, Context
ex "utils" importa helper ut h
ex "db" importa connect, query ut q, close

# Wildcard import (alias required for TypeScript target)
ex "@std/crypto" importa * ut crypto

# Multiple imports from different sources
ex "@oak/oak" importa Application
ex "std/path" importa join, resolve

# Relative imports
ex "./utils" importa helper
ex "../shared/utils" importa formatter

# Many named items
ex "helpers" importa a, b, c, d, e, f

# Multiple aliases
ex "mod" importa foo ut f, bar ut b, baz ut z

incipit {
    scribe "Import statements are declarations at module scope"
}
```

## importa-local

### main

```faber
# Example of local file imports

# Import specific symbols from local file
ex "./utils" importa greet, ANSWER, Point

# Use the imported function
fixum textus message = greet("World")
scribe message

# Use the imported constant
scribe scriptum("The answer is §", ANSWER)

# Use the imported genus
fixum Point p = { x: 10, y: 20 } qua Point
```

### utils

```faber
# Example utility module for local import testing

# A simple greeting function
functio greet(textus name) -> textus {
    redde scriptum("Hello, §!", name)
}

# A constant value
fixum numerus ANSWER = 42

# A genus for testing
genus Point {
    numerus x
    numerus y
}
```

## in

### basic

```faber
# Basic in (mutation block) statements
#
# in <object> { <assignments> }

incipit {
    # Create an object with initial values
    varia user = { nomen: "", aetas: 0, active: falsum }

    # Mutation block: set multiple fields at once
    in user {
        nomen = "Marcus"
        aetas = 42
        active = verum
    }

    scribe user.nomen
    scribe user.aetas

    # Single-line mutation block
    varia stats = { count: 0 }
    in stats { count = 1 }

    scribe stats.count

    # Mutation with computed values
    fixum width = 10
    fixum height = 20
    varia rect = { w: 0, h: 0, area: 0 }

    in rect {
        w = width
        h = height
        area = width * height
    }

    scribe rect.area

    # Nested object mutation
    varia config = { server: { host: "", port: 0 } }

    in config.server {
        host = "localhost"
        port = 8080
    }

    scribe config.server.host
}
```

## incipit

### basic

```faber
# Basic incipit (entry point)
#
# incipit { <body> }

incipit {
    scribe "Salve, Munde!"
}
```

### with-functions

```faber
# Entry point with functions defined outside
#
# Functions declared outside incipit become module-level declarations.
# The incipit block calls them as needed.

functio greet(textus name) -> textus {
    redde scriptum("Salve, §!", name)
}

functio add(numerus a, numerus b) -> numerus {
    redde a + b
}

incipit {
    scribe greet("Marcus")
    scribe "Sum:", add(3, 5)
}
```

## ordo

### basic

```faber
# Basic ordo (enum) declaration
#
# ordo Name { Member1, Member2, Member3 }
# ordo Name { Member1 = value1, Member2 = value2 }

ordo Color { rubrum, viridis, caeruleum }

ordo Status { pendens = 0, actum = 1, finitum = 2 }

incipit {
    # Using enum values
    fixum color = Color.rubrum
    fixum status = Status.actum

    # Switch on enum
    elige color {
        casu Color.rubrum {
            scribe "Red"
        }
        casu Color.viridis {
            scribe "Green"
        }
        casu Color.caeruleum {
            scribe "Blue"
        }
    }

    # Switch on enum with numeric values
    elige status {
        casu Status.pendens {
            scribe "Pending"
        }
        casu Status.actum {
            scribe "Active"
        }
        casu Status.finitum {
            scribe "Finished"
        }
    }
}
```

## pactum

### basic

```faber
# Basic pactum (interface) definition and implementation
#
# pactum <Name> { functio <method>(<params>) -> <returnType> }
# genus <Name> implet <Pactum> { <implementation> }

pactum Drawable {
    functio draw() -> vacuum
}

genus Circle implet Drawable {
    numerus radius: 10

    functio draw() {
        scribe scriptum("Drawing circle with radius §", ego.radius)
    }
}

genus Square implet Drawable {
    numerus side: 5

    functio draw() {
        scribe scriptum("Drawing square with side §", ego.side)
    }
}

incipit {
    fixum circle = novum Circle { radius: 25 }
    fixum square = novum Square { side: 15 }

    circle.draw()
    square.draw()
}
```

## perge

### basic

```faber
# Continue (perge) in loops
#
# perge skips to the next iteration of the innermost loop

incipit ergo cura arena {
    # Skip even numbers
    varia i = 0

    dum i < 10 {
        i = i + 1

        si i % 2 == 0 {
            perge
        }

        scribe i
    }

    # Continue in nested loop (affects inner only)
    varia outer = 0

    dum outer < 3 {
        varia inner = 0

        dum inner < 5 {
            inner = inner + 1

            si inner == 3 {
                perge
            }

            scribe scriptum("outer=§, inner=§", outer, inner)
        }

        outer = outer + 1
    }
}
```

## proba

### basic

```faber
# Basic proba (test) statements
#
# proba "name" { body }

# Simple test with single assertion
proba "one plus one equals two" {
    adfirma 1 + 1 == 2
}

# Test with multiple assertions
proba "validates arithmetic" {
    adfirma 2 + 2 == 4
    adfirma 10 - 3 == 7
    adfirma 3 * 4 == 12
}

# Test with variables
proba "string concatenation works" {
    fixum greeting = "hello"
    fixum name = "world"
    fixum result = scriptum("§ §", greeting, name)
    adfirma result == "hello world"
}

# Test boolean conditions
proba "comparison operators" {
    fixum x = 10
    adfirma x > 5
    adfirma x < 20
    adfirma x >= 10
    adfirma x <= 10
}

# Test with negation
proba "negated assertions" {
    adfirma non falsum
    adfirma non (1 == 2)
}

# Test with complex logical assertion
proba "complex assertion" {
    fixum x = 50
    adfirma x > 0 et x < 100
}
```

### modifiers

```faber
# Test modifiers: omitte (skip) and futurum (todo)
#
# proba omitte "reason" "name" { body }
# proba futurum "reason" "name" { body }

# Skip a test with reason and name
proba omitte "blocked by issue #42" "database connection test" {
    adfirma falsum
}

# Todo test with reason and name
proba futurum "needs async support" "async file operations" {
    adfirma verum
}

# Regular test alongside modifiers
proba "this test runs normally" {
    adfirma 1 + 1 == 2
}

# Multiple skipped tests
proba omitte "flaky on CI" "network timeout test" {
    adfirma falsum
}

proba omitte "platform specific" "windows-only behavior" {
    adfirma falsum
}

# Multiple todo tests
proba futurum "needs new API" "graphql mutations" {
    adfirma verum
}

proba futurum "depends on feature X" "caching layer" {
    adfirma verum
}

# Skipped test with complex body
proba omitte "external service down" "api integration" {
    fixum status = 500
    adfirma status == 200
}

# Todo test with setup
proba futurum "needs database fixtures" "user creation flow" {
    varia userId = 0
    adfirma userId > 0
}
```

## redde

### basic

```faber
# Basic redde (return) statements
#
# redde <expression>   -- return a value
# redde                -- void return

functio add(numerus a, numerus b) fit numerus {
    redde a + b
}

functio greet(textus name) fit textus {
    redde "Hello, " + name
}

functio getFortyTwo() fit numerus {
    redde 42
}

functio doNothing() fit vacuum {
    redde
}

functio earlyExit(numerus x) fit numerus {
    si x < 0 {
        redde 0
    }
    redde x * 2
}

incipit {
    scribe add(10, 20)
    scribe greet("World")
    scribe getFortyTwo()
    doNothing()
    scribe earlyExit(-5)
    scribe earlyExit(10)
}
```

## rumpe

### basic

```faber
# Break (rumpe) in loops
#
# rumpe exits the innermost loop immediately

incipit ergo cura arena {
    # Break when reaching 5
    varia i = 0

    dum i < 10 {
        si i == 5 {
            rumpe
        }
        scribe i
        i = i + 1
    }

    # Break in nested loop (exits inner only)
    varia outer = 0

    dum outer < 3 {
        varia inner = 0

        dum inner < 10 {
            si inner == 2 {
                rumpe
            }
            scribe scriptum("outer=§, inner=§", outer, inner)
            inner = inner + 1
        }

        outer = outer + 1
    }
}
```

## scribe

### levels

```faber
# Output statements with different log levels
#
# scribe <expr>  -> console.log (standard output)
# vide <expr>    -> console.debug (debug output)
# mone <expr>    -> console.warn (warning output)

incipit {
    fixum status = "running"
    fixum count = 42

    # Standard output (console.log)
    scribe "Application started"
    scribe "Status:", status

    # Debug output (console.debug)
    vide "Debug: entering main loop"
    vide "Debug: count =", count

    # Warning output (console.warn)
    mone "Warning: deprecated feature used"
    mone "Warning: count exceeds threshold:", count
}
```

### basic

```faber
# Basic scribe (print) statements
#
# scribe <expr>
# scribe <expr>, <expr>, ...

incipit {
    # Simple string output
    scribe "Hello, world!"

    # Variable output
    fixum nomen = "Marcus"
    scribe nomen

    # Multiple arguments
    fixum aetas = 30
    scribe "Name:", nomen
    scribe "Age:", aetas

    # Expressions
    fixum x = 10
    fixum y = 20
    scribe "Sum:", x + y

    # Multiple values in one statement
    scribe "Coordinates:", x, y
}
```

## si

### nested

```faber
# Nested si conditionals

incipit {
    fixum isLoggedIn = verum
    fixum hasPermission = verum

    si isLoggedIn {
        si hasPermission {
            scribe "Access granted"
        }
        secus {
            scribe "Permission denied"
        }
    }
    secus {
        scribe "Please log in"
    }
}
```

### with-reddit

```faber
# Si with reddit syntax
#
# 'reddit' is syntactic sugar for 'ergo redde' - a one-liner return.
# Use it for early returns and guard clauses.
#
# si <condition> reddit <expression>
# sin <condition> reddit <expression>
# secus reddit <expression>

# Early return pattern
functio classify(numerus x) -> textus {
    si x < 0 reddit "negative"
    si x == 0 reddit "zero"
    redde "positive"
}

# Guard clause pattern
functio divide(numerus a, numerus b) -> numerus? {
    si b == 0 reddit nihil
    redde a / b
}

# Sin/secus chain with reddit
functio grade(numerus score) -> textus {
    si score >= 90 reddit "A"
    sin score >= 80 reddit "B"
    sin score >= 70 reddit "C"
    sin score >= 60 reddit "D"
    secus reddit "F"
}

# Find first in list (early return from loop)
functio findFirst(lista<numerus> items, numerus target) -> numerus? {
    ex items pro item {
        si item == target reddit item
    }
    redde nihil
}

# Check if key exists (early return from iteration)
functio hasKey(tabula<textus, numerus> obj, textus key) -> bivalens {
    de obj pro k {
        si k == key reddit verum
    }
    redde falsum
}

incipit {
    scribe classify(-5)   # negative
    scribe classify(0)    # zero
    scribe classify(10)   # positive

    scribe divide(10, 2)  # 5
    scribe divide(10, 0)  # nihil

    scribe grade(95)  # A
    scribe grade(85)  # B
    scribe grade(55)  # F

    fixum nums = [1, 2, 3, 4, 5]
    scribe findFirst(nums, 3)  # 3
    scribe findFirst(nums, 9)  # nihil
}
```

### si-aliter

```faber
# si-secus (if-else) conditionals
#
# si <condition> { <body> } secus { <body> }
# si <cond1> { } sin <cond2> { } secus { }

incipit {
    # Simple if-else
    fixum score = 85

    si score >= 90 {
        scribe "Grade: A"
    }
    secus {
        scribe "Grade: B or lower"
    }

    # Multiple statements in branches
    fixum temperature = 22

    si temperature > 30 {
        scribe "Hot"
        scribe "Stay hydrated"
    }
    secus {
        scribe "Comfortable"
        scribe "Enjoy the weather"
    }

    # If-else-if chain
    fixum grade = 75

    si grade >= 90 {
        scribe "A - Excellent"
    }
    sin grade >= 80 {
        scribe "B - Good"
    }
    sin grade >= 70 {
        scribe "C - Satisfactory"
    }
    sin grade >= 60 {
        scribe "D - Passing"
    }
    secus {
        scribe "F - Failing"
    }
}
```

### ergo

```faber
# One-liner conditionals with ergo
#
# si <condition> ergo <statement>
# si <condition> ergo <statement> secus <statement>
#
# ergo = "therefore, thus" (logical consequence)

incipit {
    fixum x = 10

    # Simple one-liner
    si x > 5 ergo scribe "x is big"

    # One-liner if-else
    fixum age = 25
    si age >= 18 ergo scribe "Adult" secus scribe "Minor"

    # Multiple conditions
    fixum score = 85
    si score >= 90 ergo scribe "A" secus scribe "Not A"

    # Simple validation
    fixum valid = verum
    si valid ergo scribe "OK"
}
```

### si-sin-secus

```faber
# si-sin-secus (poetic if-else-if chain)
#
# Poetic alternative to si/sin/secus:
#   si   = if
#   sin  = else if ("but if")
#   secus = else ("otherwise")

incipit {
    fixum hour = 14

    si hour < 6 {
        scribe "Late night"
    }
    sin hour < 12 {
        scribe "Morning"
    }
    sin hour < 18 {
        scribe "Afternoon"
    }
    sin hour < 22 {
        scribe "Evening"
    }
    secus {
        scribe "Night"
    }
}
```

### basic

```faber
# Basic si (if) conditionals
#
# si <condition> { <body> }

incipit {
    fixum x = 10

    si x > 5 {
        scribe "x is greater than 5"
    }

    si x > 20 {
        scribe "x is greater than 20"
    }

    # Multiple statements in block
    fixum age = 25

    si age >= 18 {
        scribe "Adult"
        scribe "Can vote"
    }
}
```

### est

```faber
# Type and boolean checking
#
# est = "is" (type check)
# verum x = strict boolean true check
# falsum x = strict boolean false check

functio checkValue(x) -> textus {
    si x est nihil { redde "is null" }
    si verum x { redde "is true" }
    si falsum x { redde "is false" }
    redde "is something else"
}

incipit {
    scribe checkValue(nihil)
    scribe checkValue(verum)
    scribe checkValue(42)
}
```

## statements

### si

```faber
# ============================================================================
# Si Statement (Conditionals)
# ============================================================================
#
# The 'si' statement provides conditional execution. It supports block form,
# one-liner form (ergo), else-if chains (sin), else clauses (secus), and
# inline error handling (cape).
#
# ----------------------------------------------------------------------------
# GRAMMAR: Si Statement
# ----------------------------------------------------------------------------
#
#   ifStmt := 'si' expression (blockStmt | 'ergo' statement)
#             ('cape' IDENTIFIER blockStmt)?
#             (elseClause | 'sin' ifStmt)?
#
#   elseClause := 'secus' (ifStmt | blockStmt | statement)
#
# Components:
#   - 'si' expression { }        — basic conditional
#   - 'si' expression ergo stmt  — one-liner form
#   - 'cape' err { }             — inline error handling
#   - 'sin' expression { }       — else-if branch
#   - 'secus' { }                — else branch
#
# ----------------------------------------------------------------------------
# KEYWORDS
# ----------------------------------------------------------------------------
#
#   si     = "if" (Latin: "if")
#   sin    = "else if" (Latin: "but if", contraction of 'si' + 'non')
#   secus  = "else" (Latin: "otherwise")
#   ergo   = "therefore" (Latin: enables one-liner consequent)
#   cape   = "catch" (Latin: "seize", inline error handling)
#
# ----------------------------------------------------------------------------
# READING THE CHAIN
# ----------------------------------------------------------------------------
#
# A complete conditional chain reads as classical Latin:
#
#   si x > 0 { positive() }      — "if x > 0..."
#   sin x < 0 { negative() }     — "but if x < 0..."
#   secus { zero() }             — "otherwise..."
#
# 'sin' is a contraction of 'si non' (if not / but if), common in Latin prose.
#
# ============================================================================
# LLM GUIDANCE
# ============================================================================
#
# ALWAYS use Latin keywords:
#   - 'si' not 'if'
#   - 'sin' not 'else if' or 'elif'
#   - 'secus' not 'else'
#   - 'ergo' for one-liners (no equivalent in JS/TS)
#
# NEVER use JavaScript/TypeScript patterns:
#   - 'if' does not exist
#   - 'else if' does not exist — use 'sin'
#   - 'else' does not exist — use 'secus'
#   - Parentheses around condition are NOT required: si x > 5 { }
#
# PREFER:
#   - Block form for multiple statements
#   - 'ergo' form for simple one-liners
#   - 'sin' chains over nested 'si' when checking related conditions
#
# ============================================================================
# EXAMPLES
# ============================================================================

incipit {
    # ==========================================================================
    # SECTION: Basic Conditionals
    # ==========================================================================
    #
    # si <condition> { <body> }
    #
    # The simplest form. Condition is evaluated, block executes if truthy.
    # No parentheses required around the condition.

    fixum x = 10

    si x > 5 {
        scribe "x is greater than 5"
    }

    si x > 20 {
        scribe "x is greater than 20"
    }

    # Multiple statements in block
    fixum age = 25

    si age >= 18 {
        scribe "Adult"
        scribe "Can vote"
    }

    # ==========================================================================
    # SECTION: One-liner Form (ergo)
    # ==========================================================================
    #
    # si <condition> ergo <statement>
    # si <condition> ergo <statement> secus <statement>
    #
    # 'ergo' (therefore) enables concise single-statement consequents.
    # Can be combined with 'secus' for one-liner if-else.

    # Simple one-liner
    si x > 5 ergo scribe "x is big"

    # One-liner if-else
    si age >= 18 ergo scribe "Adult" secus scribe "Minor"

    # Multiple conditions with ergo
    fixum score = 85
    si score >= 90 ergo scribe "A" secus scribe "Not A"

    # Simple validation
    fixum valid = verum
    si valid ergo scribe "OK"

    # ==========================================================================
    # SECTION: If-Else (secus)
    # ==========================================================================
    #
    # si <condition> { } secus { }
    #
    # 'secus' (otherwise) provides the else branch.

    si score >= 90 {
        scribe "Grade: A"
    }
    secus {
        scribe "Grade: B or lower"
    }

    # Multiple statements in branches
    fixum temperature = 22

    si temperature > 30 {
        scribe "Hot"
        scribe "Stay hydrated"
    }
    secus {
        scribe "Comfortable"
        scribe "Enjoy the weather"
    }

    # ==========================================================================
    # SECTION: If-Elseif-Else Chain (sin/secus)
    # ==========================================================================
    #
    # si <cond1> { } sin <cond2> { } sin <cond3> { } secus { }
    #
    # 'sin' (but if) chains multiple conditions. More readable than nested si.
    # Evaluates top-to-bottom, first match wins.

    fixum grade = 75

    si grade >= 90 {
        scribe "A - Excellent"
    }
    sin grade >= 80 {
        scribe "B - Good"
    }
    sin grade >= 70 {
        scribe "C - Satisfactory"
    }
    sin grade >= 60 {
        scribe "D - Passing"
    }
    secus {
        scribe "F - Failing"
    }

    # Time of day example
    fixum hour = 14

    si hour < 6 {
        scribe "Late night"
    }
    sin hour < 12 {
        scribe "Morning"
    }
    sin hour < 18 {
        scribe "Afternoon"
    }
    sin hour < 22 {
        scribe "Evening"
    }
    secus {
        scribe "Night"
    }

    # ==========================================================================
    # SECTION: Type Checking (est / non est)
    # ==========================================================================
    #
    # 'est' performs type/identity checks (like === for primitives).
    # 'non est' negates the check.
    # For null checks, prefer 'nihil x' or 'nonnihil x' unary forms.

    fixum textus? maybeName = nihil

    si maybeName est nihil {
        scribe "Name is null"
    }

    fixum active = verum

    si verum active {
        scribe "Is exactly true"
    }

    si non falsum active {
        scribe "Is not false"
    }

    # ==========================================================================
    # SECTION: Nested Conditionals
    # ==========================================================================
    #
    # Conditionals can be nested, but prefer sin chains when checking
    # related conditions to reduce nesting depth.

    fixum isLoggedIn = verum
    fixum hasPermission = verum

    si isLoggedIn {
        si hasPermission {
            scribe "Access granted"
        }
        secus {
            scribe "Permission denied"
        }
    }
    secus {
        scribe "Please log in"
    }

    # Better: use 'et' to combine conditions when possible
    si isLoggedIn et hasPermission {
        scribe "Access granted (combined check)"
    }

    # ==========================================================================
    # SECTION: Inline Error Handling (cape)
    # ==========================================================================
    #
    # si <condition> { } cape <error> { }
    #
    # 'cape' (catch/seize) provides inline error handling for expressions
    # that might throw. The error is bound to the identifier.

    si riskyOperation() {
        scribe "Operation succeeded"
    }
    cape err {
        scribe "Operation failed"
        scribe err
    }

    # Combined with else
    si anotherRiskyOp() {
        scribe "Success"
    }
    cape err {
        scribe "Caught error"
    }
    secus {
        scribe "Condition was falsy but no error"
    }

    # ==========================================================================
    # SECTION: Unary Condition Operators
    # ==========================================================================
    #
    # Faber provides Latin unary operators for common condition patterns.
    # These read more naturally and reduce symbolic noise.
    #
    # GRAMMAR (from unary):
    #   unary := ('non' | 'nulla' | 'nonnulla' | 'nihil' | 'nonnihil'
    #           | 'negativum' | 'positivum' | ...) unary
    #
    # Operators:
    #   non x       — logical not (replaces !x)
    #   nihil x     — x is null (replaces x === null)
    #   nonnihil x  — x is not null (replaces x !== null)
    #   nulla x     — x is empty/none (empty string, empty list, 0)
    #   nonnulla x  — x is non-empty/some
    #   negativum x — x < 0
    #   positivum x — x > 0

    fixum value = 42

    # Numeric sign checks
    si positivum value {
        scribe "value is positive"
    }

    si negativum value {
        scribe "value is negative"
    }

    # Compare: si value > 0 vs si positivum value
    # The unary form is more declarative

    # Null checks
    fixum textus? optionalName = nihil

    si nihil optionalName {
        scribe "name is null"
    }

    si nonnihil optionalName {
        scribe "name has a value"
    }

    # Empty checks
    fixum items = [] qua lista<numerus>

    si nulla items {
        scribe "list is empty"
    }

    fixum message = "hello"

    si nonnulla message {
        scribe "message is not empty"
    }

    # ==========================================================================
    # SECTION: Logical Operators in Conditions
    # ==========================================================================
    #
    # Use 'et' (and), 'aut' (or), 'non' (not) in conditions.
    # PREFER Latin operators over && || !

    fixum a = verum
    fixum b = falsum

    si a et b {
        scribe "Both true"
    }

    si a aut b {
        scribe "At least one true"
    }

    si non b {
        scribe "b is false"
    }

    # Combined conditions
    fixum userAge = 25
    fixum hasID = verum

    si userAge >= 21 et hasID {
        scribe "Can purchase alcohol"
    }

    si userAge < 13 aut userAge >= 65 {
        scribe "Eligible for discount"
    }
}

# ==========================================================================
# Helper functions for error handling examples
# ==========================================================================

functio riskyOperation() -> bivalens {
    redde verum
}

functio anotherRiskyOp() -> bivalens {
    redde falsum
}
```

## tempta-cape

### in-functio

```faber
# Error handling in functions
#
# Functions can use tempta-cape to handle errors internally
# or let errors propagate to callers

functio safeDivide(numerus a, numerus b) -> numerus {
    tempta {
        si b == 0 {
            iace "Division by zero"
        }
        redde a / b
    }
    cape err {
        scribe "Error:", err
        redde 0
    }
}

functio validatePositive(numerus value) -> numerus {
    tempta {
        si value < 0 {
            iace "Negative value not allowed"
        }
        redde value * 2
    }
    cape err {
        scribe "Validation failed:", err
        redde 0
    }
}

functio processWithCleanup(textus name) {
    varia resource = "pending"

    tempta {
        scribe "Opening:", name
        resource = name

        si name == "" {
            iace "Empty name"
        }

        scribe "Processing:", resource
    }
    cape err {
        scribe "Error:", err
    }
    demum {
        scribe "Closing:", resource
    }
}

functio withReturnInDemum() -> textus {
    tempta {
        scribe "Starting operation"
        redde "success"
    }
    cape err {
        redde "error"
    }
    demum {
        scribe "Demum runs before return"
    }
}

incipit {
    scribe "Safe divide 10/2:", safeDivide(10, 2)
    scribe "Safe divide 10/0:", safeDivide(10, 0)

    scribe "Validate 5:", validatePositive(5)
    scribe "Validate -3:", validatePositive(-3)

    processWithCleanup("data.txt")
    processWithCleanup("")

    scribe "Result:", withReturnInDemum()
}
```

### basic

```faber
# Basic tempta-cape (try-catch) with iace (throw)
#
# tempta { <body> }
# cape <errorName> { <handler> }
# iace <expression>

incipit {
    # Basic try-catch
    tempta {
        scribe "Attempting operation..."
        iace "Something went wrong"
        scribe "This line never runs"
    }
    cape err {
        scribe "Caught error:", err
    }

    # tempta-cape-demum (try-catch-finally)
    tempta {
        scribe "Opening resource..."
        iace "Failed to open"
    }
    cape err {
        scribe "Error occurred:", err
    }
    demum {
        scribe "Cleanup: always runs"
    }

    # demum without cape
    tempta {
        scribe "Operation succeeds"
    }
    demum {
        scribe "Cleanup runs anyway"
    }

    # Nested tempta blocks
    tempta {
        scribe "Outer try"

        tempta {
            scribe "Inner try"
            iace "Inner error"
        }
        cape inner {
            scribe "Caught inner:", inner
        }

        scribe "Continues after inner catch"
    }
    cape outer {
        scribe "Outer catch:", outer
    }
}
```

## typealias

### basic

```faber
# Basic type aliases
#
# typus Name = Type

# Primitive type aliases
typus UserId = numerus
typus Username = textus
typus IsActive = bivalens

# Generic type aliases
typus Names = lista<textus>
typus Scores = lista<numerus>
typus UserCache = tabula<textus, numerus>

# Nullable type alias
typus OptionalName = textus?

incipit {
    # Using the type aliases
    fixum UserId id = 42
    fixum Username name = "Marcus"
    fixum IsActive active = verum

    scribe id
    scribe name
    scribe active

    # Using generic type aliases
    fixum Names friends = ["Gaius", "Lucius", "Titus"]
    scribe friends

    fixum Scores points = [100, 95, 87]
    scribe points
}
```

## varia

### destructure

```faber
# Array destructuring declarations
#
# fixum [a, b, c] = array   -- destructure into immutable bindings
# varia [x, y, z] = array   -- destructure into mutable bindings

incipit {
    # Basic array destructuring
    fixum numbers = [1, 2, 3]
    fixum [a, b, c] = numbers

    scribe a
    scribe b
    scribe c

    # Destructure inline array
    fixum [first, second, third] = [10, 20, 30]

    scribe first
    scribe second
    scribe third

    # Mutable destructuring
    fixum coords = [100, 200]
    varia [x, y] = coords

    scribe x
    scribe y

    x = x + 50
    y = y + 50

    scribe x
    scribe y

    # Destructure with fewer variables (partial)
    fixum values = [1, 2, 3, 4, 5]
    fixum [one, two] = values

    scribe one
    scribe two

    # Nested arrays
    fixum matrix = [[1, 2], [3, 4]]
    fixum [row1, row2] = matrix

    scribe row1
    scribe row2
}
```

### basic

```faber
# Basic varia and fixum declarations
#
# varia <name> = <expr>   -- mutable binding
# fixum <name> = <expr>   -- immutable binding

incipit {
    # Mutable variable with varia
    varia counter = 0
    scribe counter

    counter = 1
    scribe counter

    counter = counter + 10
    scribe counter

    # Immutable variable with fixum
    fixum greeting = "Salve, Mundus!"
    scribe greeting

    # Multiple declarations
    fixum x = 10
    fixum y = 20
    fixum sum = x + y
    scribe sum

    # Mutable reassignment
    varia message = "Hello"
    message = "Goodbye"
    scribe message
}
```

### typed

```faber
# Typed variable declarations
#
# varia <type> <name> = <expr>   -- typed mutable
# fixum <type> <name> = <expr>   -- typed immutable

incipit {
    # Typed immutable declarations
    fixum numerus age = 30
    fixum textus name = "Marcus"
    fixum bivalens active = verum

    scribe age
    scribe name
    scribe active

    # Typed mutable declarations
    varia numerus count = 0
    varia textus status = "pending"
    varia bivalens running = falsum

    scribe count
    scribe status
    scribe running

    # Reassign mutable typed variables
    count = 100
    status = "complete"
    running = verum

    scribe count
    scribe status
    scribe running

    # Fractional numbers
    fixum fractus pi = 3.14159
    varia fractus rate = 0.05

    scribe pi
    scribe rate

    rate = 0.10
    scribe rate
}
```



---

# Fundamenta


# Fundamenta

The fundamentals of Faber: program structure, variable bindings, literals, output, and patterns. These are the building blocks upon which all Faber programs rest. Understanding them means understanding how Faber uses Latin's clarity to make programming concepts visible.

## Program Structure

Every Faber program needs an entry point. This is where execution begins, and Faber provides two forms depending on whether your program is synchronous or asynchronous.

### Synchronous Entry: incipit

The keyword `incipit` marks the synchronous entry point. It is the third person singular present active indicative of *incipere* (to begin): "it begins."

```fab
incipit {
    scribe "Salve, Munde!"
}
```

This is the simplest possible Faber program. The `incipit` block contains the statements that execute when the program runs. Functions and types defined outside `incipit` become module-level declarations that the entry point can call.

```fab
functio greet(textus name) -> textus {
    redde scriptum("Salve, §!", name)
}

incipit {
    scribe greet("Marcus")
}
```

### Asynchronous Entry: incipiet

When your program needs to perform asynchronous operations at the top level, use `incipiet` instead. This is the future tense: "it will begin." The naming mirrors the `fit`/`fiet` pattern used throughout Faber, where present tense indicates synchronous operations and future tense indicates asynchronous ones.

```fab
incipiet {
    figendum data = fetchData()
    scribe data
}
```

Inside an `incipiet` block, you can use `figendum` and `variandum` (the async binding forms) directly, or use `cede` (yield/await) with regular bindings.

## Variables

Faber distinguishes between mutable and immutable bindings with distinct keywords. This explicitness is a core design principle: the reader should know at a glance whether a value can change.

### Immutable Bindings: fixum

The keyword `fixum` declares an immutable binding. It is the perfect passive participle of *figere* (to fix, fasten): "that which has been fixed." Once bound, a `fixum` value cannot be reassigned.

```fab
fixum greeting = "Salve, Mundus!"
fixum x = 10
fixum y = 20
fixum sum = x + y
```

Immutable bindings are the default choice in Faber. They communicate intent clearly: this value will not change for the remainder of its scope. Prefer `fixum` unless you have a specific reason for mutability.

Type annotations are optional when the type can be inferred, but you can be explicit:

```fab
fixum numerus age = 30
fixum textus name = "Marcus"
fixum bivalens active = verum
```

The pattern is always type-first: `fixum <type> <name> = <value>`. This mirrors Latin's adjective-noun ordering and distinguishes Faber from languages that place types after names.

### Mutable Bindings: varia

The keyword `varia` declares a mutable binding. It comes from *variare* (to vary): "let it vary." A `varia` binding can be reassigned throughout its scope.

```fab
varia counter = 0
scribe counter       # 0

counter = 1
scribe counter       # 1

counter = counter + 10
scribe counter       # 11
```

Use `varia` when a value genuinely needs to change, such as loop counters, accumulators, or state that evolves over time.

```fab
varia numerus count = 0
varia textus status = "pending"
varia bivalens running = falsum

count = 100
status = "complete"
running = verum
```

### Async Bindings: figendum and variandum

Faber provides async-aware binding forms that combine declaration with awaiting. These use the Latin gerundive, a verbal adjective expressing necessity or obligation.

`figendum` means "that which must be fixed." It declares an immutable binding whose value comes from an asynchronous operation:

```fab
figendum result = fetchData()
```

`variandum` means "that which must be varied." It declares a mutable binding from an async source:

```fab
variandum data = loadConfig()
data = transform(data)
```

These forms are syntactic conveniences equivalent to using `cede` (await) with regular bindings, but they make the async nature visible at declaration time.

## Literals

Faber supports the standard literal types with Latin keywords for boolean and null values.

### Numbers

Integers and floating-point numbers use standard notation:

```fab
fixum integer = 42
fixum decimal = 3.14
fixum negative = -100
```

For typed declarations, `numerus` is the integer type and `fractus` (from *frangere*, to break) is the floating-point type:

```fab
fixum numerus count = 42
fixum fractus rate = 0.05
```

### Strings

Strings can use either double or single quotes:

```fab
fixum greeting = "hello"
fixum single = 'single quotes'
```

Template literals use backticks with `${...}` interpolation, following the familiar JavaScript pattern:

```fab
fixum name = "Mundus"
fixum message = `Hello ${name}`
```

### Booleans: verum and falsum

Rather than `true` and `false`, Faber uses Latin: `verum` (true, real) and `falsum` (false, deceptive). These are not arbitrary choices. Latin's *verum* shares its root with English "verify" and "veracity"; *falsum* gives us "falsify."

```fab
fixum yes = verum
fixum no = falsum
fixum bivalens active = verum
```

The type `bivalens` (two-valued) names what a boolean is: a value that can be one of exactly two states.

### Null: nihil

The absence of a value is expressed as `nihil` (nothing). This is clearer than symbols like `null` or `nil` that have become so familiar we no longer notice their meaning.

```fab
fixum nothing = nihil
```

## Output

Faber provides three output statements corresponding to different severity levels. These are imperative forms that write to the console.

### Standard Output: scribe

The keyword `scribe` writes to standard output. It is the imperative of *scribere* (to write): "write!"

```fab
scribe "Hello, world!"
```

Multiple arguments are printed space-separated:

```fab
fixum nomen = "Marcus"
fixum aetas = 30
scribe "Name:", nomen
scribe "Age:", aetas
scribe "Coordinates:", x, y
```

### Debug Output: vide

The keyword `vide` writes to debug output. It is the imperative of *videre* (to see): "see!" Use it for diagnostic information that should be visible during development but filtered in production.

```fab
vide "Debug: entering main loop"
vide "Debug: count =", count
```

### Warning Output: mone

The keyword `mone` writes to warning output. It is the imperative of *monere* (to warn, advise): "warn!" Use it for conditions that are not errors but deserve attention.

```fab
mone "Warning: deprecated feature used"
mone "Warning: count exceeds threshold:", count
```

## Comments

Comments begin with `#` and extend to the end of the line. There is no block comment syntax.

```fab
# This is a comment
fixum x = 10  # inline comment
```

Comments explain *why*, not *what*. The code itself shows what is happening; comments provide context that cannot be derived from the code alone.

## Destructuring

Faber provides patterns for extracting values from objects and arrays. The syntax uses `ex` (from, out of) to indicate the source and the binding keyword to indicate mutability.

### Object Destructuring

To extract properties from an object, use `ex <source> fixum <properties>`:

```fab
fixum person = { name: "Marcus", age: 30, city: "Roma" }
ex person fixum name, age

scribe name   # "Marcus"
scribe age    # 30
```

Use `ut` (as) to rename properties during extraction:

```fab
fixum user = { name: "Julia", email: "julia@roma.com" }
ex user fixum name ut userName, email ut userEmail

scribe userName    # "Julia"
scribe userEmail   # "julia@roma.com"
```

Use `varia` instead of `fixum` for mutable bindings:

```fab
fixum data = { count: 100, active: verum }
ex data varia count, active

count = 200
active = falsum
```

The rest pattern `ceteri` (the rest, the others) collects remaining properties:

```fab
fixum fullUser = { id: 1, name: "Gaius", email: "g@roma.com", role: "admin" }
ex fullUser fixum id, ceteri details

scribe id       # 1
scribe details  # { name: "Gaius", email: "g@roma.com", role: "admin" }
```

### Array Destructuring

Arrays use bracket notation in the pattern:

```fab
fixum numbers = [1, 2, 3]
fixum [a, b, c] = numbers

scribe a  # 1
scribe b  # 2
scribe c  # 3
```

Partial destructuring extracts only what you need:

```fab
fixum values = [1, 2, 3, 4, 5]
fixum [one, two] = values

scribe one  # 1
scribe two  # 2
```

The underscore `_` skips elements:

```fab
fixum triple = [10, 20, 30]
fixum [_, middle, _] = triple

scribe middle  # 20
```

The rest pattern works with arrays too:

```fab
fixum items = [1, 2, 3, 4, 5]
fixum [head, ceteri tail] = items

scribe head  # 1
scribe tail  # [2, 3, 4, 5]
```

Mutable array destructuring uses `varia`:

```fab
fixum coords = [100, 200]
varia [x, y] = coords

x = x + 50
y = y + 50

scribe x  # 150
scribe y  # 250
```

---

These fundamentals are the vocabulary and grammar of Faber. With them, you can write clear, expressive programs. The more advanced features documented elsewhere build upon this foundation, but these basics are sufficient for substantial work.



---

# Typi


# Typi

Faber Romanus uses a type-first syntax that places type annotations before identifiers, reflecting the Latin pattern where adjectives describing nature precede the noun they modify. Where TypeScript writes `const name: string`, Faber writes `fixum textus nomen`. This ordering reads naturally in Latin: "a fixed text, name"---the type describes what kind of thing the identifier represents.

The type system prioritizes explicitness and clarity. Every type name derives from Latin, chosen not for historical purity but because Latin's morphological richness allows type names to carry meaning. When you see `fractus` instead of `float`, you encounter the Latin root of "fraction"---a broken number, a number with parts. The etymology teaches.

---

## Primitive Types

### textus (String)

From the Latin *texere*, "to weave." Text is woven words, threads of meaning combined into fabric. The metaphor is ancient: we still speak of "spinning a yarn" and the "thread" of an argument.

```fab
fixum textus greeting = "Salve, Munde"
fixum textus empty = ""
```

String literals use double or single quotes. Template literals use backticks with `${...}` interpolation, just as in JavaScript:

```fab
fixum name = "Marcus"
fixum message = `Hello, ${name}`
```

### numerus (Integer)

From the Latin *numerus*, "number, count." This is the discrete counting number---whole, indivisible. When you need integers, you need `numerus`.

```fab
fixum numerus count = 42
fixum numerus negative = -100
fixum numerus hex = 0xFF
```

Numeric literals support decimal, hexadecimal (with `0x` prefix), and arbitrary-precision integers (with `n` suffix for big integers).

### fractus (Floating-Point)

From the Latin *fractus*, "broken." The past participle of *frangere*, "to break." A fractional number is a broken number---one that has been divided into parts. This is the etymological root of the English word "fraction."

Use `fractus` when you need decimal precision:

```fab
fixum fractus pi = 3.14159
fixum fractus rate = 0.05
```

The distinction between `numerus` and `fractus` mirrors the distinction between integers and floating-point numbers in systems languages. When precision matters---financial calculations, scientific computing---you choose deliberately.

### bivalens (Boolean)

From *bi-*, "two," and *valens*, "being strong, having value." A two-valued type. The boolean literals are `verum` (true) and `falsum` (false):

```fab
fixum bivalens active = verum
fixum bivalens disabled = falsum
```

These literals read as Latin adjectives: "it is true," "it is false."

### nihil (Null)

From the Latin *nihil*, "nothing." The absence of value. Where other languages use `null` or `nil` or `None`, Faber uses `nihil`:

```fab
fixum nothing = nihil
```

A variable holding `nihil` holds nothing---not zero, not an empty string, but the explicit absence of any value.

### vacuum (Void)

From the Latin *vacuum*, "empty, void." This is the return type of functions that complete but return no value:

```fab
functio log(textus message) -> vacuum {
    scribe message
}
```

The distinction from `nihil` is semantic: `nihil` is a value (the null value), while `vacuum` is the absence of a return. A function returning `vacuum` completes normally; it simply has nothing to hand back.

---

## Special Types

### ignotum (Unknown)

From *in-*, "not," and *gnoscere*, "to know." The unknown type. Unlike permissive "any" types in other languages, `ignotum` requires you to narrow before use:

```fab
fixum ignotum data = getExternalData()

# Error: cannot use ignotum directly
# scribe data.length

# Must narrow first
si data est textus {
    scribe data.longitudo()
}
```

Faber deliberately omits an "any" type. When you receive data of unknown type, you must either narrow it with type guards (`est`) or cast it explicitly (`qua`). This design makes uncertainty visible and intentional.

### numquam (Never)

From the Latin *numquam*, "never." This is the return type of functions that never return---those that throw exceptions, loop infinitely, or exit the process:

```fab
functio moritur() -> numquam {
    iace novum Error { message: "fatal" }
}

functio infinitus() -> numquam {
    dum verum { }
}
```

A function marked `numquam` is a one-way door. Control enters but does not exit. This distinguishes it from `vacuum`: a void function returns (with no value); a never function does not return at all.

### objectum (Object)

From the Latin *objectum*, "something thrown before." The root of the English word "object." This type represents any non-primitive value---anything that is not a number, string, boolean, or null:

```fab
functio getUser() -> objectum {
    redde { name: "Marcus", age: 30 }
}
```

Use `objectum` when a function returns an anonymous object structure. For known shapes, prefer defining a `genus` (struct) instead.

---

## Type Annotations

Faber uses type-first syntax. The type precedes the identifier it annotates:

```fab
fixum textus nomen = "Marcus"
varia numerus count = 0
```

This ordering---type before name---reflects Latin's pattern where descriptive modifiers precede their nouns. It also mirrors how we think: "I need a number for counting," not "I need count, which is a number."

### In Variable Declarations

Both immutable (`fixum`) and mutable (`varia`) declarations support type annotations:

```fab
fixum numerus age = 30
varia textus status = "pending"
```

Type annotations are optional when the type can be inferred:

```fab
fixum name = "Marcus"    # inferred as textus
fixum count = 42         # inferred as numerus
```

### In Function Signatures

Function parameters use the same type-first pattern. Return types follow the arrow:

```fab
functio adde(numerus a, numerus b) -> numerus {
    redde a + b
}

functio describe(textus nomen, numerus aetas) -> textus {
    redde scriptum("§ habet § annos", nomen, aetas)
}
```

A function that returns nothing uses `vacuum` or omits the return type entirely:

```fab
functio log(textus message) -> vacuum {
    scribe message
}
```

---

## Nullable Types

The `?` suffix marks a type as nullable---able to hold either a value of that type or `nihil`:

```fab
fixum textus? maybeName = nihil
fixum numerus? maybeCount = 42
```

A nullable type requires handling before use. You cannot call methods on a `textus?` without first checking that it is not `nihil`:

```fab
fixum textus? name = getOptionalName()

# Using type guard
si name est nihil {
    scribe "No name provided"
}
aliter {
    scribe name.longitudo()
}
```

The `est` operator performs type checking:

```fab
fixum isNull = maybeValue est nihil
```

Function return types can be nullable to indicate that a function might not find what it is looking for:

```fab
functio inveni(textus id) -> persona? {
    # might return nihil if not found
}
```

---

## Collections

Faber provides three built-in collection types, each named for Latin words describing containment and abundance.

### lista (Array/List)

From the Latin *lista*, "border, strip, list." An ordered, indexable sequence of elements:

```fab
fixum lista<textus> names = ["Marcus", "Julia", "Gaius"]
fixum lista<numerus> scores = [100, 95, 87]
```

Array shorthand uses brackets with type parameter:

```fab
fixum textus[] names = ["Marcus", "Julia", "Gaius"]
fixum numerus[] empty = []
```

The shorthand `textus[]` is equivalent to `lista<textus>`.

Access elements by index:

```fab
fixum first = names[0]
fixum last = names[names.longitudo() - 1]
```

### tabula (Map/Dictionary)

From the Latin *tabula*, "tablet, table, board." The writing tablet, a surface for recording associations. A `tabula` maps keys to values:

```fab
fixum tabula<textus, numerus> ages = {
    "Marcus": 30,
    "Julia": 25,
    "Gaius": 40
}
```

The type takes two parameters: key type and value type. Access values by key:

```fab
fixum marcusAge = ages["Marcus"]
```

### copia (Set)

From the Latin *copia*, "abundance, supply, plenty." A collection of unique values with no duplicates:

```fab
fixum copia<textus> uniqueNames = copia("Marcus", "Julia", "Marcus")
# Contains only "Marcus" and "Julia"
```

Sets are useful when you care about membership and uniqueness rather than order or key-value association.

---

## Type Aliases

The `typus` keyword creates named aliases for types, improving readability and enabling reuse:

```fab
typus UserId = numerus
typus Username = textus
typus IsActive = bivalens
```

Once defined, type aliases can be used anywhere a type is expected:

```fab
fixum UserId id = 42
fixum Username name = "Marcus"
```

Aliases are especially useful for complex types:

```fab
typus Names = lista<textus>
typus UserCache = tabula<textus, numerus>
typus OptionalName = textus?
```

This makes function signatures more readable:

```fab
functio findUser(UserId id) -> Username? {
    # ...
}
```

### typeof Extraction

Use `typus` on the right-hand side to extract a type from a value:

```fab
fixum config = { port: 3000, host: "localhost" }
typus Config = typus config
```

This creates a type alias matching the inferred type of the value.

---

## Generics

Type parameters allow writing code that works with multiple types. Enclose parameters in angle brackets:

```fab
genus capsa<T> {
    T valor

    functio accipe() -> T {
        redde ego.valor
    }
}

fixum c = novum capsa<numerus> { valor: 42 }
scribe c.accipe()
```

Generic constraints can limit what types are acceptable:

```fab
pactum Comparable<T> {
    functio compare(T other) -> numerus
}

functio maximum<T implet Comparable<T>>(T a, T b) -> T {
    si a.compare(b) > 0 {
        redde a
    }
    redde b
}
```

The type parameter `T` is constrained to types that implement the `Comparable` interface.

---

## Union Types

The `unio<A, B>` generic expresses that a value may be one of several types:

```fab
typus StringOrNumber = unio<textus, numerus>

functio process(StringOrNumber value) -> textus {
    si value est textus {
        redde value
    }
    redde value.toString()
}
```

Union types require narrowing before use. The compiler does not know which variant you have until you check:

```fab
fixum unio<textus, numerus> value = getValue()

# Must narrow
si value est numerus {
    scribe value * 2
}
aliter si value est textus {
    scribe value.longitudo()
}
```

---

## Type Casting

The `qua` keyword performs explicit type conversion:

```fab
fixum data = 42
fixum asText = data qua textus
```

Casts are explicit acknowledgments of risk. When you write `qua`, you are telling the compiler: "I know what I am doing." The compiler trusts you---but if you are wrong, runtime errors follow.

```fab
# Cast to nullable type
fixum num = 10
fixum maybe = num qua numerus?

# Cast with member access
fixum response = getResponse()
fixum body = response.body qua textus

# Cast for chaining
fixum len = (data qua textus).length
```

Use casts sparingly. Prefer type guards (`est`) when possible, as they provide compile-time safety.

---

## Type Checking

The `est` keyword checks whether a value is of a given type:

```fab
fixum maybeValue = getValue()

si maybeValue est textus {
    # Within this block, maybeValue is known to be textus
    scribe maybeValue.longitudo()
}
```

Type guards work with nullable types:

```fab
fixum textus? name = getOptionalName()

si name est nihil {
    scribe "No name"
}
aliter {
    scribe name
}
```

The compiler narrows the type within the guarded block, eliminating the need for casts.



---

# Operatores


# Operatores

Operators in Faber Romanus embody the language's central philosophy: making implicit programming concepts explicit through linguistic structure. Where most languages rely solely on symbols, Faber offers Latin keywords alongside familiar operators, letting programmers choose the form that best expresses their intent.

This dual nature is not redundancy. Latin keywords read like natural language, making code flow more clearly when read aloud or processed by language models. Symbolic operators remain available for those who prefer terseness or familiarity. The choice is stylistic, not semantic; both forms compile identically.

---

## Arithmetic

Standard mathematical operators work as expected:

```fab
fixum sum = 10 + 5       # addition
fixum diff = 10 - 5      # subtraction
fixum prod = 10 * 5      # multiplication
fixum quot = 10 / 5      # division
fixum rem = 10 % 3       # modulo (remainder)
```

The `+` operator also handles string concatenation:

```fab
fixum greeting = "salve" + " mundus"
```

Unary negation uses the minus sign as a prefix:

```fab
fixum x = 5
fixum neg = -x           # -5
```

There are no increment (`++`) or decrement (`--`) operators. Use compound assignment instead.

---

## Comparison

Relational operators compare values and return boolean results:

```fab
fixum isLess = 5 < 10           # less than
fixum isGreater = 10 > 5        # greater than
fixum isLessOrEqual = 5 <= 5    # less than or equal
fixum isGreaterOrEqual = 10 >= 10
```

For equality, Faber follows JavaScript's distinction between loose and strict comparison:

```fab
fixum loose = 10 == "10"        # true (type coercion)
fixum strict = 10 === 10        # true (same type and value)
fixum notEqual = 10 != 5
fixum strictNotEqual = 10 !== "10"
```

In practice, prefer strict equality (`===`, `!==`) to avoid subtle bugs from type coercion.

---

## Logical Operators

Logical operators combine boolean expressions. Faber offers both symbolic and Latin forms.

### Latin Forms

The Latin keywords read naturally in conditional expressions:

```fab
fixum both = verum et verum       # and
fixum either = falsum aut verum   # or
fixum negated = non flag          # not
```

Etymology:
- `et` means "and" in Latin, the same word that gives us "et cetera" (and the rest)
- `aut` means "or" in the exclusive sense (one or the other)
- `non` means "not"

### Symbolic Forms

The familiar C-style operators remain available:

```fab
fixum both = verum && verum
fixum either = falsum || verum
fixum negated = !flag
```

**Style guidance:** Prefer Latin forms (`et`, `aut`, `non`) over symbols. The Latin reads more clearly and avoids the visual ambiguity between `!` (logical not) and `!.` (non-null assertion).

Short-circuit evaluation works as expected. In `falsum et expensiveCheck()`, the function never executes because the first operand is already false.

---

## Nullish Operations

### vel (Nullish Coalescing)

The `vel` operator provides a default value when the left operand is `nihil` (null):

```fab
fixum textus? maybeName = nihil
fixum name = maybeName vel "default"   # "default"
```

Unlike `aut` (logical or), `vel` only triggers on null, not on falsy values:

```fab
0 vel 5           # 0 (zero is not null)
"" vel "default"  # "" (empty string is not null)
nihil vel 5       # 5
```

Etymology: `vel` is the Latin inclusive "or" (meaning "or if you prefer"). In Faber, it carries the sense of "or else use this alternative."

**Note:** The JavaScript `??` operator is not available. Use `vel` instead.

### Null Checks

Faber provides unary prefix operators for checking null state:

```fab
fixum textus? maybe = nihil

scribe nihil maybe       # verum (is null)
scribe nonnihil maybe    # falsum (is not null)
```

For checking whether a value is null or empty (strings, arrays, collections):

```fab
scribe nulla maybe       # verum (null or empty)
scribe nonnulla maybe    # falsum (has content)
```

The distinction matters:
- `nihil`/`nonnihil` check strictly for null
- `nulla`/`nonnulla` check for null OR empty (length zero)

---

## Type Checking

### est (Type Check)

The `est` operator tests whether a value is of a particular type or is null:

```fab
fixum numerus? maybeValue = nihil
fixum isNull = maybeValue est nihil    # verum
```

For negative type checking:

```fab
fixum isNotNull = maybeValue non est nihil
```

Etymology: `est` is the Latin verb "is" (third person singular of "esse", to be). The phrase `x est nihil` reads naturally as "x is nothing."

### Boolean Checks

Faber allows testing boolean values with `verum` and `falsum` as prefix operators:

```fab
fixum enabled = verum
fixum isTrue = verum enabled     # strict check that enabled is true
fixum isFalse = falsum disabled  # strict check that disabled is false
```

---

## Ternary Expressions

Conditional expressions select between two values based on a condition.

### Symbolic Style

The familiar question-mark-colon syntax:

```fab
fixum max = a > b ? a : b
fixum grade = score >= 90 ? "A" : score >= 80 ? "B" : "C"
```

### Latin Style

The `sic ... secus` form reads as "thus ... otherwise":

```fab
fixum max = a > b sic a secus b
```

Etymology:
- `sic` means "thus" or "so" (as in "sic semper tyrannis")
- `secus` means "otherwise" or "differently"

The Latin form works well when the condition and branches are short. For complex nested conditions, symbolic style may be clearer. Do not mix the two forms in a single expression.

---

## Ranges

Range operators create sequences of numbers for iteration.

### Exclusive Ranges

The `..` operator creates a range that excludes the end value:

```fab
ex 0..10 pro i {
    scribe i    # 0, 1, 2, ..., 9
}
```

The Latin keyword `ante` ("before") means the same thing:

```fab
ex 0 ante 10 pro i {
    scribe i    # 0, 1, 2, ..., 9
}
```

### Inclusive Ranges

The `usque` operator includes the end value:

```fab
ex 0 usque 10 pro i {
    scribe i    # 0, 1, 2, ..., 10
}
```

Etymology: `usque` means "up to" or "as far as" in Latin, implying inclusion of the destination.

### Stepped Ranges

The `per` modifier controls the step size:

```fab
ex 0..10 per 2 pro i {
    scribe i    # 0, 2, 4, 6, 8
}
```

For descending ranges, use a negative step:

```fab
ex 10..0 per -1 pro i {
    scribe i    # 10, 9, 8, ..., 1
}
```

Etymology: `per` means "by" or "through" in Latin.

### Range Containment

The `intra` operator tests whether a value falls within a range:

```fab
si age intra 18 usque 65 {
    scribe "working age"
}

si value intra 0..100 {
    scribe "valid percentage"
}
```

Etymology: `intra` means "within" in Latin.

---

## Set Membership

The `inter` operator tests whether a value appears in a collection:

```fab
si status inter ["pending", "active", "paused"] {
    scribe "valid status"
}
```

Etymology: `inter` means "among" or "between" in Latin.

---

## Assignment

Simple assignment uses the equals sign:

```fab
varia x = 10
x = 20
```

Compound assignment operators combine an operation with assignment:

```fab
varia counter = 0
counter += 10    # add and assign
counter -= 3     # subtract and assign
counter *= 2     # multiply and assign
counter /= 2     # divide and assign
```

Bitwise compound assignment is also available:

```fab
varia flags = 0b1010
flags &= mask    # bitwise AND and assign
flags |= flag    # bitwise OR and assign
```

---

## Bitwise Operators

Low-level bit manipulation uses symbolic operators exclusively. These operations are inherently machine-oriented and do not benefit from Latin keywords.

```fab
fixum flags = 0b1010
fixum mask = 0b1100

fixum bitwiseAnd = flags & mask      # AND
fixum bitwiseOr = flags | mask       # OR
fixum bitwiseXor = flags ^ mask      # XOR
fixum bitwiseNot = ~flags            # NOT (complement)
fixum leftShift = 1 << 4             # left shift
fixum rightShift = 16 >> 2           # right shift
```

**Precedence note:** Unlike C, bitwise operators in Faber bind tighter than comparison operators. This means:

```fab
flags & mask == 0    # parses as (flags & mask) == 0
```

This matches programmer intent and avoids a common source of bugs in C-family languages.

---

## Why Both Forms?

Faber's dual operator syntax reflects a deeper design principle: code is read by both humans and machines, and different readers benefit from different representations.

Latin keywords make semantic relationships explicit. When you write `a et b`, the word "and" appears in the code. When you write `maybeName vel "default"`, the sense of "or alternatively" is visible. This clarity benefits code review, documentation, and AI systems that process code as natural language.

Symbolic operators serve programmers who think in terms of established conventions. A `&&` is immediately recognizable to anyone with C-family experience. For quick expressions or dense logic, symbols can be more scannable.

The language does not privilege one form over the other in parsing or semantics. Choose based on context: Latin for clarity, symbols for familiarity. Many programmers find that Latin keywords work best in conditionals and control flow, while symbols suit arithmetic and bitwise operations.

This flexibility embodies Faber's motto of accessibility over purity. The goal is not to force Latin on reluctant programmers, but to offer it as a tool for those who find it clarifying.



---

# Structurae


# Structurae

Faber provides two fundamental building blocks for defining data structures: `genus` for concrete data types with fields and methods, and `pactum` for behavioral contracts that define what a type can do. This document explains how to declare, instantiate, and work with both.

The Latin terminology reflects the conceptual distinction: a `genus` (meaning "birth, origin, kind") describes what something *is*, while a `pactum` (meaning "agreement, contract") describes what something *promises to do*.

---

## genus (Data Types)

A `genus` declaration creates a data type with fields and optional methods. Unlike class-based languages that emphasize inheritance hierarchies, Faber's `genus` follows struct semantics: fields are public by default, and composition is preferred over inheritance.

### Declaration

The basic form declares a type name followed by its fields inside braces:

```fab
genus Punctum {
    numerus x
    numerus y
}
```

Each field declaration specifies the type first, then the field name. This follows Faber's type-first convention, making the shape of data immediately visible.

A `genus` can contain any number of fields:

```fab
genus Persona {
    textus nomen
    numerus aetas
    bivalens activus
}
```

Type names in Faber are conventionally lowercase, following Latin's case conventions where common nouns are not capitalized. The parser is case-insensitive, but the canonical style uses lowercase: `genus persona`, not `genus Persona`.

### Field Defaults

Fields can specify default values using the colon (`:`) syntax:

```fab
genus Persona {
    textus nomen: "Incognitus"
    numerus aetas: 0
    bivalens activus: verum
}
```

When a default is provided, the field becomes optional during instantiation. Fields without defaults are required.

The colon syntax deserves explanation. Faber distinguishes between two operations:

| Syntax | Meaning | Context |
|--------|---------|---------|
| `:` | "has value" / "defaults to" | Field defaults, object literals, construction |
| `=` | "assign value" | Variable binding, reassignment, method bodies |

The colon represents a *declarative specification*: this field has this value by nature of its definition. The equals sign represents an *imperative action*: assign this value to that location.

This distinction creates consistency across the language. Object literals use colons (`{ nomen: "Marcus" }`), construction overrides use colons, and field defaults use colons. All three are specifying property values, not performing assignment.

### Methods

A `genus` can include methods alongside its fields. Methods are declared with the `functio` keyword:

```fab
genus Rectangle {
    numerus width: 1
    numerus height: 1

    functio area() -> numerus {
        redde ego.width * ego.height
    }

    functio perimeter() -> numerus {
        redde 2 * (ego.width + ego.height)
    }

    functio isSquare() -> bivalens {
        redde ego.width == ego.height
    }
}
```

Methods can return values, modify state, or both:

```fab
genus Counter {
    numerus count: 0

    functio increment() {
        ego.count = ego.count + 1
    }

    functio getValue() -> numerus {
        redde ego.count
    }
}
```

Methods are public by default, matching the struct semantics of `genus`. Use the `@ privata` annotation for internal helper methods.

### Self-Reference with ego

Within methods, `ego` refers to the current instance. The word is Latin for "I" or "self", making the self-reference explicit in every usage.

```fab
functio celebraNatalem() {
    ego.aetas = ego.aetas + 1
}
```

Unlike languages where `this` is implicit or optional, Faber requires explicit `ego` for all instance member access. This eliminates ambiguity between local variables and instance fields, and makes the flow of data through an object visible.

### Static Members with generis

Members that belong to the type itself rather than instances use the `generis` keyword. The word is the genitive form of `genus`, literally meaning "of the type":

```fab
genus Colores {
    generis fixum ruber = "#FF0000"
    generis fixum viridis = "#00FF00"
    generis fixum caeruleus = "#0000FF"
}

genus Math {
    generis fixum PI = 3.14159
    generis fixum E = 2.71828

    generis functio maximus(numerus a, numerus b) -> numerus {
        si a > b { redde a }
        redde b
    }
}
```

Access static members through the type name:

```fab
scribe Colores.ruber      # "#FF0000"
scribe Math.PI            # 3.14159
fixum m = Math.maximus(5, 3)  # 5
```

Static members are useful for constants, utility functions, and factory methods that don't require instance state.

### Field Visibility

Fields in a `genus` are public by default, following struct semantics where data is meant to be accessed directly. For fields that should be encapsulated, use visibility annotations:

```fab
genus Persona {
    textus nomen              # public (default)

    @ privatum
    numerus internaAetas      # private - only accessible within this genus
}
```

The `@ privatum` annotation marks a field as accessible only within the `genus` that declares it. The `@ protectum` annotation allows access from subtypes as well.

### Method Visibility

Methods follow the same pattern:

```fab
genus Processor {
    functio process() -> textus {       # public (default)
        redde ego.auxilium()
    }

    @ privata
    functio auxilium() -> textus {      # private helper
        redde "internal work"
    }
}
```

Note the grammatical agreement: `privatum` for fields (neuter), `privata` for methods (feminine, agreeing with `functio`).

### Abstract Types

The `abstractus` modifier creates a type that cannot be instantiated directly. Abstract types define structure and behavior that subtypes must complete:

```fab
abstractus genus Figura {
    @ abstracta
    functio area() -> numerus
}
```

Methods marked with `@ abstracta` have no body; subtypes must provide the implementation.

### Generics

A `genus` can be parameterized with type variables:

```fab
genus Capsa<T> {
    T valor

    functio accipe() -> T {
        redde ego.valor
    }
}

fixum c = novum Capsa<numerus> { valor: 42 }
scribe c.accipe()  # 42
```

Multiple type parameters are comma-separated: `genus Pair<K, V> { ... }`.

---

## pactum (Interfaces)

A `pactum` defines a contract: a set of method signatures that a type promises to implement. The word means "agreement" or "pact", reflecting its role as a behavioral promise rather than a structural definition.

### Declaration

A `pactum` declares method signatures without implementations:

```fab
pactum Drawable {
    functio draw() -> vacuum
}

pactum Iterabilis<T> {
    functio sequens() -> T?
    functio habet() -> bivalens
}
```

Unlike `genus`, a `pactum` cannot have fields or property requirements. It defines only what a type can *do*, not what it *has*. This constraint keeps interfaces focused on behavior.

### Implementation with implet

A `genus` fulfills a `pactum` using the `implet` keyword (Latin "fulfills"):

```fab
genus Circle implet Drawable {
    numerus radius: 10

    functio draw() {
        scribe scriptum("Drawing circle with radius §", ego.radius)
    }
}

genus Square implet Drawable {
    numerus side: 5

    functio draw() {
        scribe scriptum("Drawing square with side §", ego.side)
    }
}
```

The implementing type must provide concrete implementations for all methods declared in the `pactum`. The compiler verifies this at compile time.

A type can implement multiple interfaces:

```fab
genus Document implet Readable, Writable, Printable {
    # must implement methods from all three pactum
}
```

---

## Instantiation

### Creating Instances with novum

The `novum` keyword creates a new instance of a `genus`. The word is Latin for "new":

```fab
fixum p = novum Punctum { x: 10, y: 20 }
```

Field values are provided in an object literal following the type name. Required fields (those without defaults) must be specified:

```fab
genus Persona {
    textus nomen           # required - no default
    numerus aetas: 0       # optional - has default
}

# nomen is required, aetas is optional
fixum marcus = novum Persona { nomen: "Marcus" }
scribe marcus.aetas  # 0 (default)

# Override defaults by providing values
fixum julia = novum Persona { nomen: "Julia", aetas: 25 }
```

When all fields have defaults, the literal can be omitted entirely:

```fab
genus Counter {
    numerus count: 0
}

varia counter = novum Counter  # no braces needed
```

### Construction from Variables

When constructing from an existing variable, use the `de` (from) preposition:

```fab
fixum props = getPersonaProps()
fixum p = novum Persona de props
```

This merges the source object's fields into the new instance, following the same rules as literal construction.

### The creo() Hook

The optional `creo()` method runs after construction is complete. Use it for validation, clamping values, or computing derived state:

```fab
genus BoundedValue {
    numerus value: 0

    functio creo() {
        si ego.value < 0 {
            ego.value = 0
        }
        si ego.value > 100 {
            ego.value = 100
        }
    }
}
```

The initialization sequence is:

1. Field defaults are applied
2. Literal overrides (or `de` source) are merged
3. `creo()` runs if defined

By the time `creo()` executes, `ego` already has all its field values. The method takes no parameters because everything it needs is already on the instance.

A practical use is computing derived fields:

```fab
genus Circle {
    numerus radius: 1
    numerus diameter: 0
    numerus area: 0

    functio creo() {
        ego.diameter = ego.radius * 2
        ego.area = 3.14159 * ego.radius * ego.radius
    }
}

fixum c = novum Circle { radius: 5 }
scribe c.diameter  # 10
scribe c.area      # 78.54
```

Most types will not need `creo()`. The declarative field defaults handle the common case. Reserve `creo()` for invariants, validation, or derived initialization that cannot be expressed as simple defaults.

---

## Design Philosophy

Faber's type system reflects several deliberate choices:

**Composition over inheritance.** There is no `extends` keyword. Types compose behavior through `implet` and embed other types as fields. This avoids the fragility of deep inheritance hierarchies.

**Methods over getters.** Faber omits computed properties (getters). Derived values use explicit methods: `r.area()` rather than `r.area`. The parentheses honestly communicate that computation is happening. Getters that start simple often grow complex, but their API is locked to property syntax.

**Struct semantics by default.** Fields are public unless explicitly marked private. This transparency suits data-oriented design where types are containers of state rather than encapsulated black boxes.

**No classes, no constructors.** The `genus` keyword names a type of thing, not a blueprint for objects. Construction happens through `novum` with declarative field specification, not imperative constructor logic.

These choices produce code that is explicit about data flow and honest about computation. The Roman craftsman built things to last; Faber aims for code that remains comprehensible as it evolves.



---

# Regimen


# Regimen

Control flow determines how a program executes: which statements run, in what order, and under what conditions. Faber uses Latin keywords that map intuitively to their English equivalents while reading naturally as Latin prose.

The Latin word *regimen* means "guidance" or "direction"—literally, the act of steering. In Faber, control flow keywords *steer* execution through conditionals, loops, and branching constructs.

---

## Conditionals

Conditional statements execute code based on whether a condition evaluates to true or false.

### si (If)

The keyword `si` means "if" in Latin. It introduces a condition that, when true, executes the following block.

```fab
si x > 0 {
    scribe "positive"
}
```

The condition must be a boolean expression. If it evaluates to `verum` (true), the block executes. Otherwise, execution continues past the block.

Multiple statements can appear within the block:

```fab
si user.authenticated {
    scribe "Welcome back"
    loadUserPreferences(user)
    updateLastLogin(user)
}
```

### sin (Else If)

The keyword `sin` is a classical Latin contraction of `si non`—"but if" or "if however." It chains additional conditions after an initial `si`.

```fab
fixum hour = 14

si hour < 6 {
    scribe "Late night"
}
sin hour < 12 {
    scribe "Morning"
}
sin hour < 18 {
    scribe "Afternoon"
}
sin hour < 22 {
    scribe "Evening"
}
```

Each `sin` condition is tested only if all preceding conditions were false. The chain stops at the first true condition.

### secus (Else)

The keyword `secus` means "otherwise" in Latin. It provides a default branch when no preceding condition matched.

```fab
si hour < 12 {
    scribe "Morning"
}
sin hour < 18 {
    scribe "Afternoon"
}
secus {
    scribe "Evening or night"
}
```

A `secus` block always executes if reached—it has no condition to test. It must appear last in a conditional chain.

### Short Forms

Faber provides concise syntax for simple conditionals.

#### ergo (Therefore)

The keyword `ergo` means "therefore" or "thus" in Latin—expressing logical consequence. Use it for one-liner conditionals where a block would be verbose.

```fab
si x > 5 ergo scribe "x is big"
```

This is equivalent to:

```fab
si x > 5 {
    scribe "x is big"
}
```

The `ergo` form works with `secus` for one-liner if-else:

```fab
si age >= 18 ergo scribe "Adult" secus scribe "Minor"
```

#### reddit (Early Return)

The keyword `reddit` means "it returns" in Latin (third person singular of *reddere*, "to give back"). It combines `ergo` with `redde` for early return patterns.

```fab
functio classify(numerus x) -> textus {
    si x < 0 reddit "negative"
    si x == 0 reddit "zero"
    redde "positive"
}
```

This is equivalent to:

```fab
functio classify(numerus x) -> textus {
    si x < 0 {
        redde "negative"
    }
    si x == 0 {
        redde "zero"
    }
    redde "positive"
}
```

The `reddit` form excels at guard clauses—conditions that validate input and exit early:

```fab
functio divide(numerus a, numerus b) -> numerus? {
    si b == 0 reddit nihil
    redde a / b
}
```

It works throughout a conditional chain:

```fab
functio grade(numerus score) -> textus {
    si score >= 90 reddit "A"
    sin score >= 80 reddit "B"
    sin score >= 70 reddit "C"
    sin score >= 60 reddit "D"
    secus reddit "F"
}
```

---

## Loops

Loops repeat a block of code, either a fixed number of times or until a condition changes.

### dum (While)

The keyword `dum` means "while" or "as long as" in Latin. It executes a block repeatedly while a condition remains true.

```fab
varia numerus counter = 0

dum counter < 5 {
    scribe counter
    counter = counter + 1
}
```

The condition is checked before each iteration. If it starts false, the block never executes.

While loops work well for countdown patterns:

```fab
varia numerus countdown = 3

dum countdown > 0 {
    scribe "Countdown:", countdown
    countdown = countdown - 1
}
scribe "Done!"
```

The one-liner form uses `ergo`:

```fab
dum i > 0 ergo i = i - 1
```

### ex...pro (For Each Values)

The `ex...pro` construct iterates over values in a collection. The syntax reads naturally in Latin: "from items, for each item."

```fab
fixum numbers = [1, 2, 3, 4, 5]

ex numbers pro n {
    scribe n
}
```

The Latin preposition `ex` means "from" or "out of"—the source from which values are drawn. The preposition `pro` means "for" or "on behalf of"—introducing the binding for each iteration.

This source-first syntax differs from most programming languages. Where JavaScript writes `for (const item of items)`, Faber writes `ex items pro item`. The Faber form mirrors natural language: "from the list, for each element, do this."

The syntax works with any iterable:

```fab
fixum names = ["Marcus", "Julia", "Claudia"]

ex names pro name {
    scribe name
}
```

Processing each item:

```fab
fixum values = [10, 20, 30]

ex values pro v {
    fixum doubled = v * 2
    scribe doubled
}
```

The one-liner form:

```fab
ex numbers pro n ergo scribe n
```

#### Range Expressions

Ranges generate sequences of numbers. Faber provides three range operators:

| Operator | Latin Meaning | End Behavior | Example |
|----------|---------------|--------------|---------|
| `..` | (shorthand) | exclusive | `0..5` yields 0, 1, 2, 3, 4 |
| `ante` | "before" | exclusive | `0 ante 5` yields 0, 1, 2, 3, 4 |
| `usque` | "up to" | inclusive | `0 usque 5` yields 0, 1, 2, 3, 4, 5 |

The `..` operator is convenient shorthand matching common programming conventions (Python's `range()`, Rust's `..`):

```fab
ex 0..5 pro i {
    scribe i
}
```

The `ante` keyword makes exclusivity explicit—the range stops *before* the end value:

```fab
ex 0 ante 5 pro i {
    scribe i
}
```

The `usque` keyword includes the end value—the range goes *up to and including* the end:

```fab
ex 0 usque 5 pro i {
    scribe i
}
```

For step increments, use `per`:

```fab
ex 0..10 per 2 pro i {
    scribe i  # 0, 2, 4, 6, 8
}

ex 0 usque 10 per 2 pro i {
    scribe i  # 0, 2, 4, 6, 8, 10
}
```

### de...pro (For Each Keys)

The `de...pro` construct iterates over keys (property names or indices) rather than values. The syntax reads: "concerning the object, for each key."

```fab
fixum persona = { nomen: "Marcus", aetas: 30, urbs: "Roma" }

de persona pro clavis {
    scribe clavis
}
```

The Latin preposition `de` means "from" or "concerning"—indicating a read-only relationship with the object. You're iterating *concerning* the object's structure, not extracting its contents.

To access values, use the key with bracket notation:

```fab
de persona pro clavis {
    scribe scriptum("Key: §, Value: §", clavis, persona[clavis])
}
```

For arrays, `de` iterates indices:

```fab
fixum numeri = [10, 20, 30]

de numeri pro index {
    scribe scriptum("Index §: §", index, numeri[index])
}
```

The distinction between `ex` and `de` mirrors their Latin meanings:
- `ex items pro item` — draw *values* **from** the collection
- `de object pro key` — inspect *keys* **concerning** the object

### Async Iteration

For asynchronous streams, replace `pro` with `fiet` ("it will become"):

```fab
ex stream fiet chunk {
    scribe chunk
}
```

The verb `fiet` is the future tense of `fio` ("to become"). It signals that each iteration awaits the next value—the chunk "will become" available.

| Keyword | Meaning | Compiles To |
|---------|---------|-------------|
| `pro` | "for" (preposition) | `for...of` |
| `fit` | "it becomes" (present) | `for...of` |
| `fiet` | "it will become" (future) | `for await...of` |

The `fit` form is equivalent to `pro` and can be used interchangeably for sync iteration.

### Loop Control

Two keywords control loop flow:

#### rumpe (Break)

The keyword `rumpe` is the imperative of *rumpere* ("to break"). It exits the innermost loop immediately.

```fab
varia i = 0

dum i < 10 {
    si i == 5 {
        rumpe
    }
    scribe i
    i = i + 1
}
```

Output: 0, 1, 2, 3, 4 (loop breaks when `i` reaches 5).

In nested loops, `rumpe` exits only the inner loop:

```fab
ex 0..3 pro outer {
    ex 0..10 pro inner {
        si inner == 2 {
            rumpe  # exits inner loop only
        }
        scribe scriptum("outer=§, inner=§", outer, inner)
    }
}
```

#### perge (Continue)

The keyword `perge` is the imperative of *pergere* ("to continue" or "proceed"). It skips to the next iteration.

```fab
ex 0..10 pro i {
    si i % 2 == 0 {
        perge  # skip even numbers
    }
    scribe i
}
```

Output: 1, 3, 5, 7, 9 (even numbers skipped).

Like `rumpe`, `perge` affects only the innermost loop.

---

## Branching

Branching statements select one path among several based on a value.

### elige (Switch)

The keyword `elige` is the imperative of *eligere* ("to choose"). It matches a value against cases.

```fab
fixum status = "active"

elige status {
    casu "pending" {
        scribe "Waiting..."
    }
    casu "active" {
        scribe "Running"
    }
    casu "done" {
        scribe "Completed"
    }
}
```

The keyword `casu` is the ablative of *casus* ("case" or "instance")—literally "in the case of."

Unlike C-family switch statements, Faber's `elige` does not fall through. Each `casu` is self-contained.

For a default branch, use `ceterum` ("otherwise" or "for the rest"):

```fab
elige code {
    casu 200 {
        scribe "OK"
    }
    casu 404 {
        scribe "Not Found"
    }
    ceterum {
        scribe "Unknown status"
    }
}
```

One-liner cases use `ergo`:

```fab
elige status {
    casu "pending" ergo scribe "waiting"
    casu "active" ergo scribe "running"
    ceterum iace "Unknown status"
}
```

Early returns use `reddit`:

```fab
functio statusMessage(numerus code) -> textus {
    elige code {
        casu 200 reddit "OK"
        casu 404 reddit "Not Found"
        casu 500 reddit "Server Error"
        ceterum reddit "Unknown"
    }
}
```

### discerne (Pattern Match)

The keyword `discerne` is the imperative of *discernere* ("to distinguish" or "discriminate"). It performs exhaustive pattern matching on tagged union types (*discretio*).

First, define a `discretio` (tagged union):

```fab
discretio Event {
    Click { numerus x, numerus y },
    Keypress { textus key },
    Quit
}
```

Then match against it:

```fab
functio handle_event(Event e) -> nihil {
    discerne e {
        casu Click pro x, y {
            scribe scriptum("Clicked at §, §", x, y)
        }
        casu Keypress pro key {
            scribe scriptum("Key: §", key)
        }
        casu Quit {
            scribe "Goodbye"
        }
    }
}
```

The `pro` keyword destructures variant fields into local bindings. For the `Quit` variant (which has no fields), the block has no `pro` clause.

For simple variants without data, the body can use `ergo`:

```fab
discretio Status { Active, Inactive, Pending }

functio describe(Status s) -> textus {
    discerne s {
        casu Active ergo redde "active"
        casu Inactive ergo redde "inactive"
        casu Pending ergo redde "pending"
    }
}
```

To bind the entire variant (not just its fields), use `ut`:

```fab
discerne left, right {
    casu Primitivum ut l, Primitivum ut r {
        redde l.nomen == r.nomen
    }
    casu _, _ {
        redde falsum
    }
}
```

The underscore `_` is the wildcard pattern—it matches any variant without binding.

The difference between `elige` and `discerne`:
- `elige` matches against primitive values (numbers, strings)
- `discerne` matches against `discretio` variants with destructuring

---

## Guards and Assertions

Guards and assertions enforce invariants—conditions that must hold for the program to proceed correctly.

### custodi (Guard Block)

The keyword `custodi` is the imperative of *custodire* ("to guard" or "watch over"). It groups early-exit conditions at the start of a function.

```fab
functio divide(numerus a, numerus b) -> numerus {
    custodi {
        si b == 0 {
            redde 0
        }
    }

    redde a / b
}
```

The `custodi` block creates a visual separation between validation and main logic. All precondition checks cluster together, making the function's requirements explicit.

Multiple guards in one block:

```fab
functio processValue(numerus x) -> numerus {
    custodi {
        si x < 0 {
            redde -1
        }
        si x > 100 {
            redde -1
        }
    }

    # Main logic, clearly separated from guards
    redde x * 2
}
```

Guards can throw instead of returning:

```fab
functio sqrt(numerus n) -> numerus {
    custodi {
        si n < 0 {
            iace "Cannot compute square root of negative number"
        }
    }

    redde computeSqrt(n)
}
```

The `reddit` shorthand works within `custodi`:

```fab
functio clamp(numerus value, numerus min, numerus max) -> numerus {
    custodi {
        si value < min reddit min
        si value > max reddit max
    }

    redde value
}
```

Input validation patterns:

```fab
functio createUser(textus name, textus email, numerus age) -> textus {
    custodi {
        si name == nihil aut name == "" {
            redde "Error: name required"
        }
        si email == nihil aut email == "" {
            redde "Error: email required"
        }
        si age < 13 {
            redde "Error: must be 13 or older"
        }
        si age > 120 {
            redde "Error: invalid age"
        }
    }

    redde scriptum("User created: §", name)
}
```

### adfirma (Assert)

The keyword `adfirma` is the imperative of *adfirmare* ("to affirm" or "assert"). It checks runtime invariants.

```fab
adfirma x > 0
```

If the condition is false, execution halts with an assertion error.

Add a message for clarity:

```fab
adfirma x > 0, "x must be positive"
adfirma name != "", "name must not be empty"
```

Assertions differ from guards:
- Guards handle expected edge cases gracefully (return early, throw recoverable errors)
- Assertions catch programming errors (bugs) that should never occur in correct code

Use `adfirma` for conditions that indicate bugs if violated:

```fab
functio processArray(lista<numerus> items) {
    adfirma items != nihil, "items must not be null"
    adfirma items.longitudo > 0, "items must not be empty"

    # ... process items
}
```

---

## Summary

| Keyword | Latin Meaning | Purpose |
|---------|--------------|---------|
| `si` | "if" | Conditional branch |
| `sin` | "but if" | Else-if branch |
| `secus` | "otherwise" | Else branch |
| `ergo` | "therefore" | One-liner consequent |
| `reddit` | "it returns" | One-liner early return |
| `dum` | "while" | While loop |
| `ex` | "from, out of" | Iteration source |
| `de` | "concerning" | Key iteration source |
| `pro` | "for" | Iteration binding |
| `fit` | "it becomes" | Sync binding |
| `fiet` | "it will become" | Async binding |
| `rumpe` | "break!" | Exit loop |
| `perge` | "continue!" | Skip to next iteration |
| `elige` | "choose!" | Value switch |
| `casu` | "in the case of" | Switch case |
| `ceterum` | "otherwise" | Switch default |
| `discerne` | "distinguish!" | Pattern match |
| `custodi` | "guard!" | Guard clause block |
| `adfirma` | "affirm!" | Runtime assertion |



---

# Functiones


# Functiones

Functions in Faber are declared using the `functio` keyword, derived from the Latin _functio_ meaning "performance, execution." This chapter covers function declarations, parameters, return types, async patterns, generators, and lambda expressions.

## Declaring Functions

### Basic Syntax

A function declaration begins with `functio` followed by the function name, parameter list in parentheses, optional return type, and the function body in braces:

```fab
functio saluta() {
    scribe "Salve, Mundus!"
}
```

Functions that return values specify the return type after an arrow (`->`) and use `redde` (Latin "give back, return") to yield the result:

```fab
functio nomen() -> textus {
    redde "Marcus Aurelius"
}
```

### Parameters

Faber uses type-first syntax for parameters, placing the type before the parameter name. This mirrors natural language order ("a string called name") and aligns with languages like Go, Rust, and Zig:

```fab
functio quadratum(numerus n) -> numerus {
    redde n * n
}

functio adde(numerus a, numerus b) -> numerus {
    redde a + b
}

functio describe(textus nomen, numerus aetas) -> textus {
    redde scriptum("§ habet § annos", nomen, aetas)
}
```

When a parameter has no explicit type annotation, the compiler infers it from usage:

```fab
functio duplica(n) -> numerus {
    redde n * 2
}
```

### Dual Parameter Naming

Following Swift's pattern, parameters can have separate external (callsite) and internal (body) names using `ut` (Latin "as"):

```fab
functio greet(textus location ut loc) {
    scribe loc  # internal name
}

greet(location: "Roma")  # external name at callsite
```

The `ut` keyword provides a unified aliasing syntax across the language:

- Imports: `ex norma importa scribe ut s`
- Destructuring: `ex persona fixum nomen ut n`
- Parameters: `textus location ut loc`

All three express the same concept: "X, known locally as Y."

### Optional Parameters

The `si` modifier (Latin "if") marks a parameter as optional. Without a default value, the parameter type becomes nullable (`ignotum<T>`):

```fab
functio greet(textus nomen, si textus titulus) -> textus {
    si titulus est nihil {
        redde scriptum("Salve, §!", nomen)
    }
    redde scriptum("Salve, § §!", titulus, nomen)
}

greet("Marcus")              # titulus receives nihil
greet("Marcus", "Dominus")   # titulus receives "Dominus"
```

### Default Values

Default values use `vel` (Latin "or"), consistent with the nullish coalescing operator in expressions:

```fab
functio paginate(si numerus pagina vel 1, si numerus per_pagina vel 10) -> textus {
    redde scriptum("Page § with § items", pagina, per_pagina)
}

paginate()        # "Page 1 with 10 items"
paginate(2)       # "Page 2 with 10 items"
paginate(2, 25)   # "Page 2 with 25 items"
```

The choice of `vel` provides consistency: `vel` already means "or if nil" in expressions like `value vel "default"`, making parameter defaults read naturally as "numerus pagina or 1."

Default values only make sense for owned parameters. Borrowed (`de`) and mutable (`in`) parameters require the caller to provide a value since there is nothing to borrow by default.

### Rest Parameters

The `ceteri` modifier (Latin "the rest, the others") collects remaining arguments into an array:

```fab
functio sum(ceteri numerus[] nums) -> numerus {
    varia total = 0
    ex nums pro n {
        total += n
    }
    redde total
}

sum(1, 2, 3, 4, 5)  # 15
```

Rest parameters must come last in the parameter list.

## Return Types

### Arrow Syntax

The arrow `->` specifies a function's return type directly. This is the simplest form and compiles with minimal overhead:

```fab
functio compute() -> numerus {
    redde 42
}
```

When the function returns nothing, omit the return type entirely or specify `vacuum`:

```fab
functio doNothing() {
    # no return value
}

functio doNothingExplicit() -> vacuum {
    redde
}
```

### Latin Verb Forms

Faber offers an alternative syntax using conjugated forms of the Latin verb _fieri_ ("to become"). These verb forms encode additional semantic information about how the function returns values:

| Verb    | Tense/Number   | Meaning                | Semantics              |
| ------- | -------------- | ---------------------- | ---------------------- |
| `fit`   | present, sing. | "it becomes"           | sync, single value     |
| `fiet`  | future, sing.  | "it will become"       | async, single value    |
| `fiunt` | present, plur. | "they become"          | sync, yields multiple  |
| `fient` | future, plur.  | "they will become"     | async, yields multiple |

The verb forms participate in the Responsum stream protocol, providing structured error handling. Arrow syntax (`->`) bypasses this protocol for direct returns with zero overhead.

```fab
# These are equivalent for simple cases:
functio getId() -> textus { redde "abc" }
functio getId() fit textus { redde "abc" }
```

The verb syntax becomes valuable when you want stream-based error handling or generator behavior without explicit modifiers.

## Async Functions

### The futura Modifier

The `futura` modifier (Latin "future things," neuter plural of _futurus_) marks a function as asynchronous. Combined with arrow syntax, it returns a Promise:

```fab
futura functio fetchData(textus url) -> textus {
    fixum response = cede fetch(url)
    redde response.text()
}
```

The choice of _futura_ leverages Latin's grammatical future tense to express temporal semantics: the result will be available in the future.

### The cede Keyword

Inside async functions, `cede` (Latin "yield, give way, surrender") awaits a promise:

```fab
futura functio processAll(textus[] urls) -> textus[] {
    varia results = []
    ex urls pro url {
        fixum data = cede fetchData(url)
        results.adde(data)
    }
    redde results
}
```

The etymology captures the semantics precisely: the function cedes control until the async operation completes.

### Async via Verb Form

The `fiet` verb ("it will become") implies async behavior without the `futura` modifier:

```fab
functio fetchData() fiet textus {
    redde "data"
}
```

This is equivalent to `futura functio fetchData() -> textus` but participates in the Responsum protocol.

### Gerundive Declarations

The gerundive forms `figendum` and `variandum` provide implicit await:

```fab
figendum data = fetchData(url)   # immutable, implicit await
variandum result = fetchInitial() # mutable, implicit await
```

These are equivalent to `fixum x = cede y()` and `varia x = cede y()`. The gerundive signals futurity: the value will be fixed/varied once the operation completes. If the right-hand side is synchronous, it passes through unchanged.

## Generator Functions

### The cursor Modifier

The `cursor` modifier (Latin "runner," from _currere_ "to run") creates a generator function:

```fab
cursor functio range(numerus n) -> numerus {
    ex 0..n pro i {
        cede i
    }
}
```

In generator context, `cede` yields values rather than awaiting them, reusing the same keyword for both semantics based on function context.

### Generator via Verb Forms

The `fiunt` verb ("they become," plural) implies generator behavior:

```fab
functio range(numerus n) fiunt numerus {
    ex 0..n pro i {
        cede i
    }
}
```

For async generators that yield promises, use `fient` ("they will become"):

```fab
functio fetchAll(textus[] urls) fient textus {
    ex urls pro url {
        cede fetch(url)
    }
}
```

### Iterating Over Generators

Generator results can be consumed with `ex...pro` loops:

```fab
ex rangeSync(5) pro num {
    scribe num
}
```

## Generic Functions

### Type Parameters with prae

The `prae` keyword (Latin "before") declares compile-time type parameters. Combined with `typus` ("type"), it introduces generic type variables:

```fab
functio max(prae typus T, T a, T b) -> T {
    si a > b { redde a }
    redde b
}

fixum larger = max(10, 20)           # T inferred as numerus
fixum longer = max("alpha", "beta")  # T inferred as textus
```

Type parameters must come first in the parameter list, followed by regular parameters. This matches conventions in TypeScript, Rust, and Zig.

Multiple type parameters are supported:

```fab
functio pair(prae typus T, prae typus U, T first, U second) -> [T, U] {
    redde [first, second]
}
```

## Lambda Expressions

### Basic Syntax

Lambda expressions use `pro` (Latin "for, on behalf of") followed by parameters, a colon, and an expression:

```fab
fixum double = pro x: x * 2
fixum add = pro a, b: a + b
```

The colon separates parameters from the body. For single expressions, the result is implicitly returned.

### With Return Type Annotation

When type annotation is needed, use an arrow before the colon:

```fab
fixum add = pro a, b -> numerus: a + b
fixum isPositive = pro n -> bivalens: n > 0
```

### Block Bodies

For multi-statement lambdas, use braces and explicit `redde`:

```fab
fixum process = pro x {
    varia result = x * 2
    result += 10
    redde result
}
```

### Zero-Parameter Lambdas

When a lambda takes no parameters, place the colon immediately after `pro`:

```fab
fixum getFortyTwo = pro: 42
```

### Async Lambdas

The `fiet` keyword creates async lambdas:

```fab
fixum fetchAndProcess = fiet url {
    fixum data = cede fetch(url)
    redde process(data)
}
```

This is useful for callbacks in async contexts:

```fab
app.post("/users", fiet context {
    redde context.json()
})
```

### Common Patterns

Lambdas shine in functional operations:

```fab
fixum numbers = [1, 2, 3, 4, 5]

# Filter
fixum evens = numbers.filter(pro x: x % 2 == 0)

# Map
fixum doubled = numbers.map(pro x: x * 2)

# Reduce
fixum sum = numbers.reduce(0, pro acc, x: acc + x)
```

## Ownership Prepositions in Parameters

Latin prepositions indicate how parameters are passed and what the function may do with them:

- `de` (from/concerning): borrowed, read-only access
- `in` (into): mutable borrow, the function may modify the value

```fab
functio processPoints(de Point[] points, in Point[] targets) {
    # points is borrowed (read-only)
    # targets is mutably borrowed
    ex points pro point {
        targets.adde(point)
    }
}
```

These prepositions combine naturally with other parameter modifiers:

```fab
functio analyze(textus source, de si numerus depth) -> numerus {
    si depth est nihil { redde 3 }
    redde depth
}
```

The prepositions express semantic intent about ownership and mutability. They serve as documentation for readers and enable stricter checking in future compiler versions.

## Summary

Faber's function system balances Latin linguistic authenticity with practical programming needs:

- `functio` for declaration, `redde` for return
- Type-first parameters with `ut` aliasing
- `si` for optional, `vel` for defaults, `ceteri` for rest
- Arrow `->` for direct returns, verb forms for stream protocol
- `futura` and `cursor` modifiers, or `fiet`/`fiunt`/`fient` verbs
- `cede` for await (async) or yield (generator)
- `prae typus` for generics
- `pro` for lambdas with optional `fiet` for async

The Latin vocabulary maps naturally to programming concepts: _futura_ captures async's temporal nature, _cede_ captures yielding control, and verb conjugations encode sync/async and single/multiple semantics grammatically.



---

# Importa


# Importa

Faber's module system lets programs organize code across files and incorporate external libraries. The design follows a simple principle: imports should read like Latin sentences. When you write `ex norma importa scribe`, you are saying "from the standard library, bring in scribe." The syntax mirrors how Latin expresses provenance and acquisition.

The verb `importa` is the imperative of *importare* (to bring in, to carry into). Its counterpart `exporta` comes from *exportare* (to carry out). These are not arbitrary keyword choices. They describe exactly what the operations do: bringing symbols into a scope, or carrying them out for others to use.

## Importing

### The ex...importa Pattern

Every import begins with `ex` followed by a source, then `importa` followed by the names you want:

```fab
ex norma importa scribe, lege
ex "lodash" importa map, filter
ex "./utils" importa helper
```

This pattern reads naturally in Latin. The preposition `ex` means "from" or "out of," indicating origin or source. You are drawing bindings *out of* a module into your local scope.

The structure is consistent regardless of source type. Whether importing from the standard library, an external package, or a local file, the syntax remains the same. Only the source specifier changes.

### Why "ex"?

Latin prepositions carry semantic weight that English keywords lose through familiarity. When you see `ex items pro item` in a loop, the `ex` tells you where the data flows from. When you see `ex norma importa scribe`, the `ex` tells you where the symbol originates.

The preposition `ex` appears throughout Faber whenever something is drawn from a source:

- Imports draw symbols from modules: `ex module importa name`
- Iteration draws elements from collections: `ex items pro item { ... }`
- Destructuring draws fields from objects: `ex response fixum status, data`

This consistency is deliberate. By using positional grammar rather than distinct keywords for each context, Faber mirrors how Latin works. The preposition's meaning derives from its position in the sentence, not from memorizing what each keyword does in isolation.

### String Paths vs. Bare Identifiers

The source in an import can be either a quoted string or a bare identifier:

```fab
ex norma importa scribe           # bare identifier
ex "norma/tempus" importa dormi   # string path
ex "@hono/hono" importa Hono      # string with special characters
ex "./local" importa helper       # relative path
```

Bare identifiers work for simple module names that are valid identifiers. Use quoted strings when the path contains slashes, special characters, or needs to be a relative path. The `norma` standard library can be imported either way, but its submodules require string paths: `"norma/tempus"`, `"norma/crypto"`.

External packages from registries like npm use their published names as strings. Scoped packages retain their syntax: `"@scope/package"`. Relative imports use standard path notation: `"./sibling"`, `"../parent/child"`.

### Named Imports

Most imports specify exactly which symbols to bring in:

```fab
ex "hono" importa Hono, Context
ex "lodash" importa map, filter, reduce
ex norma importa scribe, lege, mone
```

This is explicit and intentional. Named imports make dependencies visible. A reader can see at a glance what a file uses from each module without hunting through the code.

Multiple symbols are comma-separated. There is no limit to how many you can import in a single statement, but consider readability. If you need a dozen symbols from one module, that module may be doing too much, or your file may be doing too much.

### Import Aliases

Sometimes you need to rename an import. Perhaps there is a naming conflict, or the original name is unclear in context, or you prefer a shorter form for frequently used symbols. The `ut` keyword provides aliasing:

```fab
ex "utils" importa helper ut h
ex "db" importa connect, query ut q, close
ex "lodash" importa map ut lodashMap
```

The `ut` preposition means "as" or "like." You are saying "import `helper` *as* `h`." The original name appears first, then `ut`, then the local name you want to use. This mirrors Latin's use of `ut` for comparison and equivalence.

Aliases work with any import, whether you are renaming one symbol or several:

```fab
ex "mod" importa foo ut f, bar ut b, baz ut z
```

Each renaming is independent. You can alias some imports while leaving others with their original names.

### Wildcard Imports

When you need everything a module exports, use the wildcard form with an alias:

```fab
ex "@std/crypto" importa * ut crypto
ex "lodash" importa * ut _
```

The asterisk `*` means "all exports." The alias is required because wildcard imports must be namespaced. You cannot dump all exports into the local scope without a container. This prevents name collisions and keeps dependencies traceable.

After a wildcard import, access symbols through the alias:

```fab
ex "lodash" importa * ut _
fixum doubled = _.map(numbers, pro x: x * 2)
```

Use wildcards sparingly. Named imports are clearer about dependencies and help tree-shaking in build systems. But wildcards have their place when you genuinely need most of what a module provides.

## Exporting

Modules expose their symbols through exports. Only exported symbols are visible to importers. Everything else remains internal to the module.

### Named Exports

To export existing declarations, list them after `exporta`:

```fab
fixum VERSION = "1.0.0"
functio greet(textus name) -> textus {
    redde scriptum("Salve, §!", name)
}

exporta VERSION, greet
```

The `exporta` statement names what leaves the module. This can appear anywhere in the file, but placing exports at the end (after definitions) or at the beginning (as a manifest) aids readability.

### Inline Exports

You can combine export with declaration for a more compact form:

```fab
exporta fixum VERSION = "1.0.0"

exporta functio greet(textus name) -> textus {
    redde scriptum("Salve, §!", name)
}

exporta genus User {
    textus nomen
    numerus aetas
}
```

When `exporta` precedes a declaration, that declaration is both defined and exported in one statement. This is convenient for modules where most definitions are public.

Choose between named exports and inline exports based on what makes your code clearer. A module with many internal helpers might prefer explicit `exporta` at the end. A module that is primarily a public API might prefer inline exports throughout.

### No Default Exports

Faber does not support default exports. Every export has a name. This is a deliberate choice. Named exports are explicit, searchable, and consistent. When you import `Hono` from a module, you know that is exactly what the module calls it. There is no ambiguity about whether you are importing the default or a named export.

If you are porting code from TypeScript or JavaScript that uses default exports, convert them to named exports with meaningful names.

## Dynamic Imports

### The importabit Verb

Static imports happen at module load time. Sometimes you need to import a module later, perhaps conditionally or to reduce initial load time. Faber provides dynamic imports using the future tense: `importabit`.

```fab
ex "./heavy" importabit modulus
scribe modulus.process(data)
```

The verb `importabit` is the future active indicative of *importare*: "it will bring in." This naming follows Faber's convention that future tense indicates asynchronous operations. Just as `fiet` (will become) signals an async result and `incipiet` (will begin) signals an async entry point, `importabit` signals that the import happens asynchronously.

Dynamic imports return a promise that resolves to the module. Use them within async contexts:

```fab
incipiet {
    ex pathVariable importabit modulus
    scribe modulus.result
}
```

The source can be an expression, not just a literal string. This enables computed imports based on configuration or runtime conditions:

```fab
varia textus modulePath = determineModule()
ex modulePath importabit loaded
```

Use dynamic imports judiciously. Static imports are analyzed at compile time, enabling better error checking and optimization. Dynamic imports defer this to runtime, trading analysis for flexibility.

## Module Organization

### The norma Standard Library

The identifier `norma` refers to Faber's standard library. Unlike external packages, `norma` modules are compiler-handled. The compiler recognizes `norma/*` paths, validates their exports, and generates appropriate target-language code without emitting import statements.

```fab
ex norma importa scribe, lege
ex "norma/tempus" importa nunc, dormi, SECUNDUM
```

This design means compiled output has no Faber-specific dependencies. The standard library is "batteries included" at compile time, not runtime. When you import `dormi` from `norma/tempus`, the compiler emits the appropriate sleep implementation for your target language directly.

### External Packages

External packages are imported by their published names:

```fab
ex "@hono/hono" importa Hono, Context
ex "pg" importa Pool
```

The compiler passes external package references through unchanged. This gives you full access to your target ecosystem's libraries while writing Faber syntax.

### Local Imports

Files within your project import from relative paths:

```fab
ex "./utils" importa helper, formatter
ex "../shared/types" importa User, Config
```

Local imports work like external packages for compilation purposes. The compiler rewrites the path extension (`.fab` to `.ts` or `.py` depending on target) but otherwise passes the import through.

For a project organized across multiple files, local imports let you compose modules while keeping each file focused. Export what others need; keep internals private by not exporting them.

---

The module system is how Faber programs scale beyond single files. The `ex...importa` pattern, once familiar, reads naturally and makes dependencies explicit. Exports mark boundaries. Dynamic imports handle runtime flexibility. And throughout, the Latin vocabulary reminds you what these operations actually do: bringing symbols in, carrying them out, drawing from sources.



---

# Errores


# Errores

Error handling in Faber distinguishes between two fundamentally different kinds of failure: recoverable errors that calling code can handle, and fatal errors that indicate unrecoverable conditions. This distinction, common in systems languages like Rust and Zig, makes error handling intentions explicit in the code itself.

The Latin vocabulary reinforces these semantics: `iace` (throw) signals an error you expect callers to catch, while `mori` (die) signals that the program cannot meaningfully continue.

## Exempla

- `exempla/statements/tempta-cape/` - try/catch patterns
- `exempla/statements/fac/` - scoped blocks with error handling
- `exempla/statements/iace/` - throw statements

---

## Try/Catch

The `tempta`/`cape`/`demum` trio corresponds directly to try/catch/finally in other languages. Use this structure when you want to attempt an operation that might fail and handle the failure gracefully.

### tempta (Try)

From Latin *temptare* (to attempt, to try). The `tempta` block wraps code that might throw an error.

```fab
tempta {
    scribe "Attempting operation..."
    riskyOperation()
    scribe "Operation succeeded"
}
```

Code after the block only executes if no error occurs. If an error is thrown and not caught, it propagates to the caller.

### cape (Catch)

From Latin *capere* (to seize, to catch). The `cape` clause binds the thrown error to a variable and executes handler code.

```fab
tempta {
    iace "Something went wrong"
    scribe "This line never runs"
}
cape err {
    scribe "Caught error:", err
}
```

The error variable (`err` in this example) is scoped to the `cape` block. You can name it whatever makes sense for your context.

A `tempta` block can omit `cape` if you only need cleanup behavior via `demum`:

```fab
tempta {
    scribe "Operation succeeds"
}
demum {
    scribe "Cleanup runs anyway"
}
```

### demum (Finally)

From Latin *demum* (at last, finally). The `demum` block contains cleanup code that runs regardless of whether an error occurred.

```fab
tempta {
    scribe "Opening resource..."
    iace "Failed to open"
}
cape err {
    scribe "Error occurred:", err
}
demum {
    scribe "Cleanup: always runs"
}
```

The `demum` block executes after both the `tempta` body and any `cape` handler, whether the operation succeeded or failed. This is essential for resource cleanup: closing files, releasing locks, resetting state.

When a function returns from within a `tempta` block, the `demum` block still executes before the return completes:

```fab
functio withReturnInDemum() -> textus {
    tempta {
        scribe "Starting operation"
        redde "success"
    }
    cape err {
        redde "error"
    }
    demum {
        scribe "Demum runs before return"
    }
}
```

### Nested Try Blocks

`tempta` blocks can nest. Inner errors are caught by inner handlers; if uncaught, they propagate outward:

```fab
tempta {
    scribe "Outer try"

    tempta {
        scribe "Inner try"
        iace "Inner error"
    }
    cape inner {
        scribe "Caught inner:", inner
    }

    scribe "Continues after inner catch"
}
cape outer {
    scribe "Outer catch:", outer
}
```

---

## Throwing Errors

Faber provides two keywords for signaling errors, each with distinct semantics.

### iace (Throw)

From Latin *iacere* (to throw, to hurl). Use `iace` for recoverable errors that calling code can catch and handle.

```fab
iace "Something went wrong"
```

The expression following `iace` becomes the error value. Typically this is a string message, but it can be any expression:

```fab
fixum code = 404
iace scriptum("Error code: {}", code)
```

`iace` throws from the current context and unwinds the stack until a `cape` clause catches it, or propagates to the program's top level.

### mori (Panic)

From Latin *mori* (to die). Use `mori` for fatal errors that indicate the program cannot meaningfully continue.

```fab
mori "Fatal: invariant violated"
```

Unlike `iace`, a `mori` cannot be caught. It terminates execution immediately. Use this for conditions that represent bugs (violated invariants, impossible states) rather than expected failure modes.

### When to Use Each

**Use `iace` when:**
- The caller might reasonably recover from this error
- The error represents an expected failure mode (file not found, invalid input, network timeout)
- You want to return error information to the caller
- The program state remains consistent after the error

**Use `mori` when:**
- The error indicates a bug in the program
- An invariant has been violated that should never happen
- Continuing would corrupt data or produce undefined behavior
- The program has reached an impossible state

The distinction follows Rust's philosophy: `iace` is for errors that are part of normal operation (like `Result::Err`), while `mori` is for programmer errors that indicate something has gone fundamentally wrong (like `panic!`).

---

## Scoped Error Handling

Beyond the traditional try/catch pattern, Faber provides `fac` blocks for creating explicit scope boundaries with optional error handling.

### fac Blocks

From Latin *facere* (to do, to make). A `fac` block creates an explicit scope for grouping statements:

```fab
fac {
    fixum x = 42
    scribe x
}
# x is not accessible here
```

Variables declared inside a `fac` block are scoped to that block. This is useful for isolating temporary values or grouping related operations.

### Adding cape to fac

A `fac` block can include a `cape` clause to handle errors from the block's body:

```fab
fac {
    fixum value = riskyComputation()
    scribe value
} cape err {
    scribe "Error occurred:", err
}
```

This is more concise than `tempta`/`cape` when you also want scope isolation, and when you don't need a `demum` clause. The `fac` block with `cape` is equivalent to:

```fab
tempta {
    fixum value = riskyComputation()
    scribe value
}
cape err {
    scribe "Error occurred:", err
}
```

### Do-While with Errors

When a `fac` block is followed by `dum` (while), it creates a do-while loop where the body executes at least once before the condition is checked:

```fab
fac { process() } dum hasMore()
```

This pattern can combine with `cape` for do-while loops with error handling:

```fab
fac {
    processNextItem()
} cape err {
    scribe "Item failed:", err
} dum hasMoreItems()
```

The loop continues as long as `hasMoreItems()` returns true. If an error occurs during `processNextItem()`, the `cape` clause handles it, and then the `dum` condition is checked.

---

## Error Handling in Functions

Functions can handle errors internally or let them propagate to callers.

### Internal Handling

When a function handles errors internally, it returns a fallback value:

```fab
functio safeDivide(numerus a, numerus b) -> numerus {
    tempta {
        si b == 0 {
            iace "Division by zero"
        }
        redde a / b
    }
    cape err {
        scribe "Error:", err
        redde 0
    }
}
```

### Propagation

When a function doesn't catch an error, it propagates to the caller:

```fab
functio divide(numerus a, numerus b) -> numerus {
    si b == 0 {
        iace "Division by zero"
    }
    redde a / b
}

# Caller must handle the error
tempta {
    fixum result = divide(10, 0)
}
cape err {
    scribe "Division failed:", err
}
```

### Cleanup with Resources

The `tempta`/`cape`/`demum` pattern is particularly valuable when working with resources that need cleanup:

```fab
functio processWithCleanup(textus name) {
    varia resource = "pending"

    tempta {
        scribe "Opening:", name
        resource = name

        si name == "" {
            iace "Empty name"
        }

        scribe "Processing:", resource
    }
    cape err {
        scribe "Error:", err
    }
    demum {
        scribe "Closing:", resource
    }
}
```

The `demum` block ensures the resource is cleaned up whether the operation succeeds or fails.

---

## Design Philosophy

Faber's error handling reflects the "compiler as tutor" philosophy. The two-tier system (`iace` vs `mori`) makes the programmer's intent explicit:

- When you write `iace`, you're communicating: "This might fail, and that's okay - handle it."
- When you write `mori`, you're communicating: "This should never happen. If it does, we have a bug."

This distinction helps both human readers and the compiler understand what kind of failure you're anticipating. The Latin vocabulary reinforces the semantics: throwing (iace) implies something catchable, while dying (mori) implies finality.



---

