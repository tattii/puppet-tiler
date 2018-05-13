var tileReduce = require('@mapbox/tile-reduce');
var path = require('path');
var fs = require('fs');

var config = {
  mbtiles: 'tiles.mbtiles',
  minzoom: 0,
  maxzoom: 5,
  style: 'http://172.17.0.1:8080/styles/klokantech-basic/style.json',
  dir: 'tile2',
  retina: true
};

var generated = 0;

tileReduce({
  zoom: 5,
  map: path.join(__dirname, '/tile-worker.js'),
  sourceCover: config.mbtiles,
  sources: [{name: config.mbtiles, mbtiles: path.join(__dirname, config.mbtiles)}],
  mapOptions: config
})
.on('reduce', function(n) {
  generated += n;
})
.on('end', function() {
  console.log('generated ' + generated + ' tiles.');
});
