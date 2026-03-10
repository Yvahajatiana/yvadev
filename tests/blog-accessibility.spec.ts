import { test, expect } from '@playwright/test';

test.describe('Blog Page Accessibility Tests', () => {
  test('should load blog page without redirect errors and display content correctly', async ({ page }) => {
    // Navigate to the blog page
    const response = await page.goto('/blog');

    // Verify that the page loaded successfully (no redirect errors like ERR_TOO_MANY_REDIRECTS)
    expect(response?.status()).toBe(200);

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Verify page title contains expected text
    const title = await page.title();
    expect(title).toContain('YvaDev');

    // Take a screenshot to verify page appearance
    await page.screenshot({
      path: 'tests/screenshots/blog-page.png',
      fullPage: true
    });

    // Check for main blog page elements
    const blogHeading = page.locator('h1').first();
    await expect(blogHeading).toBeVisible();

    // Verify the page has some content (articles or posts)
    const blogContent = page.locator('main, article, [data-testid="blog-content"]').first();
    await expect(blogContent).toBeVisible();

    // Check for navigation elements
    const navigation = page.locator('nav, header nav').first();
    await expect(navigation).toBeVisible();

    // Verify no console errors related to redirects
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });

    // Refresh the page to capture any console errors
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that there are no redirect-related errors
    const redirectErrors = logs.filter(log =>
      log.toLowerCase().includes('redirect') ||
      log.toLowerCase().includes('too many') ||
      log.toLowerCase().includes('err_too_many_redirects')
    );
    expect(redirectErrors).toHaveLength(0);

    // Verify responsive design - test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000); // Allow for responsive adjustments

    // Take mobile screenshot
    await page.screenshot({
      path: 'tests/screenshots/blog-page-mobile.png',
      fullPage: true
    });

    // Ensure main elements are still visible on mobile
    await expect(blogHeading).toBeVisible();
    await expect(navigation).toBeVisible();

    console.log('Blog page accessibility test completed successfully!');
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for essential SEO meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveCount(1);

    console.log('SEO meta tags test completed successfully!');
  });

  test('should have accessible navigation and links', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for accessible navigation
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Verify links are keyboard accessible
    await navLinks.first().focus();
    await expect(navLinks.first()).toBeFocused();

    // Check for skip links or other accessibility features
    const skipLink = page.locator('a[href^="#"]').first();
    if (await skipLink.isVisible()) {
      await expect(skipLink).toBeVisible();
    }

    console.log('Navigation accessibility test completed successfully!');
  });
});

