const tape = require('tape')
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
  uniq,
  compose,
  pipe
} = require('./index.js');

var i = 0;

const l = a => {
  console.log('# -- log', i, '-->', a);
  i++;
}

tape('api: concat', (t) => {
  t.test('should add array of items to end of array', (t) => {
    t.plan(1)
    const arrayOne = [1, 2, 3];
    const addTwo = concat([4, 5])
    const result = (addTwo(arrayOne))
    t.deepEqual(result, [1, 2, 3, 4, 5])
  })

  t.test('should add single item to end of array', (t) => {
    t.plan(1)
    const arrayOne = [3, 2];
    const addOne = concat(1)
    const result = (addOne(arrayOne))
    t.deepEqual(result, [3, 2, 1])
  })
})

tape('api: every', (t) => {
  t.test('should return false if any items do not pass predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    t.equal(result, false)
  })

  t.test('should return true if all items pass predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3];
    const areAllAreLessThanFour = every(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    t.equal(result, true)
  })
})

tape('api: filter', (t) => {
  t.test('should return items that pass the predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const numsUnderThree = filter(x => x < 3)
    const result = (numsUnderThree(arr))
    t.deepEqual(result, [1, 2])
  })
})

tape('api: find', (t) => {
  t.test('should return first item that passes the predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const isThree = find(x => x === 3)
    const result = (isThree(arr))
    t.deepEqual(result, 3)
  })

  t.test('should return undefined when no item passes the predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const isThree = find(x => x === 8)
    const result = (isThree(arr))
    t.deepEqual(result, undefined)
  })
})

tape('api: includes', (t) => {
  t.test('should return true when an item is found in array', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const isThree = includes(3)
    const result = (isThree(arr))
    t.deepEqual(result, true)
  })

  t.test('should return false when an item is not found in array', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const isThree = includes(8)
    const result = (isThree(arr))
    t.deepEqual(result, false)
  })
})

tape('api: map', (t) => {
  t.test('applys function to items in array', (t) => {
    t.plan(1)
    const addTwo = map(x => x * 2)
    const doubled = addTwo([1, 2, 3])
    t.deepEqual(doubled, [2, 4, 6])
  })
})

tape('api: reduce', (t) => {
  t.test('applys function to each item and accums results from left to right', (t) => {
    t.plan(1)
    const sum = reduce((acc, val) => acc + val);
    const total = sum([2, 3, 4], 99)
    t.deepEqual(total, 108)
  })
})

tape('api: reduce right', (t) => {
  t.test('applys function to each item and accums results from right to left', (t) => {
    t.plan(1)
    const sum = reduceRight(((acc, val) => acc - val), 10);
    const total = sum([2, 3, 4], 99)
    l(total)
    t.deepEqual(total, 90)
  })
})

tape('api: slice', (t) => {
  t.test('returns new but sliced array', (t) => {
    t.plan(1)
    const removeFirst = slice(1);
    const rest = removeFirst([2, 3, 4])
    t.deepEqual(rest, [3, 4])
  })
})

tape('api: some', (t) => {
  t.test('should return true if at least one items passes predicate', (t) => {
    t.plan(1)
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = some(x => x < 4)
    const result = (areAllAreLessThanFour(arr))
    t.equal(result, true)
  })
})

tape('api: compose', (t) => {
  const is = a => b => {
    t.deepEqual(a, b, `${a} must equal ${b}`)
    return a;
  }

  t.test('should compose multiple functions and run them from right to left', (t) => {
    compose(
      map(x => x + 1),
      is([3]),
      map(x => x + 1),
      is([2]),
      map(x => x + 1),
      is([1]),
      map(x => x + 1)
    )([0])
    t.end();
  });
  t.test('compose ( reduce <- map <- filter <- concat <- cons )', (t) => {
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
      cons(0),
      is([1, 2, 3, 4, 5])
    )([1, 2, 3, 4, 5])

    t.end()
  })
})

tape('api: pipe', (t) => {
  const is = a => b => {
    t.deepEqual(a, b, `${a} must equal ${b}`)
    return a;
  }

  t.test('should pipe multiple functions and run them from left to right', (t) => {
    pipe(
      map(x => x + 1),
      is([1]),
      map(x => x + 1),
      is([2]),
      map(x => x + 1),
      is([3]),
      map(x => x + 1)
    )([0])
    t.end();
  });
  t.test('pipe ( cons -> concat -> filter -> map -> reduce )', (t) => {
    pipe(
      is([1, 2, 3, 4, 5]),
      cons(0),
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

    t.end()
  })
})
