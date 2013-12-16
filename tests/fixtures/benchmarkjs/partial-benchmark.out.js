var suite = new Benchmark.Suite('My Benchmark');

var a = 1;

function sq(a) {
  return a*a;
}

suite.add('testing square function', function() {
  sq(a);
});
