var parser = require('../lib/parser'),
    esprima = require('esprima');

exports['should `suite` node to benchmarkjs `suite` node'] = function(test) {
  var node         = esprima.parse('suite(\'My Benchmark\')'),
      expectedNode = esprima.parse('var suite = new Benchmark.Suite(\'My Benchmark\');'),
      actual       = JSON.stringify(parser['benchmarkjs:suite'].call(this, node.body[0])),
      expected     = JSON.stringify(expectedNode.body[0]);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};

exports['should `setup` node to benchmarkjs `setup` node'] = function(test) {
  var node         = esprima.parse('setup(function() { a = 1; })'),
      expectedNode = esprima.parse('suite.on(\'setup\', function() { a = 1; });'),
      actual       = JSON.stringify(parser['benchmarkjs:setup'].call(this, node.body[0])),
      expected     = JSON.stringify(expectedNode.body[0]);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};

exports['should `benchmark` node to benchmarkjs `benchmark` node'] = function(test) {
  var node         = esprima.parse('benchmark(\'test sq fn\', function() { sq(a); })'),
      expectedNode = esprima.parse('suite.add(\'test sq fn\', function() { sq(a); });'),
      actual       = JSON.stringify(parser['benchmarkjs:benchmark'].call(this, node.body[0])),
      expected     = JSON.stringify(expectedNode.body[0]);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};

exports['should `teardown` node to benchmarkjs `teardown` node'] = function(test) {
  var node         = esprima.parse('teardown(function() { a = null; });'),
      expectedNode = esprima.parse('suite.on(\'teardown\', function() { a = null; });'),
      actual       = JSON.stringify(parser['benchmarkjs:teardown'].call(this, node.body[0])),
      expected     = JSON.stringify(expectedNode.body[0]);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};
