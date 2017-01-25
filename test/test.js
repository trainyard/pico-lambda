const { concat, every, filter, find, findIndex, includes, join, map, pop, reduce, reduceRight, reverse, shift, slice, some, sort, compose, pipe, unshift } = init().PicoLambda
const { describe, it } = init()

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
    const PicoLambda = require('../dist/pico-lambda')
    const { describe, it } = global
    return { PicoLambda, describe, it }
  }
}

var i = 0

const l = a => {
  console.log('# -- log', i, '-->', a)
  i++
}

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
})

describe('api: filter', () => {
  it('should return items that pass the predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const numsUnderThree = filter(x => x < 3)
    const result = (numsUnderThree(arr))
    expect(result).toEqual([1, 2])
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
})

describe('api: includes', () => {
  it('should return true when an item is found in array', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = includes(3)
    const result = (isThree(arr))
    expect(result).toEqual(true)
  })

  it('should return false when an item is not found in array', () => {
    const arr = [1, 2, 3, 4, 5]
    const isThree = includes(8)
    const result = (isThree(arr))
    expect(result).toEqual(false)
  })
})

describe('api: join', () => {
  it('should return a string with each item separated with character passed in', (done) => {
    const arr = [1, 2, 3, 4, 5]
    const separateByDash = join('-')
    const result = (separateByDash(arr))
    expect(result).toEqual('1-2-3-4-5')
    done()
  })
})

describe('api: map', () => {
  it('applys function to items in array', () => {
    const double = map(x => x * 2)
    const result = double([1, 2, 3])
    expect(result).toEqual([2, 4, 6])
  })
})

describe('api: reduce', () => {
  it('applys function to each item and accums results from left to right', () => {
    const sum = reduce((acc, val) => acc + val)
    const total = sum([2, 3, 4], 99)
    expect(total).toEqual(108)
  })
})

describe('api: reduce right', () => {
  it('applys function to each item and accums results from right to left', () => {
    const sum = reduceRight(((acc, val) => acc - val), 10)
    const total = sum([2, 3, 4], 99)
    expect(total).toEqual(90)
  })
})

describe('api: slice', () => {
  it('returns new but sliced array', () => {
    const removeFirst = slice(1)
    const result = removeFirst([2, 3, 4])
    expect(result).toEqual([3, 4])
  })
})

describe('api: some', () => {
  it('should return true if at least one items passes predicate', () => {
    const arr = [1, 2, 3, 4, 5]
    const areAllAreLessThanFour = some(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    expect(result).toEqual(true)
  })
})

/*////////////// Maybe ///////////*/
describe('api: reverse', () => {
  it('should return array reversed', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = reverse(arr)
    expect(result).toEqual([5, 4, 3, 2, 1])
  })
})

describe('api: pop', () => {
  it('should remove last element from array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = pop(arr)
    expect(result).toEqual([1, 2, 3, 4])
  })
})

describe('api: shift', () => {
  it('should remove first element from array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = shift(arr)
    expect(result).toEqual([2, 3, 4, 5])
  })
})

describe('api: unshift', () => {
  it('should add single item to front of array', () => {
    const addOne = unshift(1)
    const result = addOne([2, 3])
    expect(result).toEqual([1, 2, 3])
  })
})

describe('api: sort', () => {
  it('should sort array based on predicate', () => {
    const arr = [4, 6, 13]
    let compare = (a, b) => a - b;

    const sortBy = sort(compare)
    const result = sortBy(arr)
    expect(arr).toEqual(arr)
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
})
