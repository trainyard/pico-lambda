module.exports = Object
  .getOwnPropertyNames(String.prototype)
  .reduce((lambda, method) => {
    lambda[method] = (~['charAt', 'charCodeAt', 'lastIndexOf', 'localeCompare', 'normalize', 'substr', 'substring', 'codePointAt', 'concat', 'endsWith', 'includes', 'indexOf', 'match', 'repeat', 'replace', 'search', 'slice', 'split', 'startsWith'].indexOf(method))
      ? (...params) => a => a[method](...params)
      : (~['toString', 'trim', 'trimLeft', 'trimRight', 'valueOf', 'toLowerCase', 'toUpperCase', 'toLocaleLowerCase', 'toLocaleUpperCase'].indexOf(method))
        ? a => a[method]()
        : lambda[method]
    return lambda
  }, {})