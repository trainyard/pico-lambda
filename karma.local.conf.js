module.exports = function(config) {
  config.set({
    logLevel: global.LOG_INFO || 'LOG_INFO',
    singleRun: true,
    basePath: './',
    files: ['dist/index.js', 'test/*.js'],
    frameworks: ['jasmine']
  })
}
