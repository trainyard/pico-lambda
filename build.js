var fs = require('fs');
var path = require('path');
var strip = require('strip-comments');

var src = fs.createReadStream(path.join(process.cwd(), process.argv[2]));
var dist = fs.createWriteStream(path.join(process.cwd(), process.argv[3]));

var Transform = require('stream').Transform;
var stripped = new Transform({decodeStrings: false});
stripped._transform = function(chunk, encoding, done) {
  done(null, strip(chunk.toString()));
};
var removedWhiteSpace = new Transform({decodeStrings: false});
removedWhiteSpace._transform = function(chunk, encoding, done) {
  var str = chunk.toString();
  var result = str.replace(/[\s]+/g, ' ').replace(/\s\./g, '.')
  done(null, result);
};
var shrinkVariableNames = new Transform({decodeStrings: false});
shrinkVariableNames._transform = function(chunk, encoding, done) {
  var varMaps = {
    params: 'p',
    method: 'm',
    lambda: 'l',
    arr: 'a',
    fns: 's',
    value: 'v',
    fn: 'f',
    initialValue: 'i'
  }

  done(null, Object.keys(varMaps).reduce((result, origName) => {
    var re = new RegExp(origName, 'g');
    return result.replace(re, varMaps[origName])
  }, chunk.toString()))
}



src.pipe(stripped).pipe(removedWhiteSpace).pipe(shrinkVariableNames).pipe(dist);
