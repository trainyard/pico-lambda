const spawn = require('child_process').spawn
module.exports = function(command, args, callback) {
  let result = '';
  const exec = spawn(command, args || [], {
    env: process.env,
    stdio: 'pipe',
    shell: true
  })
  exec.stdout.on('data', function(data) {
    result += data.toString()
  });
  exec.on('exit', code => {
    if (callback && typeof callback === "function") {
      if (code !== 0) {
        callback(code, null)
      } else {
        callback(null, result.trim())
      }
    } else if (code !== 0) {
      throw new Error('Error code: ' + code + ' for command: ' + command + ' ' + args.join(' '))
    }
  })
}