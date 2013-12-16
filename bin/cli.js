#!/usr/bin/env node

var argv = require('optimist')
            .boolean('v')
            .alias('v','version')
            .argv;

var fs = require('fs');

if (argv.version) {
  var version = require('../package').version;
  process.stdout.write(version + '\n');
} else {
  var filename = argv._[0];
  if (!filename){
    process.stdout.write('You must supply the input file path.\n');
    process.exit(1);
  }

  var source = fs.readFileSync(filename).toString();
  // var whitelist;
  // if (argv.w) {
    // whitelist = JSON.parse(fs.readFileSync(argv.w).toString());
  // } else {
    // whitelist = {};
  // }

  var benchmarker = require(__dirname + "/../benchmarker.js");
  console.log(benchmarker(source));
  // process.stdout.write(benchmarker(source));
}
