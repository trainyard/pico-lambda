const tape = require('tape')
const pl = require('./index.js')

var intArr = [1, 2, 3, 4, 5, 6]
const l = a => console.log('!!!!!!!!!!!!!!!!!!!!!', a)
tape('api: map', (t) => {
  t.test('applys function to items in array', (t) => {
    t.plan(1)
    const addTwo = pl.map(x => x * 2)
    const doubled = addTwo([1, 2, 3])
    t.deepEqual(doubled, [2, 4, 6])
  })
})

tape('api: concat', (t) => {
  t.test('should add array of items to end of array', (t) => {
    t.plan(1)
    const arrayOne = [1, 2, 3];
    const addTwo = pl.concat([4, 5])
    const result = (addTwo(arrayOne))
    t.deepEqual(result, [1, 2, 3, 4, 5])
  })

  t.test('should add single item to end of array', (t) => {
    t.plan(1)
    const arrayOne = [3, 2];
    const addOne = pl.concat(1)
    const result = (addOne(arrayOne))
    t.deepEqual(result, [3, 2, 1])
  })
})

tape('api: every', (t) => {
  t.test('should return false if any items do not pass predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = pl.every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    l(result);
    t.equal(false, result)
  })

  t.test('should return true if all items pass predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3];
    const areAllAreLessThanFour = pl.every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    l(result);
    t.equal(true, result)
  })
})


// tape('Describe block', (t) => {
//   t.test('it block', (t) => {
//     t.plan(3)
//     t.doesNotThrow(barracks, 'no args does not throw')
//     t.doesNotThrow(barracks.bind(null, {}), 'object does not throw')
//     t.throws(barracks.bind(null, 123), 'non-object throws')
//   })

//   t.test('should validate hook types', (t) => {
//     t.plan(3)
//     t.throws(barracks.bind(null, { onError: 123 }), /function/, 'onError throws')
//     t.throws(barracks.bind(null, { onAction: 123 }), /function/, 'onAction throws')
//     t.throws(barracks.bind(null, { onStateChange: 123 }), /function/, 'onStateChange throws')
//   })
// })

//helpers
// const l = console.log
// l(Object.keys(pl));

// const length = a => a.length
// const upperCase = a => a.toUpperCase()


// //functions
// var myset = [1, 2, 2, 2, 3, 3, 4, 55]
// var mybuds = ["Ronn", "Matt", "Brendan", "Pete", "Yan"]

// // l('head ', head)
// // l('tail ', tail)
// // l('uniq', pl.uniq(myset))
// const addTwo = pl.map(x => x * 2)

// const comline = pl.pipe(
//   x => x * 2,
//   addTwo
// )


// l(comline(5))