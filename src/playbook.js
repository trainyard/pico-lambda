const { pipe } = require('./pcore')
const { reverse, join } = require('./parray')
const { split } = require('./pstring')

module.exports = {
  reverseStr: pipe(split(''),
                  reverse,
                  join(''))
}