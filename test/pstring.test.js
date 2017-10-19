const { pstring } = init()

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
      pstring: require('../src/index.js').pstring,
    }
  }
  return {
    pstring: window.PicoLambda.pstring,
  }
}

describe('api: charAt', () => {
  if (!pstring.charAt) return

  it('should return the character at the indicated index', () => {
    expect(pstring.charAt(2)("123")).toEqual("3")
  })
})

describe('api: charCodeAt', () => {
  if (!pstring.charCodeAt) return

  it('should return the char code at the indicated index', () => {
    expect(pstring.charCodeAt(2)("123")).toEqual(51)
  })
})

describe('api: codePointAt', () => {
  if (!pstring.codePointAt) return

  it('should return the char code at the indicated index', () => {
    expect(pstring.codePointAt(0)("\uD800\uDC00")).toEqual(65536)
  })
})

describe('api: concat', () => {
  if (!pstring.concat) return
  it('should add string to end of string', () => {
    const stringOne = "123"
    const addTwo = pstring.concat("45")
    const result = addTwo(stringOne)
    expect(result).toEqual("12345")
  })
  it('should add multiple strings to end of string', () => {
    const stringOne = "123"
    const addTwo = pstring.concat("45", "67")
    const result = addTwo(stringOne)
    expect(result).toEqual("1234567")
  })

  it('should add single character to end of string', () => {
    const stringOne = "32"
    const addOne = pstring.concat("1")
    const result = (addOne(stringOne))
    expect(result).toEqual("321")
  })
})

describe('api: endsWith', () => {
  if (!pstring.endsWidth) return
  it('should return true if the final param ends with the string in the first position', () => {
    expect(pstring.endsWith("bc")("abc")).toEqual(true)
  })
  it('should return false if the final param does not end with the string in the first position', () => {
    expect(pstring.endsWith("bc")("abcd")).toEqual(false)
  })
})

describe('api: includes', () => {
  if (!pstring.includes) return
  it('should return true if the second string starts with the first string', () => {
    expect(pstring.includes("To be")("To be, or not to be, that is the question.")).toEqual(true)
  })

  it('should return true if the second string ends with the first string', () => {
    expect(pstring.includes("question.")("To be, or not to be, that is the question.")).toEqual(true)
  })

  it('should return true if the second string contains the first string', () => {
    expect(pstring.includes("not to be,")("To be, or not to be, that is the question.")).toEqual(true)
  })

  it('should return false if the second string does not contain the first string', () => {
    expect(pstring.includes("nonexistent")("To be, or not to be, that is the question.")).toEqual(false)
  })

  it('should start searching at the indicated parameter', () => {
    expect(pstring.includes("To be", 1)("To be, or not to be, that is the question.")).toEqual(false)
  })

  it('should be case sensitive', () => {
    expect(pstring.includes("TO BE")("To be, or not to be, that is the question.")).toEqual(false)
  })
})

describe('api: indexOf', () => {
  if (!pstring.indexOf) return
  it('should return the index of the given substring', () => {
    expect(pstring.indexOf("a")("abc")).toEqual(0)
    expect(pstring.indexOf("b")("abc")).toEqual(1)
    expect(pstring.indexOf("c")("abc")).toEqual(2)
  })

  it('should return the first index if the substring appears more than once', () => {
    expect(pstring.indexOf("b")("abbc")).toEqual(1)
  })

  it('should return -1 if the substring is not contained in string', () => {
    expect(pstring.indexOf("z")("abc")).toEqual(-1)
  })
})

describe('api: lastIndexOf', () => {
  if (!pstring.lastIndexOf) return
  it('should return the index of the given substring', () => {
    expect(pstring.lastIndexOf("a")("abc")).toEqual(0)
    expect(pstring.lastIndexOf("b")("abc")).toEqual(1)
    expect(pstring.lastIndexOf("c")("abc")).toEqual(2)
  })

  it('should return the last index if the substring appears more than once', () => {
    expect(pstring.lastIndexOf("b")("abbc")).toEqual(2)
  })

  it('should return -1 if the substring is not contained in string', () => {
    expect(pstring.lastIndexOf("z")("abc")).toEqual(-1)
  })
})

describe('api: localeCompare', () => {
  if (!pstring.localeCompare) return
  it('should return -1 if the second string comes first', () => {
    expect(pstring.localeCompare("b")("a")).toBeLessThan(0)
  })

  it('should return 1 if the second string comes after', () => {
    expect(pstring.localeCompare("a")("b")).toBeGreaterThan(0)
  })

  it('should return 0 if the second string is equal', () => {
    expect(pstring.localeCompare("a")("a")).toEqual(0)
  })

  it('should accept optional params in first position', () => {
    expect(pstring.localeCompare('a', 'de', { sensitivity: 'base' })('ä')).toEqual(0)
  })
})

describe('api: match', () => {
  if (!pstring.match) return
  it('should match a value with regular expression', () => {
    const str = 'For more information, see Chapter 3.4.5.1'
    const re = /see (chapter \d+(\.\d)*)/i

    expect(pstring.match(re)(str).length).toBeGreaterThan(0)
  })
})

describe('api: normalize', () => {
  if (!pstring.normalize) return
  it('should normalize the test string to the form indicated', () => {
    const str = '\u1E9B\u0323';
    expect(pstring.normalize('NFKC')(str) === '\u1E69').toEqual(true)
  })
})

describe('api: repeat', () => {
  if (!pstring.repeat) return
  it('should repeat string passed indicated number of times', () => {
    expect(pstring.repeat(2)('abc')).toEqual('abcabc')
  })
})

describe('api: replace', () => {
  if (!pstring.replace) return
  it('should replace the matched substring with the given replacement string', () => {
    expect(pstring.replace(/xmas/i, 'Christmas')('Twas the night before Xmas...')).toEqual('Twas the night before Christmas...')
  })
})

describe('api: search', () => {
  if (!pstring.search) return
  it('should return the position of the first substring that matches the given regular expression', () => {
    expect(pstring.search(/xmas/i)('Twas the night before Xmas...')).toEqual(22)
  })
})

describe('api: slice', () => {
  if (!pstring.slice) return
  it('should work with one parameter', () => {
    expect(pstring.slice(12)('Twas the night before Xmas...')).toEqual('ht before Xmas...')
  })

  it('should work with two parameters', () => {
    expect(pstring.slice(4, -2)('Twas the night before Xmas...')).toEqual(' the night before Xmas.')
  })
})

// 'split'
describe('api: split', () => {
  if (!pstring.split) return

  it('should split on the given character', () => {
    expect(pstring.split(',')("1,2")).toEqual(['1', '2'])
  })

  it('should split with limits', () => {
    expect(pstring.split(',', 2)("1,2,3,4")).toEqual(['1', '2'])
  })
})

// 'startsWith'
describe('api: startsWith', () => {
  if (!pstring.startsWith) return
  it('should return true if the final param starts with the string in the first position', () => {
    expect(pstring.startsWith("ab")("abc")).toEqual(true)
  })
  it('should return false if the final param does not start with the string in the first position', () => {
    expect(pstring.startsWith("bc")("abcd")).toEqual(false)
  })
})

describe('api: substr', () => {
  if (!pstring.substr) return
  it('should work with one param', () => {
    expect(pstring.substr(2)("abcde")).toEqual('cde')
  })
  it('should work with two params', () => {
    expect(pstring.substr(2, 2)("abcde")).toEqual('cd')
  })
})

describe('api: substring', () => {
  if (!pstring.substring) return
  it('should work with one param', () => {
    expect(pstring.substring(2)("abcde")).toEqual('cde')
  })
  it('should work with two params', () => {
    expect(pstring.substring(2, 4)("abcde")).toEqual('cd')
  })
})

describe('api: toLocaleLowerCase', () => {
  if (!pstring.toLocaleLowerCase) return
  it('should work after currying', () => {
    expect(pstring.toLocaleLowerCase("ABC")).toEqual('abc')
  })
})

describe('api: toLocaleUpperCase', () => {
  if (!pstring.toLocaleUpperCase) return
  it('should work after currying', () => {
    expect(pstring.toLocaleUpperCase("abc")).toEqual('ABC')
  })
})

describe('api: toLowerCase', () => {
  if (!pstring.toLowerCase) return
  it('should work after currying', () => {
    expect(pstring.toLowerCase("ABC")).toEqual('abc')
  })
})

describe('api: toString', () => {
  if (!pstring.toString) return
  it('should work after currying', () => {
    expect(pstring.toString("ABC")).toEqual('ABC')
  })
})

describe('api: toUpperCase', () => {
  if (!pstring.toUpperCase) return
  it('should work after currying', () => {
    expect(pstring.toUpperCase("abc")).toEqual('ABC')
  })
})

describe('api: trim', () => {
  if (!pstring.trim) return
  it('should work after currying', () => {
    expect(pstring.trim(" abc ")).toEqual('abc')
  })
})

describe('api: trimLeft', () => {
  if (!pstring.trimLeft) return
  it('should work after currying', () => {
    expect(pstring.trimLeft(" abc ")).toEqual('abc ')
  })
})

describe('api: trimRight', () => {
  if (!pstring.trimRight) return
  it('should work after currying', () => {
    expect(pstring.trimRight(" abc ")).toEqual(' abc')
  })
})

describe('api: valueOf', () => {
  if (!pstring.valueOf) return
  it('should work after currying', () => {
    expect(pstring.valueOf("abc")).toEqual('abc')
  })
})
