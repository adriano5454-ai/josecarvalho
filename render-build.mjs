// Uses prebuilt static pages; no dependencies or framework installation required.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const output = join(import.meta.dirname, 'dist');
const files = [];
function visit(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) visit(path);
    else if (/\.(html|xml|txt)$/.test(entry.name)) files.push(path);
  }
}
visit(output);
const home = readFileSync(join(output, 'index.html'), 'utf8');
const current = new URL(home.match(/<link rel="canonical" href="([^"]+)"/)[1]).origin;
const target = new URL(process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || current);
if (target.protocol !== 'https:' || target.username || target.password || target.search || target.hash || target.pathname !== '/') {
  throw new Error('SITE_URL must be an HTTPS origin, with no path, query, fragment or credentials.');
}
const previous = new Set([current]);
for (const file of files.filter(file => file.endsWith('.html'))) {
  const match = readFileSync(file, 'utf8').match(/<link rel="canonical" href="([^"]+)"/);
  if (match) previous.add(new URL(match[1]).origin);
}
for (const file of files) {
  let content = readFileSync(file, 'utf8');
  for (const old of previous) content = content.split(old).join(target.origin);
  writeFileSync(file, content);
}
console.log(`Static site ready: ${target.origin}; canonical URLs, schema, social metadata and sitemap aligned.`);
