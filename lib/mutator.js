var codegen = require('escodegen'),
    parser  = require('./parser'),
    utils   = require('./utils');

/*
 1. walk the tree
 2. find the node that we're interested in
 3. mutate the node accordingly
 4. return a string (js code) generated with codegen based on the mutated tree
*/
var mutateNode = function(node, type) {
  return utils.isFunctionNode(node) && utils.isBenchmarkerFunction(node.expression) ?
    parser[type + ':' + node.expression.callee.name].call(this, node) : node;
};

var walk = function(tree, options, fn) {
  for (var key in tree.body) {
    tree.body[key] = fn.call(this, tree.body[key], options.type);
  }
  return codegen.generate(tree, options);
};

/**
 @params tree AST tree
 @return {Object}
*/
var mutator = function(tree) {
  var compile = function(options) {
    return walk(tree, options, mutateNode);
  };
  return {
    compile: compile
  };
};

module.exports = mutator;
