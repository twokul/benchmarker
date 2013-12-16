var
    esprima              = require('esprima'),
    SourceModifier       = require('./lib/source-modifier'),
    SUITE                = 'suite',
    SETUP                = 'setup',
    BENCHMARK            = 'benchmark',
    TEARDOWN             = 'teardown',
    EXPRESSION_STATEMENT = 'ExpressionStatement',
    CALL_EXPRESSION      = 'CallExpression',
    sourceModifer,
    benchmarker;

var inRange = function(name) {
  return name === SUITE || name === SETUP || name === BENCHMARK || name === TEARDOWN;
};

var getReplacement = function(name, type, args) {
  if (type === 'consoleAPI') {
  } else if (type === 'timelineAPI') {
  } else {
    switch (name) {
      case SUITE:
        return 'var suite = new Benchmark.Suite(\'' + args[0].value + '\');';
      case SETUP:
        return 'suite.on(\'setup\', ';
      case BENCHMARK:
        return 'suite.add(';
      case TEARDOWN:
        return 'suite.on(\'teardown\', ';
      default:
        break;
    }
  }
};

var modifySource = function(type, node) {
  var name = node.expression.callee.name;

  if (name === SETUP || name === BENCHMARK || name === TEARDOWN) {
    sourceModifier.replace(node.expression.callee.range[0], node.expression.callee.range[1], getReplacement(node.expression.callee.name, type, node.expression.arguments));
    if (name === BENCHMARK) {
      sourceModifier.replace(node.expression.arguments[2].range[0] - 2, node.expression.range[1], ');');
    }
  } else {
    sourceModifier.replace(node.expression.range[0], node.expression.range[1], getReplacement(node.expression.callee.name, type, node.expression.arguments));
  }
};

var walk = function(tree, source, options) {
  var type           = options.type || 'benchmarkjs',
      body           = tree.body;

  sourceModifier = new SourceModifier(source);

  for (var key in body) {
    if (body[key].type === EXPRESSION_STATEMENT && body[key].expression.type === CALL_EXPRESSION && inRange(body[key].expression.callee.name)) {
      modifySource(type, body[key]);
    }
  }

  console.log(sourceModifier.toString());
  return sourceModifier.toString();
};

var getTree = function(source, config) {
  return esprima.parse(source, config);
};

benchmarker = function(source) {
  return (source) ? walk(getTree(source, { loc: true, range: true }), source, {}) : source;
};

module.exports = benchmarker;
