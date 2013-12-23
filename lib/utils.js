var Benchmarker = {
      setup:     'setup',
      suite:     'suite',
      benchmark: 'benchmark',
      teardown:  'teardown'
    },
    stringRegex = (/(\-|_|\.|\s)+(.)?/g),
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

var camelize = function(str) {
  return str.replace(stringRegex, function(match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(/^([A-Z])/, function(match, separator, chr) {
    return match.toLowerCase();
  });
};

module.exports = {
  isFunctionNode:        isFunctionNode,
  isBenchmarkerFunction: isBenchmarkerFunction,
  camelize:              camelize
};
