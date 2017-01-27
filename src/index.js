
const p = Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => ['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some'].includes(s))
  .reduce((p, method) => {
    p[method] = fn => (a, ...args) => a[method](fn, ...args)
    return p
  }, {
    push: a => b => [].concat(b, [a]),
    pop: a => a.slice(0, -1),
    shift: a => a.slice(1),
    splice: (start, deleteCount) => (...items) => arr => [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)],
    unshift: a => b => [a, ...b],
    reverse: a => [...a].reverse(),
    length: a => a.length,
    toString: a => a.toString(),
    sort: comp => a => [...a].sort(comp),
    indexOf: p => a => a.findIndex(x => x === p),
    lastIndexOf: p => a => a.lastIndexOf(p),
    fill: (...p) => a => a.fill(...p),
    /**
     * Composes several pure functions.
     * compose :: ((a -> b), (c -> d), ..., (e -> f)) -> (f)
     * @constructor
     * @param {functions} functions - Lots and lots of functions.
     */
    compose: (...fns) => data => fns.reduceRight((value, fn) => fn(value), data),
    /**
     * Pipes several pure functions.
     * Pipe :: ((a -> b), (c -> d), ..., (e -> f)) -> (a)
     * @constructor
     * @param {functions} functions - Lots and lots of functions.
     */
    pipe: (...fns) => data => fns.reduce((value, fn) => fn(value), data)
  })

if (typeof window !== 'undefined') window.PicoLambda = p
else module.exports = p
