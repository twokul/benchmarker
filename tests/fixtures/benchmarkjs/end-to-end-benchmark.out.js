var suite = new Benchmark.Suite('My Benchmark');

var a;

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
