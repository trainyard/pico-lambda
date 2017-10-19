module.exports = function(config) {
  config.set({
    // global config of your BrowserStack account
    browserStack: {
      username: 'mattmcfarland2',
      accessKey: '8XtpNwsCV785G5gStzgP',
      build: process.env.TRAVIS_BUILD_NUMBER || process.env.BUILD,
    },
    logLevel: global.LOG_INFO || 'LOG_INFO',
    singleRun: true,
    basePath: './',
    files: ['dist/index.js', 'test/*.js'],
    frameworks: ['jasmine'],
    // define browsers
    customLaunchers: {
      bs_chrome_win10: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '10'
      },
      bs_edge_win10: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '10'
      },
      bs_firefox_win10: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '10'
      },
      bs_safari_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: 'latest',
        os: 'OS X',
        os_version: 'Sierra'
      },
    },

    browsers: ['bs_chrome_win10', 'bs_edge_win10', 'bs_firefox_win10', 'bs_safari_mac']
  })
}
