var a = 1;

var i = 0;

function sq(a) {
  return a*a;
}

console.timeline('My Benchmark - testing square function');
sq(a);
console.timelineEnd('My Benchmark - testing square function');
