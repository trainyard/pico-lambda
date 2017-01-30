module.exports = function(config) {
  config.set({
    // global config of your BrowserStack account
    browserStack: {
      username: process.env.BS_USER,
      accessKey: process.env.BS_KEY,
      build: process.env.BUILD,
    },
    logLevel: LOG_INFO,
    singleRun: true,
    basePath: './',
    files: ['src/index.js', 'test/test.js'],
    frameworks: ['jasmine'],
    // define browsers
    customLaunchers: {
      bs_safari_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: 'latest',
        os: 'OS X',
        os_version: 'Sierra'
      },
      bs_edge_win10: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '10'
      },
      bs_chrome_win10: {
        base: 'BrowserStack',
        browser: 'chrome',
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
      }
    },

    browsers: ['bs_chrome_win10', 'bs_firefox_win10']
  })
}