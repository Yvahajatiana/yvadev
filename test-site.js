const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Visiting homepage...');
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: './screenshots/homepage.png' });
  console.log('Homepage screenshot saved as homepage.png');

  console.log('Visiting blog page...');
  await page.goto('http://localhost:3000/blog');
  await page.screenshot({ path: './screenshots/blog.png' });
  console.log('Blog page screenshot saved as blog.png');

  console.log('Visiting about page...');
  await page.goto('http://localhost:3000/about');
  await page.screenshot({ path: './screenshots/about.png' });
  console.log('About page screenshot saved as about.png');

  // Wait to see the pages
  await page.waitForTimeout(5000);

  await browser.close();
})();