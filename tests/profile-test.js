var fs = require("fs"),
    benchmarker = require("../benchmarker");

exports['should convert plain javascript to consoleAPI suite'] = function(test) {
  var source   = fs.readFileSync(__dirname + "/fixtures/test-benchmark.js").toString(),
      expected = fs.readFileSync(__dirname + "/fixtures/profile/end-to-end-benchmark.out.js").toString(),
      res      = benchmarker(source);

  test.expect(1);
  test.equal(res, expected);
  test.done();
};

exports['should convert benchmark() to consoleAPI suite'] = function(test) {
  var source   = fs.readFileSync(__dirname + "/fixtures/partial-benchmark.js").toString(),
      expected = fs.readFileSync(__dirname + "/fixtures/profile/partial-benchmark.out.js").toString(),
      res      = benchmarker(source, { type: 'consoleAPI' });

  test.expect(1);
  test.equal(res, expected);
  test.done();
};
