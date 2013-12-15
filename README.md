benchmarker
===========

DSL for writing benchmarks

Benchmark:

```javascript

suite('My Benchmark');

var a;
 
function sq(a) {
  return a*a;
}
 
setup(function() {
  a = 1;
});
 
benchmark('testing square function', function() {
  sq(a);
}, 1000);
 
teardown(function() {
  a = undefined;
});
```

Compiles to:

```javascript
var a;

var suite = new Benchmark.Suite('My Benchmark');
 
function sq(a) {
  return a*a;
}
 
suite.on('setup', function() {
  a = 1;
});
 
suite.add('testing square function', function() {
  sq(a);
});
 
suite.on('teardown', function() {
  a = undefined;
});
```

AND

```javascript
var a, i;
 
function sq(a) {
  return a*a;
}
 
a = 1;
i = 0;
 
console.profile('testing square function');
while (i++ < 1000) {
  sq(a);
}
console.profileEnd();
 
a = undefined;
```
