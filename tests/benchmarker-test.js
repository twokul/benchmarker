var fs = require("fs"),
    benchmarker = require("../benchmarker");

exports['should convert plain javascript to benchmarkjs suite'] = function(test) {
  var source   = fs.readFileSync(__dirname + "/fixtures/test-benchmark.js").toString(),
      expected = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/benchmarkjs.out.js").toString(),
      res      = benchmarker(source);

  test.expect(1);
  test.equal(res, expected);
  test.done();
};

// exports['should convert setup() to benchmarkjs suite'] = function(test) {
  // var source   = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_setup.in.js").toString(),
      // expected = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_setup.out.js").toString(),
      // res      = benchmarker(source);

  // test.expect(1);
  // test.equal(res, expected);
  // test.done();
// };

// exports['should convert benchmark() to benchmarkjs suite'] = function(test) {
  // var source   = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_benchmark.in.js").toString(),
      // expected = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_benchmark.out.js").toString(),
      // res      = benchmarker(source);

  // test.expect(1);
  // test.equal(res, expected);
  // test.done();
// };

// exports['should convert teardown() to benchmarkjs suite'] = function(test) {
  // var source   = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_teardown.in.js").toString(),
      // expected = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_teardown.out.js").toString(),
      // res      = benchmarker(source);

  // test.expect(1);
  // test.equal(res, expected);
  // test.done();
// };

// exports['should convert setup() to benchmarkjs suite'] = function(test) {
  // var source   = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_source.in.js").toString(),
      // expected = fs.readFileSync(__dirname + "/fixtures/benchmarkjs/plain_source.out.js").toString(),
      // res      = benchmarker(source);

  // test.expect(1);
  // test.equal(res, expected);
  // test.done();
// };
