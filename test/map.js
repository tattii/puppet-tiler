const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  let x = 27, y = 12, z = 5;
  const page = await browser.newPage();

  // wait map fully rendered (include surrounding tiles)
  await page.goto('http://localhost/mapbox-gl-js/?x=' + x + '&y=' + y + '&z=' + z, { waitUntil: 'networkidle0' });
  const waitLoaded = page.waitForFunction('map.loaded() == true');
  await waitLoaded;
  await page.screenshot({
    path: 'map-' + [x, y, z].join('-') + '.png', 
    clip: { x: 0, y: 0, width: 256, height: 256 },
    omitBackground: true
  });

  browser.close();
})();
