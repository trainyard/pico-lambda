
const p = Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => ['concat', 'every', 'filter', 'find', 'includes', 'map', 'reduce', 'reduceRight', 'slice', 'some'].includes(s))
  .reduce((p, method) => {
    p[method] = fn => (a, ...args) => a[method](fn, ...args)
    return p
  }, {

    cons: a => b => [a, ...b],

    compose: (...fns) => data => fns.reduceRight((value, fn) => fn(value), data),

    pipe: (...fns) => data => fns.reduce((value, fn) => fn(value), data)
  })

if (typeof window !== 'undefined') window.PicoLambda = p
else module.exports = p
