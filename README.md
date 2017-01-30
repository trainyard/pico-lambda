<h1 align="center">pico-lambda</h1>

<div align="center">
  λ
</div>
<div align="center">
  <strong>Arrays the functional way</strong>
</div>
<div align="center">
  A <code>460b</code> functional library based on native array methods
</div>

<div align="center">
  <!-- Build Status -->
  <a href="https://travis-ci.org/trainyard/pico-lambda">
    <img src="https://travis-ci.org/trainyard/pico-lambda.svg?branch=master"
      alt="Build Status" />
  </a>
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/pico-lambda">
    <img src="https://img.shields.io/npm/dm/pico-lambda.svg?style=flat-square"
      alt="Downloads" />
  </a>
  <!-- Semi Standard -->
  <a href="https://github.com/Flet/semistandard">
    <img src="https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square"
      alt="semistandard" />
  </a>
</div>
<div align="center">
  <a href="https://www.browserstack.com/"><img src="Logo-01.svg"></a>
</div>
## why pico-lambda
- **Pico:** weighs less than 460 bytes gzipped.
- **Useful:** takes most native JavaScript array methods and makes them immutable, curried, and composable.
- **Familiar:** same names just curried and composable [JavaScript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)..

> Pico-lambda was made for the ES2015 Javascript Runtime. It has no dependencies.

* * *

## Example

After installing via `npm install`:

```js
const {
  concat,
  filter,
  map,
  reduce,
  compose
} = require('pico-lambda')

//concat
const arrayOne = [1, 2, 3];
const addTwo = concat([4, 5])
const result = addTwo(arrayOne)

// We can compose instead of chaining
compose(
  reduce((acc, val) => val + acc, 0),
  map(x => x * 2),
  filter(x => x > 5),
  concat([6, 7, 8])
)([1, 2, 3, 4, 5])
```

* * *

## API
### compose :: `((e -> f), ..., (b -> c), (a -> b)) -> a -> f`

Evaluates the provided functions, right to left, passing the return value
of each function to the next in line.
The initial function is passed the initial value provided to compose.
The output of the final function, in the above case `(e->f)`, is returned.

```js
compose(
  map(x => x + 1),  // (c -> d)
  map(x => x + 1),  // (b -> c)
  map(x => x + 1)   // (a -> b)
)([0]) // (-> a) => 3
```
### concat :: `[a] -> ([a], ..., [a]) -> [a]`
Concatenates two or more arrays

```js
concat([4, 5])([1,2,3]) // => [1, 2, 3, 4, 5]
concat([4, 5])([1,2], [3]) // => [1, 2, 3, 4, 5]
```
> See [Array.concat (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

### copyWithin :: `(Int, Int, Int) -> [a] -> [a]` | `(Int, Int) -> [a] -> [a]`
Makes a shallow copy of part of an array and overwrites another location in the same with the copy. Size is kept constant.
* The first Int is the target index to write the copy to.
* The second Int is the index to start the copy from.
* The third, optional, Int specifies the end of the range to copy (exclusive of the end index). If not provided, it goes to the end of the array.
```js
const arr = [1, 2, 3, 4, 5]
copyWithin(3, 1)(arr) // => [1, 2, 3, 2, 3]
copyWithin(3, 1, 2)(arr) // => [1, 2, 3, 2, 5]
```
> See [Array.copyWithin (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

### entries:: `[a] -> [b]`
Return an iterator over key, value pairs from the array.

```js
const iterator = entries([1, 2, 3, 4, 5])
iterator.next()) // => { value: [0, 1], done: false }
```
> See [Array.entries (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

### every  :: `((a, Int, [a]) -> Boolean) -> [a] -> Boolean`
Applies predicate to all elements in array and returns false if any fail. The predicate function must at least take one parameter for each element but may optionally take an index and the entire array as 2nd and 3rd parameters, respectively.

```js
const predicate = x => x < 4
every(predicate)([1, 2, 3]) // => true
every(predicate)([1, 2, 3, 4, 5]) // => false
```
> See [Array.every (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

### fill :: `(a, Int, Int) -> [a] -> [a]` | `(a) -> [a] -> [a]`
Fills a portion of the given array putting the same new value into each slot.
* The first parameters (a) is the element to add into the array
* The second parameter (Int) is the first index to start filling at. If not supplied it starts at 0.
* The third parameter (Int) is the index to stop filling before (i.e., exclusive). If not supplied fill goes to the end of the array.

```js
const arr = [1, 2, 3, 4, 5]
fill(1)(arr) // => [1, 1, 1, 1, 1]
fill(1, 2, 4)(arr) // => [1, 2, 1, 1, 5]
```
> See [Array.fill (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

### filter :: `((a, Int, [a]) -> Boolean) -> [a] -> [a]`
Returns a new array containing only those elements of the given array that pass the given predicate.

```js
const predicate = x => x < 3
filter(predicate)([1, 2, 3, 4, 5]) // => [1, 2]
```
> See [Array.filter (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### find :: `(a -> Boolean) -> [a] -> a | undefined`
Finds and returns the first element in the given array that matches the given predicate. If no element passes, undefined is returned.

```js
const predicate = x => x === 3
find(predicate)([1, 2, 3]) // => 3
find(predicate)([1, 2]) // => undefined
```
> See [Array.find (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

### findIndex :: `(a -> Boolean) -> [a] -> Int`
Returns the index of the first element in the given array that matches the given predicate. If no element passes, -1 is returned.

```js
const arr = [1, 2, 3, 4, 5]
const findIndex = x => x === 3
find(x => x > 3)(arr) // => 3
find(x => x > 80)(arr]) // => -1
```
> See [Array.findIndex (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

### includes :: `a -> [a] -> Boolean`
Returns true if the given element is in the given array, otherwise false.

```js
const animals = ['dog', 'cat', 'ferret', 'hamster']
const hasCat = includes('cat')
const hasUnicorn = includes('unicorn')

hasCat(animals) // true
hasUnicorn(animals) // false
```
> See [Array.includes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

### indexOf :: `(a, Int) -> [a] -> Int` | `(a) -> [a] -> Int`
Returns the index of the given element if it is in the given array, otherwise -1.
The 2nd parameter can be used to change where it starts looking.

```js
indexOf(3)([1, 2, 3, 4, 5]) // => 2
indexOf(3, 3)([[1, 2, 3, 4, 5, 3]) // => 3
```
> See [Array.indexOf (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

### join :: `String -> [a] -> String`
Converts each element of the array to a string and concatenates them together with the given string as a delimiter.

```js
join('-')([1, 2, 3]) // => '1-2-3'
```
> See [Array.join (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

### keys :: `[a] -> [Int]`
Return an iterator over keys from the array.

```js
const iterator = keys([1, 2, 3, 4, 5])
iterator.next() // => { value: 0, done: false }
```
> See [Array.keys (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

### lastIndexOf :: `(a, Int) -> [a] -> Int` | `(a) -> [a] -> Int`
Works like indexOf but starts at the end and works backwards.
The 2nd parameter can be used to tell it where to start working backwards from.

```js
lastIndexOf(1)([1, 2, 3, 1]) // => 3
lastIndexOf(1, -2)([1, 2, 3, 1]) // => 0
```
> See [Array.lastIndexOf (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

### map :: `(a -> b) -> [a] -> [b]`
Applies a function over each element in the given array, returning a new array with each function call's results.

```js
map(x => x * 2)([1, 2, 3]) // => 2, 4, 6
```
> See [Array.map (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### pipe :: `((a -> b), (b -> c), ..., (e -> f)) -> a -> f`
Takes an initial value that is passed to the first function in the parameter list.
The return value of each subsequent function is passed to the following function.
The return value of the last function is returned from pipe.

```js
const arr = [1, 2, 3, 4, 5]
pipe(
  unshift(0),        // (a -> b)
  concat([6, 7, 8])  // (b -> c)
)(arr) // => [0, 1, 2, 3, 4, 5, 6, 7, 8]
```
> See [Array.pipe (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pipe)

### pop :: `[a] -> [a]`
Returns a new array without the last item

```js
pop([1, 2, 3, 4, 5]) // => [1, 2, 3, 4]
```
> See [Array.pop (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

### push :: `a -> [a] -> [a]`
Returns a new array with the new element appended to the end of the original array.

```js
push(5)([1, 2, 3, 4]) // => [1, 2, 3, 4, 5]
```
> See [Array.push (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

### reduce :: `((a, b) -> a) -> a -> [b] -> a`
Applies a function against an accumulator and each value of the array (from left-to-right), then returning the accumulator.

```js
const sum = reduce((acc, val) => acc + val, 99)
sum([2, 3, 4]) // => 108
```
> See [Array.reduce (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

### reduceRight :: `((a, b) -> a) -> a -> [b] -> a`
Applies a function against an accumulator and each value of the array (from right-to-left), then returning the accumulator.

```js
const sum = reduceRight((acc, val) => acc + val, 99)
sum([2, 3, 4]) // => 90
```
> See [Array.reduceRight (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)

### reverse ::  `[a] -> [a]`
Returns a new array with the elements in reverse order.

```js
reverse([1, 2, 3, 4, 5]) // => [5, 4, 3, 2, 1]
```
> See [Array.reverse (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

### shift :: `[a] -> [a]`
Returns a new array with the first element removed.

```js
shift([1, 2, 3, 4, 5]) // => [2, 3, 4, 5]
```
> See [Array.shift (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

### slice :: `(int, int) -> [a] -> [a]`
Takes a slice from a given array and returns it as a new array.

```js
const removeFirst = slice(1)
removeFirst([2, 3, 4]) // => [3, 4]
```
> See [Array.slice (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

### splice :: `(int, int, [a]) -> [a] -> [a]`
Returns a new array with the indicated elements removed. An optional set of new elements can be inserted in their place.
```js
const takeTwo = splice(2)
takeTwo([1, 2, 3, 4, 5]) // => [1, 2]

```
> See [Array.splice (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

### some :: `(a -> Boolean) -> [a] -> Boolean`
Returns true if any element in the given array matches the given predicate.

```js
const lessThanFour = some(x => x < 4)
lessThanFour([1, 2, 3, 4, 5]) // => true
```
> See [Array.some (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

### sort :: `((a, a) -> int) -> [a] -> [a]`
Returns a copy of the original array with the values sorted. If a comparator function is provided it should return -1, 0 or 1 depending on whether the first element is less than, equal to or greater than the second, respectively. If no comparator is given, lexical sorting is used.

```js
const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1
const sortBy = sort(numComp)
sortBy([20, 1, 3, 4, 2]) // => [1, 2, 3, 4, 20]
```
> See [Array.sort (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### toLocaleString :: `(String, Obj) -> [a] -> String`
Converts each element of an array into a string based on current locale settings or locale options passed in. The resulting strings are appended together using commas.

```js
const toYen = toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })
toYen(["￥7", 500, 8123, 12]) // =>
```
> See [Array.toLocaleString (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

### toString :: `[a] -> String`
Converts each element of an array into a string and appends them together with a comma.

> See [Array.toString (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

### unshift :: `[a] -> [a]`
Returns a new copy of an array with the first element removed.

> See [Array.unshift (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)


## Where are ...?
- `length` - This is a property, not a method, so it doesn't really belong here.
- `forEach` - This is inherently side-effect-y, it adds nothing that can't be done with `filter`, `map` and `reduce`.

If you don't agree with anything above that's great! Just log an issue so we can discuss.
