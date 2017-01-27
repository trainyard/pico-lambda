const { describe, it, PicoLambda } = init()
const { concat, copyWithin, every, entries, filter, fill, find, findIndex, includes, indexOf, keys, join, lastIndexOf, map, pop, push, toString, toLocaleString, reduce, reduceRight, reverse, shift, slice, splice, some, sort, compose, pipe, unshift } = PicoLambda

function init() {

  if (typeof window === 'undefined') {
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter

    jasmine.getEnv().clearReporters()               // remove default reporter logs
    jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
      spec: {
        displayPending: true
      }
    }))
  }

  if (typeof window !== 'undefined') {
    const { PicoLambda, describe, it } = window
    return { PicoLambda, describe, it }
  } else {
    const PicoLambda = require('../src/index.js')
    const { describe, it } = global
    return { PicoLambda, describe, it }
  }
}

var i = 0

const l = a => {
  console.log('# -- log', i, '-->', a)
  i++
}

describe('integrity', () => {
  it('should have everything array.prototype does (except foreach)', () => {
    const a = Object
      .getOwnPropertyNames(Array.prototype)
      .filter(s => !['forEach', 'constructor'].includes(s))
    const p = Object.keys(PicoLambda)

    a.forEach((key) => {
      expect(p.includes(key)).toEqual(true, key)
    })

  })
})

describe('api: concat', () => {
  it('should add array of items to end of array', () => {
    const arrayOne = [1, 2, 3]
    const addTwo = concat([4, 5])
    const result = (addTwo(arrayOne))
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should add single item to end of array', () => {
    const arrayOne = [3, 2]
    const addOne = concat(1)
    const result = (addOne(arrayOne))
    expect(result).toEqual([3, 2, 1])
  })

  it('should not alter the original array', () => {
    const arrayOne = [3, 2]
    const addOne = concat(1)
    const result = (addOne(arrayOne))
    expect(arrayOne).toEqual([3, 2])
  })
})

describe('api: copyWithin', () => {
  it('should overwrite from target to end of array with selected elements', () => {
    var arr = [1, 2, 3, 4, 5]
    const result = copyWithin(3, 1)(arr)
    expect(result).toEqual([1, 2, 3, 2, 3])
  })
  it('should overwrite from target to indicated end with selected elements', () => {
    var arr = [1, 2, 3, 4, 5]
    const result = copyWithin(3, 1, 2)(arr)
    expect(result).toEqual([1, 2, 3, 2, 5])
  })
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5]
    const result = copyWithin(3, 1, 2)(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: every', () => {
  it('should return false if any items do not pass predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const areAllAreLessThanFour = every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    expect(result).toEqual(false)
  })

  it('should return true if all items pass predicate', () => {
    const arr = [1, 2, 3]
    const areAllAreLessThanFour = every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    expect(result).toEqual(true)
  })

  it('should not alter the original array', () => {
    const arr = [1, 2, 3]
    const areAllAreLessThanFour = every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    expect(arr).toEqual([1, 2, 3])
  })
})

describe('api: fill', () => {
  it('should overwrite each element of an array with supplied param', () => {
    var arr = [1, 2, 3, 4, 5]
    const result = fill(1)(arr)
    expect(result).toEqual([1, 1, 1, 1, 1])
  })
  it('should overwrite selected elements of an array with supplied params', () => {
    var arr = [1, 2, 3, 4, 5]
    const result = fill(1, 2, 4)(arr)
    expect(result).toEqual([1, 2, 1, 1, 5])
  })
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5]
    const result = fill(1)(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: entries', () => {
  it('should return an interator that contains key values pair of given array', () => {
    const arr = [1, 2, 3, 4, 5]
    const iterator = entries(arr)
    expect(iterator.next()).toEqual({ value: [0, 1], done: false })
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const iterator = entries(arr)
    iterator.next()
    iterator.next()
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: filter', () => {
  it('should return items that pass the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const numsUnderThree = filter(x => x < 3)
    const result = (numsUnderThree(arr))
    expect(result).toEqual([1, 2])
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const numsUnderThree = filter(x => x < 3)
    const result = (numsUnderThree(arr))
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: find', () => {
  it('should return first item that passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = find(x => x === 3)
    const result = (isThree(arr))
    expect(result).toEqual(3)
  })
  it('should return undefined when no item passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = find(x => x === 8)
    const result = (isThree(arr))
    expect(result).toEqual(undefined)
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = find(x => x === 3)
    const result = (isThree(arr))
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: findIndex', () => {
  it('should return index of first item that passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const gtThree = findIndex(x => x > 3)
    const result = gtThree(arr)
    expect(result).toEqual(3)
  })

  it('should return -1 when no item passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const gtThree = findIndex(x => x > 80)
    const result = gtThree(arr)
    expect(result).toEqual(-1)
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const gtThree = findIndex(x => x > 80)
    const result = gtThree(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: includes', () => {
  it('should return true when an item is found in array', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = includes(3)
    const result = isThree(arr)
    expect(result).toEqual(true)
  })

  it('should return false when an item is not found in array', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = includes(8)
    const result = isThree(arr)
    expect(result).toEqual(false)
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = includes(8)
    const result = isThree(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: indexOf', () => {
  it('should return the indexOf item', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = indexOf(3)(arr)
    expect(result).toEqual(2)
  })
  it('should return the indexOf item found after second arg', () => {
    const arr = [1, 2, 3, 4, 5, 3]
    const result = indexOf(3, 3)(arr)
    expect(result).toEqual(5)
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = indexOf(3)(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: keys', () => {
  it('should return an iterator of keys of given array', () => {
    const arr = [1, 2, 3, 4, 5]
    const iterator = keys(arr)
    expect(iterator.next()).toEqual({ value: 0, done: false })
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const iterator = keys(arr)
    iterator.next()
    iterator.next()
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: join', () => {
  it('should return a string with each item separated with character passed in', () => {
    var arr = [1, 2, 3, 4, 5]
    const separateByDash = join('-')
    const result = separateByDash(arr)
    expect(result).toEqual('1-2-3-4-5')
  })
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5]
    const separateByDash = join('-')
    const result = separateByDash(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: lastIndexOf', () => {
  it('should find the index of the last occurrence of an element', () => {
    var arr = [1, 2, 3, 1]
    const result = lastIndexOf(1)(arr)
    expect(result).toEqual(3)
  })
  it('should find the index of the last occurrence of an element, starting at a given index.', () => {
    var arr = [1, 2, 3, 1]
    const result = lastIndexOf(1, -2)(arr)
    expect(result).toEqual(0)
  })
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 1]
    const result = lastIndexOf(1)(arr)
    expect(arr).toEqual([1, 2, 3, 1])
  })
})

describe('api: map', () => {
  it('applys function to items in array', () => {
    const double = map(x => x * 2)
    const result = double([1, 2, 3])
    expect(result).toEqual([2, 4, 6])
  })
  it('should not alter the original array', () => {
    var arr = [1, 2, 3]
    const double = map(x => x * 2)
    const result = double(arr)
    expect(arr).toEqual([1, 2, 3])
  })
})

describe('api: reduce', () => {
  it('applys function to each item and accums results from left to right', () => {
    const sum = reduce((acc, val) => acc + val)
    const total = sum([2, 3, 4], 99)
    expect(total).toEqual(108)
  })
  it('should not alter the original array', () => {
    var arr = [2, 3, 4]
    const sum = reduce((acc, val) => acc + val)
    const total = sum(arr, 99)
    expect(arr).toEqual([2, 3, 4])
  })
})

describe('api: reduce right', () => {
  it('applys function to each item and accums results from right to left', () => {
    const sum = reduceRight(((acc, val) => acc - val), 10)
    const total = sum([2, 3, 4], 99)
    expect(total).toEqual(90)
  })
  it('should not alter the original array', () => {
    var arr = [2, 3, 4]
    const sum = reduceRight(((acc, val) => acc - val), 10)
    const total = sum(arr, 99)
    expect(arr).toEqual([2, 3, 4])
  })
})

describe('api: slice', () => {
  it('returns new but sliced array', () => {
    const removeFirst = slice(1)
    const result = removeFirst([2, 3, 4])
    expect(result).toEqual([3, 4])
  })
  it('should not alter the original array', () => {
    var arr = [2, 3, 4]
    const removeFirst = slice(1)
    const result = removeFirst(arr)
    expect(arr).toEqual([2, 3, 4])
  })
})

describe('api: some', () => {
  it('should return true if at least one items passes predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const areAllAreLessThanFour = some(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    expect(result).toEqual(true)
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const areAllAreLessThanFour = some(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

/*////////////// Maybe ///////////*/
describe('api: reverse', () => {
  it('should return array reversed', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = reverse(arr)
    expect(result).toEqual([5, 4, 3, 2, 1])
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = reverse(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: toString', () => {
  it('should return string representation of array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = toString(arr)
    expect(result).toEqual("1,2,3,4,5")
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = toString(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: toLocaleString', () => {
  it('should match standard array toLocaleString output', () => {
    var testDate = new Date()
    const arr = ["not changing", 1234567890.12, testDate]
    const result = toLocaleString()(arr)
    expect(result).toEqual(arr.toLocaleString())
  })
  it('should match standard array toLocaleString output', () => {
    var prices = ["￥7", 500, 8123, 12];
    const result = toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })(prices)
    expect(result).toEqual(prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }))
  })
  it('should not alter the original array', () => {
    var testDate = new Date()
    const arr = ["not changing", 1234567890.12, testDate]
    const result = toLocaleString()(arr)
    expect(arr).toEqual(["not changing", 1234567890.12, testDate])
  })
})

describe('api: splice', () => {
  it("Should remove requested elements", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = splice(2)(arr)
    expect(result).toEqual([1, 2])
  })
  it("Should only remove as many elements as requested", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = splice(1, 2)(arr)
    expect(result).toEqual([1, 4, 5])
  })
  it("Should replace removed elements with new values", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = splice(1, 3, 20, 21)(arr)
    expect(result).toEqual([1, 20, 21, 5])
  })
  it("should not alter the original array", () => {
    const arr = [1, 2, 3, 4, 5]
    const result = splice(2)(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: push', () => {
  it('should add element to end of array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = push(6)(arr)
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = push(6)(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: pop', () => {
  it('should remove last element from array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = pop(arr)
    expect(result).toEqual([1, 2, 3, 4])
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = pop(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: shift', () => {
  it('should remove first element from array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = shift(arr)
    expect(result).toEqual([2, 3, 4, 5])
  })
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = shift(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

describe('api: unshift', () => {
  it('should add single item to front of array', () => {
    const addOne = unshift(1)
    const result = addOne([2, 3])
    expect(result).toEqual([1, 2, 3])
  })
  it('should not alter the original array', () => {
    var arr = [2, 3]
    const addOne = unshift(1)
    const result = addOne(arr)
    expect(arr).toEqual([2, 3])
  })
})

describe('api: sort', () => {
  it('should sort array based on comparator', () => {
    var arr = [20, 1, 3, 4, 2]
    const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1
    const sortBy = sort(numComp)
    const result = sortBy(arr)
    expect(result).toEqual([1, 2, 3, 4, 20])
  })
  it('should not alter the original array', () => {
    var arr = [20, 1, 3, 4, 2]
    const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1
    const sortBy = sort(numComp)
    const result = sortBy(arr)
    expect(arr).toEqual([20, 1, 3, 4, 2])
  })
})

/*/////////////// end maybe //////////*/

describe('api: compose', () => {
  const is = a => b => {
    expect(a).toEqual(b)
    return a
  }
  it('should compose multiple functions and run them from right to left', () => {
    compose(
      map(x => x + 1),
      is([3]),
      map(x => x + 1),
      is([2]),
      map(x => x + 1),
      is([1]),
      map(x => x + 1)
    )([0])
  })
  it('compose ( reduce <- map <- filter <- concat <- cons )', () => {
    compose(
      is(42),
      reduce((acc, val) => val + acc),
      is([12, 14, 16]),
      map(x => x * 2),
      is([6, 7, 8]),
      filter(x => x > 5),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5]),
      unshift(0),
      is([1, 2, 3, 4, 5])
    )([1, 2, 3, 4, 5])
  })
  it('should not alter the original array', () => {
    var arr = [0]
    compose(
      map(x => x + 1),
      map(x => x + 1),
      map(x => x + 1),
      map(x => x + 1)
    )(arr)
    expect(arr).toEqual([0])
  })
})

describe('api: pipe', () => {
  const is = a => b => {
    expect(a).toEqual(b)
    return a
  }
  it('should pipe multiple functions and run them from left to right', () => {
    pipe(
      map(x => x + 1),
      is([1]),
      map(x => x + 1),
      is([2]),
      map(x => x + 1),
      is([3]),
      map(x => x + 1)
    )([0])
  })
  it('pipe ( cons -> concat -> filter -> map -> reduce )', () => {
    pipe(
      is([1, 2, 3, 4, 5]),
      unshift(0),
      is([0, 1, 2, 3, 4, 5]),
      concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      filter(x => x > 5),
      is([6, 7, 8]),
      map(x => x * 2),
      is([12, 14, 16]),
      reduce((acc, val) => val + acc),
      is(42)
    )([1, 2, 3, 4, 5])
  })
  it('should not alter the original array', () => {
    var arr = [0]
    pipe(
      map(x => x + 1),
      map(x => x + 1),
      map(x => x + 1),
      map(x => x + 1)
    )(arr)
    expect(arr).toEqual([0])
  })
})
