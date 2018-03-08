module.exports = {
    mini: mini,
    pretty: pretty
}

var fs = require('fs'),
    beautify = require('js-beautify').js_beautify,
    uglify = require('uglify-js')

function pretty(configs){
    configs.forEach(function(config){
        fs.writeFileSync(config.dest,
            beautify(
                fs.readFileSync(config.source, {encoding: 'utf8'}),
                {
                    indent_size: 4,
                    indent_with_tabs: true,
                    end_with_newline: true
                }
            ))
    });
}

function mini(configs){
    console.log('js minify not implemented fully yet');
    configs.forEach(function(config){

    });
}
