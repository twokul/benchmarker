var fs = require("fs"),
    benchmarker = require("../benchmarker");

exports['should convert plain javascript to benchmarkjs suite'] = function(test) {
  var source   = fs.readFileSync(__dirname + "/fixtures/test-benchmark.js").toString(),
      expected = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/end-to-end-benchmark.out.js").toString(),
      res      = benchmarker(source, { type: 'benchmarkjs' }) + '\n';

  test.expect(1);
  test.equal(res, expected);
  test.done();
};
