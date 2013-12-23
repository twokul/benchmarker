var parser = require('../lib/parser'),
    codegen = require('escodegen'),
    esprima = require('esprima');

// ===========
// BENCHMARKJS
// ===========

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
  var node         = esprima.parse('benchmark(\'testing square function\', function() { sq(a); })'),
      expectedNode = esprima.parse('suite.add(\'testing square function\', function() { sq(a); });'),
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

// ===========
// CONSOLE API
// ===========

exports['should `setup` node to console api `setup` node'] = function(test) {
  var node         = esprima.parse('setup(function() { a = 1; })'),
      expectedNode = esprima.parse('a = 1;'),
      actual       = JSON.stringify(parser['consoleapi:setup'].call(this, node.body[0])),
      expected     = JSON.stringify(expectedNode.body[0]);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};

exports['should `benchmark` node to console api `benchmark` node'] = function(test) {
  var node         = esprima.parse('benchmark(\'testing square function\', function() { sq(a); }, 1000)'),
      expectedNode = esprima.parse('var benchmarkCounter = 0;' +
                                   'console.profile(\'testing square function\');' +
                                   'while (benchmarkCounter++ < 1000) {' +
                                     'sq(a);' +
                                   '}' +
                                   'console.profileEnd(\'testing square function\');' +
                                   'benchmarkCounter = 0;'),
      actual       = JSON.stringify({ type: 'Program', body: parser['consoleapi:benchmark'].call(this, node.body[0]) }),
      expected     = JSON.stringify(expectedNode);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};

exports['should `teardown` node to console api `teardown` node'] = function(test) {
  var node         = esprima.parse('teardown(function() { a = null; });'),
      expectedNode = esprima.parse('a = null;'),
      actual       = JSON.stringify(parser['consoleapi:teardown'].call(this, node.body[0])),
      expected     = JSON.stringify(expectedNode.body[0]);

  test.expect(1);
  test.equal(actual, expected);
  test.done();
};

// ============
// TIMELINE API
// ============
