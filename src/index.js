
const lambda = Object
  .getOwnPropertyNames(Array.prototype)
  .reduce((lambda, method) => {
    lambda[method] = (['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some'].includes(method))
         ? (fn, ...params) => (arr) => arr[method](fn, ...params)
         : (['sort', 'copyWithin', 'fill'].includes(method))
            ? (...params) => arr => [...arr][method](...params)
            : (['toLocaleString', 'indexOf', 'lastIndexOf'].includes(method))
              ? (...params) => arr => arr[method](...params)
              : (['push', 'splice'].includes(method))
                ? (...params) => arr => { var t = [...arr]; t[method](...params); return t; }
                : (['toString', 'entries', 'keys'].includes(method))
                  ? arr => arr[method]()
                  : lambda[method];
    return lambda;
  }, {
    pop: arr => arr.slice(0, -1),
    shift: arr => arr.slice(1),
    unshift: params => arr => [params, ...arr],
    reverse: arr => [...arr].reverse(),
    compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
    pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue)
  });

if (typeof window !== 'undefined') window.PicoLambda = lambda;
else module.exports = lambda;
