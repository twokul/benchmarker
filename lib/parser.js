var codegen = require('escodegen'); var parserObject = {}; 
var inject = function(name, fn) {
  parserObject[name] = fn;
};

// BENCHMARKJS

// suite('My Benchmark') => var suite = new Benchmark.Suite('My Benchmark');

inject('benchmarkjs:suite', function(node) {
  return {
    type: 'VariableDeclaration',
    declarations: [{
      type: 'VariableDeclarator',
      id: {
        type: 'Identifier',
        name: 'suite'
      },
      init: {
        type: 'NewExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'Benchmark'
          },
          property: {
            type: 'Identifier',
            name: 'Suite'
          }
        },
        arguments: [{
          type: 'Literal',
          value: node.expression.arguments[0].value
        }]
      }
    }],
    kind: 'var'
  };
});

inject('benchmarkjs:setup', function(node) {
  node.expression.arguments.splice(0, 0, { type: 'Literal', value: 'setup' });

  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: 'suite'
        },
        property: {
          type: 'Identifier',
          name: 'on'
        }
      },
      arguments: node.expression.arguments
    }
  };
});

inject('benchmarkjs:benchmark', function(node) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: 'suite'
        },
        property: {
          type: 'Identifier',
          name: 'add'
        }
      },
      arguments: node.expression.arguments.slice(0, 2)
    }
  };
});

inject('benchmarkjs:teardown', function(node) {
  node.expression.arguments.splice(0, 0, { type: 'Literal', value: 'teardown' });

  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: 'suite'
        },
        property: {
          type: 'Identifier',
          name: 'on'
        }
      },
      arguments: node.expression.arguments
    }
  };
});

// CONSOLE API

inject('consoleapi:suite', function() {
  console.log('benchmarkjs:suite');
});

inject('consoleapi:setup', function() {
  console.log('benchmarkjs:setup');
});

inject('consoleapi:benchmark', function() {
  console.log('benchmarkjs:setup');
});

inject('consoleapi:teardown', function() {
  console.log('benchmarkjs:teardown');
});

// TIMELINE API

inject('timelineapi:suite', function() {
  console.log('benchmarkjs:suite');
});

inject('timelineapi:setup', function() {
  console.log('benchmarkjs:setup');
});

inject('timelineapi:benchmark', function() {
  console.log('benchmarkjs:setup');
});

inject('timelineapi:teardown', function() {
  console.log('benchmarkjs:teardown');
});

// var parserObject = {
  // 'benchmarkjs:suite':     function() {},
  // 'benchmarkjs:setup':     function() {},
  // 'benchmarkjs:benchmark': function() {},
  // 'benchmarkjs:teardown':  function() {},
  // 'consoleapi:suite':      function() {},
  // 'consoleapi:setup':      function() {},
  // 'consoleapi:benchmark':  function() {},
  // 'consoleapi:teardown':   function() {},
  // 'timelineapi:suite':     function() {},
  // 'timelineapi:setup':     function() {},
  // 'timelineapi:benchmark': function() {},
  // 'timelineapi:teardown':  function() {}
// };

module.exports = parserObject;
