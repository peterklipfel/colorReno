function drawingOnCanvas(canvasOverlay, params) {
	ctx = params.canvas.getContext('2d');
	lco = canvasOverlay;
	lcp = params;
	_T = Date.now();
	
	if(raf) {
		clearAnimationFrame(raf);
		raf = null;
	}
	
	draw();
};

function opacity(percent) {
	if(percent < .2) return percent / .2;
	return 1 - percent;
}

function size(percent) {
	var base = (lcp.zoom - 11) / (18 - 11) * 20 + 5;
	return base / (1.25 - percent);
}

var out = document.getElementById('out');
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var length = 60, decay = length / 12 / 4;
function draw() {
	raf = requestAnimationFrame(draw);
	
	var T = (Date.now() - _T) / 1000;
	if(T > length + decay) _T = Date.now();
	
	var t = T / length * months.length;
	out.innerHTML = months[Math.floor(t)] + ' ' + ((t - Math.floor(t)) * 30).toFixed(0);
	
	ctx.clearRect(0, 0, lcp.canvas.width, lcp.canvas.height);
	
	data.map(function(item) {
		if(!lcp.bounds.contains(item.location)) return;
		if(T < item.delay * length) return;
		if(T > item.delay * length + decay) return;
		
		var percent = (T - item.delay * length) / decay;
		
		var dot = lco._map.latLngToContainerPoint(item.location);
		ctx.fillStyle = ["rgba(",item.color.join(','),',', opacity(percent) ,")"].join('');
		
		ctx.beginPath();
		ctx.arc(dot.x, dot.y, size(percent), 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	});
}

var leafletMap = L.map('map', {scrollWheelZoom: false}).setView([39.525,-119.825], 12);
L.tileLayer("http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png").addTo(leafletMap);

var raf = null, _T = null;
var ctx = null, lco = null, lcp = null;

L.canvasOverlay().drawing(drawingOnCanvas).addTo(leafletMap);
