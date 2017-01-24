
const p = Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => ['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some'].includes(s))
  .reduce((p, method) => {
    p[method] = fn => (a, ...args) => a[method](fn, ...args)
    return p
  }, {
    
    unshift: a => b => [a, ...b],
    reverse: a => [...a].reverse(),
    length: a => a.length,
    toString: a => a.toString(),
    pop: a => a.slice(0, -1),
    shift: a => a.slice(1),
    
    compose: (...fns) => data => fns.reduceRight((value, fn) => fn(value), data),
    
    pipe: (...fns) => data => fns.reduce((value, fn) => fn(value), data)
  })

if (typeof window !== 'undefined') window.PicoLambda = p
else module.exports = p
