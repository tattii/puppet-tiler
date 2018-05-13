const Tiler = require("./tiler");

(async () => {
  const tiler = new Tiler('http://172.17.0.1:8080/styles/klokantech-basic/style.json', 'tile');
  await tiler.init();

  await tiler.getTile(27, 12, 5);
  await tiler.getTile(28, 12, 5);
  await tiler.getTile(28, 11, 5);

  tiler.close();
})();

