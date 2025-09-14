const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Testing search functionality...');

  // Go to blog page
  await page.goto('http://localhost:3001/blog');
  await page.waitForLoadState('networkidle');

  // Find search input and type
  const searchInput = page.locator('input[placeholder="Search articles..."]');
  await searchInput.fill('GPT-4');

  // Wait for search results
  await page.waitForTimeout(1000);

  // Take screenshot of search results
  await page.screenshot({ path: './screenshots/search-results.png', fullPage: true });
  console.log('Search results screenshot saved');

  // Test clicking on a result
  const firstResult = page.locator('a').filter({ hasText: 'GPT-4' }).first();
  if (await firstResult.isVisible()) {
    console.log('Found GPT-4 search result');
    await firstResult.click();
    await page.waitForTimeout(2000);
    console.log('Clicked on search result');
  }

  // Test search from URL parameter
  await page.goto('http://localhost:3001/blog?search=Claude');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: './screenshots/search-url-param.png', fullPage: true });
  console.log('URL parameter search screenshot saved');

  await page.waitForTimeout(3000);
  await browser.close();
})();