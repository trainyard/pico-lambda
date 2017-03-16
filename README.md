<h1 align="center">pico-lambda</h1>

<div align="center">
  λ
</div>
<div align="center">
  <strong>Arrays, Strings and things the functional way</strong>
</div>
<div align="center">
  A <code>640b</code> functional library based on native methods
</div>

<div align="center">
  <!-- Build Status -->
  <a href="https://travis-ci.org/trainyard/pico-lambda">
    <img src="https://travis-ci.org/trainyard/pico-lambda.svg?branch=master"
      alt="Build Status" />
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
  Proudly supported by...<br/>
  <a href="https://www.browserstack.com/"><img src="browserstack.png" width=240 alt="BrowserStack"/></a>
</div>

## why pico-lambda
- **Pico:** weighs less than 640 bytes when minified and gzipped.
- **Useful:** takes most native JavaScript array and string methods and makes them *immutable*, *curried*, and *composable*.
- **Functional:** Curry, compose and pipe, Oh My!
- **Familiar:** same names just curried and composable. See [JavaScript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
- **Degrades Gracefully:** a small set of these functions are not available in every browser/environment. When not available in the browser it will not be available in Pico Lambda.

> Pico-lambda was made for the ES2015 Javascript Runtime. It has __no dependencies__.

* * *

## Example

After installing via `npm install`:

```js
const {parray, pcore} = require('pico-lambda')
const {
  concat,
  filter,
  map,
  reduce,
} = parray
const {
  compose
} = pcore

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

## functions
This table shows compatibility for each of the functions available by browser. *Currently only array functions are listed. String will be added soon.*
If you wish to have full compatibility you can use a transpiler like babel.

<details>
<summary>Table of Compatibility</summary>
<table>
  <thead>
    <tr>
      <th>
        Function
      </th>
      <th>
        Android 5.1+
      </th>
      <th>
        Chrome 52+
      </th>
      <th>
        Edge 13+
      </th>
      <th>
        FF 45+
      </th>
      <th>
        iOS 9+
      </th>
      <th>
        Safari 9+
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>compose</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>concat</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>copyWithin</td>
      <td>❌</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>entries</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>every</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>fill</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>find</td>
      <td>❌</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>findIndex</td>
      <td>❌</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>includes</td>
      <td>❌</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>indexOf</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>join</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>keys</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>lastIndexOf</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>map</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>pipe</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>pop</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>push</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>reduce</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>reduceRight</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>reverse</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>shift</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>slice</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>splice</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>some</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>sort</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>toLocaleString</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>toString</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>unshift</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
</table>
</details>

# API

The api is broken up into three sections:
* pcore - Basic functional capabilities like curry and compose
* parray - The standard Array.prototype methods setup for functional use
* pstring - The standard String.prototype methods setup for functional use

One note, parray and pstring have some overlapping function names:
 * length
 * toString
 * slice
 * indexOf
 * lastIndexOf
 * includes
 * concat

 Be aware of this when importing these into your global namespace.


---
## pcore
---
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

### curry :: `(fn) -> fn`
Takes a function and curries the arguments.

Take note that rest parameters are only partially supported using curry. JS only reports expected parameters, optional and rest parameters are not reported. As a result, there is no way to determine when to expect them. What this means, in practice, is that you can pass rest and/or optional parameters along with the last required param, but you cannot pass them on their own in a new set of parens. See the example below for an illustration of this.


```js
function log4Things(a, b, c, d) {
  console.log(a, b, c, d)
}

const curriedLog = curry(log4Things)

curriedLog(1, 2, 3, 4) //=> Outputs: 1 2 3 4
curriedLog(1)(2)(3)(4) //=> Outputs: 1 2 3 4
curriedLog(1)(2, 3)(4) //=> Outputs: 1 2 3 4
curriedLog(1)(2)(3)(4) //=> Outputs: 1 2 3 4
curriedLog(1, 2)(3, 4) //=> Outputs: 1 2 3 4
curriedLog(1, 2, 3)(4) //=> Outputs: 1 2 3 4
//You get the idea.....

const partialLog = curriedLog(1, 2, 3)
partialLog(4)          //=> Outputs: 1 2 3 4
partialLog(5)          //=> Outputs: 1 2 3 5

//Using Rest parameters
function log3OrMoreThings(a, b, c, ...d) {
  console.log(a, b, c, ...d)
}
const curriedLogMore = curry(log3OrMoreThings)

curriedLogMore(1, 2, 3) //=> Outputs: 1 2 3
curriedLogMore(1, 2, 3, 4) //=> Outputs: 1 2 3 4
curriedLogMore(1, 2)(3) //=> Outputs: 1 2 3
curriedLogMore(1, 2)(3, 4) //=> Outputs: 1 2 3 4
//However, the following all result in an error
curriedLogMore(1)(2)(3)(4) //Throws: TypeError('curriedLogMore(...)(...)(...) is not a function')
curriedLogMore(1)(2, 3)(4) //Throws: TypeError('curriedLogMore(...)(...)(...) is not a function')
curriedLogMore(1)(2)(3)(4) //Throws: TypeError('curriedLogMore(...)(...)(...) is not a function')
curriedLogMore(1, 2, 3)(4) //Throws: TypeError('curriedLogMore(...)(...)(...) is not a function')
//This is because the curry function calls the original function after the third param and the result is then called as a function with the last grouping, '(4)' in this case


```
### identity :: `a -> a`
Takes an argument and returns that arugment. This can be quite useful when composing many functions together.

```js
console.log(identity("hi")) //Outputs: hi

```

---
## parray
---
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
toYen(["￥7", 500, 8123, 12]) // => ￥7,500,8,123,12
```
> See [Array.toLocaleString (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

### toString :: `[a] -> String`
Converts each element of an array into a string and appends them together with a comma.

```js
toString([1, 2, 3, 4, 5]) // => '1,2,3,4,5'
```
> See [Array.toString (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

### unshift :: `a -> [a] -> [a]`
Returns a new copy of an array with the given element added to the front.

```js
const addOne = unshift(1)
addOne([2, 3]) // => [1, 2, 3]
```
> See [Array.unshift (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

## Where are ...?
- `length` - This is a property, not a method, so it doesn't really belong here.
- `forEach` - This is inherently side-effect-y, it adds nothing that can't be done with `filter`, `map` and `reduce`.

If you don't agree with anything above that's great! Just log an issue so we can discuss.

---
## pstring
---
### charAt :: `Int -> String -> String`
Returns the character at the given position in the string.

```js
charAt(2)("123")) //=> "3"
```
> See [String.charAt (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)
### charCodeAt :: `Int -> String -> Int`
Returns the character code at the given position in the string.

```js
charAt(2)("123")) //=> 51

```
> See [String.charCodeAt (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
### codePointAt :: `Int -> String -> Int`
Returns the unicode code point at the given index.

```js
codePointAt(0)("\uD800\uDC00")) //=> 65536
```
> See [String.codePointAt (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
### concat :: `(String, ...String) -> String -> String`
Returns a new string combining the given strings. Multiple strings can be passed to the initial call.

```js
const stringOne = "123"
const addTwo = concat("45", "67")
const result = addTwo(stringOne) //result = "1234567"
```
> See [String.concat (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat)
### endsWith :: `String -> String -> Boolean` | `(String, Int) -> String -> String`
Returns true if the second string ends with the characters in the first. If the integer parameter is passed, the second string is considered to be only that long (or the length of the second string itself whichever is shorter)

```js
endsWith("bc")("abc")    //=> true
endsWith("bc", 2)("abc") //=> false
endsWith("bc")("abcd")   //=> false
```
> See [String.endsWidth (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWidth)
### includes :: `String -> String -> Boolean` | `(String, Int) -> String -> Boolean`
Returns true if the characters from the first string appear together as a substring in the second. If the integer is provided it indicates where to start searching in the second string.

```js
includes("not to be,")("To be, or not to be, that is the question.")  //=> true
includes("not to be,", 20)("To be, or not to be, that is the question.")  //=> false
includes("nonexistent")("To be, or not to be, that is the question.") //=> false
```
> See [String.includes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
### indexOf :: `String -> String -> Int` | `(String, Int) -> String -> Int`
Returns the first index where the second string appears as a substring of the first. Optionally you can provide a starting index and the search will start there. If the first string is not found it returns -1

```js
indexOf("a")("abc")) //=> 0
indexOf("b")("abc")) //=> 1
indexOf("c")("abc")) //=> 2
indexOf("z")("abc")) //=> -1
```
> See [String.indexOf (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
### lastIndexOf :: `String -> String -> Int` | `(String, Int) -> String -> Int`
Works like index of but starting at the end and working forward.

```js
lastIndexOf("a")("abc")) //=> 0
lastIndexOf("b")("abc")) //=> 1
lastIndexOf("c")("abc")) //=> 2
lastIndexOf("z")("abc")) //=> -1
```
> See [String.lastIndexOf (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)
### localeCompare :: `String -> String -> Int` | `(String, String) -> String -> Int` | `(String, String, Object) -> String -> Int`
Compares two strings taking the locale into account. The return value will be negative if the second string comes before the first. Positive if it comes later. And zero if they are equal. The additional, optional parameters allow a locale and other options to be specified.

```js
localeCompare("b")("a"))                                //=> <0
localeCompare("a")("b"))                                //=> >0
localeCompare("a")("a"))                                //=> 0
localeCompare('a', 'de', { sensitivity: 'base' })('ä')) //=> 0
```
> See [String.localeCompare (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
### match :: `Regexp -> String -> [String]`
Returns an array of strings for the value matched by the regular expression as well as all matching groups defined therein.

```js
const str = 'For more information, see Chapter 3.4.5.1'
const re = /see (chapter \d+(\.\d)*)/i
match(re)(str)  //=> ["see Chapter 3.4.5.1", "Chapter 3.4.5.1", ".1"]
```
> See [String.match (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
### normalize :: `String -> String`
Returns the Unicode Normalization Form of a string.

```js
normalize('NFKC')('\u1E9B\u0323') //=> '\u1E69'
```
> See [String.normalize (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
### repeat :: `Int -> String -> String`
Returns string comprised of the given number of repeats of the given string.

```js
repeat(2)('abc')) //=> 'abcabc'
```
> See [String.repeat (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)
### replace :: `(Regexp, String) -> String -> String`
Replaces all locations in the second string that match the given regular expression with the value in the first string. Back references in the first string will be filled appropriately.

```js
replace(/xmas/i, 'Christmas')('Twas the night before Xmas...')) //=> 'Twas the night before Christmas...'
```
> See [String.replace (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
### search :: `Regexp -> String -> String`
Returns the first position where given regular expression matches in the second string. If it doesn't match, -1 is returned.

```js
search(/xmas/i)('Twas the night before Xmas...')) //=> 22
```
> See [String.search (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)
### slice :: `Int -> String -> String` | `(Int, Int) -> String -> String`
Returns a substring of the second string defined by the given index and optional end index. Either may be negative to count from the end of the string.

```js
slice(4, -2)('Twas the night before Xmas...') //=> ' the night before Xmas.'
```
> See [String.slice (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
### split :: `String -> String -> [String]` | `(String, Int) -> String -> [String]`
Splits a string into an array of substrings that are separated by the first string given. If the integer parameter is provided the split will stop at the given limit.

```js
split(',')("1,2")         //=> ['1', '2']
split(',', 2)("1,2,3,4")  //=> ['1', '2']
```
> See [String.split (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
### startsWith :: `String -> String -> Boolean` | `(String, Int) -> String -> Boolean`
Returns true if the second string starts with the characters in the first. If the integer parameter is passed, the second string is considered to start at that position

```js
startsWith("ab")("abc")    //=> true
startsWith("bc")("abcd")   //=> false
```
> See [String.startsWith (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
### substr :: `Int -> String` | `(Int, Int) -> String`
Returns the characters in a string beginning at the specified location through the specified number of characters.

```js
substr(2)("abcde")     //=> 'cde'
substr(2, 2)("abcde")  //=> 'cd'
```
> See [String.substr (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr)
### substring :: `Int -> String` | `(Int, Int) -> String`
Returns a subset of a string between one index and another, or through the end of the string.

```js
substring(2)("abcde")    //=> 'cde'
substring(2, 4)("abcde") //=> 'cd'
```
> See [String.substring (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
### toLocaleLowerCase :: `String -> String`
Returns the primitive value of a string.

```js

```
> See [String.toLocaleLowerCase (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)
### toLocaleUpperCase :: `String -> String`
Returns the calling string value converted to lower case, according to any locale-specific case mappings.

```js
toLocaleLowerCase("ABC") //=> 'abc'
```
> See [String.toLocaleUpperCase (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase)
### toLowerCase :: `String -> String`
Returns the primitive value of a string.

```js
toLocaleLowerCase("ABC") //=> 'abc'
```
> See [String.toLowerCase (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
### toString :: `String -> String`
Returns the calling string value converted to upper case, according to any locale-specific case mappings.

```js
toLocaleUpperCase("abc") //=> 'ABC'
```
> See [String.toString (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString)
### toUpperCase :: `String -> String`
Returns the calling string value converted to upper case.

```js
toUpperCase("abc") //=> 'ABC'
```
> See [String.toUpperCase (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
### trim :: `String -> String`
 Removes whitespace from both ends of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

```js
trim(" abc ") //=> 'abc'
```
> See [String.trim (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
### trimLeft :: `String -> String`
Removes whitespace from the left end of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

```js
trimLeft(" abc ") //=> 'abc '
```
> See [String.trimLeft (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft)
### trimRight :: `String -> String`
Removes whitespace from the left end of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

```js
trimRight(" abc ") //=> ' abc'
```
> See [String.trimRight (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight)
### valueOf :: `String -> String`
Returns the primitive value of a string.

```js
valueOf("abc") //=> 'abc'
```
> See [String.valueOf (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf)