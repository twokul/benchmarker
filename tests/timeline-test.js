var fs = require("fs"),
    benchmarker = require("../benchmarker");

exports['should convert plain javascript to timeline suite'] = function(test) {
  var source   = fs.readFileSync(__dirname + "/fixtures/test-benchmark.js").toString(),
      expected = fs.readFileSync(__dirname + "/fixtures/timeline/timeline.out.js").toString(),
      res      = benchmarker(source);

  test.expect(1);
  test.equal(res, expected);
  test.done();
};
