import { a } from 'awesome-module';

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

export sq;
