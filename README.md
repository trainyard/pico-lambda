# Experimental please don't use yet!!!!


# Functions
- concat :: a -> [b] -> [c]
- cons :: a -> [a] -> [a]
- compose :: ((a -> b), (c -> d), ..., (e -> f)) -> (f)
- every  :: a -> [a] -> Boolean
- filter :: (a -> Boolean) -> [a] -> [a]
- find :: (a -> Boolean) -> [a] -> a | undefined
- includes :: a -> [a] -> Boolean
- map :: (a -> b) -> [a] -> [b] 
- pipe :: ((a -> b), (c -> d), ..., (e -> f)) -> (a)
- reduce :: ((a, b) -> a) -> a -> [b] -> a
- reduceRight :: ((a, b) -> a) -> a -> [b] -> a
- slice :: Int -> [a]
- some :: (a -> Boolean) -> [a]
- uniq :: [a] -> [a]


# Patterns
cons to add to front 

concat to add to end
Head and tail
```js
const [head, ...tail] = myset
```

Pluck
```js
array.map(value => value[propertyName])
```

Create a rand
```js
Array.from(Array(n), (_, i) => x + i)
```


# Create Docs - I have idea for wat to use 

# Write blog about design

# Run travis CI

# Check out browserling or comparitive to generate comprehensive compatibility list

# Investigate es5 shim if needed - :(

# Consider dist folder and usage of browserify - D:

# problem 1: uglify js is ES5 only

# problem 2: browserify adds to size
