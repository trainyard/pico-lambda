const { pl } = init();


function init () {
  if (typeof window === 'undefined') {
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    global.jasmine.getEnv().clearReporters();               // remove default reporter logs
    global.jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
      spec: {
        displayPending: true
      }
    }));
    return {
      pl: require('../src/index.js'),
    }
  }
  return {
    pl: window.PicoLambda,
  }
}

describe('api: compose', () => {
  const is = a => b => {
    expect(a).toEqual(b);
    return a;
  };
  it('should compose multiple functions and run them from right to left', () => {
    pl.pcore.compose(
      pl.parray.map(x => x + 1),
      is([3]),
      pl.parray.map(x => x + 1),
      is([2]),
      pl.parray.map(x => x + 1),
      is([1]),
      pl.parray.map(x => x + 1)
    )([0]);
  });
  it('compose ( reduce <- map <- filter <- concat <- cons )', () => {
    pl.pcore.compose(
      is(42),
      pl.parray.reduce((acc, val) => val + acc),
      is([12, 14, 16]),
      pl.parray.map(x => x * 2),
      is([6, 7, 8]),
      pl.parray.filter(x => x > 5),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      pl.parray.concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5]),
      pl.parray.unshift(0),
      is([1, 2, 3, 4, 5])
    )([1, 2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [0];
    pl.pcore.compose(
      pl.parray.map(x => x + 1),
      pl.parray.map(x => x + 1),
      pl.parray.map(x => x + 1),
      pl.parray.map(x => x + 1)
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
    pl.pcore.pipe(
      pl.parray.map(x => x + 1),
      is([1]),
      pl.parray.map(x => x + 1),
      is([2]),
      pl.parray.map(x => x + 1),
      is([3]),
      pl.parray.map(x => x + 1)
    )([0]);
  });
  it('pipe ( cons -> concat -> filter -> map -> reduce )', () => {
    pl.pcore.pipe(
      is([1, 2, 3, 4, 5]),
      pl.parray.unshift(0),
      is([0, 1, 2, 3, 4, 5]),
      pl.parray.concat([6, 7, 8]),
      is([0, 1, 2, 3, 4, 5, 6, 7, 8]),
      pl.parray.filter(x => x > 5),
      is([6, 7, 8]),
      pl.parray.map(x => x * 2),
      is([12, 14, 16]),
      pl.parray.reduce((acc, val) => val + acc),
      is(42)
    )([1, 2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [0];
    pl.pcore.pipe(
      pl.parray.map(x => x + 1),
      pl.parray.map(x => x + 1),
      pl.parray.map(x => x + 1),
      pl.parray.map(x => x + 1)
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
    const curried = pl.pcore.curry(manyParams)
    expect(curried(1, 2, 3, 4)).toEqual('1, 2, 3, 4')
  })

  it('should allow separated paramter call syntax', () => {
    const curried = pl.pcore.curry(manyParams)
    expect(curried(1)(2)(3)(4)).toEqual('1, 2, 3, 4')
  })

  it('should allow separated paramter groups call syntax', () => {
    const curried = pl.pcore.curry(manyParams)
    expect(curried(1)(2, 3)(4)).toEqual('1, 2, 3, 4')
  })

  it('should allow extra parameters in the last group', () => {
    const curried = pl.pcore.curry(restParam)
    expect(curried(1)(2)(3, 4, 5)).toEqual('1, 2, 3, 4, 5')
  })

  it('should throw an error if rest params are separate from last group.', () => {
    const curried = pl.pcore.curry(restParam)
    expect(() => curried(1)(2)(3)(4, 5)).toThrow(new TypeError('curried(...)(...)(...) is not a function'))
  })

  it('should handle functions that take no parameters', () => {
    const curried = pl.pcore.curry(noParams)
    expect(curried).toEqual('Not one')
  })
})

describe('api: identity', () => {
  it('should return same value as passed in', () => {
    expect(pl.pcore.identity(1)).toEqual(1)
    expect(pl.pcore.identity("one")).toEqual("one")
    expect(pl.pcore.identity([1])).toEqual([1])

    const testObj = {a:1}
    expect(pl.pcore.identity(testObj)).toEqual(testObj)
  })

  it('should not change the object', () => {
    const testObj = {a:1}
    //Make sure we don't have the same object so that the next comparison is meaningful
    expect(pl.pcore.identity(Object.assign({}, testObj)) === testObj).toEqual(false)

    //Given that we have a new object, make sure it still looks the same as the prototype
    expect(pl.pcore.identity(Object.assign({}, testObj))).toEqual(testObj)
  })
})
