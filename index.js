#!/usr/bin/env node
const cli = require('commander');
const convert = require('./commands/convert-file');

cli.description("List of usage command");
cli.name("mytools");

cli
  .command("-h")
  .option('-o, --output', 'make output from file')
  .option('-t, --type', 'convert file with your format')
  .description(
    "-o, --output', 'make output from file"
  )

cli
  .usage('file <file>')
  .option('-t, --type <type>', 'choose file')
  .option('-o, --output', 'save output to your directory')
  .action(async function(file, options) {
   var convert_data = await convert({file: options.args[1], type: options._optionValues.type, output: options._optionValues.output, output_dir: options.args[2] })
  });

cli.parse(process.argv);
