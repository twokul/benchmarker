var parserObject = {},
    camelize = require('./utils').camelize;

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

inject('consoleapi:suite', function(node) {
  return {
    type: 'Program',
    body: []
  };
});

inject('consoleapi:setup', function(node) {
  return node.expression.arguments[0].body.body[0];
});

inject('consoleapi:benchmark', function(node) {
  return [{
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'benchmarkCounter'
        },
        init: {
          type: 'Literal',
          value: 0,
        }
      }],
      kind: 'var'
    }, {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'console'
          },
          property: {
            type: 'Identifier',
            name: 'profile'
          }
        },
        arguments: [{
          type: 'Literal',
          value: node.expression.arguments[0].value,
        }]
      }
    }, {
      type: 'WhileStatement',
      test: {
        type: 'BinaryExpression',
        operator: '<',
        left: {
          type: 'UpdateExpression',
          operator: '++',
          argument: {
            type: 'Identifier',
            name: 'benchmarkCounter'
          },
          prefix: false
        },
        right: {
          type: 'Literal',
          value: node.expression.arguments[2].value,
        }
      },
      body: node.expression.arguments[1].body
    }, {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: 'console'
          },
          property: {
            type: 'Identifier',
            name: 'profileEnd'
          }
        },
        arguments: [{
          type: 'Literal',
          value: node.expression.arguments[0].value,
        }]
      }
    }, {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: 'benchmarkCounter'
        },
        right: {
          type: 'Literal',
          value: 0,
        }
      }
    }];
});

inject('consoleapi:teardown', function(node) {
  return node.expression.arguments[0].body.body[0];
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

module.exports = parserObject;
