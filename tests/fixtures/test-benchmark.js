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
