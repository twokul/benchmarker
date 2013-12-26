#!/usr/bin/env node

var argv = require('optimist')
            .boolean('v')
            .string('t')
            .alias('v','version')
            .alias('t','type')
            .argv;

var fs = require('fs');

if (argv.version) {
  var version = require('../package').version;
  process.stdout.write(version + '\n');
} else {
  var filename = argv._[0],
      options  = {};
  if (!filename){
    process.stdout.write('You must supply the input file path.\n');
    process.exit(1);
  }

  var source = fs.readFileSync(filename).toString();

  options.type = argv.t || argv.type || 'benchmarkjs';

  var benchmarker = require(__dirname + "/../benchmarker.js");
  process.stdout.write('Converting ' + filename + '...\n');

  process.stdout.write(benchmarker(source, options));
}
