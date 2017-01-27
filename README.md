<h1 align="center">pico-lambda</h1>

<div align="center">
  λ
</div>
<div align="center">
  <strong>Fun functional programming</strong>
</div>
<div align="center">
  A <code>406b</code> functional library based of native array methods
</div>

<div align="center">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>
</div>

## why pico-lambda
- **Pico:** weighs less than 406 bytes gzipped.
- **Useful:** takes many native JavaScript array method and makes them composable.
- **Familiar:** same names just curried and composable [JavaScript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
- **Functional:** functions are curried.
- **Sized just right:** if you need a bit more checkout [pico-nano](https://github.com/trainyard/pico-nano).

> Pico-lambda was made for the ES2015 Javascript Runtime, and has no dependencies.

* * *

## Example

After installing via `npm install`:

```js
const {
  concat,
  cons,
  every,
  filter,
  find,
  includes,
  map,
  reduce,
  reduceRight,
  slice,
  some,
  compose,
  pipe
} = require('./pico-lambda')

//concat
const arrayOne = [1, 2, 3];
const addTwo = concat([4, 5])
const result = addTwo(arrayOne)

// We can compose instead of chaining
compose(
  reduce((acc, val) => val + acc),
  map(x => x * 2),
  filter(x => x > 5),
  concat([6, 7, 8]),
  cons(0),
)([1, 2, 3, 4, 5])
```

* * *

# Api
- concat : Concatinates two arrays
  `[a] -> [b] -> [c]`
  ```js
    concat([4, 5])([1,2,3])
  ```

- compose :: ((a -> b), (c -> d), ..., (e -> f)) -> (f)
- every  :: a -> [a] -> Boolean
- filter :: (a -> Boolean) -> [a] -> [a]
- find :: (a -> Boolean) -> [a] -> a | undefined
- findIndex :: (a -> Boolean) -> a | -1
- includes :: a -> [a] -> Boolean
- join :: a -> [a] -> [a]
- length ::
- map :: (a -> b) -> [a] -> [b]
- pipe :: ((a -> b), (c -> d), ..., (e -> f)) -> (a)
- pop :: Array -> Array
- reduce :: ((a, b) -> a) -> a -> [b] -> a
- reduceRight :: ((a, b) -> a) -> a -> [b] -> a
- reverse ::  Array -> Array
- shift :: Array ->
- slice :: Number -> [a]
- some :: (a -> Boolean) -> [a]
- sort ::
- toString :: 
- unshift :: a -> [a] -> [a]

## Where are ...?
*native*
- `splice` - untested implementation.
- `indexOf` - untested implementation.
- `lastIndexOf` - untested implementation.
- `fill` - untested implementation.
- `copyWithin` - untested implementation.
- `forEach` - Returns `undefined`. Use `map` or `reduce`.
- `entries`- Just `map(x => x.entries)`.
- `keys` - Use `Object.keys`.

If you don't agree with anything above that's great. Just log and issue so we can discuss.

# Patterns
Didn't find something you needed checkout out a few easy patterns

Head and tail
```js
const [head, ...tail] = myset
```

uniq
```js
const uniq = a => [...new Set(a)]
```

Pluck/Pick
```js
array.map(value => value[propertyName])
```