import { execFileSync } from 'node:child_process';

const siteUrl = new URL(process.env.SITE_URL || 'https://yvadev.com');
const key = '144368cc21c84de0a965d0b3a4a818a9';
const keyLocation = new URL(`/${key}.txt`, siteUrl).toString();
const endpoint = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const before = valueFor('--before');
const after = valueFor('--after') || 'HEAD';
const dryRun = args.includes('--dry-run');

function changedFiles() {
  if (!before || /^0+$/.test(before)) {
    return null;
  }

  try {
    return execFileSync('git', ['diff', '--name-only', before, after], {
      encoding: 'utf8',
    })
      .split(/\r?\n/)
      .map((file) => file.trim())
      .filter(Boolean);
  } catch {
    return null;
  }
}

async function sitemapUrls() {
  const response = await fetch(new URL('/sitemap.xml', siteUrl));
  if (!response.ok) {
    throw new Error(`Unable to read sitemap: HTTP ${response.status}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

async function urlsToSubmit() {
  const files = changedFiles();
  const globalPrefixes = ['app/', 'components/', 'lib/', 'public/', 'styles/'];
  const globalFiles = new Set([
    'next.config.js',
    'next.config.mjs',
    'tailwind.config.ts',
  ]);

  if (
    files === null ||
    files.some((file) => globalPrefixes.some((prefix) => file.startsWith(prefix)) || globalFiles.has(file))
  ) {
    return sitemapUrls();
  }

  const urls = new Set();
  for (const file of files) {
    const match = file.match(/^content\/posts\/(.+)\.mdx$/);
    if (match) {
      urls.add(new URL(`/blog/${match[1]}`, siteUrl).toString());
    }
  }

  if (urls.size > 0) {
    urls.add(siteUrl.toString());
    urls.add(new URL('/blog', siteUrl).toString());
    urls.add(new URL('/topics', siteUrl).toString());
  }

  return [...urls];
}

async function main() {
  const urlList = [...new Set(await urlsToSubmit())]
    .filter((url) => new URL(url).host === siteUrl.host)
    .slice(0, 10_000);

  if (urlList.length === 0) {
    console.log('No indexable URL changed; skipping IndexNow.');
    return;
  }

  const payload = {
    host: siteUrl.host,
    key,
    keyLocation,
    urlList,
  };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (![200, 202].includes(response.status)) {
    const body = await response.text();
    throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${body}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s) with HTTP ${response.status}.`);
}

await main();
