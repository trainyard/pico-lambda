const { describe, it, expect, PicoLambda: PL } = init()

function init() {
  if (typeof window === 'undefined') {
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter

    global.jasmine.getEnv().clearReporters()               // remove default reporter logs
    global.jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
      spec: {
        displayPending: true
      }
    }))
  }

  const PicoLambda = require('../src/pstring')
  const { describe, expect, it } = global
  return { PicoLambda, describe, expect, it }
}

describe('api: charAt', () => {
  if (!PL.charAt) return

  it('should return the character at the indicated index', () => {
    expect(PL.charAt(2)("123")).toEqual("3")
  })
})

describe('api: charCodeAt', () => {
  if (!PL.charCodeAt) return

  it('should return the char code at the indicated index', () => {
    expect(PL.charCodeAt(2)("123")).toEqual(51)
  })
})

describe('api: codePointAt', () => {
  if (!PL.codePointAt) return

  it('should return the char code at the indicated index', () => {
    expect(PL.codePointAt(0)("\uD800\uDC00")).toEqual(65536)
  })
})

describe('api: concat', () => {
  if (!PL.concat) return
  it('should add string to end of string', () => {
    const stringOne = "123"
    const addTwo = PL.concat("45")
    const result = (addTwo(stringOne))
    expect(result).toEqual("12345")
  })

  it('should add single character to end of string', () => {
    const stringOne = "32"
    const addOne = PL.concat("1")
    const result = (addOne(stringOne))
    expect(result).toEqual("321")
  })
})

describe('api: endsWidth', () => {
  if (!PL.endsWidth) return
  it('should return true if the final param ends with the string in the first position', () => {
    expect(PL.endsWith("bc")("abc")).toEqual(true)
  })
  it('should return false if the final param does not end with the string in the first position', () => {
    expect(PL.endsWith("bc")("abcd")).toEqual(false)
  })
})

describe('api: includes', () => {
  if (!PL.includes) return
  it('should return true if the second string starts with the first string', () => {
    expect(PL.includes("To be")("To be, or not to be, that is the question.")).toEqual(true)
  })

  it('should return true if the second string ends with the first string', () => {
    expect(PL.includes("question.")("To be, or not to be, that is the question.")).toEqual(true)
  })

  it('should return true if the second string contains the first string', () => {
    expect(PL.includes("not to be,")("To be, or not to be, that is the question.")).toEqual(true)
  })

  it('should return false if the second string does not contain the first string', () => {
    expect(PL.includes("nonexistent")("To be, or not to be, that is the question.")).toEqual(false)
  })

  it('should start searching at the indicated parameter', () => {
    expect(PL.includes("To be", 1)("To be, or not to be, that is the question.")).toEqual(false)
  })

  it('should be case sensitive', () => {
    expect(PL.includes("TO BE")("To be, or not to be, that is the question.")).toEqual(false)
  })
})

describe('api: indexOf', () => {
  if (!PL.indexOf) return
  it('should return the index of the given substring', () => {
    expect(PL.indexOf("a")("abc")).toEqual(0)
    expect(PL.indexOf("b")("abc")).toEqual(1)
    expect(PL.indexOf("c")("abc")).toEqual(2)
  })

  it('should return the first index if the substring appears more than once', () => {
    expect(PL.indexOf("b")("abbc")).toEqual(1)
  })

  it('should return -1 if the substring is not contained in string', () => {
    expect(PL.indexOf("z")("abc")).toEqual(-1)
  })
})

describe('api: lastIndexOf', () => {
  if (!PL.lastIndexOf) return
  it('should return the index of the given substring', () => {
    expect(PL.lastIndexOf("a")("abc")).toEqual(0)
    expect(PL.lastIndexOf("b")("abc")).toEqual(1)
    expect(PL.lastIndexOf("c")("abc")).toEqual(2)
  })

  it('should return the last index if the substring appears more than once', () => {
    expect(PL.lastIndexOf("b")("abbc")).toEqual(2)
  })

  it('should return -1 if the substring is not contained in string', () => {
    expect(PL.lastIndexOf("z")("abc")).toEqual(-1)
  })
})

describe('api: localeCompare', () => {
  if (!PL.localeCompare) return
  it('should return -1 if the second string comes first', () => {
    expect(PL.localeCompare("b")("a")).toBeLessThan(0)
  })

  it('should return 1 if the second string comes after', () => {
    expect(PL.localeCompare("a")("b")).toBeGreaterThan(0)
  })

  it('should return 0 if the second string is equal', () => {
    expect(PL.localeCompare("a")("a")).toEqual(0)
  })

  it('should accept optional params in first position', () => {
    expect(PL.localeCompare('a', 'de', { sensitivity: 'base' })('ä')).toEqual(0)
  })
})

describe('api: match', () => {
  if (!PL.match) return
  it('should match a value with regular expression', () => {
    const str = 'For more information, see Chapter 3.4.5.1'
    const re = /see (chapter \d+(\.\d)*)/i

    expect(PL.match(re)(str).length).toBeGreaterThan(0)
  })
})

describe('api: normalize', () => {
  if (!PL.normalize) return
  it('should normalize the test string to the form indicated', () => {
    const str = '\u1E9B\u0323';
    expect(PL.normalize('NFKC')(str) === '\u1E69').toEqual(true)
  })
})

describe('api: repeat', () => {
  if (!PL.repeat) return
  it('should repeat string passed indicated number of times', () => {
    expect(PL.repeat(2)('abc')).toEqual('abcabc')
  })
})

describe('api: replace', () => {
  if (!PL.replace) return
  it('should replace the matched substring with the given replacement string', () => {
    expect(PL.replace(/xmas/i, 'Christmas')('Twas the night before Xmas...')).toEqual('Twas the night before Christmas...')
  })
})

describe('api: search', () => {
  if (!PL.search) return
  it('should return the position of the first substring that matches the given regular expression', () => {
    expect(PL.search(/xmas/i)('Twas the night before Xmas...')).toEqual(22)
  })
})

describe('api: slice', () => {
  if (!PL.slice) return
  it('should work with one parameter', () => {
    expect(PL.slice(12)('Twas the night before Xmas...')).toEqual('ht before Xmas...')
  })

  it('should work with two parameters', () => {
    expect(PL.slice(4, -2)('Twas the night before Xmas...')).toEqual(' the night before Xmas.')
  })
})

// 'split'
describe('api: split', () => {
  if (!PL.split) return

  it('should split on the given character', () => {
    expect(PL.split(',')("1,2")).toEqual(['1', '2'])
  })

  it('should split with limits', () => {
    expect(PL.split(',', 2)("1,2,3,4")).toEqual(['1', '2'])
  })
})

// 'startsWith'
describe('api: startsWith', () => {
  if (!PL.startsWith) return
  it('should return true if the final param starts with the string in the first position', () => {
    expect(PL.startsWith("ab")("abc")).toEqual(true)
  })
  it('should return false if the final param does not start with the string in the first position', () => {
    expect(PL.startsWith("bc")("abcd")).toEqual(false)
  })
})

describe('api: substr', () => {
  if (!PL.substr) return
  it('should work with one param', () => {
    expect(PL.substr(2)("abcde")).toEqual('cde')
  })
  it('should work with two params', () => {
    expect(PL.substr(2, 2)("abcde")).toEqual('cd')
  })
})

describe('api: substring', () => {
  if (!PL.substring) return
  it('should work with one param', () => {
    expect(PL.substring(2)("abcde")).toEqual('cde')
  })
  it('should work with two params', () => {
    expect(PL.substring(2, 4)("abcde")).toEqual('cd')
  })
})

describe('api: toLocaleLowerCase', () => {
  if (!PL.toLocaleLowerCase) return
  it('should work after currying', () => {
    expect(PL.toLocaleLowerCase("ABC")).toEqual('abc')
  })
})

describe('api: toLocaleUpperCase', () => {
  if (!PL.toLocaleUpperCase) return
  it('should work after currying', () => {
    expect(PL.toLocaleUpperCase("abc")).toEqual('ABC')
  })
})

describe('api: toLowerCase', () => {
  if (!PL.toLowerCase) return
  it('should work after currying', () => {
    expect(PL.toLowerCase("ABC")).toEqual('abc')
  })
})

describe('api: toString', () => {
  if (!PL.toString) return
  it('should work after currying', () => {
    expect(PL.toString("ABC")).toEqual('ABC')
  })
})

describe('api: toUpperCase', () => {
  if (!PL.toUpperCase) return
  it('should work after currying', () => {
    expect(PL.toUpperCase("abc")).toEqual('ABC')
  })
})

describe('api: trim', () => {
  if (!PL.trim) return
  it('should work after currying', () => {
    expect(PL.trim(" abc ")).toEqual('abc')
  })
})

describe('api: trimLeft', () => {
  if (!PL.trimLeft) return
  it('should work after currying', () => {
    expect(PL.trimLeft(" abc ")).toEqual('abc ')
  })
})

describe('api: trimRight', () => {
  if (!PL.trimRight) return
  it('should work after currying', () => {
    expect(PL.trimRight(" abc ")).toEqual(' abc')
  })
})

describe('api: valueOf', () => {
  if (!PL.valueOf) return
  it('should work after currying', () => {
    expect(PL.valueOf("abc")).toEqual('abc')
  })
})
