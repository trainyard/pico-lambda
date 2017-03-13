module.exports = Object
  .getOwnPropertyNames(Array.prototype)
  .reduce((lambda, method) => {
    lambda[method] = (~['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some'].indexOf(method))
        ? (fn, ...params) => arr => arr[method](fn, ...params)
        : (~['sort', 'copyWithin', 'fill'].indexOf(method))
            ? (...params) => arr => [...arr][method](...params)
            : (~['toLocaleString', 'indexOf', 'lastIndexOf'].indexOf(method))
              ? (...params) => arr => arr[method](...params)
              : (~['push', 'splice'].indexOf(method))
                ? (...params) => arr => { var t = [...arr]; t[method](...params); return t; }
                : (~['toString', 'entries', 'keys'].indexOf(method))
                  ? arr => arr[method]()
                  : lambda[method]
    return lambda
  }, {
    pop: arr => arr.slice(0, -1),
    shift: arr => arr.slice(1),
    unshift: params => arr => [params, ...arr],
    reverse: arr => [...arr].reverse()
  })