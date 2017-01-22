# Experimental please don't use yet!!!!

<p align="center">
    λ
  <br>
  <b>pico-lambda</b>: 319b functional library.
  <br>
  [badges]
</p>

## why pico-lambda
- **Pico:** weighs less than 319 bytes gzipped.
- **Useful:** takes many native JavaScript array method and makes them composable.
- **Familiar:** same names just curried and composable [JavaScript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
- **Functional:** functions are curried.
- **Sized just right:** if you need a bit more checkout [pico-nano](https://github.com/trainyard/pico-nano).

> Pico-lambda was made for the ES2015 Javascript Runtime, and has no dependencies.

* * *

## Usage

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
} = require();

// concat (native JS)
const arrayOne = [1, 2, 3];
const addTwo = concat([4, 5])
const result = arrayOne.concat(addTwo)

//concat (pico)
const arrayOne = [1, 2, 3];
const addTwo = concat([4, 5])
const result = (addTwo(arrayOne))

// This difference matters because now we can compose
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
- concat :: a -> [b] -> [c]
- cons :: a -> [a] -> [a]
- compose :: ((a -> b), (c -> d), ..., (e -> f)) -> (f)
- every  :: a -> [a] -> Boolean
- filter :: (a -> Boolean) -> [a] -> [a]
- find :: (a -> Boolean) -> [a] -> a | undefined
- findIndex :: (a -> Boolean) -> a | -1
- includes :: a -> [a] -> Boolean
- join :: a -> [a] -> [a]
- map :: (a -> b) -> [a] -> [b]
- pipe :: ((a -> b), (c -> d), ..., (e -> f)) -> (a)
- reduce :: ((a, b) -> a) -> a -> [b] -> a
- reduceRight :: ((a, b) -> a) -> a -> [b] -> a
- slice :: Int -> [a]
- some :: (a -> Boolean) -> [a]

## Where are ...?
*native*
- `pop` - Mutates! But we are looking for a replacement.
- `push` - Mutates! Change the array by reference. It also returns the length of the array *strange*. [Here is an article on the differences](http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/), but we just use concat or cons.
- `reverse` - We felt this was better served with a pattern. Checkout below. 
- `shift` - Mutates! Looking for a replacement.
- `unshift` - Use the cons.
- `splice` - Use slice.
- `sort` - Mutates! Might add a sortby.
- `forEach` - Returns `undefined`. Use `map` or `reduce`.
- `indexOf` - Use includes.
- `lastIndexOf` - Use includes.
- `copyWithin` - Mutates! Use `composition` or `pipe`.
- `fill` - Mutates! It mutates everything! So we left it out.
- `toString` - Just `map(x => x.toString)`.
- `length` - Just `map(x => x.length)`.
- `entries`- Just `map(x => x.entries)`.
- `keys` - Just `map(x => x.keys)`.

# Patterns
Didn't find something you needed checkout out a few easy patterns

Head and tail
```js
const [head, ...tail] = myset
```

uniq
```js
const uniq = a => [...new Set(a)],
```

Pluck/Pick
```js
array.map(value => value[propertyName])
```

reverse 
```js
[ ...arr ].reverse()
```