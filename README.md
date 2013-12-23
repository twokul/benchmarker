benchmarker
===========

DSL for writing benchmarks

### Getting started

```bash
npm install
```

### Run tests

```bash
npm test
```

### Usage

Default `type` is `benchmarkjs`.

```bash
node bin/benchmarker.js tests/fixtures/test-benchmark.js --type consoleapi
node bin/benchmarker.js tests/fixtures/test-benchmark.js
```

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

Compiles to `benchmarkjs`:

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

Compiles to `console api`:

```javascript
var a;
 
function sq(a) {
  return a*a;
}
 
a = 1;
var benchmarkCounter = 0;
 
console.profile('testing square function');
while (benchmarkCounter++ < 1000) {
  sq(a);
}
console.profileEnd('testing square function');

benchmarkCounter = 0;

a = undefined;
```
