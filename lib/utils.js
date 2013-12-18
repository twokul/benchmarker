var Benchmarker = {
      setup:     'setup',
      suite:     'suite',
      benchmark: 'benchmark',
      teardown:  'teardown'
    },
    Types = {
      ExpressionStatement: 'ExpressionStatement',
      CallExpression:      'CallExpression'
    };

var isFunctionNode = function(node) {
  return (node && node.type === Types.ExpressionStatement);
};

var inRange = function(name) {
  return name === Benchmarker.setup || name === Benchmarker.benchmark || name === Benchmarker.teardown || name === Benchmarker.suite;
};

// Only functions with names "setup", "benchmark", "teardown".
var isBenchmarkerFunction = function(node) {
  return (node && node.type === Types.CallExpression && node.callee && inRange(node.callee.name));
};

module.exports = {
  isFunctionNode:        isFunctionNode,
  isBenchmarkerFunction: isBenchmarkerFunction
};
