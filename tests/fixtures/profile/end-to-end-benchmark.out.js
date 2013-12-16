var a = 1;

function sq(a) {
  return a*a;
}

var i = 0;

console.profile('My Benchmark - testing square function');
while (i++ < 1000) {
  sq(a);
}
console.profileEnd('My Benchmark - testing square function');
