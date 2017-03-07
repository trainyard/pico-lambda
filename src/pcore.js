const curry =  (fn, ...params) => fn.length <= params.length ? fn(...params) : (...others) => curry(fn, ...params, ...others)
const compipes = method => (...fns) => initialValue => fns[method]((value, fn) => fn(value), initialValue)

module.exports = {
  curry,
  compose: compipes('reduceRight'),
  pipe: compipes('reduce'),
  id: a => a
}

