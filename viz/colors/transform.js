function distance(input, target) {
	return Math.sqrt(
		input.reduce(function(o,c,i) {
			return o + Math.pow(input[i] - target[i], 2);
		}, 0)
	);
}

function sd(input, mu) {
	if(typeof mu === 'undefined') {
		mu = input.reduce(function(o,c) { return o + c; }, 0) / input.length;
	}
	
	return Math.sqrt(
		input.reduce(function(o,c) {
			return o + Math.pow(c - mu, 2);
		}, 0) / input.length
	);
}

function isNotGrayscale(color) {
	return sd(color) > 5;
}
function isNotSkyBlue(color) {
	return distance(color, [54,108,162]) > 200;
}

function normalizeTime(time) {
	var off = new Date("2004-11-01T00:00:00Z");
	var max = new Date("2014-04-01T00:00:00Z");
	return (item.time - off) / (max - off);
}

function normalizeTimeYear(time) {
	time = new Date(time.setYear(1990));
	
	var off = new Date("1990-01-01T00:00:00Z");
	var max = new Date("1990-12-31T23:59:59Z");
	return (time - off) / (max - off);
}

for(var i in data) {
	var item = data[i];
	
	item.time = new Date(item.time);
	item.delay = normalizeTimeYear(item.time);
	
	var colors0 = item.colors;
	var colors1 = colors0.filter(isNotGrayscale);
	var colors2 = colors1.filter(isNotSkyBlue);
	
	item.color = colors2[0] || colors1[0] || colors0[0];
}
