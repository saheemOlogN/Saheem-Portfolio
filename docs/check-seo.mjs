import fs from 'node:fs'
import assert from 'node:assert/strict'
const html = fs.readFileSync('dist/index.html', 'utf8')
const site = 'https://saheem-nakhwa.vercel.app/'
assert.match(
  html,
  /<link rel="canonical" href="https:\/\/saheem-nakhwa.vercel.app\/"/,
)
assert.match(html, /<div id="root"><\/div>/)
assert.ok(!html.includes('<h1>Saheem Nakhwa — Full-Stack Developer</h1>'))
assert.match(html, /<noscript>/)
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
)
assert.equal(
  schema['@graph'].find((item) => item['@type'] === 'Person').name,
  'Saheem Nakhwa',
)
assert.ok(!html.includes('localhost'))
assert.ok(
  fs.readFileSync('dist/robots.txt', 'utf8').includes(site + 'sitemap.xml'),
)
assert.ok(
  fs
    .readFileSync('dist/sitemap.xml', 'utf8')
    .includes('<loc>' + site + '</loc>'),
)
for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g))
  assert.ok(fs.existsSync('dist' + match[1]), match[1])
console.log(
  'SEO checks passed: canonical, structured data, empty React root, no fallback-page flash, robots, sitemap and local assets.',
)
