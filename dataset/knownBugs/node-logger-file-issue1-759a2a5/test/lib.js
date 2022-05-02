var fs = require("fs"),
	assert = require("assert-plus");

exports.checkFile = function(path, content, times, done) {
	fs.readFile(path, {encoding: "utf8", flag: "r"}, function(err, data) {
		if (err) {
			throw err;
		} else {
			var realContent = "";
			for (var i = 0; i < times; i += 1) {
				realContent += content;
			}
			assert.equal(realContent, data);
			done();
		}
	});
};

exports.checkFileSize = function(file, size) {
	fs.stat(file, function(err, stats) {
		if (err) {
			throw err;
		} else {
			if (stats.size < size*0.99) {
				assert.fail("size smaller than 99%");
			} else if (stats.size > size*1.01) {
				assert.fail("size bigger than 101%");
			}
		}
	});
};

function logMultipleTimes(e, log, i, n, errCallback) {
	if (i >= n) {
		errCallback();
	} else {
		e.log(log, function(err) {
			if (err) {
				errCallback(err);
			} else {
				logMultipleTimes(e, log, i + 1, n, errCallback);
			}
		});
	}
}

exports.logMultipleTimes = logMultipleTimes;