const { parray } = init();

function init () {
  if (typeof window !== 'undefined') {
    return {
      parray: window.PicoLambda.parray,
    }
  }
  if (typeof window === 'undefined') {
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    global.jasmine.getEnv().clearReporters();               // remove default reporter logs
    global.jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
      spec: {
        displayPending: true
      }
    }));
    return {
      parray: require('../src/index.js').parray,
    }
  }
  return {
    parray: window.PicoLambda.parray,
  }
}

describe('api: concat', () => {
  if (!parray.concat) return;
  it('should add array of items to end of array', () => {
    const arrayOne = [1, 2, 3];
    const addTwo = parray.concat([4, 5]);
    const result = (addTwo(arrayOne));
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should add single item to end of array', () => {
    const arrayOne = [3, 2];
    const addOne = parray.concat(1);
    const result = (addOne(arrayOne));
    expect(result).toEqual([3, 2, 1]);
  });

  it('should not alter the original array', () => {
    const arrayOne = [3, 2];
    const addOne = parray.concat(1);
    addOne(arrayOne);
    expect(arrayOne).toEqual([3, 2]);
  });
});

describe('api: copyWithin', () => {
  if (!parray.copyWithin) return;
  it('should overwrite from target to end of array with selected elements', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = parray.copyWithin(3, 1)(arr);
    expect(result).toEqual([1, 2, 3, 2, 3]);
  });
  it('should overwrite from target to indicated end with selected elements', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = parray.copyWithin(3, 1, 2)(arr);
    expect(result).toEqual([1, 2, 3, 2, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5];
    parray.copyWithin(3, 1, 2)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: entries', () => {
  if (!parray.entries) return;
  it('should return an interator that contains key values pair of given array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = parray.entries(arr);
    expect(iterator.next()).toEqual({ value: [0, 1], done: false });
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = parray.entries(arr);
    iterator.next();
    iterator.next();
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: every', () => {
  if (!parray.every) return;
  it('should return false if any items do not pass predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = parray.every(x => x < 4);
    const result = (areAllAreLessThanFour(arr));
    expect(result).toEqual(false);
  });

  it('should return true if all items pass predicate', () => {
    const arr = [1, 2, 3];
    const areAllAreLessThanFour = parray.every(x => x < 4);
    const result = (areAllAreLessThanFour(arr));
    expect(result).toEqual(true);
  });

  it('should not alter the original array', () => {
    const arr = [1, 2, 3];
    const areAllAreLessThanFour = parray.every(x => x < 4);
    (areAllAreLessThanFour(arr));
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('api: fill', () => {
  if (!parray.fill) return;
  it('should overwrite each element of an array with supplied param', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = parray.fill(1)(arr);
    expect(result).toEqual([1, 1, 1, 1, 1]);
  });
  it('should overwrite selected elements of an array with supplied params', () => {
    var arr = [1, 2, 3, 4, 5];
    const result = parray.fill(1, 2, 4)(arr);
    expect(result).toEqual([1, 2, 1, 1, 5]);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5];
    parray.fill(1)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: filter', () => {
  if (!parray.filter) return;
  it('should return items that pass the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const numsUnderThree = parray.filter(x => x < 3);
    const result = (numsUnderThree(arr));
    expect(result).toEqual([1, 2]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const numsUnderThree = parray.filter(x => x < 3);
    (numsUnderThree(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: find', () => {
  if (!parray.find) return;
  it('should return first item that passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = parray.find(x => x === 3);
    const result = (isThree(arr));
    expect(result).toEqual(3);
  });
  it('should return undefined when no item passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = parray.find(x => x === 8);
    const result = (isThree(arr));
    expect(result).toEqual(undefined);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = parray.find(x => x === 3);
    (isThree(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: findIndex', () => {
  if (!parray.findIndex) return;
  it('should return index of first item that passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const gtThree = parray.findIndex(x => x > 3);
    const result = gtThree(arr);
    expect(result).toEqual(3);
  });

  it('should return -1 when no item passes the predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const gtThree = parray.findIndex(x => x > 80);
    const result = gtThree(arr);
    expect(result).toEqual(-1);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const gtThree = parray.findIndex(x => x > 80);
    gtThree(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: includes', () => {
  if (!parray.includes) return;
  it('should return true when an item is found in array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = parray.includes(3);
    const result = isThree(arr);
    expect(result).toEqual(true);
  });

  it('should return false when an item is not found in array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = parray.includes(8);
    const result = isThree(arr);
    expect(result).toEqual(false);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const isThree = parray.includes(8);
    isThree(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: indexOf', () => {
  if (!parray.indexOf) return;
  it('should return the indexOf item', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.indexOf(3)(arr);
    expect(result).toEqual(2);
  });
  it('should return the indexOf item found after second arg', () => {
    const arr = [1, 2, 3, 4, 5, 3];
    const result = parray.indexOf(3, 3)(arr);
    expect(result).toEqual(5);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.indexOf(3)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: join', () => {
  if (!parray.join) return;
  it('should return a string with each item separated with character passed in', () => {
    var arr = [1, 2, 3, 4, 5];
    const separateByDash = parray.join('-');
    const result = separateByDash(arr);
    expect(result).toEqual('1-2-3-4-5');
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 4, 5];
    const separateByDash = parray.join('-');
    separateByDash(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: keys', () => {
  if (!parray.keys) return;
  it('should return an iterator of keys of given array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = parray.keys(arr);
    expect(iterator.next()).toEqual({ value: 0, done: false });
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const iterator = parray.keys(arr);
    iterator.next();
    iterator.next();
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: lastIndexOf', () => {
  if (!parray.lastIndexOf) return;
  it('should find the index of the last occurrence of an element', () => {
    var arr = [1, 2, 3, 1];
    const result = parray.lastIndexOf(1)(arr);
    expect(result).toEqual(3);
  });
  it('should find the index of the last occurrence of an element, starting at a given index.', () => {
    var arr = [1, 2, 3, 1];
    const result = parray.lastIndexOf(1, -2)(arr);
    expect(result).toEqual(0);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3, 1];
    parray.lastIndexOf(1)(arr);
    expect(arr).toEqual([1, 2, 3, 1]);
  });
});

describe('api: map', () => {
  if (!parray.map) return;
  it('applies function to items in array', () => {
    const double = parray.map(x => x * 2);
    const result = double([1, 2, 3]);
    expect(result).toEqual([2, 4, 6]);
  });
  it('should not alter the original array', () => {
    var arr = [1, 2, 3];
    const double = parray.map(x => x * 2);
    double(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('api: reduce', () => {
  if (!parray.reduce) return;
  it('applies function to each item and accums results from left to right', () => {
    const sum = parray.reduce((acc, val) => acc + val, 99);
    const total = sum([2, 3, 4]);
    expect(total).toEqual(108);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3, 4];
    const sum = parray.reduce((acc, val) => acc + val, 99);
    sum(arr);
    expect(arr).toEqual([2, 3, 4]);
  });
});

describe('api: reduce right', () => {
  if (!parray.reduceRight) return;
  it('applies function to each item and accums results from right to left', () => {
    const sum = parray.reduceRight((acc, val) => acc - val, 99);
    const total = sum([2, 3, 4]);
    expect(total).toEqual(90);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3, 4];
    const sum = parray.reduceRight((acc, val) => acc - val, 99);
    sum(arr);
    expect(arr).toEqual([2, 3, 4]);
  });
});

describe('api: slice', () => {
  if (!parray.slice) return;
  it('returns new but sliced array', () => {
    const removeFirst = parray.slice(1);
    const result = removeFirst([2, 3, 4]);
    expect(result).toEqual([3, 4]);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3, 4];
    const removeFirst = parray.slice(1);
    removeFirst(arr);
    expect(arr).toEqual([2, 3, 4]);
  });
});

describe('api: some', () => {
  if (!parray.some) return;
  it('should return true if at least one items passes predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = parray.some(x => x < 4);
    const result = areAllAreLessThanFour(arr);
    expect(result).toEqual(true);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const areAllAreLessThanFour = parray.some(x => x < 4);
    (areAllAreLessThanFour(arr));
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: reverse', () => {
  if (!parray.reverse) return;
  it('should return array reversed', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.reverse(arr);
    expect(result).toEqual([5, 4, 3, 2, 1]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.reverse(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: toString', () => {
  if (!parray.toString) return;
  it('should return string representation of array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.toString(arr);
    expect(result).toEqual('1,2,3,4,5');
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.toString(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: toLocaleString', () => {
  if (!parray.toLocaleString) return;
  it('should match standard array toLocaleString output', () => {
    var testDate = new Date();
    const arr = ['not changing', 1234567890.12, testDate];
    const result = parray.toLocaleString()(arr);
    expect(result).toEqual(arr.toLocaleString());
  });
  it('should match standard array toLocaleString output', () => {
    var prices = ['￥7', 500, 8123, 12];
    const result = parray.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })(prices);
    expect(result).toEqual(prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }));
  });
  it('should not alter the original array', () => {
    var testDate = new Date();
    const arr = ['not changing', 1234567890.12, testDate];
    parray.toLocaleString()(arr);
    expect(arr).toEqual(['not changing', 1234567890.12, testDate]);
  });
});

describe('api: splice', () => {
  if (!parray.splice) return;
  it('Should remove requested elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.splice(2)(arr);
    expect(result).toEqual([1, 2]);
  });
  it('Should only remove as many elements as requested', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.splice(1, 2)(arr);
    expect(result).toEqual([1, 4, 5]);
  });
  it('Should replace removed elements with new values', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.splice(1, 3, 20, 21)(arr);
    expect(result).toEqual([1, 20, 21, 5]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.splice(2)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: push', () => {
  if (!parray.push) return;
  it('should add element to end of array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.push(6)(arr);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.push(6)(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: pop', () => {
  if (!parray.pop) return;
  it('should remove last element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.pop(arr);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.pop(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: shift', () => {
  if (!parray.shift) return;
  it('should remove first element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = parray.shift(arr);
    expect(result).toEqual([2, 3, 4, 5]);
  });
  it('should not alter the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    parray.shift(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('api: unshift', () => {
  if (!parray.unshift) return;
  it('should add single item to front of array', () => {
    const addOne = parray.unshift(1);
    const result = addOne([2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
  it('should not alter the original array', () => {
    var arr = [2, 3];
    const addOne = parray.unshift(1);
    addOne(arr);
    expect(arr).toEqual([2, 3]);
  });
});

describe('api: sort', () => {
  if (!parray.sort) return;
  it('should sort array based on comparator', () => {
    var arr = [20, 1, 3, 4, 2];
    const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1;
    const sortBy = parray.sort(numComp);
    const result = sortBy(arr);
    expect(result).toEqual([1, 2, 3, 4, 20]);
  });
  it('should not alter the original array', () => {
    var arr = [20, 1, 3, 4, 2];
    const numComp = (a, b) => (a < b) ? -1 : (a === b) ? 0 : 1;
    const sortBy = parray.sort(numComp);
    sortBy(arr);
    expect(arr).toEqual([20, 1, 3, 4, 2]);
  });
});
