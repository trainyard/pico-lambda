const whitelist = ['concat', 'every', 'filter', 'find', 'includes', 'map', 'reduce', 'reduceRight', 'slice', 'some']
const p = {}

Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => whitelist.includes(s))
  .forEach(method => {
    p[method] = fn => (a, ...args) => a[method](fn, ...args)
  })

p.cons = a => b => [a, ...b]
p.uniq = a => [...new Set(a)]
p.compose = (...fns) => data => fns.reduceRight((value, fn) => fn(value), data)
p.pipe = (...fns) => data => fns.reduce((value, fn) => fn(value), data)

if (typeof window !== 'undefined') window.PicoLambda = p
else module.exports = p
