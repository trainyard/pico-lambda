const set1 = ['concat', 'every', 'filter', 'find', 'findIndex', 'includes', 'join', 'map', 'reduce', 'reduceRight', 'slice', 'some']
  .map((method) => ({[method]: (fn, ...params) => (arr) => arr[method](fn, ...params)}))
  
const set2 = ['sort', 'copyWithin', 'fill']
  .map((method) => ({[method]:(...params) => arr => [...arr][method](...params)}))

const set3 = ['toLocaleString', 'indexOf', 'lastIndexOf']
  .map((method) => ({[method]:(...params) => arr => arr[method](...params)}))

const set4 = ['push', 'splice']
  .map((method) => ({[method]:(...params) => arr => { var t = [...arr]; t[method](...params); return t; }}))

const set5 = ['toString', 'entries', 'keys']
  .map((method) => ({[method]:arr => arr[method]()}))
  
const functionalArrayMethods = [].concat(set1,set2,set3,set4,set5).reduce((lambdas, func) => Object.assign({}, lambdas, func)); 

const lambdas = Object.assign({}, functionalArrayMethods, {
  pop: arr => arr.slice(0, -1),
  shift: arr => arr.slice(1),
  unshift: params => arr => [params, ...arr],
  reverse: arr => [...arr].reverse(),
  compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
  pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue)
});

if (typeof window !== 'undefined') window.PicoLambda = lambdas;
else module.exports = lambdas;