module.exports = {
    mini: mini,
    pretty: pretty
}


var jsonminify = require("jsonminify");

function pretty(configs){
    configs.forEach(function(config){
    	var output = JSON.parse(fs.readFileSync(config.source, {encoding: 'utf8'}));
    	output = JSON.stringify(input, null, '\t');

        fs.writeFileSync(config.dest, output);
    });
}

function mini(configs){
    configs.forEach(function(config){
    	var output = fs.readFileSync(config.source, {encoding: 'utf8'});
    	output = jsonminify(output)

    	fs.writeFileSync(config.dest, output);
    });
}
