const ctx = module
            ? module.exports
            : (typeof window !== 'undefined')
              ? window
              : {};

const c = (fn, ...params) => fn.length <= params.length ? fn(...params) : (...others) => c(fn, ...params, ...others);
const cp = method => (...fns) => initialValue => fns[method]((value, fn) => fn(value), initialValue);

ctx.pcore = {
  curry: c,
  compose: cp('reduceRight'),
  pipe: cp('reduce'),
  identity: a => a
};

ctx.pstring = Object
  .getOwnPropertyNames(String.prototype)
  .reduce((lambda, method) => {
    lambda[method] = (~['charAt', 'charCodeAt', 'lastIndexOf', 'localeCompare', 'normalize', 'substr', 'substring', 'codePointAt', 'concat', 'endsWith', 'includes', 'indexOf', 'match', 'repeat', 'replace', 'search', 'slice', 'split', 'startsWith'].indexOf(method))
      ? (...params) => a => a[method](...params)
      : (~['toString', 'trim', 'trimLeft', 'trimRight', 'valueOf', 'toLowerCase', 'toUpperCase', 'toLocaleLowerCase', 'toLocaleUpperCase'].indexOf(method))
        ? a => a[method]()
        : lambda[method];
    return lambda;
  }, {});

ctx.parray = Object
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
                  : lambda[method];
    return lambda;
  }, {
    pop: arr => arr.slice(0, -1),
    shift: arr => arr.slice(1),
    unshift: params => arr => [params, ...arr],
    reverse: arr => [...arr].reverse()
  });
