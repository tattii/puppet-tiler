const puppeteer = require('puppeteer');
const makedir = require('make-dir');

module.exports = class Tiler {
  constructor(style, dir) {
    this.style = style;
    this.dir = dir;
  }

  async init() {
    this.browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    this.page = await this.browser.newPage();
  }

  async getTile(x, y, z) {
    let url = 'http://localhost/mapbox-gl-js/?x=' + x + '&y=' + y + '&z=' + z + '&style=' + this.style;
    let label = 'get: ' + [x, y, z].join(', ');

    // wait map fully rendered (include surrounding tiles)
    console.time(label);
    await this.page.goto(url, { waitUntil: 'networkidle0' });
    const waitLoaded = this.page.waitForFunction('map.loaded() == true');
    await waitLoaded;
    console.timeEnd(label);

    let dst = [this.dir, z, x].join('/');
    await makedir(dst);
    await this.page.screenshot({
      path: dst + '/' + y + '.png', 
      clip: { x: 0, y: 0, width: 256, height: 256 },
      omitBackground: true
    });
  }

  close() {
    this.browser.close();
  }
}
