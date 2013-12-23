var codegen = require('escodegen'),
    _       = require('lodash'),
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
  var newNode,
      index = 0;

  for (var key in tree.body) {
    newNode = fn.call(this, tree.body[key], options.type);
    if (!_.isArray(newNode)) {
      tree.body[key] = newNode;
    } else {
      // at this point, we know we're are dealing with console or timeline api
      // ugly solution to insert all nodes at once
      // not pretty, but good for now
      tree.body.splice(key, 1, newNode[0], newNode[1], newNode[2], newNode[3], newNode[4]);
      // mutate teardown node manually
      tree.body[tree.body.length - 1] = mutateNode(tree.body[tree.body.length - 1], options.type);
    }
  }

  try {
    return codegen.generate(tree, options);
  } catch(e) {
    console.log(e.stack);
  }
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
