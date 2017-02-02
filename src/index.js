const createCurriedFunctions = (method) => ({[method]: (fn, ...params) => (array) => array[method](fn, ...params)})
const f2 = (method) => ({[method]: (...params) => arr => [...arr][method](...params)})
const f4 = (method) => ({[method]: (...params) => arr => { var t = [...arr]; t[method](...params); return t; }})
const f5 = (method) => ({[method]: (arr) => [...arr][method]()})

const set1 = ['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some']
  .map(createCurriedFunctions)
  
const set2 = ['sort', 'copyWithin', 'fill', 'toLocaleString', 'indexOf', 'lastIndexOf']
  .map(f2)

const set4 = ['push', 'splice']
  .map(f4)

const set5 = ['toString', 'entries', 'keys', 'reverse']
  .map(f5)
  
const functionalArrayMethods = [].concat(set1,set2,set4,set5)
  .reduce((lambdas, func) => Object.assign({}, lambdas, func)); 

const lambdas = Object.assign({}, functionalArrayMethods, {
  pop: arr => arr.slice(0, -1),
  shift: arr => arr.slice(1),
  unshift: params => arr => [params, ...arr],
  compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
  pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue)
});

module.exports = lambdas;