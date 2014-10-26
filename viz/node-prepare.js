var input = require('fs').readFileSync('../data/lat_lon_cartoColors.csv').toString().split('\r\n');

var off = new Date("2004-11-01T00:00:00Z");
var max = new Date("2014-04-01T00:00:00Z");

var data = [];
for(var i in input) {
	if(!input[i]) continue;
	input[i] = input[i].split(',');
	
	var item = {
		location: [+input[i][1],+input[i][0]],
		time: (new Date(input[i][3]) - off) / (max - off) * 10,
		url: input[i][2],
		colors: input[i].slice(4).map(hextorgb),
	}
	
	data.push(item);
}

console.log('var data =', JSON.stringify(data))

function hextorgb(value) {
	return [
		parseInt(value.substr(0,2)),
		parseInt(value.substr(2,2)),
		parseInt(value.substr(4,2)),
	];
}
