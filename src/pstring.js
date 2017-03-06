module.exports = Object
    .getOwnPropertyNames(String.prototype)
    .reduce((lambda, method) => {
      lambda[method] = (~['charAt', 'charCodeAt', 'lastIndexOf', 'localeCompare', 'normalize', 'substr', 'substring', 'toString', 'trim', 'trimLeft', 'trimRight', 'valueOf', 'codePointAt', 'concat', 'endsWith', 'includes', 'indexOf', 'match', 'repeat', 'replace', 'search', 'slice', 'split', 'startsWith', 'toLowerCase', 'toLocaleLowerCase', 'toUpperCase', 'toLocaleUpperCase', 'padLeft', 'padRight'].indexOf(method))
        ? (...params) => a => a[method](...params)
        : lambda[method]
    }, {})