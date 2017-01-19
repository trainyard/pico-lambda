# Why oh why another λ

# Functions
map :: (a -> b) -> [a] -> [b] 
reduce :: ->
reduceRight :: ->
filter :: ->
find :: ->
includes :: ->
concat :: a -> [b] -> [c]
slice :: ->
some :: ->
every  :: ->
key  :: ->
cons :: ->
uniq :: ->
compose :: ->
pipe :: ->


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