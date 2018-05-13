var tileReduce = require('@mapbox/tile-reduce');
var path = require('path');
var fs = require('fs');

tileReduce({
  zoom: 14,
  map: path.join(__dirname, '/tile-worker.js'),
  sourceCover: 'osm',
  sources: [{name: 'osm', mbtiles: path.join(__dirname, 'tiles.mbtiles')}],
  output: fs.createWriteStream('tile-map.log'),
  log: true,
  mapOptions: {
    style: 'http://172.17.0.1:8080/styles/klokantech-basic/style.json',
    dir: 'tile2',
    retina: true
  }
})
.on('end', function() {
  console.log('done');
});
