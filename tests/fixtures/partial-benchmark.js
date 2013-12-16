suite('My Benchmark');

var a = 1;

function sq(a) {
  return a*a;
}

benchmark('testing square function', function() {
  sq(a);
}, 1000);
