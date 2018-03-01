module.exports = {
    mini: mini,
    pretty: pretty
}

var minimizer = require('minimize'),
    minify = new minimizer({ quotes: true, empty: true }),
    prettify2 = require('js-beautify').html,
    prettify = require('pretty-data2').pd,
    prettify3 = require('xml-beautifier'),
    fs = require('fs'),
    path = require('path');

function mini(configs){
    configs.forEach(function(config){
        var sourcestring = fs.readFileSync(config.source, {encoding: "utf8"});
        var output = minify.parse(sourcestring);

        fs.writeFileSync(config.dest, output);
    })
}

function pretty(configs){
    configs.forEach(function(config){
        var filepath = config.source,
            dest = config.dest;

            //htmlpretty --source ./[]inputs/cpnav.html --dest ./[]outputs/cpnav-orig.html

        if(!path.isAbsolute(filepath)){
            filepath = path.resolve(process.cwd(), filepath)
        }
        if(!path.isAbsolute(dest)){
            dest = path.resolve(process.cwd(), dest)
        }

        var output = fs.readFileSync(filepath, {encoding: "utf8"});

        output = prettify3(output);

        output = prettify2(output, {
           indent_with_tabs: true,
           indent_inner_html: true,
           wrap_line_length: 0,
           //wrap_attributes: false,
           no_preserve_newlines: true,
           max_preserve_newlines: 1,
           indent_scripts: "separate"
        });

        // output = prettify(output);

        fs.writeFileSync(dest, output);
    })
}
