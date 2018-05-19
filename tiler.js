const puppeteer = require('puppeteer');
const makedir = require('make-dir');

module.exports = class Tiler {
  constructor(style, dir, options) {
    this.style = style;
    this.dir = dir;
    this.options = options || {};
  }

  async init() {
    console.time('init');
    this.browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    this.page = await this.browser.newPage();

    // set retina
    if (this.options.retina){
      await this.page.setViewport({width: 1024, height: 1024, deviceScaleFactor: 2});
    }

    let url = 'http://localhost/mapbox-gl-js/?style=' + this.style;
    await this.page.goto(url, { waitUntil: 'networkidle0' });
    console.timeEnd('init');
  }

  async getTile(x, y, z) {
    let label = 'get: ' + [x, y, z].join(', ');

    // wait map fully rendered (include surrounding tiles)
    console.time(label);
    await this.page.evaluate('setXYZ(' + [x, y, z].join(',') + ')');
    const waitLoaded = this.page.waitForFunction('map.loaded() == true && map.areTilesLoaded() == true');
    await waitLoaded;
    console.timeEnd(label);

    let dst = [this.dir, z, x].join('/');
    await makedir(dst);
    await this.page.screenshot({
      path: dst + '/' + y + '.png', 
      clip: { x: 128, y: 128, width: 256, height: 256 },
      omitBackground: true
    });
  }

  close() {
    this.browser.close();
  }
}
