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


src.pipe(stripped).pipe(dist);
