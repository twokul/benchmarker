var
    esprima              = require('esprima'),
    mutator              = require('./lib/mutator'),
    _                    = require('lodash'),
    esprimaOptions       = {
      comment: true
    },
    codegenOptions       = {
      format: {
        indent: {
          style: '  '
        },
        compact: true
      }
    },
    benchmarker;

var benchmarker = function(source, options) {
  var result = source,
      tree;

  if (source && source !== null) {
    // tell esprima that we need location and ranges in AST
    options = _.extend(options, codegenOptions);

    // ask esprima for AST
    tree = esprima.parse(source, esprimaOptions);

    // mutate the tree and return the output as string
    result = mutator(tree).compile(options);
  }

  return result;
};


module.exports = benchmarker;
