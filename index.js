const whitelist = ['concat', 'every', 'filter ', 'find ', 'includes', 'keys', 'map', 'reduce ', 'reduceRight', 'slice', 'some']
const Box = {}
Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => whitelist.includes(s))
  .forEach(method => {
    Box[method] = fn => a => a[method](fn)
  })

Box.cons = (val, a) => [].concat([a].unshift(val))
Box.uniq = a => [...new Set(a)]
Box.compose = (...fns) => data => fns.reduce((value, fn) => fn(value), data)[0]
Box.pipe = (...fns) => data => fns.reverse().reduce((value, fn) => fn(value), data)

module.exports = Box
