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

  if (typeof window !== 'undefined') {
    const { PicoLambda, describe, expect, it } = window;
    return { PicoLambda, describe, expect, it };
  } else {
    const PicoLambda = require('../src/index.js');
    const { describe, expect, it } = global;
    return { PicoLambda, describe, expect, it };
  }
}

describe('api: concat', () => {
  if (!PL.concat) return;
  it('should add array of items to end of array', () => {
    const arrayOne = [1, 2, 3];
    const addTwo = PL.concat([4, 5]);
    const result = (addTwo(arrayOne));
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should add single item to end of array', () => {
    const arrayOne = [3, 2];
    const addOne = PL.concat(1);
    const result = (addOne(arrayOne));
    expect(result).toEqual([3, 2, 1]);
  });

  it('should not alter the original array', () => {
    const arrayOne = [3, 2];
    const addOne = PL.concat(1);
    (addOne(arrayOne));
    expect(arrayOne).toEqual([3, 2]);
  });
});

describe('api: copyWithin', () => {
  if (!PL.copyWithin) return;
  it('should overwrite from target to end of array with selected elements', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = PL.copyWithin(3, 1)(arr);
    expect(result).toEqual([1, 2, 3, 2, 3]);
  });
  it('should overwrite from target to indicated end with selected elements', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = PL.copyWithin(3, 1, 2)(arr);
    expect(result).toEqual([1, 2, 3, 2, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5];
    PL.copyWithin(3, 1, 2)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: entries', () => {
  if (!PL.entries) return;
  it('should return an interator that contains key values pair of given array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = PL.entries(arr);
    expect(iterator.next()).toEqual({ value: [0, 1], done: false });
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = PL.entries(arr);
    iterator.next();
    iterator.next();
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: every', () => {
  if (!PL.every) return;
  it('should return false if any items do not pass predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = PL.every(x => x < 4);
    const result = (areAllAreLessThanFour(arr));
    expect(result).toEqual(false);
  });

  it('should return true if all items pass predicate', () => {
    const arr = [1, 2, 3];
    const areAllAreLessThanFour = PL.every(x => x < 4);
    const result = (areAllAreLessThanFour(arr));
    expect(result).toEqual(true);
  });

  it('should not alter the original array', () => {
    const arr = [1, 2, 3];
    const areAllAreLessThanFour = PL.every(x => x < 4);
    (areAllAreLessThanFour(arr));
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('api: fill', () => {
  if (!PL.fill) return;
  it('should overwrite each element of an array with supplied param', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = PL.fill(1)(arr);
    expect(result).toEqual([1, 1, 1, 1, 1]);
  });
  it('should overwrite selected elements of an array with supplied params', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = PL.fill(1, 2, 4)(arr);
    expect(result).toEqual([1, 2, 1, 1, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5];
    PL.fill(1)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: filter', () => {
  if (!PL.filter) return;
  it('should return items that pass the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const numsUnderThree = PL.filter(x => x < 3);
    const result = (numsUnderThree(arr));
    expect(result).toEqual([1, 2]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const numsUnderThree = PL.filter(x => x < 3);
    (numsUnderThree(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: find', () => {
  if (!PL.find) return;
  it('should return first item that passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = PL.find(x => x === 3);
    const result = (isThree(arr));
    expect(result).toEqual(3);
  });
  it('should return undefined when no item passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = PL.find(x => x === 8);
    const result = (isThree(arr));
    expect(result).toEqual(undefined);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = PL.find(x => x === 3);
    (isThree(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: findIndex', () => {
  if (!PL.findIndex) return;
  it('should return index of first item that passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const gtThree = PL.findIndex(x => x > 3);
    const result = gtThree(arr);
    expect(result).toEqual(3);
  });

  it('should return -1 when no item passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const gtThree = PL.findIndex(x => x > 80);
    const result = gtThree(arr);
    expect(result).toEqual(-1);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const gtThree = PL.findIndex(x => x > 80);
    gtThree(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: includes', () => {
  if (!PL.includes) return;
  it('should return true when an item is found in array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = PL.includes(3);
    const result = isThree(arr);
    expect(result).toEqual(true);
  });

  it('should return false when an item is not found in array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = PL.includes(8);
    const result = isThree(arr);
    expect(result).toEqual(false);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = PL.includes(8);
    isThree(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: indexOf', () => {
  if (!PL.indexOf) return;
  it('should return the indexOf item', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.indexOf(3)(arr);
    expect(result).toEqual(2);
  });
  it('should return the indexOf item found after second arg', () => {
    const arr = [1, 2, 3, 4, 5, 3];
    const result = PL.indexOf(3, 3)(arr);
    expect(result).toEqual(5);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.indexOf(3)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: join', () => {
  if (!PL.join) return;
  it('should return a string with each item separated with character passed in', () => {
    var arr = [1, 2, 3, 4, 5];
    const separateByDash = PL.join('-');
    const result = separateByDash(arr);
    expect(result).toEqual('1-2-3-4-5');
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5];
    const separateByDash = PL.join('-');
    separateByDash(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: keys', () => {
  if (!PL.keys) return;
  it('should return an iterator of keys of given array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = PL.keys(arr);
    expect(iterator.next()).toEqual({ value: 0, done: false });
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = PL.keys(arr);
    iterator.next();
    iterator.next();
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: lastIndexOf', () => {
  if (!PL.lastIndexOf) return;
  it('should find the index of the last occurrence of an element', () => {
    var arr = [1, 2, 3, 1];
    const result = PL.lastIndexOf(1)(arr);
    expect(result).toEqual(3);
  });
  it('should find the index of the last occurrence of an element, starting at a given index.', () => {
    var arr = [1, 2, 3, 1];
    const result = PL.lastIndexOf(1, -2)(arr);
    expect(result).toEqual(0);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 1];
    PL.lastIndexOf(1)(arr);
    expect(arr).toEqual([1, 2, 3, 1]);
  });
});

describe('api: map', () => {
  if (!PL.map) return;
  it('applies function to items in array', () => {
    const double = PL.map(x => x * 2);
    const result = double([1, 2, 3]);
    expect(result).toEqual([2, 4, 6]);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3];
    const double = PL.map(x => x * 2);
    double(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('api: reduce', () => {
  if (!PL.reduce) return;
  it('applies function to each item and accums results from left to right', () => {
    const sum = PL.reduce((acc, val) => acc + val, 99);
    const total = sum([2, 3, 4]);
    expect(total).toEqual(108);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3, 4];
    const sum = PL.reduce((acc, val) => acc + val, 99);
    sum(arr);
    expect(arr).toEqual([2, 3, 4]);
  });
});

describe('api: reduce right', () => {
  if (!PL.reduceRight) return;
  it('applies function to each item and accums results from right to left', () => {
    const sum = PL.reduceRight((acc, val) => acc - val, 99);
    const total = sum([2, 3, 4]);
    expect(total).toEqual(90);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3, 4];
    const sum = PL.reduceRight((acc, val) => acc - val, 99);
    sum(arr);
    expect(arr).toEqual([2, 3, 4]);
  });
});

describe('api: slice', () => {
  if (!PL.slice) return;
  it('returns new but sliced array', () => {
    const removeFirst = PL.slice(1);
    const result = removeFirst([2, 3, 4]);
    expect(result).toEqual([3, 4]);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3, 4];
    const removeFirst = PL.slice(1);
    removeFirst(arr);
    expect(arr).toEqual([2, 3, 4]);
  });
});

describe('api: some', () => {
  if (!PL.some) return;
  it('should return true if at least one items passes predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = PL.some(x => x < 4);
    const result = areAllAreLessThanFour(arr);
    expect(result).toEqual(true);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = PL.some(x => x < 4);
    (areAllAreLessThanFour(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: reverse', () => {
  if (!PL.reverse) return;
  it('should return array reversed', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.reverse(arr);
    expect(result).toEqual([5, 4, 3, 2, 1]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.reverse(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: toString', () => {
  if (!PL.toString) return;
  it('should return string representation of array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.toString(arr);
    expect(result).toEqual('1,2,3,4,5');
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.toString(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: toLocaleString', () => {
  if (!PL.toLocaleString) return;
  it('should match standard array toLocaleString output', () => {
    var testDate = new Date();
    const arr = ['not changing', 1234567890.12, testDate];
    const result = PL.toLocaleString()(arr);
    expect(result).toEqual(arr.toLocaleString());
  });
  it('should match standard array toLocaleString output', () => {
    var prices = ['￥7', 500, 8123, 12];
    const result = PL.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })(prices);
    expect(result).toEqual(prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }));
  });
  it('should not alter the original array', () => {
    var testDate = new Date();
    const arr = ['not changing', 1234567890.12, testDate];
    PL.toLocaleString()(arr);
    expect(arr).toEqual(['not changing', 1234567890.12, testDate]);
  });
});

describe('api: splice', () => {
  if (!PL.splice) return;
  it('Should remove requested elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.splice(2)(arr);
    expect(result).toEqual([1, 2]);
  });
  it('Should only remove as many elements as requested', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.splice(1, 2)(arr);
    expect(result).toEqual([1, 4, 5]);
  });
  it('Should replace removed elements with new values', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.splice(1, 3, 20, 21)(arr);
    expect(result).toEqual([1, 20, 21, 5]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.splice(2)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: push', () => {
  if (!PL.push) return;
  it('should add element to end of array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.push(6)(arr);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.push(6)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: pop', () => {
  if (!PL.pop) return;
  it('should remove last element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.pop(arr);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.pop(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: shift', () => {
  if (!PL.shift) return;
  it('should remove first element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = PL.shift(arr);
    expect(result).toEqual([2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    PL.shift(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: unshift', () => {
  if (!PL.unshift) return;
  it('should add single item to front of array', () => {
    const addOne = PL.unshift(1);
    const result = addOne([2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3];
    const addOne = PL.unshift(1);
    addOne(arr);
    expect(arr).toEqual([2, 3]);
  });
});

describe('api: sort', () => {
  if (!PL.sort) return;
  it('should sort array based on comparator', () => {
    var arr = [20, 1, 3, 4, 2];
    const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1;
    const sortBy = PL.sort(numComp);
    const result = sortBy(arr);
    expect(result).toEqual([1, 2, 3, 4, 20]);
  });
  it('should not alter the original array', () => {
    var arr = [20, 1, 3, 4, 2];
    const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1;
    const sortBy = PL.sort(numComp);
    sortBy(arr);
    expect(arr).toEqual([20, 1, 3, 4, 2]);
  });
});

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
