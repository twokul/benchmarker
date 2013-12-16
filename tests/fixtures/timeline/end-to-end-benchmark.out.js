var a = 1;

function sq(a) {
  return a*a;
}

var i = 0;

console.timeline('My Benchmark - testing square function');
while (i++ < 1000) {
  sq(a);
}
console.timelineEnd('My Benchmark - testing square function');
