var fs = require('fs'),
    path = require('path');

const vorpal = require('vorpal')(),
      html = require('./lib/html'),
      css  = require('./lib/css'),
      js = require('./lib/js'),
      json = require('./lib/json');

var jobs = {
    html: function(tasks){
        return html.mini(tasks)
    },
    htmlpretty: function(tasks){
        return html.pretty(tasks);
    },
    json: function(tasks){
        console.log("json protocol not implemented yet")
    },
    jsonpretty: function(tasks){
        console.log("json protocol not implemented yet")
    },
    js: function(tasks){
        return js.mini(tasks);
    },
    jspretty: function(tasks){
        return js.pretty(tasks);
    },
}

vorpal
    .command('html', 'Runs a minimize call over an input html file')
    .option("--source <path>", "Path to the source file")
    .option("--dest <path>", "Path to the output")
    .action(function(args, callback) {
        html.mini([args.options]);
        this.log("html minify complete")
        callback();
    });

vorpal
    .command('htmlpretty', 'Runs a js-beautify html call over an input html file')
    .option("--source <path>", "Path to the source file")
    .option("--dest <path>", "Path to the output")
    .action(function(args, callback) {
        html.pretty([args.options]);
        this.log("html pretty complete")
        callback();
    });

vorpal
    .command("json", 'Runs a json minify call over an input json file')
    .option("--source <path>", "Path to the source file")
    .option("--dest <path>", "Path to the output")
    .action(function(args, callback){
        this.log("json minify complete")
        callback();
    });

vorpal
    .command("jsonpretty", 'Runs a js-beautify call over an input json file')
    .option("--source <path>", "Path to the source file")
    .option("--dest <path>", "Path to the output")
    .action(function(args, callback){
        this.log("json prettify complete")
        callback();
    });

vorpal
    .command("js", 'Runs an uglifyjs call over an input js file')
    .option("--source <path>", "Path to the source file")
    .option("--dest <path>", "Path to the output")
    .action(function(args, callback){
        this.log("js minify complete")
        callback();
    });

vorpal
    .command("jspretty", 'Runs a js-beautify call over an input js file')
    .option("--source <path>", "Path to the source file")
    .option("--dest <path>", "Path to the output")
    .action(function(args, callback){

        this.log("js beautify complete")
        callback();
    });

vorpal
    .command("batch", 'Runs a batch job configured in json')
    .option("--source <path>", "Path to the source file")
    .action(function(args, callback){
        console.log(args)
        var jsonstring = fs.readFileSync(args.options.source, {encoding: "utf8"}),
            jsonobj = JSON.parse(jsonstring);

        var batches = {
            html: [],
            htmlpretty: [],
            js: [],
            jspretty: [],
            json: [],
            jsonpretty: [],
            css: [],
            csspretty: [],
        }

        jsonobj.forEach(function(item){
            if(batches[item.task]){
                batches[item.task].push(item);
            }
        });

        Object.keys(batches).forEach(function(item){
            if(batches[item].length > 0){
                jobs[item](batches[item]);
            }
        })

        this.log("batch complete")
        callback();
    });



vorpal
    .delimiter('mini-cli$')
    .show();
