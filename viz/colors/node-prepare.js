var
	fs = require('fs'),
	url = require('url');

var input = fs.readFileSync('../../data/colors_imagemagick-quantize.csv').toString().split('\r\n');

var colors = {};
for(var i in input) {
	input[i] = input[i].split(',');
	colors[input[i][0]] = input[i].slice(1);
}

var input = fs.readFileSync('../../data/lat_lon.csv').toString().split('\r\n');

var data = [];
for(var i in input) {
	if(!input[i]) continue;
	input[i] = input[i].split(',');
	
	var item = {
		location: [+input[i][1],+input[i][0]],
		time: new Date(input[i][3]),
		url: input[i][2],
	}
	
	item.file = url.parse(item.url).pathname.split('/').pop();
	
	if(!colors[item.file]) continue;
	
	item.colors = colors[item.file];
	for(var c in item.colors) {
		item.colors[c] = hextorgb(item.colors[c]);
	}
	
	data.push(item);
}

console.log('var data =', JSON.stringify(data))

function hextorgb(value) {
	return [
		parseInt(value.substr(0,2), 16),
		parseInt(value.substr(2,2), 16),
		parseInt(value.substr(4,2), 16),
	];
}
