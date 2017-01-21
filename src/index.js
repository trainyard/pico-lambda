
const p = Object
  .getOwnPropertyNames(Array.prototype)
  .filter(s => ['concat', 'every', 'filter', 'find', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some'].includes(s))
  .reduce((p, method) => {
    p[method] = fn => (a, ...args) => a[method](fn, ...args)
    return p
  }, {
    /**
     * Adds item to front of list.
     * cons :: a -> [a] -> [a]
     * @constructor
     * @param {any} item - Item to be added to front of list.
     * @param {array} Array - Array that item will be prepended to.
     */
    cons: a => b => [a, ...b],
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
