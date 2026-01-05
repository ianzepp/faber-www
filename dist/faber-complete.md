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


---

# Grammar Reference


# Faber Romanus Grammar

Complete syntax reference for the Faber Romanus programming language.

## For LLMs

This document is designed for both human readers and LLM code generation. When generating Faber code:

**Style preferences:**

- PREFER Latin keywords over symbols: `et` over `&&`, `aut` over `||`, `non` over `!`
- PREFER `pro x: expr` for short lambdas, `pro x redde expr` when clarity helps
- ALWAYS use type-first syntax: `textus nomen` not `nomen: textus`
- NEVER use JavaScript/TypeScript/Python syntax where Faber has its own

**Common mistakes to avoid:**

- `return` instead of `redde`
- `const`/`let` instead of `fixum`/`varia`
- `if`/`else` instead of `si`/`secus`
- `for...of` instead of `ex...pro`
- `string`/`number`/`boolean` instead of `textus`/`numerus`/`bivalens`
- `null` instead of `nihil`
- `this` instead of `ego`
- `new` instead of `novum`
- `await` instead of `cede`
- `async function` instead of `futura functio`

---

## Quick Reference

### Types

| Faber      | TypeScript   | Python     | Zig          | Meaning        |
| ---------- | ------------ | ---------- | ------------ | -------------- |
| `textus`   | `string`     | `str`      | `[]const u8` | text/string    |
| `numerus`  | `number`     | `int`      | `i64`        | integer        |
| `fractus`  | `number`     | `float`    | `f64`        | floating point |
| `decimus`  | `number`     | `Decimal`  | -            | decimal        |
| `magnus`   | `bigint`     | `int`      | `i128`       | big integer    |
| `bivalens` | `boolean`    | `bool`     | `bool`       | boolean        |
| `nihil`    | `null`       | `None`     | `null`       | null           |
| `vacuum`   | `void`       | `None`     | `void`       | void           |
| `numquam`  | `never`      | `NoReturn` | `noreturn`   | never          |
| `ignotum`  | `unknown`    | `Any`      | -            | unknown        |
| `octeti`   | `Uint8Array` | `bytes`    | `[]u8`       | bytes          |
| `objectum` | `object`     | `object`   | -            | object         |

### Generic Collections

| Faber          | TypeScript    | Python         | Meaning        |
| -------------- | ------------- | -------------- | -------------- |
| `lista<T>`     | `T[]`         | `list[T]`      | array/list     |
| `tabula<K,V>`  | `Map<K,V>`    | `dict[K,V]`    | map/dictionary |
| `copia<T>`     | `Set<T>`      | `set[T]`       | set            |
| `promissum<T>` | `Promise<T>`  | `Awaitable[T]` | promise/future |
| `cursor<T>`    | `Iterator<T>` | `Iterator[T]`  | iterator       |
| `unio<A,B>`    | `A \| B`      | `A \| B`       | union type     |

### Literals

| Faber    | Meaning   |
| -------- | --------- |
| `verum`  | true      |
| `falsum` | false     |
| `nihil`  | null      |
| `ego`    | this/self |

### Keywords by Category

**Declarations:**

- `fixum` — immutable binding (const)
- `varia` — mutable binding (let)
- `functio` — function
- `genus` — class/struct
- `pactum` — interface/protocol
- `typus` — type alias
- `ordo` — enum
- `discretio` — tagged union

**Control flow:**

- `si` / `sin` / `secus` / `secus` — if / else-if / else
- `dum` — while
- `ex...pro` — for-of (iteration)
- `de...pro` — for-in (keys)
- `elige` — switch/match
- `custodi` — guard clauses
- `rumpe` — break
- `perge` — continue

**Functions:**

- `redde` — return
- `futura` — async modifier
- `cede` — await
- `cursor` — generator modifier
- `pro x: expr` — lambda expression

**Error handling:**

- `tempta` — try
- `cape` — catch
- `demum` — finally
- `iace` — throw (recoverable)
- `mori` — panic (fatal)
- `adfirma` — assert

**Output:**

- `scribe` — console.log
- `vide` — console.debug
- `mone` — console.warn

**Operators:**

- `et` — logical and (&&)
- `aut` — logical or (||)
- `non` — logical not (!)
- `vel` — nullish coalescing (??)
- `est` — instanceof/typeof check
- `qua` — type cast (as)

### Collection Methods (lista)

Common array methods (see README for complete list):

| Latin               | JavaScript          | Mutates? |
| ------------------- | ------------------- | -------- |
| `adde(x)`           | `push(x)`           | yes      |
| `remove()`          | `pop()`             | yes      |
| `primus`            | `[0]`               | no       |
| `ultimus`           | `[arr.length-1]`    | no       |
| `longitudo`         | `.length`           | no       |
| `mappata(fn)`       | `.map(fn)`          | no       |
| `filtrata(fn)`      | `.filter(fn)`       | no       |
| `reducta(fn, init)` | `.reduce(fn, init)` | no       |
| `inveni(fn)`        | `.find(fn)`         | no       |
| `continet(x)`       | `.includes(x)`      | no       |
| `coniunge(sep)`     | `.join(sep)`        | no       |

### Collection Methods (tabula)

| Latin        | JavaScript   | Mutates? |
| ------------ | ------------ | -------- |
| `pone(k, v)` | `.set(k, v)` | yes      |
| `accipe(k)`  | `.get(k)`    | no       |
| `habet(k)`   | `.has(k)`    | no       |
| `dele(k)`    | `.delete(k)` | yes      |
| `claves()`   | `.keys()`    | no       |
| `valores()`  | `.values()`  | no       |

### Collection Methods (copia)

| Latin                | JavaScript       | Mutates? |
| -------------------- | ---------------- | -------- |
| `adde(x)`            | `.add(x)`        | yes      |
| `habet(x)`           | `.has(x)`        | no       |
| `dele(x)`            | `.delete(x)`     | yes      |
| `unio(other)`        | set union        | no       |
| `intersectio(other)` | set intersection | no       |

---

## Complete Program Example

```fab
# A simple API handler demonstrating multiple features
ex hono importa Hono, Context

genus UserService {
    @ privatum
    textus baseUrl

    functio creo(textus url) {
        ego.baseUrl = url
    }

    futura functio fetch(numerus id) fiet User? {
        fixum response = cede ego.client.get(`${ego.baseUrl}/users/${id}`)

        custodi {
            si response.status !== 200 { redde nihil }
        }

        redde response.json() qua User
    }

    futura functio fetchAll() fiet lista<User> {
        fixum response = cede ego.client.get(`${ego.baseUrl}/users`)
        fixum users = cede response.json() qua User[]

        redde users.filtrata(pro u: u.active)
    }
}

fixum app = novum Hono()

app.get("/users/:id", futura functio(Context ctx) {
    fixum id = ctx.param("id") qua numerus
    fixum service = novum UserService("https:#api.example.com")
    fixum user = cede service.fetch(id)

    si user === nihil {
        redde ctx.json({ error: "Not found" }, 404)
    }

    redde ctx.json(user)
})
```

---

## Table of Contents

- [Fundamenta](#fundamenta) — basic language elements
- [Typi](#typi) — type system
- [Operatores](#operatores) — operators
- [Functiones](#functiones) — function declarations
- [Regimen](#regimen) — control flow
- [Errores](#errores) — error handling
- [Structurae](#structurae) — data structures
- [Importa](#importa) — module system

---

<a id="fundamenta"></a>

## Fundamenta

Basic language elements: variables, constants, literals, and output.

### Object Pattern

```ebnf
objectPattern := '{' patternProperty (',' patternProperty)* '}'
patternProperty := 'ceteri'? IDENTIFIER (':' IDENTIFIER)?
```

**Examples:**

```fab
{ nomen, aetas }              // extract nomen and aetas
{ nomen: localName, aetas }   // rename nomen to localName
{ nomen, ceteri rest }        // extract nomen, collect rest

T SUPPORTED (will produce parser errors):
{ ...rest }    // JS spread syntax
{ *rest }      // Python unpack syntax
{ **rest }     // Python kwargs syntax
```

---

<a id="typi"></a>

## Typi

Type system: type annotations, aliases, enums, nullable types, and collections.

### Type Alias Declaration

```ebnf
typeAliasDecl := 'typus' IDENTIFIER '=' typeAnnotation
```

> Enables creating named type aliases for complex types.

**Examples:**

```fab
typus ID = textus
typus UserID = numerus<32, Naturalis>
typus ConfigTypus = typus config    // typeof
```

### Type Annotation

```ebnf
typeAnnotation := ('de' | 'in')? IDENTIFIER typeParams? '?'? arrayBrackets*
typeParams := '<' typeParameter (',' typeParameter)* '>'
typeParameter := typeAnnotation | NUMBER | MODIFIER
arrayBrackets := '[]' '?'?
```

> Supports generics (lista<textus>), nullable (?), union types (unio<A, B>),
> and array shorthand (numerus[] desugars to lista<numerus>).

---

<a id="operatores"></a>

## Operatores

Operators: arithmetic, logical, comparison, ternary, nullish coalescing, and ranges.

### Assignment

```ebnf
assignment := ternary (('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=') assignment)?
```

### Ternary

```ebnf
ternary := or (('?' expression ':' | 'sic' expression 'secus') ternary)?
```

> Supports both symbolic (? :) and Latin (sic secus) syntax.
> The two forms cannot be mixed: use either ? : or sic secus.

**Examples:**

```fab
verum ? 1 : 0              // symbolic style
verum sic 1 secus 0        // Latin style
a ? b ? c : d : e          // nested (right-associative)
```

### Or

```ebnf
or := and (('||' | 'aut') and)* | and ('vel' and)*
```

> Latin 'aut' (or) for logical OR, 'vel' (or) for nullish coalescing.
> Mixing aut/|| with vel without parentheses is a syntax error
> (same as JavaScript's ?? and || restriction).

### And

```ebnf
and := equality ('&&' equality | 'et' equality)*
```

> Latin 'et' (and) supported alongside '&&'.

### Equality

```ebnf
equality := comparison (('==' | '!=' | '===' | '!==' | 'est' | 'non' 'est') comparison)*
```

> 'est' always means type check (instanceof/typeof).
> Use '===' or '!==' for value equality.
> Use 'nihil x' or 'nonnihil x' for null checks.

### Comparison

```ebnf
comparison := bitwiseOr (('<' | '>' | '<=' | '>=' | 'intra' | 'inter') bitwiseOr)*
```

> intra/inter at comparison level - same precedence as relational operators

### Range

```ebnf
range := additive (('..' | 'ante' | 'usque') additive ('per' additive)?)?
```

> Range expressions provide concise numeric iteration.
> Three operators with different end semantics:
> - '..' and 'ante': exclusive (0..10 / 0 ante 10 = 0-9)
> - 'usque': inclusive (0 usque 10 = 0-10)
> Optional step via 'per' keyword.

**Examples:**

```fab
0..10           -> RangeExpression(0, 10, inclusive=false)
0 ante 10       -> RangeExpression(0, 10, inclusive=false)
0 usque 10      -> RangeExpression(0, 10, inclusive=true)
0..10 per 2     -> RangeExpression(0, 10, 2, inclusive=false)
```

### Additive

```ebnf
additive := multiplicative (('+' | '-') multiplicative)*
```

### Multiplicative

```ebnf
multiplicative := unary (('*' | '/' | '%') unary)*
```

### Unary

```ebnf
unary := ('!' | '-' | 'non' | 'nulla' | 'nonnulla' | 'nihil' | 'nonnihil' | 'negativum' | 'positivum' | 'cede' | 'novum' | 'finge') unary | cast
```

> Latin 'non' (not), 'nulla' (none/empty), 'nonnulla' (some/non-empty),
> 'nihil' (is null), 'nonnihil' (is not null),
> 'negativum' (< 0), 'positivum' (> 0), 'cede' (await), 'novum' (new),
> 'finge' (form variant).

---

<a id="functiones"></a>

## Functiones

Function declarations: basic functions, typed parameters, async, generators, and lambdas.

### Parameter List

```ebnf
paramList := (parameter (',' parameter)*)?
```

### Parameter

```ebnf
parameter := ('de' | 'in' | 'ex')? 'si'? 'ceteri'? (typeAnnotation IDENTIFIER | IDENTIFIER) ('ut' IDENTIFIER)? ('vel' expression)?
```

> Type-first syntax: "textus name" or "de textus source"
> Prepositional prefixes indicate semantic roles:
> de = from/concerning (borrowed, read-only),
> in = in/into (mutable borrow),
> ex = from/out of (source)
> 
> OPTIONAL PARAMETERS:
> 'si' marks a parameter as optional. Without 'vel', type becomes ignotum<T>.
> With 'vel', parameter has a default value and type stays T.
> Order: preposition, then si, then ceteri, then type, then name.

---

<a id="regimen"></a>

## Regimen

Control flow: conditionals, loops, guards, assertions, and program structure.

### Annotation

```ebnf
annotation := '@' IDENTIFIER (expression)?
```

### Program

```ebnf
program := statement*
```

### Annotations

```ebnf
annotation := '@' IDENTIFIER+
```

> Annotations modify the following declaration with metadata like
> visibility (publicum, privatum), async (futura), abstract (abstractum).

### Statement

```ebnf
statement := importDecl | varDecl | funcDecl | typeAliasDecl | ifStmt | whileStmt | forStmt
| returnStmt | throwStmt | tryStmt | blockStmt | exprStmt
```

> Uses lookahead to determine statement type via keyword inspection.

### Specifier

```ebnf
specifier := 'ceteri'? IDENTIFIER ('ut' IDENTIFIER)?
```

> Shared between imports and destructuring.
> 'ceteri' (rest) is only valid in destructuring contexts.
> 'ut' provides aliasing: nomen ut n

**Examples:**

```fab
scribe             -> imported=scribe, local=scribe
scribe ut s        -> imported=scribe, local=s
ceteri rest        -> imported=rest, local=rest, rest=true
```

### Importa Declaration

```ebnf
importDecl := 'ex' (STRING | IDENTIFIER) 'importa' (specifierList | '*')
specifierList := specifier (',' specifier)*
specifier := IDENTIFIER ('ut' IDENTIFIER)?
```

**Examples:**

```fab
ex norma importa scribe, lege
ex norma importa scribe ut s, lege ut l
ex "norma/tempus" importa nunc, dormi
ex norma importa *
```

### Varia Declaration

```ebnf
varDecl := ('varia' | 'fixum' | 'figendum' | 'variandum') typeAnnotation? IDENTIFIER ('=' expression)?
arrayDestruct := ('varia' | 'fixum' | 'figendum' | 'variandum') arrayPattern '=' expression
```

> Type-first syntax: "fixum textus nomen = value" or "fixum nomen = value"
> Latin 'varia' (let it be) for mutable, 'fixum' (fixed) for immutable.

### Array Pattern

```ebnf
arrayPattern := '[' arrayPatternElement (',' arrayPatternElement)* ']'
arrayPatternElement := '_' | 'ceteri'? IDENTIFIER
```

**Examples:**

```fab
[a, b, c]                 // extract first three elements
[first, ceteri rest]     // extract first, collect rest
[_, second, _]           // skip first and third, extract second

T SUPPORTED:
[...rest]                // JS spread syntax
[*rest]                  // Python unpack syntax
```

### Functio Declaration

```ebnf
funcDecl := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause? blockStmt
paramList := (typeParamDecl ',')* (parameter (',' parameter)*)?
typeParamDecl := 'prae' 'typus' IDENTIFIER
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
returnClause := ('->' | 'fit' | 'fiet' | 'fiunt' | 'fient') typeAnnotation
```

> All function declarations start with 'functio' for consistent parsing.
> Modifiers come after the parameter list, before the return clause.
> 'futura' marks async functions (future/promise-based).
> 'cursor' marks generator functions (yield-based).
> 'curata NAME' marks managed functions (receives allocator as NAME).
> 
> TYPE PARAMETERS: 'prae typus T' declares compile-time type parameters.
> functio max(prae typus T, T a, T b) -> T { ... }
> Maps to: <T> (TS/Rust), TypeVar (Py), comptime T: type (Zig)
> 
> RETURN TYPE VERBS: Latin verb forms encode async/generator semantics directly:
> '->'    neutral arrow (semantics from modifier only)
> 'fit'   "it becomes" - sync, returns single value
> 'fiet'  "it will become" - async, returns Promise<T>
> 'fiunt' "they become" - sync generator, yields multiple values
> 'fient' "they will become" - async generator, yields Promise values
> 
> When using verb forms, the futura/cursor modifier is NOT required - the verb
> itself carries the semantic information. The modifier becomes redundant:
> functio compute() -> numerus { ... }         // arrow: sync by default
> functio compute() fit numerus { ... }        // verb: explicitly sync
> functio fetch() futura -> textus { ... }     // modifier: async
> functio fetch() fiet textus { ... }          // verb implies async
> functio items() cursor -> numerus { ... }    // modifier: generator
> functio items() fiunt numerus { ... }        // verb implies generator
> functio stream() fient datum { ... }         // verb implies async generator
> functio alloc(textus s) curata a -> T { ... } // managed, allocator bound as 'a'
> 
> Modifier is still allowed for emphasis, but verb/modifier conflicts are errors.
> 
> NOT SUPPORTED (will produce parser errors):
> - TS-style param annotation: functio f(x: textus) (use: functio f(textus x))
> - TS-style return type: functio f(): textus (use: functio f() -> textus)
> - Trailing comma in params: functio f(a, b,)

### Type And Parameter List

```ebnf
paramList := (typeParamDecl ',')* (parameter (',' parameter)*)?
typeParamDecl := 'prae' 'typus' IDENTIFIER
```

> Type parameters (prae typus T) must come first, followed by regular params.
> This matches the conventions of TypeScript, Rust, and Zig.

**Examples:**

```fab
(prae typus T, T a, T b)     -> typeParams=[T], params=[a, b]
(prae typus T, prae typus U) -> typeParams=[T, U], params=[]
(numerus a, numerus b)       -> typeParams=[], params=[a, b]
```

### Ordo Declaration

```ebnf
enumDecl := 'ordo' IDENTIFIER '{' enumMember (',' enumMember)* ','? '}'
enumMember := IDENTIFIER ('=' ('-'? NUMBER | STRING))?
```

> Latin 'ordo' (order/rank) for enumerated constants.

**Examples:**

```fab
ordo color { rubrum, viridis, caeruleum }
ordo status { pendens = 0, actum = 1, finitum = 2 }
ordo offset { ante = -1, ad = 0, post = 1 }
```

### Discretio Declaration

```ebnf
discretioDecl := 'discretio' IDENTIFIER typeParams? '{' variant (',' variant)* ','? '}'
variant := IDENTIFIER ('{' variantFields '}')?
variantFields := (typeAnnotation IDENTIFIER (',' typeAnnotation IDENTIFIER)*)?
```

> Latin 'discretio' (distinction) for tagged unions.
> Each variant has a compiler-managed tag for exhaustive pattern matching.

**Examples:**

```fab
discretio Event {
    Click { numerus x, numerus y }
    Keypress { textus key }
    Quit
}

discretio Option<T> {
    Some { T value }
    None
}
```

### Variant Declaration

```ebnf
variant := IDENTIFIER ('{' variantFields '}')?
variantFields := (typeAnnotation IDENTIFIER (',' typeAnnotation IDENTIFIER)*)?
```

> Variant names are capitalized by convention (like type names).
> Fields use type-first syntax like genus fields.

**Examples:**

```fab
Click { numerus x, numerus y }  -> fields with payload
Quit                            -> unit variant (no payload)
```

### Si Statement

```ebnf
ifStmt := 'si' expression (blockStmt | 'ergo' statement | 'reddit' expression) ('cape' IDENTIFIER blockStmt)? (elseClause | 'sin' ifStmt)?
elseClause := ('secus' | 'secus') (ifStmt | blockStmt | statement)
```

> 'cape' (catch/seize) clause allows error handling within conditionals.
> 'ergo' (therefore) for one-liner consequents.
> 'reddit' (it returns) for early return one-liners.
> 
> TWO STYLE OPTIONS (both supported, can be mixed within the same chain):
> 
> Literal style: si / sin / secus
> si x > 0 { positive() }
> sin x < 0 { negative() }
> secus { zero() }
> 
> Poetic style: si / sin / secus
> si x > 0 { positive() }
> sin x < 0 { negative() }    // "sin" = "but if" (classical Latin)
> secus { zero() }            // "secus" = "otherwise"
> 
> Keywords are interchangeable at each branch point:
> - 'sin' ≡ 'sin' (else-if)
> - 'secus' ≡ 'secus' (else)
> - Mixed: si ... sin ... secus { } is valid

**Examples:**

```fab
si x > 5 ergo scribe("big")
si x > 5 reddit verum            // early return
si x > 5 { scribe("big") } secus scribe("small")
si x < 0 { ... } sin x == 0 { ... } secus { ... }
```

### Dum Statement

```ebnf
whileStmt := 'dum' expression (blockStmt | 'ergo' statement | 'reddit' expression) ('cape' IDENTIFIER blockStmt)?
```

> 'dum' (while/until) for while loops.

**Examples:**

```fab
dum x > 0 { x = x - 1 }
dum x > 0 ergo x = x - 1
dum x > 0 reddit x
```

### Ex Statement

```ebnf
exStmt := 'ex' expression (forBinding | destructBinding | arrayDestructBinding)
forBinding := ('pro' | 'fit' | 'fiet') IDENTIFIER (blockStmt | 'ergo' statement | 'reddit' expression) catchClause?
destructBinding := ('fixum' | 'varia' | 'figendum' | 'variandum') specifierList
arrayDestructBinding := ('fixum' | 'varia' | 'figendum' | 'variandum') arrayPattern
specifierList := specifier (',' specifier)*
specifier := 'ceteri'? IDENTIFIER ('ut' IDENTIFIER)?
```

> 'ex' (from/out of) introduces both iteration and extraction:
> - Iteration: ex items pro item { ... } (for each item from items)
> - Object destructuring: ex persona fixum nomen, aetas (extract properties)
> - Array destructuring: ex coords fixum [x, y, z] (extract by position)
> - Async destructuring: ex promise figendum result (await + extract)
> 
> The binding keywords encode mutability and async semantics:
> - fixum: immutable binding (const)
> - varia: mutable binding (let)
> - figendum: immutable + await (const with await)
> - variandum: mutable + await (let with await)

**Examples:**

```fab
ex numeri pro n { ... }              // for-loop (sync)
ex numeri fiet n { ... }             // for-await-of loop (async)
ex persona fixum nomen, aetas        // object destructuring
ex persona fixum nomen ut n          // object destructuring with alias
ex persona fixum nomen, ceteri rest  // object destructuring with rest
ex coords fixum [x, y, z]            // array destructuring
ex fetchData() figendum result       // async destructuring

llection DSL forms:
ex items prima 5 pro item { }        // iteration with transforms
ex items prima 5, ultima 2 pro x {}  // multiple transforms
```

### D S L Transforms

```ebnf
dslTransforms := dslTransform (',' dslTransform)*
dslTransform := dslVerb expression?
dslVerb := 'prima' | 'ultima' | 'summa'
```

> DSL provides concise syntax for common collection operations.
> Transforms chain with commas: prima 5, ultima 3

**Examples:**

```fab
prima 5           -> first 5 elements
ultima 3          -> last 3 elements
summa             -> sum (no argument)
prima 5, ultima 2 -> first 5, then last 2 of those
```

### Collection D S L Expression

```ebnf
dslExpr := 'ex' expression dslTransform (',' dslTransform)*
```

> When 'ex' appears in expression context with DSL verbs (not pro/fit/fiet),
> it creates a collection pipeline expression that can be assigned.

**Examples:**

```fab
fixum top5 = ex items prima 5
fixum total = ex prices summa
fixum result = ex items prima 10, ultima 3
```

### Ab Expression

```ebnf
abExpr := 'ab' expression filter? (',' transform)*
filter := ['non'] ('ubi' condition | identifier)
condition := expression
```

> 'ab' (away from) is the dedicated DSL entry point for filtering.
> The 'ex' preposition remains unchanged for iteration/import/destructuring.
> Include/exclude is handled via 'non' keyword.

**Examples:**

```fab
ab users activus                     // boolean property shorthand
ab users non banned                  // negated boolean property
ab users ubi aetas >= 18             // condition with ubi
ab users non ubi banned et suspended // negated compound condition
ab users activus, prima 10           // filter + transforms
ab users activus pro user { }        // iteration form
```

### Regex Literal

```ebnf
regexLiteral := 'sed' STRING IDENTIFIER?
```

> 'sed' (the Unix stream editor) is synonymous with pattern matching.
> The pattern string is passed through verbatim to the target.
> Flags are a bare identifier after the pattern (no comma).

**Examples:**

```fab
sed "\\d+"           // pattern only
sed "hello" i        // case insensitive
sed "^start" im      // multiple flags
```

### De Statement

```ebnf
deStmt := 'de' expression ('pro' | 'fit' | 'fiet') IDENTIFIER
(blockStmt | 'ergo' statement | 'reddit' expression) catchClause?
```

> 'de' (from/concerning) for extracting keys from an object.
> Semantically read-only - contrasts with 'in' for mutation.

**Examples:**

```fab
de tabula pro clavis { ... }  // from table, for each key
de object pro k ergo scribe k // one-liner form
de object pro k reddit k      // return first key
```

### In Statement

```ebnf
inStmt := 'in' expression blockStmt
```

> 'in' (into) for reaching into an object to modify it.
> Semantically mutable - contrasts with 'de' for read-only iteration.

**Examples:**

```fab
in user { nomen = "Marcus" }  // mutation block
```

### Elige Statement

```ebnf
eligeStmt := 'elige' expression '{' eligeCase* defaultCase? '}' catchClause?
eligeCase := 'casu' expression (blockStmt | 'ergo' statement | 'reddit' expression)
defaultCase := 'ceterum' (blockStmt | statement)
```

> 'elige' (choose) for value-based switch.
> 'ergo' (therefore) for one-liners, 'ceterum' (otherwise) for default.
> 'reddit' (it returns) for early return one-liners.
> For variant matching on discretio types, use 'discerne' instead.

**Examples:**

```fab
elige status {
    casu "pending" ergo scribe("waiting")
    casu "active" reddit verum
    ceterum iace "Unknown status"
}
```

### Discerne Statement

```ebnf
discerneStmt := 'discerne' discriminants '{' variantCase* '}'
discriminants := expression (',' expression)*
variantCase := 'casu' patterns (blockStmt | 'ergo' statement | 'reddit' expression)
patterns := pattern (',' pattern)*
pattern := '_' | (IDENTIFIER patternBind?)
patternBind := ('ut' IDENTIFIER) | ('pro' IDENTIFIER (',' IDENTIFIER)*)
```

> 'discerne' (distinguish!) pairs with 'discretio' (the tagged union type).
> Uses 'casu' for match arms, 'ut' to bind whole variants, and 'pro' for positional bindings.
> Multi-discriminant matching reduces nesting when comparing multiple values.

**Examples:**

```fab
# Single discriminant
discerne event {
    casu Click pro x, y { scribe "clicked at " + x + ", " + y }
    casu Keypress pro key reddit key
    casu Quit ergo mori "goodbye"
}

# Multi-discriminant
discerne left, right {
    casu Primitivum ut l, Primitivum ut r { redde l.nomen == r.nomen }
    casu _, _ { redde falsum }
}
```

### Variant Pattern

```ebnf
pattern := '_' | (IDENTIFIER patternBind?)
patternBind := ('ut' IDENTIFIER) | ('pro' IDENTIFIER (',' IDENTIFIER)*)
```

> Patterns match against discriminants in discerne statements.
> Wildcard '_' matches any variant without binding.
> 'ut' binds the whole variant, 'pro' destructures fields.
> 
> DISAMBIGUATION: After 'pro', commas separate bindings until we see:
> - '_' (wildcard pattern)
> - An identifier followed by 'ut' or 'pro' (new pattern with binding)
> - '{', 'ergo', 'reddit' (end of patterns)

### Custodi Statement

```ebnf
guardStmt := 'custodi' '{' guardClause+ '}'
guardClause := 'si' expression (blockStmt | 'ergo' statement | 'reddit' expression)
```

> 'custodi' (guard!) groups early-exit conditions.
> 'ergo' for one-liner actions, 'reddit' for early return one-liners.

**Examples:**

```fab
custodi {
    si user == nihil reddit nihil
    si user.age < 0 ergo iace "Invalid age"
    si user.name == "" { redde defaultUser() }
}
```

### Adfirma Statement

```ebnf
assertStmt := 'adfirma' expression (',' expression)?
```

> 'adfirma' (affirm/assert) for runtime invariant checks.

**Examples:**

```fab
adfirma x > 0
adfirma x > 0, "x must be positive"
```

### Redde Statement

```ebnf
returnStmt := 'redde' expression?
```

> 'redde' (give back/return) for return statements.

### Rumpe Statement

```ebnf
breakStmt := 'rumpe'
```

> 'rumpe' (break!) exits the innermost loop.

### Perge Statement

```ebnf
continueStmt := 'perge'
```

> 'perge' (continue/proceed!) skips to the next loop iteration.

### Iace Statement

```ebnf
throwStmt := ('iace' | 'mori') expression
```

> Two error severity levels:
> iace (throw!) → recoverable, can be caught
> mori (die!)   → fatal/panic, unrecoverable

### Scribe Statement

```ebnf
outputStmt := ('scribe' | 'vide' | 'mone') expression (',' expression)*
```

> Latin output keywords as statement forms:
> scribe (write!) → console.log
> vide (see!)     → console.debug
> mone (warn!)    → console.warn

**Examples:**

```fab
scribe "hello"
vide "debugging:", value
mone "warning:", message
```

### Tempta Statement

```ebnf
tryStmt := 'tempta' blockStmt ('cape' IDENTIFIER blockStmt)? ('demum' blockStmt)?
```

> 'tempta' (attempt/try), 'cape' (catch/seize), 'demum' (finally/at last).

### Cape Clause

```ebnf
catchClause := 'cape' IDENTIFIER blockStmt
```

### Probandum Statement

```ebnf
probandumDecl := 'probandum' STRING '{' probandumBody '}'
probandumBody := (curaBlock | probandumDecl | probaStmt)*
```

> Latin "probandum" (gerundive of probare) = "that which must be tested".
> Analogous to describe() in Jest/Vitest.

**Examples:**

```fab
probandum "Tokenizer" {
    praepara { lexer = init() }
    proba "parses numbers" { ... }
}
```

### Proba Statement

```ebnf
probaStmt := 'proba' probaModifier? STRING blockStmt
probaModifier := 'omitte' STRING | 'futurum' STRING
```

> Latin "proba" (imperative of probare) = "test!" / "prove!".
> Analogous to test() or it() in Jest/Vitest.

**Examples:**

```fab
proba "parses integers" { adfirma parse("42") est 42 }
proba omitte "blocked by #42" { ... }
proba futurum "needs async support" { ... }
```

### Ad Statement

```ebnf
adStmt := 'ad' STRING '(' argumentList ')' adBinding? blockStmt? catchClause?
adBinding := adBindingVerb typeAnnotation? 'pro' IDENTIFIER ('ut' IDENTIFIER)?
adBindingVerb := 'fit' | 'fiet' | 'fiunt' | 'fient'
argumentList := (expression (',' expression)*)?
```

> Latin 'ad' (to/toward) dispatches to named endpoints:
> - Stdlib syscalls: "fasciculus:lege", "console:log"
> - External packages: "hono/Hono"
> - Remote services: "https://api.example.com/users"
> 
> Binding verbs encode sync/async and single/plural:
> - fit: sync, single ("it becomes")
> - fiet: async, single ("it will become")
> - fiunt: sync, plural ("they become")
> - fient: async, plural ("they will become")

**Examples:**

```fab
ad "console:log" ("hello")                           // fire-and-forget
ad "fasciculus:lege" ("file.txt") fit textus pro c { }  // sync binding
ad "http:get" (url) fiet Response pro r { }          // async binding
ad "http:batch" (urls) fient Response[] pro rs { }   // async plural
```

### Praepara Block

```ebnf
praeparaBlock := ('praepara' | 'praeparabit' | 'postpara' | 'postparabit') 'omnia'? blockStmt
```

> Latin "praepara" (prepare!) for test setup, "postpara" (cleanup!) for teardown.
> Uses -bit suffix for async (future tense), matching fit/fiet pattern.

**Examples:**

```fab
praepara { lexer = init() }
praepara omnia { db = connect() }
praeparabit omnia { db = cede connect() }
postpara { cleanup() }
postpara omnia { db.close() }
postparabit omnia { cede db.close() }
```

### Cura Statement

```ebnf
curaStmt := 'cura' curatorKind? expression? ('pro' | 'fit' | 'fiet') typeAnnotation? IDENTIFIER blockStmt catchClause?
curatorKind := 'arena' | 'page'
```

> Latin "cura" (care) + binding verb for scoped resources.
> - pro: neutral binding ("for")
> - fit: sync binding ("it becomes")
> - fiet: async binding ("it will become")
> Curator kinds declare explicit allocator types (arena, page).
> Guarantees cleanup via solve() on scope exit.

**Examples:**

```fab
cura arena fit mem { ... }                    // arena allocator
cura page fit mem { ... }                     // page allocator
cura aperi("data.bin") fit fd { lege(fd) }   // generic resource
cura connect(url) fiet conn { ... }          // async resource
```

### Incipit Statement

```ebnf
incipitStmt := 'incipit' (blockStmt | 'ergo' statement | 'reddit' expression)
```

> 'incipit' (it begins) marks the program entry point.
> This is a pure structural marker with no magic injection.
> The source is responsible for any setup (allocators via cura, etc.).
> 
> The 'ergo' (therefore) form chains to a single statement, typically
> a cura block for allocator setup. This avoids extra nesting.
> The 'reddit' form returns an exit code directly.

**Examples:**

```fab
incipit {
    scribe "Hello"
}

incipit ergo cura arena {
```

### Incipiet Statement

```ebnf
incipietStmt := 'incipiet' (blockStmt | 'ergo' statement | 'reddit' expression)
```

> 'incipiet' (it will begin) marks the async program entry point.
> Mirrors the fit/fiet pattern: present for sync, future for async.
> 
> The 'ergo' form chains to a single statement for concise setup.
> The 'reddit' form returns an exit code directly.

**Examples:**

```fab
incipiet {
    fixum data = cede fetchData()
    scribe data
}

incipiet ergo cura arena {
    fixum data = cede fetchData()
}

incipiet reddit 0
```

### Block Statement

```ebnf
blockStmt := '{' statement* '}'
```

### Expression Statement

```ebnf
exprStmt := expression
```

### Expression

```ebnf
expression := assignment
```

> Top-level expression delegates to assignment (lowest precedence).

### Bitwise Or

```ebnf
bitwiseOr := bitwiseXor ('|' bitwiseXor)*
```

> Bitwise precedence is above comparison (unlike C), so
> `flags & MASK == 0` parses as `(flags & MASK) == 0`.

### Bitwise Xor

```ebnf
bitwiseXor := bitwiseAnd ('^' bitwiseAnd)*
```

### Bitwise And

```ebnf
bitwiseAnd := shift ('&' shift)*
```

### Shift

```ebnf
shift := range (('<<' | '>>') range)*
```

### Praefixum Expression

```ebnf
praefixumExpr := 'praefixum' (blockStmt | '(' expression ')')
```

> Latin 'praefixum' (pre-fixed) extends fixum vocabulary.
> Block form: praefixum { ... } for multi-statement computation
> Expression form: praefixum(expr) for simple expressions
> 
> TARGET SUPPORT:
> Zig:    comptime { } or comptime (expr)
> C++:    constexpr
> Rust:   const (in const context)
> TS/Py:  Semantic error - not supported

**Examples:**

```fab
fixum size = praefixum(256 * 4)
fixum table = praefixum {
    varia result = []
    ex 0..10 pro i { result.adde(i * i) }
    redde result
}
```

### Scriptum Expression

```ebnf
scriptumExpr := 'scriptum' '(' STRING (',' expression)* ')'
```

> "scriptum" (that which has been written) is the perfect passive participle
> of scribere. While scribe outputs to console, scriptum returns a formatted string.
> 
> The § placeholder is converted to target-appropriate format specifiers.

**Examples:**

```fab
scriptum("Hello, §", name)
scriptum("§ + § = §", a, b, a + b)
```

### Lege Expression

```ebnf
legeExpr := 'lege' ('lineam')?
```

### Qua Expression

```ebnf
castExpr := call ('qua' typeAnnotation)*
```

> Latin 'qua' (as, in the capacity of) for type assertions.
> Compile-time only — no runtime checking. Maps to:
> - TypeScript: x as T
> - Python: x (ignored, dynamic typing)
> - Zig: @as(T, x)
> - Rust: x as T
> - C++: static_cast<T>(x)

### Novum Expression

```ebnf
newExpr := 'novum' IDENTIFIER ('(' argumentList ')')? (objectLiteral | 'de' expression)?
```

> Two forms for property overrides:
> - Inline literal: `novum Persona { nomen: "Marcus" }`
> - From expression: `novum Persona de props` (props is variable/call/etc.)
> 
> The `de` (from) form allows dynamic overrides from variables or function results.

### Finge Expression

```ebnf
fingeExpr := 'finge' IDENTIFIER ('{' fieldList '}')? ('qua' IDENTIFIER)?
```

> Latin 'finge' (form/shape) for constructing discretio variants.
> Variant name comes first, optional fields in braces, optional qua for
> explicit discretio type when not inferrable from context.

**Examples:**

```fab
finge Click { x: 10, y: 20 }           - payload variant
finge Click { x: 10, y: 20 } qua Event - with explicit type
finge Active                            - unit variant
finge Active qua Status                 - unit variant with explicit type
```

### Lambda Expression

```ebnf
lambdaExpr := ('pro' | 'fit' | 'fiet') params? ('->' type)? (':' expression | blockStmt)
params := IDENTIFIER (',' IDENTIFIER)*
```

### Identifier Or Keyword

```ebnf
identifierOrKeyword := IDENTIFIER | KEYWORD
```

> Import specifiers can be keywords (ex norma importa scribe).
> In this context, 'scribe' is a valid name, not a statement keyword.

---

<a id="errores"></a>

## Errores

Error handling: try/catch, throw, panic, and scoped error handling.

### Fac Block Statement

```ebnf
facBlockStmt := 'fac' blockStmt ('cape' IDENTIFIER blockStmt)? ('dum' expression)?
```

> 'fac' (do/make) creates an explicit scope boundary for grouping
> statements with optional error handling via 'cape' (catch).
> When followed by 'dum', creates a do-while loop where the body
> executes at least once before the condition is checked.
> Useful for:
> - Scoped variable declarations
> - Grouping related operations with shared error handling
> - Creating IIFE-like constructs
> - Do-while loops (body executes first, then condition checked)

**Examples:**

```fab
fac { fixum x = computeValue() }
fac { riskyOperation() } cape e { scribe e }
fac { process() } dum hasMore()
fac { process() } cape e { log(e) } dum hasMore()
```

---

<a id="structurae"></a>

## Structurae

Data structures: classes (genus), objects, member access, and instantiation.

### Genus Declaration

```ebnf
genusDecl := 'abstractus'? 'genus' IDENTIFIER typeParams? ('sub' IDENTIFIER)? ('implet' IDENTIFIER (',' IDENTIFIER)*)? '{' genusMember* '}'
typeParams := '<' IDENTIFIER (',' IDENTIFIER)* '>'
genusMember := fieldDecl | methodDecl
```

> Latin 'genus' (kind/type) for data structures.
> 'sub' (under) for inheritance - child is under parent.
> 'implet' (fulfills) for implementing pactum interfaces.
> 'abstractus' for abstract classes that cannot be instantiated.

### Genus Member

```ebnf
genusMember := annotation* (fieldDecl | methodDecl)
annotation := '@' IDENTIFIER+
fieldDecl := 'generis'? 'nexum'? typeAnnotation IDENTIFIER (':' expression)?
methodDecl := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause? blockStmt?
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
```

> Distinguishes between fields and methods by looking for 'functio' keyword.
> Fields are public by default (struct semantics).
> Use annotations for visibility: @ privatum, @ protectum.
> Use annotations for abstract methods: @ abstracta (no body, must be overridden).

### Pactum Declaration

```ebnf
pactumDecl := 'pactum' IDENTIFIER typeParams? '{' pactumMethod* '}'
typeParams := '<' IDENTIFIER (',' IDENTIFIER)* '>'
```

> Latin 'pactum' (agreement/contract) for interfaces.
> Defines method signatures that genus types can implement via 'implet'.

**Examples:**

```fab
pactum Legibilis { functio lege() -> textus }
pactum Mappabilis<T, U> { functio mappa(T valor) -> U }
```

### Pactum Method

```ebnf
pactumMethod := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause?
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
returnClause := ('->' | 'fit' | 'fiet' | 'fiunt' | 'fient') typeAnnotation
```

> Method signatures without bodies. Same syntax as function declarations
> but terminates after return type (no block).

### Call

```ebnf
call := primary (callSuffix | memberSuffix | optionalSuffix | nonNullSuffix)*
callSuffix := '(' argumentList ')'
memberSuffix := '.' IDENTIFIER | '[' expression ']'
optionalSuffix := '?.' IDENTIFIER | '?[' expression ']' | '?(' argumentList ')'
nonNullSuffix := '!.' IDENTIFIER | '![' expression ']' | '!(' argumentList ')'
```

> Handles function calls, member access, and computed member access.
> Left-associative via loop (obj.a.b parsed as (obj.a).b).
> 
> OPTIONAL CHAINING: ?. ?[ ?( return nihil if object is nihil
> NON-NULL ASSERTION: !. ![ !( assert object is not nihil

### Argument List

```ebnf
argumentList := (argument (',' argument)*)?
argument := 'sparge' expression | expression
```

### Primary

```ebnf
primary := IDENTIFIER | NUMBER | STRING | TEMPLATE_STRING
| 'ego' | 'verum' | 'falsum' | 'nihil'
| '(' (expression | arrowFunction) ')'
```

> Latin literals: verum (true), falsum (false), nihil (null).
> 'ego' (I/self) is the self-reference keyword (like 'this' in JS).
> Parenthesized expressions require lookahead to distinguish from arrow functions.

### Identifier

```ebnf
identifier := IDENTIFIER
```

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Research Results


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

Basic language elements: variables, constants, literals, and output.

## Exempla

- `exempla/fundamenta/`

---

## Syntax

### Object Pattern

```ebnf
objectPattern := '{' patternProperty (',' patternProperty)* '}'
patternProperty := 'ceteri'? IDENTIFIER (':' IDENTIFIER)?
```

**Examples:**

```fab
{ nomen, aetas }              // extract nomen and aetas
{ nomen: localName, aetas }   // rename nomen to localName
{ nomen, ceteri rest }        // extract nomen, collect rest

T SUPPORTED (will produce parser errors):
{ ...rest }    // JS spread syntax
{ *rest }      // Python unpack syntax
{ **rest }     // Python kwargs syntax
```

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Typi


# Typi

Type system: type annotations, aliases, enums, nullable types, and collections.

## Exempla

- `exempla/typi/`

---

## Syntax

### Type Alias Declaration

```ebnf
typeAliasDecl := 'typus' IDENTIFIER '=' typeAnnotation
```

> Enables creating named type aliases for complex types.

**Examples:**

```fab
typus ID = textus
typus UserID = numerus<32, Naturalis>
typus ConfigTypus = typus config    // typeof
```

### Type Annotation

```ebnf
typeAnnotation := ('de' | 'in')? IDENTIFIER typeParams? '?'? arrayBrackets*
typeParams := '<' typeParameter (',' typeParameter)* '>'
typeParameter := typeAnnotation | NUMBER | MODIFIER
arrayBrackets := '[]' '?'?
```

> Supports generics (lista<textus>), nullable (?), union types (unio<A, B>),
> and array shorthand (numerus[] desugars to lista<numerus>).

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Operatores


# Operatores

Operators: arithmetic, logical, comparison, ternary, nullish coalescing, and ranges.

## Exempla

- `exempla/operatores/`

---

## Syntax

### Assignment

```ebnf
assignment := ternary (('=' | '+=' | '-=' | '*=' | '/=' | '&=' | '|=') assignment)?
```

### Ternary

```ebnf
ternary := or (('?' expression ':' | 'sic' expression 'secus') ternary)?
```

> Supports both symbolic (? :) and Latin (sic secus) syntax.
> The two forms cannot be mixed: use either ? : or sic secus.

**Examples:**

```fab
verum ? 1 : 0              // symbolic style
verum sic 1 secus 0        // Latin style
a ? b ? c : d : e          // nested (right-associative)
```

### Or

```ebnf
or := and (('||' | 'aut') and)* | and ('vel' and)*
```

> Latin 'aut' (or) for logical OR, 'vel' (or) for nullish coalescing.
> Mixing aut/|| with vel without parentheses is a syntax error
> (same as JavaScript's ?? and || restriction).

### And

```ebnf
and := equality ('&&' equality | 'et' equality)*
```

> Latin 'et' (and) supported alongside '&&'.

### Equality

```ebnf
equality := comparison (('==' | '!=' | '===' | '!==' | 'est' | 'non' 'est') comparison)*
```

> 'est' always means type check (instanceof/typeof).
> Use '===' or '!==' for value equality.
> Use 'nihil x' or 'nonnihil x' for null checks.

### Comparison

```ebnf
comparison := bitwiseOr (('<' | '>' | '<=' | '>=' | 'intra' | 'inter') bitwiseOr)*
```

> intra/inter at comparison level - same precedence as relational operators

### Range

```ebnf
range := additive (('..' | 'ante' | 'usque') additive ('per' additive)?)?
```

> Range expressions provide concise numeric iteration.
> Three operators with different end semantics:
> - '..' and 'ante': exclusive (0..10 / 0 ante 10 = 0-9)
> - 'usque': inclusive (0 usque 10 = 0-10)
> Optional step via 'per' keyword.

**Examples:**

```fab
0..10           -> RangeExpression(0, 10, inclusive=false)
0 ante 10       -> RangeExpression(0, 10, inclusive=false)
0 usque 10      -> RangeExpression(0, 10, inclusive=true)
0..10 per 2     -> RangeExpression(0, 10, 2, inclusive=false)
```

### Additive

```ebnf
additive := multiplicative (('+' | '-') multiplicative)*
```

### Multiplicative

```ebnf
multiplicative := unary (('*' | '/' | '%') unary)*
```

### Unary

```ebnf
unary := ('!' | '-' | 'non' | 'nulla' | 'nonnulla' | 'nihil' | 'nonnihil' | 'negativum' | 'positivum' | 'cede' | 'novum' | 'finge') unary | cast
```

> Latin 'non' (not), 'nulla' (none/empty), 'nonnulla' (some/non-empty),
> 'nihil' (is null), 'nonnihil' (is not null),
> 'negativum' (< 0), 'positivum' (> 0), 'cede' (await), 'novum' (new),
> 'finge' (form variant).

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Structurae


# Structurae

Data structures: classes (genus), objects, member access, and instantiation.

## Exempla

- `exempla/structurae/`

---

## Syntax

### Genus Declaration

```ebnf
genusDecl := 'abstractus'? 'genus' IDENTIFIER typeParams? ('sub' IDENTIFIER)? ('implet' IDENTIFIER (',' IDENTIFIER)*)? '{' genusMember* '}'
typeParams := '<' IDENTIFIER (',' IDENTIFIER)* '>'
genusMember := fieldDecl | methodDecl
```

> Latin 'genus' (kind/type) for data structures.
> 'sub' (under) for inheritance - child is under parent.
> 'implet' (fulfills) for implementing pactum interfaces.
> 'abstractus' for abstract classes that cannot be instantiated.

### Genus Member

```ebnf
genusMember := annotation* (fieldDecl | methodDecl)
annotation := '@' IDENTIFIER+
fieldDecl := 'generis'? 'nexum'? typeAnnotation IDENTIFIER (':' expression)?
methodDecl := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause? blockStmt?
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
```

> Distinguishes between fields and methods by looking for 'functio' keyword.
> Fields are public by default (struct semantics).
> Use annotations for visibility: @ privatum, @ protectum.
> Use annotations for abstract methods: @ abstracta (no body, must be overridden).

### Pactum Declaration

```ebnf
pactumDecl := 'pactum' IDENTIFIER typeParams? '{' pactumMethod* '}'
typeParams := '<' IDENTIFIER (',' IDENTIFIER)* '>'
```

> Latin 'pactum' (agreement/contract) for interfaces.
> Defines method signatures that genus types can implement via 'implet'.

**Examples:**

```fab
pactum Legibilis { functio lege() -> textus }
pactum Mappabilis<T, U> { functio mappa(T valor) -> U }
```

### Pactum Method

```ebnf
pactumMethod := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause?
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
returnClause := ('->' | 'fit' | 'fiet' | 'fiunt' | 'fient') typeAnnotation
```

> Method signatures without bodies. Same syntax as function declarations
> but terminates after return type (no block).

### Call

```ebnf
call := primary (callSuffix | memberSuffix | optionalSuffix | nonNullSuffix)*
callSuffix := '(' argumentList ')'
memberSuffix := '.' IDENTIFIER | '[' expression ']'
optionalSuffix := '?.' IDENTIFIER | '?[' expression ']' | '?(' argumentList ')'
nonNullSuffix := '!.' IDENTIFIER | '![' expression ']' | '!(' argumentList ')'
```

> Handles function calls, member access, and computed member access.
> Left-associative via loop (obj.a.b parsed as (obj.a).b).
> 
> OPTIONAL CHAINING: ?. ?[ ?( return nihil if object is nihil
> NON-NULL ASSERTION: !. ![ !( assert object is not nihil

### Argument List

```ebnf
argumentList := (argument (',' argument)*)?
argument := 'sparge' expression | expression
```

### Primary

```ebnf
primary := IDENTIFIER | NUMBER | STRING | TEMPLATE_STRING
| 'ego' | 'verum' | 'falsum' | 'nihil'
| '(' (expression | arrowFunction) ')'
```

> Latin literals: verum (true), falsum (false), nihil (null).
> 'ego' (I/self) is the self-reference keyword (like 'this' in JS).
> Parenthesized expressions require lookahead to distinguish from arrow functions.

### Identifier

```ebnf
identifier := IDENTIFIER
```

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Regimen


# Regimen

Control flow: conditionals, loops, guards, assertions, and program structure.

## Exempla

- `exempla/regimen/`

---

## Syntax

### Annotation

```ebnf
annotation := '@' IDENTIFIER (expression)?
```

### Program

```ebnf
program := statement*
```

### Annotations

```ebnf
annotation := '@' IDENTIFIER+
```

> Annotations modify the following declaration with metadata like
> visibility (publicum, privatum), async (futura), abstract (abstractum).

### Statement

```ebnf
statement := importDecl | varDecl | funcDecl | typeAliasDecl | ifStmt | whileStmt | forStmt
| returnStmt | throwStmt | tryStmt | blockStmt | exprStmt
```

> Uses lookahead to determine statement type via keyword inspection.

### Specifier

```ebnf
specifier := 'ceteri'? IDENTIFIER ('ut' IDENTIFIER)?
```

> Shared between imports and destructuring.
> 'ceteri' (rest) is only valid in destructuring contexts.
> 'ut' provides aliasing: nomen ut n

**Examples:**

```fab
scribe             -> imported=scribe, local=scribe
scribe ut s        -> imported=scribe, local=s
ceteri rest        -> imported=rest, local=rest, rest=true
```

### Importa Declaration

```ebnf
importDecl := 'ex' (STRING | IDENTIFIER) 'importa' (specifierList | '*')
specifierList := specifier (',' specifier)*
specifier := IDENTIFIER ('ut' IDENTIFIER)?
```

**Examples:**

```fab
ex norma importa scribe, lege
ex norma importa scribe ut s, lege ut l
ex "norma/tempus" importa nunc, dormi
ex norma importa *
```

### Varia Declaration

```ebnf
varDecl := ('varia' | 'fixum' | 'figendum' | 'variandum') typeAnnotation? IDENTIFIER ('=' expression)?
arrayDestruct := ('varia' | 'fixum' | 'figendum' | 'variandum') arrayPattern '=' expression
```

> Type-first syntax: "fixum textus nomen = value" or "fixum nomen = value"
> Latin 'varia' (let it be) for mutable, 'fixum' (fixed) for immutable.

### Array Pattern

```ebnf
arrayPattern := '[' arrayPatternElement (',' arrayPatternElement)* ']'
arrayPatternElement := '_' | 'ceteri'? IDENTIFIER
```

**Examples:**

```fab
[a, b, c]                 // extract first three elements
[first, ceteri rest]     // extract first, collect rest
[_, second, _]           // skip first and third, extract second

T SUPPORTED:
[...rest]                // JS spread syntax
[*rest]                  // Python unpack syntax
```

### Functio Declaration

```ebnf
funcDecl := 'functio' IDENTIFIER '(' paramList ')' funcModifier* returnClause? blockStmt
paramList := (typeParamDecl ',')* (parameter (',' parameter)*)?
typeParamDecl := 'prae' 'typus' IDENTIFIER
funcModifier := 'futura' | 'cursor' | 'curata' IDENTIFIER
returnClause := ('->' | 'fit' | 'fiet' | 'fiunt' | 'fient') typeAnnotation
```

> All function declarations start with 'functio' for consistent parsing.
> Modifiers come after the parameter list, before the return clause.
> 'futura' marks async functions (future/promise-based).
> 'cursor' marks generator functions (yield-based).
> 'curata NAME' marks managed functions (receives allocator as NAME).
> 
> TYPE PARAMETERS: 'prae typus T' declares compile-time type parameters.
> functio max(prae typus T, T a, T b) -> T { ... }
> Maps to: <T> (TS/Rust), TypeVar (Py), comptime T: type (Zig)
> 
> RETURN TYPE VERBS: Latin verb forms encode async/generator semantics directly:
> '->'    neutral arrow (semantics from modifier only)
> 'fit'   "it becomes" - sync, returns single value
> 'fiet'  "it will become" - async, returns Promise<T>
> 'fiunt' "they become" - sync generator, yields multiple values
> 'fient' "they will become" - async generator, yields Promise values
> 
> When using verb forms, the futura/cursor modifier is NOT required - the verb
> itself carries the semantic information. The modifier becomes redundant:
> functio compute() -> numerus { ... }         // arrow: sync by default
> functio compute() fit numerus { ... }        // verb: explicitly sync
> functio fetch() futura -> textus { ... }     // modifier: async
> functio fetch() fiet textus { ... }          // verb implies async
> functio items() cursor -> numerus { ... }    // modifier: generator
> functio items() fiunt numerus { ... }        // verb implies generator
> functio stream() fient datum { ... }         // verb implies async generator
> functio alloc(textus s) curata a -> T { ... } // managed, allocator bound as 'a'
> 
> Modifier is still allowed for emphasis, but verb/modifier conflicts are errors.
> 
> NOT SUPPORTED (will produce parser errors):
> - TS-style param annotation: functio f(x: textus) (use: functio f(textus x))
> - TS-style return type: functio f(): textus (use: functio f() -> textus)
> - Trailing comma in params: functio f(a, b,)

### Type And Parameter List

```ebnf
paramList := (typeParamDecl ',')* (parameter (',' parameter)*)?
typeParamDecl := 'prae' 'typus' IDENTIFIER
```

> Type parameters (prae typus T) must come first, followed by regular params.
> This matches the conventions of TypeScript, Rust, and Zig.

**Examples:**

```fab
(prae typus T, T a, T b)     -> typeParams=[T], params=[a, b]
(prae typus T, prae typus U) -> typeParams=[T, U], params=[]
(numerus a, numerus b)       -> typeParams=[], params=[a, b]
```

### Ordo Declaration

```ebnf
enumDecl := 'ordo' IDENTIFIER '{' enumMember (',' enumMember)* ','? '}'
enumMember := IDENTIFIER ('=' ('-'? NUMBER | STRING))?
```

> Latin 'ordo' (order/rank) for enumerated constants.

**Examples:**

```fab
ordo color { rubrum, viridis, caeruleum }
ordo status { pendens = 0, actum = 1, finitum = 2 }
ordo offset { ante = -1, ad = 0, post = 1 }
```

### Discretio Declaration

```ebnf
discretioDecl := 'discretio' IDENTIFIER typeParams? '{' variant (',' variant)* ','? '}'
variant := IDENTIFIER ('{' variantFields '}')?
variantFields := (typeAnnotation IDENTIFIER (',' typeAnnotation IDENTIFIER)*)?
```

> Latin 'discretio' (distinction) for tagged unions.
> Each variant has a compiler-managed tag for exhaustive pattern matching.

**Examples:**

```fab
discretio Event {
    Click { numerus x, numerus y }
    Keypress { textus key }
    Quit
}

discretio Option<T> {
    Some { T value }
    None
}
```

### Variant Declaration

```ebnf
variant := IDENTIFIER ('{' variantFields '}')?
variantFields := (typeAnnotation IDENTIFIER (',' typeAnnotation IDENTIFIER)*)?
```

> Variant names are capitalized by convention (like type names).
> Fields use type-first syntax like genus fields.

**Examples:**

```fab
Click { numerus x, numerus y }  -> fields with payload
Quit                            -> unit variant (no payload)
```

### Si Statement

```ebnf
ifStmt := 'si' expression (blockStmt | 'ergo' statement | 'reddit' expression) ('cape' IDENTIFIER blockStmt)? (elseClause | 'sin' ifStmt)?
elseClause := ('secus' | 'secus') (ifStmt | blockStmt | statement)
```

> 'cape' (catch/seize) clause allows error handling within conditionals.
> 'ergo' (therefore) for one-liner consequents.
> 'reddit' (it returns) for early return one-liners.
> 
> TWO STYLE OPTIONS (both supported, can be mixed within the same chain):
> 
> Literal style: si / sin / secus
> si x > 0 { positive() }
> sin x < 0 { negative() }
> secus { zero() }
> 
> Poetic style: si / sin / secus
> si x > 0 { positive() }
> sin x < 0 { negative() }    // "sin" = "but if" (classical Latin)
> secus { zero() }            // "secus" = "otherwise"
> 
> Keywords are interchangeable at each branch point:
> - 'sin' ≡ 'sin' (else-if)
> - 'secus' ≡ 'secus' (else)
> - Mixed: si ... sin ... secus { } is valid

**Examples:**

```fab
si x > 5 ergo scribe("big")
si x > 5 reddit verum            // early return
si x > 5 { scribe("big") } secus scribe("small")
si x < 0 { ... } sin x == 0 { ... } secus { ... }
```

### Dum Statement

```ebnf
whileStmt := 'dum' expression (blockStmt | 'ergo' statement | 'reddit' expression) ('cape' IDENTIFIER blockStmt)?
```

> 'dum' (while/until) for while loops.

**Examples:**

```fab
dum x > 0 { x = x - 1 }
dum x > 0 ergo x = x - 1
dum x > 0 reddit x
```

### Ex Statement

```ebnf
exStmt := 'ex' expression (forBinding | destructBinding | arrayDestructBinding)
forBinding := ('pro' | 'fit' | 'fiet') IDENTIFIER (blockStmt | 'ergo' statement | 'reddit' expression) catchClause?
destructBinding := ('fixum' | 'varia' | 'figendum' | 'variandum') specifierList
arrayDestructBinding := ('fixum' | 'varia' | 'figendum' | 'variandum') arrayPattern
specifierList := specifier (',' specifier)*
specifier := 'ceteri'? IDENTIFIER ('ut' IDENTIFIER)?
```

> 'ex' (from/out of) introduces both iteration and extraction:
> - Iteration: ex items pro item { ... } (for each item from items)
> - Object destructuring: ex persona fixum nomen, aetas (extract properties)
> - Array destructuring: ex coords fixum [x, y, z] (extract by position)
> - Async destructuring: ex promise figendum result (await + extract)
> 
> The binding keywords encode mutability and async semantics:
> - fixum: immutable binding (const)
> - varia: mutable binding (let)
> - figendum: immutable + await (const with await)
> - variandum: mutable + await (let with await)

**Examples:**

```fab
ex numeri pro n { ... }              // for-loop (sync)
ex numeri fiet n { ... }             // for-await-of loop (async)
ex persona fixum nomen, aetas        // object destructuring
ex persona fixum nomen ut n          // object destructuring with alias
ex persona fixum nomen, ceteri rest  // object destructuring with rest
ex coords fixum [x, y, z]            // array destructuring
ex fetchData() figendum result       // async destructuring

llection DSL forms:
ex items prima 5 pro item { }        // iteration with transforms
ex items prima 5, ultima 2 pro x {}  // multiple transforms
```

### D S L Transforms

```ebnf
dslTransforms := dslTransform (',' dslTransform)*
dslTransform := dslVerb expression?
dslVerb := 'prima' | 'ultima' | 'summa'
```

> DSL provides concise syntax for common collection operations.
> Transforms chain with commas: prima 5, ultima 3

**Examples:**

```fab
prima 5           -> first 5 elements
ultima 3          -> last 3 elements
summa             -> sum (no argument)
prima 5, ultima 2 -> first 5, then last 2 of those
```

### Collection D S L Expression

```ebnf
dslExpr := 'ex' expression dslTransform (',' dslTransform)*
```

> When 'ex' appears in expression context with DSL verbs (not pro/fit/fiet),
> it creates a collection pipeline expression that can be assigned.

**Examples:**

```fab
fixum top5 = ex items prima 5
fixum total = ex prices summa
fixum result = ex items prima 10, ultima 3
```

### Ab Expression

```ebnf
abExpr := 'ab' expression filter? (',' transform)*
filter := ['non'] ('ubi' condition | identifier)
condition := expression
```

> 'ab' (away from) is the dedicated DSL entry point for filtering.
> The 'ex' preposition remains unchanged for iteration/import/destructuring.
> Include/exclude is handled via 'non' keyword.

**Examples:**

```fab
ab users activus                     // boolean property shorthand
ab users non banned                  // negated boolean property
ab users ubi aetas >= 18             // condition with ubi
ab users non ubi banned et suspended // negated compound condition
ab users activus, prima 10           // filter + transforms
ab users activus pro user { }        // iteration form
```

### Regex Literal

```ebnf
regexLiteral := 'sed' STRING IDENTIFIER?
```

> 'sed' (the Unix stream editor) is synonymous with pattern matching.
> The pattern string is passed through verbatim to the target.
> Flags are a bare identifier after the pattern (no comma).

**Examples:**

```fab
sed "\\d+"           // pattern only
sed "hello" i        // case insensitive
sed "^start" im      // multiple flags
```

### De Statement

```ebnf
deStmt := 'de' expression ('pro' | 'fit' | 'fiet') IDENTIFIER
(blockStmt | 'ergo' statement | 'reddit' expression) catchClause?
```

> 'de' (from/concerning) for extracting keys from an object.
> Semantically read-only - contrasts with 'in' for mutation.

**Examples:**

```fab
de tabula pro clavis { ... }  // from table, for each key
de object pro k ergo scribe k // one-liner form
de object pro k reddit k      // return first key
```

### In Statement

```ebnf
inStmt := 'in' expression blockStmt
```

> 'in' (into) for reaching into an object to modify it.
> Semantically mutable - contrasts with 'de' for read-only iteration.

**Examples:**

```fab
in user { nomen = "Marcus" }  // mutation block
```

### Elige Statement

```ebnf
eligeStmt := 'elige' expression '{' eligeCase* defaultCase? '}' catchClause?
eligeCase := 'casu' expression (blockStmt | 'ergo' statement | 'reddit' expression)
defaultCase := 'ceterum' (blockStmt | statement)
```

> 'elige' (choose) for value-based switch.
> 'ergo' (therefore) for one-liners, 'ceterum' (otherwise) for default.
> 'reddit' (it returns) for early return one-liners.
> For variant matching on discretio types, use 'discerne' instead.

**Examples:**

```fab
elige status {
    casu "pending" ergo scribe("waiting")
    casu "active" reddit verum
    ceterum iace "Unknown status"
}
```

### Discerne Statement

```ebnf
discerneStmt := 'discerne' discriminants '{' variantCase* '}'
discriminants := expression (',' expression)*
variantCase := 'casu' patterns (blockStmt | 'ergo' statement | 'reddit' expression)
patterns := pattern (',' pattern)*
pattern := '_' | (IDENTIFIER patternBind?)
patternBind := ('ut' IDENTIFIER) | ('pro' IDENTIFIER (',' IDENTIFIER)*)
```

> 'discerne' (distinguish!) pairs with 'discretio' (the tagged union type).
> Uses 'casu' for match arms, 'ut' to bind whole variants, and 'pro' for positional bindings.
> Multi-discriminant matching reduces nesting when comparing multiple values.

**Examples:**

```fab
# Single discriminant
discerne event {
    casu Click pro x, y { scribe "clicked at " + x + ", " + y }
    casu Keypress pro key reddit key
    casu Quit ergo mori "goodbye"
}

# Multi-discriminant
discerne left, right {
    casu Primitivum ut l, Primitivum ut r { redde l.nomen == r.nomen }
    casu _, _ { redde falsum }
}
```

### Variant Pattern

```ebnf
pattern := '_' | (IDENTIFIER patternBind?)
patternBind := ('ut' IDENTIFIER) | ('pro' IDENTIFIER (',' IDENTIFIER)*)
```

> Patterns match against discriminants in discerne statements.
> Wildcard '_' matches any variant without binding.
> 'ut' binds the whole variant, 'pro' destructures fields.
> 
> DISAMBIGUATION: After 'pro', commas separate bindings until we see:
> - '_' (wildcard pattern)
> - An identifier followed by 'ut' or 'pro' (new pattern with binding)
> - '{', 'ergo', 'reddit' (end of patterns)

### Custodi Statement

```ebnf
guardStmt := 'custodi' '{' guardClause+ '}'
guardClause := 'si' expression (blockStmt | 'ergo' statement | 'reddit' expression)
```

> 'custodi' (guard!) groups early-exit conditions.
> 'ergo' for one-liner actions, 'reddit' for early return one-liners.

**Examples:**

```fab
custodi {
    si user == nihil reddit nihil
    si user.age < 0 ergo iace "Invalid age"
    si user.name == "" { redde defaultUser() }
}
```

### Adfirma Statement

```ebnf
assertStmt := 'adfirma' expression (',' expression)?
```

> 'adfirma' (affirm/assert) for runtime invariant checks.

**Examples:**

```fab
adfirma x > 0
adfirma x > 0, "x must be positive"
```

### Redde Statement

```ebnf
returnStmt := 'redde' expression?
```

> 'redde' (give back/return) for return statements.

### Rumpe Statement

```ebnf
breakStmt := 'rumpe'
```

> 'rumpe' (break!) exits the innermost loop.

### Perge Statement

```ebnf
continueStmt := 'perge'
```

> 'perge' (continue/proceed!) skips to the next loop iteration.

### Iace Statement

```ebnf
throwStmt := ('iace' | 'mori') expression
```

> Two error severity levels:
> iace (throw!) → recoverable, can be caught
> mori (die!)   → fatal/panic, unrecoverable

### Scribe Statement

```ebnf
outputStmt := ('scribe' | 'vide' | 'mone') expression (',' expression)*
```

> Latin output keywords as statement forms:
> scribe (write!) → console.log
> vide (see!)     → console.debug
> mone (warn!)    → console.warn

**Examples:**

```fab
scribe "hello"
vide "debugging:", value
mone "warning:", message
```

### Tempta Statement

```ebnf
tryStmt := 'tempta' blockStmt ('cape' IDENTIFIER blockStmt)? ('demum' blockStmt)?
```

> 'tempta' (attempt/try), 'cape' (catch/seize), 'demum' (finally/at last).

### Cape Clause

```ebnf
catchClause := 'cape' IDENTIFIER blockStmt
```

### Probandum Statement

```ebnf
probandumDecl := 'probandum' STRING '{' probandumBody '}'
probandumBody := (curaBlock | probandumDecl | probaStmt)*
```

> Latin "probandum" (gerundive of probare) = "that which must be tested".
> Analogous to describe() in Jest/Vitest.

**Examples:**

```fab
probandum "Tokenizer" {
    praepara { lexer = init() }
    proba "parses numbers" { ... }
}
```

### Proba Statement

```ebnf
probaStmt := 'proba' probaModifier? STRING blockStmt
probaModifier := 'omitte' STRING | 'futurum' STRING
```

> Latin "proba" (imperative of probare) = "test!" / "prove!".
> Analogous to test() or it() in Jest/Vitest.

**Examples:**

```fab
proba "parses integers" { adfirma parse("42") est 42 }
proba omitte "blocked by #42" { ... }
proba futurum "needs async support" { ... }
```

### Ad Statement

```ebnf
adStmt := 'ad' STRING '(' argumentList ')' adBinding? blockStmt? catchClause?
adBinding := adBindingVerb typeAnnotation? 'pro' IDENTIFIER ('ut' IDENTIFIER)?
adBindingVerb := 'fit' | 'fiet' | 'fiunt' | 'fient'
argumentList := (expression (',' expression)*)?
```

> Latin 'ad' (to/toward) dispatches to named endpoints:
> - Stdlib syscalls: "fasciculus:lege", "console:log"
> - External packages: "hono/Hono"
> - Remote services: "https://api.example.com/users"
> 
> Binding verbs encode sync/async and single/plural:
> - fit: sync, single ("it becomes")
> - fiet: async, single ("it will become")
> - fiunt: sync, plural ("they become")
> - fient: async, plural ("they will become")

**Examples:**

```fab
ad "console:log" ("hello")                           // fire-and-forget
ad "fasciculus:lege" ("file.txt") fit textus pro c { }  // sync binding
ad "http:get" (url) fiet Response pro r { }          // async binding
ad "http:batch" (urls) fient Response[] pro rs { }   // async plural
```

### Praepara Block

```ebnf
praeparaBlock := ('praepara' | 'praeparabit' | 'postpara' | 'postparabit') 'omnia'? blockStmt
```

> Latin "praepara" (prepare!) for test setup, "postpara" (cleanup!) for teardown.
> Uses -bit suffix for async (future tense), matching fit/fiet pattern.

**Examples:**

```fab
praepara { lexer = init() }
praepara omnia { db = connect() }
praeparabit omnia { db = cede connect() }
postpara { cleanup() }
postpara omnia { db.close() }
postparabit omnia { cede db.close() }
```

### Cura Statement

```ebnf
curaStmt := 'cura' curatorKind? expression? ('pro' | 'fit' | 'fiet') typeAnnotation? IDENTIFIER blockStmt catchClause?
curatorKind := 'arena' | 'page'
```

> Latin "cura" (care) + binding verb for scoped resources.
> - pro: neutral binding ("for")
> - fit: sync binding ("it becomes")
> - fiet: async binding ("it will become")
> Curator kinds declare explicit allocator types (arena, page).
> Guarantees cleanup via solve() on scope exit.

**Examples:**

```fab
cura arena fit mem { ... }                    // arena allocator
cura page fit mem { ... }                     // page allocator
cura aperi("data.bin") fit fd { lege(fd) }   // generic resource
cura connect(url) fiet conn { ... }          // async resource
```

### Incipit Statement

```ebnf
incipitStmt := 'incipit' (blockStmt | 'ergo' statement | 'reddit' expression)
```

> 'incipit' (it begins) marks the program entry point.
> This is a pure structural marker with no magic injection.
> The source is responsible for any setup (allocators via cura, etc.).
> 
> The 'ergo' (therefore) form chains to a single statement, typically
> a cura block for allocator setup. This avoids extra nesting.
> The 'reddit' form returns an exit code directly.

**Examples:**

```fab
incipit {
    scribe "Hello"
}

incipit ergo cura arena {
```

### Incipiet Statement

```ebnf
incipietStmt := 'incipiet' (blockStmt | 'ergo' statement | 'reddit' expression)
```

> 'incipiet' (it will begin) marks the async program entry point.
> Mirrors the fit/fiet pattern: present for sync, future for async.
> 
> The 'ergo' form chains to a single statement for concise setup.
> The 'reddit' form returns an exit code directly.

**Examples:**

```fab
incipiet {
    fixum data = cede fetchData()
    scribe data
}

incipiet ergo cura arena {
    fixum data = cede fetchData()
}

incipiet reddit 0
```

### Block Statement

```ebnf
blockStmt := '{' statement* '}'
```

### Expression Statement

```ebnf
exprStmt := expression
```

### Expression

```ebnf
expression := assignment
```

> Top-level expression delegates to assignment (lowest precedence).

### Bitwise Or

```ebnf
bitwiseOr := bitwiseXor ('|' bitwiseXor)*
```

> Bitwise precedence is above comparison (unlike C), so
> `flags & MASK == 0` parses as `(flags & MASK) == 0`.

### Bitwise Xor

```ebnf
bitwiseXor := bitwiseAnd ('^' bitwiseAnd)*
```

### Bitwise And

```ebnf
bitwiseAnd := shift ('&' shift)*
```

### Shift

```ebnf
shift := range (('<<' | '>>') range)*
```

### Praefixum Expression

```ebnf
praefixumExpr := 'praefixum' (blockStmt | '(' expression ')')
```

> Latin 'praefixum' (pre-fixed) extends fixum vocabulary.
> Block form: praefixum { ... } for multi-statement computation
> Expression form: praefixum(expr) for simple expressions
> 
> TARGET SUPPORT:
> Zig:    comptime { } or comptime (expr)
> C++:    constexpr
> Rust:   const (in const context)
> TS/Py:  Semantic error - not supported

**Examples:**

```fab
fixum size = praefixum(256 * 4)
fixum table = praefixum {
    varia result = []
    ex 0..10 pro i { result.adde(i * i) }
    redde result
}
```

### Scriptum Expression

```ebnf
scriptumExpr := 'scriptum' '(' STRING (',' expression)* ')'
```

> "scriptum" (that which has been written) is the perfect passive participle
> of scribere. While scribe outputs to console, scriptum returns a formatted string.
> 
> The § placeholder is converted to target-appropriate format specifiers.

**Examples:**

```fab
scriptum("Hello, §", name)
scriptum("§ + § = §", a, b, a + b)
```

### Lege Expression

```ebnf
legeExpr := 'lege' ('lineam')?
```

### Qua Expression

```ebnf
castExpr := call ('qua' typeAnnotation)*
```

> Latin 'qua' (as, in the capacity of) for type assertions.
> Compile-time only — no runtime checking. Maps to:
> - TypeScript: x as T
> - Python: x (ignored, dynamic typing)
> - Zig: @as(T, x)
> - Rust: x as T
> - C++: static_cast<T>(x)

### Novum Expression

```ebnf
newExpr := 'novum' IDENTIFIER ('(' argumentList ')')? (objectLiteral | 'de' expression)?
```

> Two forms for property overrides:
> - Inline literal: `novum Persona { nomen: "Marcus" }`
> - From expression: `novum Persona de props` (props is variable/call/etc.)
> 
> The `de` (from) form allows dynamic overrides from variables or function results.

### Finge Expression

```ebnf
fingeExpr := 'finge' IDENTIFIER ('{' fieldList '}')? ('qua' IDENTIFIER)?
```

> Latin 'finge' (form/shape) for constructing discretio variants.
> Variant name comes first, optional fields in braces, optional qua for
> explicit discretio type when not inferrable from context.

**Examples:**

```fab
finge Click { x: 10, y: 20 }           - payload variant
finge Click { x: 10, y: 20 } qua Event - with explicit type
finge Active                            - unit variant
finge Active qua Status                 - unit variant with explicit type
```

### Lambda Expression

```ebnf
lambdaExpr := ('pro' | 'fit' | 'fiet') params? ('->' type)? (':' expression | blockStmt)
params := IDENTIFIER (',' IDENTIFIER)*
```

### Identifier Or Keyword

```ebnf
identifierOrKeyword := IDENTIFIER | KEYWORD
```

> Import specifiers can be keywords (ex norma importa scribe).
> In this context, 'scribe' is a valid name, not a statement keyword.

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Functiones


# Functiones

Function declarations: basic functions, typed parameters, async, generators, and lambdas.

## Exempla

- `exempla/functiones/`

---

## Syntax

### Parameter List

```ebnf
paramList := (parameter (',' parameter)*)?
```

### Parameter

```ebnf
parameter := ('de' | 'in' | 'ex')? 'si'? 'ceteri'? (typeAnnotation IDENTIFIER | IDENTIFIER) ('ut' IDENTIFIER)? ('vel' expression)?
```

> Type-first syntax: "textus name" or "de textus source"
> Prepositional prefixes indicate semantic roles:
> de = from/concerning (borrowed, read-only),
> in = in/into (mutable borrow),
> ex = from/out of (source)
> 
> OPTIONAL PARAMETERS:
> 'si' marks a parameter as optional. Without 'vel', type becomes ignotum<T>.
> With 'vel', parameter has a default value and type stays T.
> Order: preposition, then si, then ceteri, then type, then name.

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Importa


# Importa

Module system: imports and exports.

## Exempla

- `exempla/importa/`

---

## Syntax

### Import Declaration

```ebnf
importDecl := 'ex' (STRING | IDENTIFIER) 'importa' (identifierList | '*')
identifierList := IDENTIFIER (',' IDENTIFIER)*
```

**Examples:**

```fab
ex norma importa scribe, lege
ex "norma/tempus" importa nunc, dormi
ex norma importa *
```

### Export Declaration

```ebnf
exportDecl := 'exporta' (identifierList | inlineDecl)
identifierList := IDENTIFIER (',' IDENTIFIER)*
inlineDecl := funcDecl | genusDecl | varDecl | typeAliasDecl
```

> Named exports only. No default exports — TS `export default` migrates to named export.

**Examples:**

```fab
exporta foo, bar
exporta functio greet(textus name) -> textus { redde "Hello, " + name }
exporta genus User { textus nomen }
exporta fixum VERSION = "1.0.0"
```

### Dynamic Import

```ebnf
dynamicImport := 'ex' (STRING | expression) 'importabit' IDENTIFIER
```

> Async import using future tense `importabit` ("will import").

**Examples:**

```fab
ex "./heavy" importabit modulus
ex pathVariable importabit modulus
```

---

*Generated from `fons/parser/index.ts` — do not edit directly.*


---

# Errores


# Errores

Error handling: try/catch, throw, panic, and scoped error handling.

## Exempla

- `exempla/errores/`

---

## Syntax

### Fac Block Statement

```ebnf
facBlockStmt := 'fac' blockStmt ('cape' IDENTIFIER blockStmt)? ('dum' expression)?
```

> 'fac' (do/make) creates an explicit scope boundary for grouping
> statements with optional error handling via 'cape' (catch).
> When followed by 'dum', creates a do-while loop where the body
> executes at least once before the condition is checked.
> Useful for:
> - Scoped variable declarations
> - Grouping related operations with shared error handling
> - Creating IIFE-like constructs
> - Do-while loops (body executes first, then condition checked)

**Examples:**

```fab
fac { fixum x = computeValue() }
fac { riskyOperation() } cape e { scribe e }
fac { process() } dum hasMore()
fac { process() } cape e { log(e) } dum hasMore()
```

---

*Generated from `fons/faber/parser/index.ts` — do not edit directly.*


---

# Faber Romanus Grammar


# Faber Romanus Grammar

Complete syntax reference for the Faber Romanus programming language.

## For LLMs

This document is designed for both human readers and LLM code generation. When generating Faber code:

**Style preferences:**

- PREFER Latin keywords over symbols: `et` over `&&`, `aut` over `||`, `non` over `!`
- PREFER `pro x: expr` for short lambdas, `pro x redde expr` when clarity helps
- ALWAYS use type-first syntax: `textus nomen` not `nomen: textus`
- NEVER use JavaScript/TypeScript/Python syntax where Faber has its own

**Common mistakes to avoid:**

- `return` instead of `redde`
- `const`/`let` instead of `fixum`/`varia`
- `if`/`else` instead of `si`/`secus`
- `for...of` instead of `ex...pro`
- `string`/`number`/`boolean` instead of `textus`/`numerus`/`bivalens`
- `null` instead of `nihil`
- `this` instead of `ego`
- `new` instead of `novum`
- `await` instead of `cede`
- `async function` instead of `futura functio`

---

## Quick Reference

### Types

| Faber      | TypeScript   | Python     | Zig          | Meaning        |
| ---------- | ------------ | ---------- | ------------ | -------------- |
| `textus`   | `string`     | `str`      | `[]const u8` | text/string    |
| `numerus`  | `number`     | `int`      | `i64`        | integer        |
| `fractus`  | `number`     | `float`    | `f64`        | floating point |
| `decimus`  | `number`     | `Decimal`  | -            | decimal        |
| `magnus`   | `bigint`     | `int`      | `i128`       | big integer    |
| `bivalens` | `boolean`    | `bool`     | `bool`       | boolean        |
| `nihil`    | `null`       | `None`     | `null`       | null           |
| `vacuum`   | `void`       | `None`     | `void`       | void           |
| `numquam`  | `never`      | `NoReturn` | `noreturn`   | never          |
| `ignotum`  | `unknown`    | `Any`      | -            | unknown        |
| `octeti`   | `Uint8Array` | `bytes`    | `[]u8`       | bytes          |
| `objectum` | `object`     | `object`   | -            | object         |

### Generic Collections

| Faber          | TypeScript    | Python         | Meaning        |
| -------------- | ------------- | -------------- | -------------- |
| `lista<T>`     | `T[]`         | `list[T]`      | array/list     |
| `tabula<K,V>`  | `Map<K,V>`    | `dict[K,V]`    | map/dictionary |
| `copia<T>`     | `Set<T>`      | `set[T]`       | set            |
| `promissum<T>` | `Promise<T>`  | `Awaitable[T]` | promise/future |
| `cursor<T>`    | `Iterator<T>` | `Iterator[T]`  | iterator       |
| `unio<A,B>`    | `A \| B`      | `A \| B`       | union type     |

### Literals

| Faber    | Meaning   |
| -------- | --------- |
| `verum`  | true      |
| `falsum` | false     |
| `nihil`  | null      |
| `ego`    | this/self |

### Keywords by Category

**Declarations:**

- `fixum` — immutable binding (const)
- `varia` — mutable binding (let)
- `functio` — function
- `genus` — class/struct
- `pactum` — interface/protocol
- `typus` — type alias
- `ordo` — enum
- `discretio` — tagged union

**Control flow:**

- `si` / `sin` / `secus` / `secus` — if / else-if / else
- `dum` — while
- `ex...pro` — for-of (iteration)
- `de...pro` — for-in (keys)
- `elige` — switch/match
- `custodi` — guard clauses
- `rumpe` — break
- `perge` — continue

**Functions:**

- `redde` — return
- `futura` — async modifier
- `cede` — await
- `cursor` — generator modifier
- `pro x: expr` — lambda expression

**Error handling:**

- `tempta` — try
- `cape` — catch
- `demum` — finally
- `iace` — throw (recoverable)
- `mori` — panic (fatal)
- `adfirma` — assert

**Output:**

- `scribe` — console.log
- `vide` — console.debug
- `mone` — console.warn

**Operators:**

- `et` — logical and (&&)
- `aut` — logical or (||)
- `non` — logical not (!)
- `vel` — nullish coalescing (??)
- `est` — instanceof/typeof check
- `qua` — type cast (as)

### Collection Methods (lista)

Common array methods (see README for complete list):

| Latin               | JavaScript          | Mutates? |
| ------------------- | ------------------- | -------- |
| `adde(x)`           | `push(x)`           | yes      |
| `remove()`          | `pop()`             | yes      |
| `primus`            | `[0]`               | no       |
| `ultimus`           | `[arr.length-1]`    | no       |
| `longitudo`         | `.length`           | no       |
| `mappata(fn)`       | `.map(fn)`          | no       |
| `filtrata(fn)`      | `.filter(fn)`       | no       |
| `reducta(fn, init)` | `.reduce(fn, init)` | no       |
| `inveni(fn)`        | `.find(fn)`         | no       |
| `continet(x)`       | `.includes(x)`      | no       |
| `coniunge(sep)`     | `.join(sep)`        | no       |

### Collection Methods (tabula)

| Latin        | JavaScript   | Mutates? |
| ------------ | ------------ | -------- |
| `pone(k, v)` | `.set(k, v)` | yes      |
| `accipe(k)`  | `.get(k)`    | no       |
| `habet(k)`   | `.has(k)`    | no       |
| `dele(k)`    | `.delete(k)` | yes      |
| `claves()`   | `.keys()`    | no       |
| `valores()`  | `.values()`  | no       |

### Collection Methods (copia)

| Latin                | JavaScript       | Mutates? |
| -------------------- | ---------------- | -------- |
| `adde(x)`            | `.add(x)`        | yes      |
| `habet(x)`           | `.has(x)`        | no       |
| `dele(x)`            | `.delete(x)`     | yes      |
| `unio(other)`        | set union        | no       |
| `intersectio(other)` | set intersection | no       |

---

## Complete Program Example

```fab
# A simple API handler demonstrating multiple features
ex hono importa Hono, Context

genus UserService {
    @ privatum
    textus baseUrl

    functio creo(textus url) {
        ego.baseUrl = url
    }

    futura functio fetch(numerus id) fiet User? {
        fixum response = cede ego.client.get(`${ego.baseUrl}/users/${id}`)

        custodi {
            si response.status !== 200 { redde nihil }
        }

        redde response.json() qua User
    }

    futura functio fetchAll() fiet lista<User> {
        fixum response = cede ego.client.get(`${ego.baseUrl}/users`)
        fixum users = cede response.json() qua User[]

        redde users.filtrata(pro u: u.active)
    }
}

fixum app = novum Hono()

app.get("/users/:id", futura functio(Context ctx) {
    fixum id = ctx.param("id") qua numerus
    fixum service = novum UserService("https:#api.example.com")
    fixum user = cede service.fetch(id)

    si user === nihil {
        redde ctx.json({ error: "Not found" }, 404)
    }

    redde ctx.json(user)
})
```

---



---

