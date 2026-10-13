import assert from 'node:assert/strict';
import test from 'node:test';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
function fixture(run) {
  const dir = mkdtempSync(join(tmpdir(), 'lava-build-test-'));
  try {
    for (const name of ['dist', 'content', 'render-build.mjs', 'render-comments.mjs']) {
      cpSync(join(root, name), join(dir, name), { recursive: true });
    }
    return run(dir);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}
function snapshot(dir) {
  return files(join(dir, 'dist')).map(path => [path, createHash('sha256').update(readFileSync(path)).digest('hex')]);
}
function build(dir, origin) {
  return spawnSync(process.execPath, [join(dir, 'render-build.mjs')], {
    encoding: 'utf8', env: { ...process.env, SITE_URL: origin },
  });
}
const approved = comment => [{ name: 'Cliente autorizado', comment, approved: true, consent: true }];

test('domain changes preserve the literal text of approved comments on every commercial page', () => fixture(dir => {
  const home = readFileSync(join(dir, 'dist/index.html'), 'utf8');
  const old = new URL(home.match(/<link rel="canonical" href="([^"]+)"/)[1]).origin;
  const comment = `Conheci a empresa pelo site ${old}/ e gostei do atendimento.`;
  writeFileSync(join(dir, 'content/comentarios-aprovados.json'), JSON.stringify(approved(comment)));
  for (const origin of ['https://lava-mais.example', 'https://www.lava-mais.example']) {
    const result = build(dir, origin);
    assert.equal(result.status, 0, result.stderr);
    const pages = files(join(dir, 'dist')).filter(path => path.endsWith('.html') && !path.includes('/privacidade/'));
    assert.equal(pages.length, 5);
    for (const path of pages) {
      const html = readFileSync(path, 'utf8');
      assert.ok(html.includes(comment), `Customer text changed in ${path}`);
      assert.ok(html.includes(`href="${origin}`), `Origin not updated in ${path}`);
    }
  }
}));

test('invalid origins fail before changing any published asset', () => fixture(dir => {
  const before = snapshot(dir);
  for (const origin of [
    'https://lava&mais.example', 'https://exa"mple.example', 'https://bad host.example',
    'https://-bad.example', 'https://bad..example', 'https://example.com:abc',
    'https://example.com:0', 'https://example.com:65536', 'http://example.com',
    'https://user:password@example.com', 'https://example.com/path',
    'https://example.com?query=1', 'https://example.com#section',
  ]) {
    const result = build(dir, origin);
    assert.notEqual(result.status, 0, origin);
    assert.deepEqual(snapshot(dir), before, `Partial write for ${origin}`);
  }
}));

test('valid domains, punycode and HTTPS ports produce matching canonical and sitemap origins', () => fixture(dir => {
  for (const input of ['https://www.lava-mais.example', 'https://xn--caf-dma.example', 'https://lava-mais.example:8443', 'https://lava-mais.example:443/']) {
    const result = build(dir, input);
    assert.equal(result.status, 0, result.stderr);
    const origin = new URL(input).origin;
    const home = readFileSync(join(dir, 'dist/index.html'), 'utf8');
    assert.ok(home.includes(`<link rel="canonical" href="${origin}/">`));
    assert.ok(readFileSync(join(dir, 'dist/sitemap.xml'), 'utf8').includes(`<loc>${origin}/</loc>`));
  }
}));

test('pending or invalid comments cannot cause a partial domain update', () => fixture(dir => {
  const before = snapshot(dir);
  const path = join(dir, 'content/comentarios-aprovados.json');
  for (const input of [
    JSON.stringify([{ ...approved('Comentário real para revisão.')[0], approved: false }]),
    JSON.stringify([{ ...approved('Comentário real para revisão.')[0], consent: false }]),
    '[invalid JSON',
  ]) {
    writeFileSync(path, input);
    const result = build(dir, 'https://lava-mais.example');
    assert.notEqual(result.status, 0);
    assert.deepEqual(snapshot(dir), before);
  }
}));
