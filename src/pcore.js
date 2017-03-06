module.exports = {
  curry: (fn, ...params) => fn.length <= params.length ? fn(...params) : (...others) => curry(fn, ...params, ...others),
  compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
  pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue),
  id: a => a
}

