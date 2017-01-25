
const p = Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => ['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some'].includes(s))
  .reduce((p, method) => {
    p[method] = fn => (a, ...args) => a[method](fn, ...args)
    return p
  }, {
    /**
     * Adds item to front of list.
     * unshift :: a -> [a] -> [a]
     * @constructor
     * @param {any} item - Item to be added to front of list.
     * @param {array} Array - Array that item will be prepended to.
     */
    push: a => b => [].concat(b, [a]),
    pop: a => a.slice(0, -1),
    shift: a => a.slice(1),
    unshift: a => b => [a, ...b],
    reverse: a => [...a].reverse(),
    length: a => a.length,
    toString: a => a.toString(),
    sort: comp => a => [...a].sort(comp),
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
