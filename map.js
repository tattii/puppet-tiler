const puppeteer = require('puppeteer');
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto('http://localhost/mapbox-gl-js/');
  await sleep(3000);
  await page.screenshot({
    path: 'map-jp.png', 
    clip: { x: 0, y: 0, width: 256, height: 256 },
    omitBackground: true
  });

  browser.close();
})();
