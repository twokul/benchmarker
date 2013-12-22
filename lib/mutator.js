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
  var newNode;

  for (var key in tree.body) {
    newNode = fn.call(this, tree.body[key], options.type);
    if (newNode.comments) {
      tree.body.splice(key, 1);
      tree.comments = newNode.comments;
    } else if (!_.isArray(newNode)) {
      tree.body[key] = newNode;
    } else {
      tree.body.splice(key, 1);
      for (var i = 0, l = newNode.length; i < l; i++) {
        tree.body.splice(key + i, 0, newNode[i]);
      }
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
