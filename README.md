benchmarker
===========

DSL for writing benchmarks

Benchmark:

```javascript
var a;
 
function sq(a) {
  return a*a;
}
 
setup(function() {
  a = 1;
});
 
benchmark(function() {
  sq(a);
});
 
teardown(function() {
  a = undefined;
});
```

Compiles to:

```javascript
var a;

var suite = new Benchmark.Suite();
 
function sq(a) {
  return a*a;
}
 
suite.on('setup', function() {
  a = 1;
});
 
suite.add('', function() {
  sq(a);
});
 
suite.on('teardown', function() {
  a = undefined;
});
```

OR

```javascript
var a;

var suite = new Benchmark.Suite();
 
function sq(a) {
  return a*a;
}
 
a = 1;
 
console.profile('');
sq(a);
console.profileEnd();
 
a = undefined;
```
