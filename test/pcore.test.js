const { describe, it, expect, PicoLambda: PL } = init();

function init () {
  if (typeof window === 'undefined') {
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    global.jasmine.getEnv().clearReporters();               // remove default reporter logs
    global.jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
      spec: {
        displayPending: true
      }
    }));
  }

  const tempLambda = require('../src/index.js')

  const PicoLambda = Object.assign({}, tempLambda.pcore, tempLambda.parray);
  const { describe, expect, it } = global;
  return { PicoLambda, describe, expect, it };
}

describe('api: compose', () => {
  const is = a => b => {
    expect(a).toEqual(b);
    return a;
  };
  it('should compose multiple functions and run them from right to left', () => {
    PL.compose(
      PL.map(x => x + 1),
      is([3]),
      PL.map(x => x + 1),
      is([2]),
      PL.map(x => x + 1),
      is([1]),
      PL.map(x => x + 1)
    )([0]);
  });
  it('compose ( reduce <- map <- filter <- concat <- cons )', () => {
    PL.compose(
      is(42),
      PL.reduce((acc, val) => val + acc),
      is([12, 14, 16]),
      PL.map(x => x * 2),
      is([6, 7, 8]),
      PL.filter(x => x > 5),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      PL.concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5]),
      PL.unshift(0),
      is([1, 2, 3, 4, 5])
    )([1, 2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [0];
    PL.compose(
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1)
    )(arr);
    expect(arr).toEqual([0]);
  });
});

describe('api: pipe', () => {
  const is = a => b => {
    expect(a).toEqual(b);
    return a;
  };
  it('should pipe multiple functions and run them from left to right', () => {
    PL.pipe(
      PL.map(x => x + 1),
      is([1]),
      PL.map(x => x + 1),
      is([2]),
      PL.map(x => x + 1),
      is([3]),
      PL.map(x => x + 1)
    )([0]);
  });
  it('pipe ( cons -> concat -> filter -> map -> reduce )', () => {
    PL.pipe(
      is([1, 2, 3, 4, 5]),
      PL.unshift(0),
      is([0, 1, 2, 3, 4, 5]),
      PL.concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      PL.filter(x => x > 5),
      is([6, 7, 8]),
      PL.map(x => x * 2),
      is([12, 14, 16]),
      PL.reduce((acc, val) => val + acc),
      is(42)
    )([1, 2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [0];
    PL.pipe(
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1),
      PL.map(x => x + 1)
    )(arr);
    expect(arr).toEqual([0]);
  });
});

describe('api: curry', () => {
  function manyParams(a, b, c, d) {
    return restParam(a, b, c, d)
  }
  function restParam(a, b, c, ...d) {
    return [...arguments].join(', ')
  }
  function noParams() {
    return 'Not one'
  }

  it('should allow normal function call syntax', () => {
    const curried = PL.curry(manyParams)
    expect(curried(1, 2, 3, 4)).toEqual('1, 2, 3, 4')
  })

  it('should allow separated paramter call syntax', () => {
    const curried = PL.curry(manyParams)
    expect(curried(1)(2)(3)(4)).toEqual('1, 2, 3, 4')
  })

  it('should allow separated paramter groups call syntax', () => {
    const curried = PL.curry(manyParams)
    expect(curried(1)(2, 3)(4)).toEqual('1, 2, 3, 4')
  })

  it('should allow extra parameters in the last group', () => {
    const curried = PL.curry(restParam)
    expect(curried(1)(2)(3, 4, 5)).toEqual('1, 2, 3, 4, 5')
  })

  it('should throw an error if rest params are separate from last group.', () => {
    const curried = PL.curry(restParam)
    expect(() => curried(1)(2)(3)(4, 5)).toThrow(new TypeError('curried(...)(...)(...) is not a function'))
  })

  it('should handle functions that take no parameters', () => {
    const curried = PL.curry(noParams)
    expect(curried).toEqual('Not one')
  })
})

describe('api: identity', () => {
  it('should return same value as passed in', () => {
    expect(PL.identity(1)).toEqual(1)
    expect(PL.identity("one")).toEqual("one")
    expect(PL.identity([1])).toEqual([1])

    const testObj = {a:1}
    expect(PL.identity(testObj)).toEqual(testObj)
  })

  it('should not change the object', () => {
    const testObj = {a:1}
    //Make sure we don't have the same object so that the next comparison is meaningful
    expect(PL.identity(Object.assign({}, testObj)) === testObj).toEqual(false)

    //Given that we have a new object, make sure it still looks the same as the prototype
    expect(PL.identity(Object.assign({}, testObj))).toEqual(testObj)
  })
})