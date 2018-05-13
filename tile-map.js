var tileReduce = require('@mapbox/tile-reduce');
var path = require('path');

tileReduce({
  zoom: 14,
  map: path.join(__dirname, '/tile-worker.js'),
  sourceCover: 'osm',
  sources: [{name: 'osm', mbtiles: path.join(__dirname, 'tiles.mbtiles')}]
})
.on('end', function() {
  console.log('done');
});
