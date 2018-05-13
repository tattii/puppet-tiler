const Tiler = require("./tiler");
const tiler = new Tiler('http://172.17.0.1:8080/styles/klokantech-basic/style.json', 'tile');


module.exports = async (data, tile, writeData, done) => {
  if (!tiler.page) await tiler.init();

  await tiler.getTile(tile[0], tile[1], tile[2]);
  done();
};

