var fs = require('fs');
var path = require('path');
var strip = require('strip-comments');
var condenseWhitespace = require('condense-whitespace');
var removeNewline = require('newline-remove');

var src = fs.createReadStream(path.join(process.cwd(), process.argv[2]));
var dist = fs.createWriteStream(path.join(process.cwd(), process.argv[3]));

var Transform = require('stream').Transform;
var stripped = new Transform({decodeStrings: false});
stripped._transform = function(chunk, encoding, done) {
  done(null, strip(chunk.toString()));
};

condenseWhitespace

var trimmed = new Transform({decodeStrings: false});
trimmed._transform = function(chunk, encoding, done) {
  done(null, condenseWhitespace(chunk.toString()));
}

var line = new Transform({decodeStrings: false});
line._transform = function(chunk, encoding, done) {
  done(null, chunk.toString().replace(/\n/g, ';').replace(/ \./g, '.'));
}

src.pipe(stripped).pipe(trimmed).pipe(line).pipe(dist);
