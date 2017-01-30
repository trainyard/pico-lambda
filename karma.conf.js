module.exports = function(config) {
  config.set({
    // global config of your BrowserStack account
    browserStack: {
      username: 'mattmcfarland2',
      accessKey: '8XtpNwsCV785G5gStzgP',
      build: process.env.BUILD,
    },
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
      bs_chrome_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: 'latest',
        os: 'OS X',
        os_version: 'Sierra'
      },
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
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

    browsers: ['bs_safari_mac', 'bs_chrome_mac', 'bs_firefox_mac', 'bs_edge_win10', 'bs_chrome_win10', 'bs_firefox_win10']
  })
}