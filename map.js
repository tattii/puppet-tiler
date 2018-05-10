const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto('http://localhost/mapbox-gl-js/'); //, { waitUntil: 'networkidle0' });
  const waitLoaded = page.waitForFunction('map.loaded() == true');
  await waitLoaded;
  await page.screenshot({
    path: 'map-jp3.png', 
    clip: { x: 0, y: 0, width: 256, height: 256 },
    omitBackground: true
  });

  browser.close();
})();
