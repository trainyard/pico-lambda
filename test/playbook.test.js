const PB = require('../src/playbook')

describe('api: reverse', () => {
  if (!PB.reverseStr) return
  it('should reverse the given string', () => {
    expect(PB.reverseStr("abcde")).toEqual("edcba")
  })
})