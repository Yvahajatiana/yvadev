import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = process.cwd();
const sourceUrl = new URL(`file:///${path.join(root, 'public', 'favicon.svg').replaceAll('\\', '/')}`);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 1 });

await page.goto(sourceUrl.href);
await page.locator('svg').screenshot({ path: path.join(root, 'public', 'android-chrome-512x512.png') });

const sizes = [192, 180, 32, 16];
for (const size of sizes) {
  await page.setViewportSize({ width: size, height: size });
  await page.locator('svg').screenshot({
    path: path.join(root, 'public', size === 192
      ? 'android-chrome-192x192.png'
      : size === 180
        ? 'apple-touch-icon.png'
        : `favicon-${size}x${size}.png`),
  });
}

await browser.close();

const png16 = await fs.readFile(path.join(root, 'public', 'favicon-16x16.png'));
const png32 = await fs.readFile(path.join(root, 'public', 'favicon-32x32.png'));
const images = [png16, png32];
const headerSize = 6 + images.length * 16;
let offset = headerSize;
const header = Buffer.alloc(headerSize);

header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

images.forEach((image, index) => {
  const size = index === 0 ? 16 : 32;
  const entry = 6 + index * 16;
  header.writeUInt8(size, entry);
  header.writeUInt8(size, entry + 1);
  header.writeUInt8(0, entry + 2);
  header.writeUInt8(0, entry + 3);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});

await fs.writeFile(path.join(root, 'public', 'favicon.ico'), Buffer.concat([header, ...images]));
