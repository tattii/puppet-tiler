const Tiler = require("./tiler");
let tiler = null;


module.exports = async (data, tile, writeData, done) => {
  if (!tiler) {
    let options = global.mapOptions;
    tiler = new Tiler(options.style, options.dir, { retina: options.retina });
    await tiler.init();
  }

  await tiler.getTile(tile[0], tile[1], tile[2]);
  done();
};

