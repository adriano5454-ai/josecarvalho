import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { readApprovedComments, renderApprovedComments } from '../render-comments.mjs';

const renderer = fileURLToPath(new URL('../render-comments.mjs', import.meta.url));
const record = overrides => ({
  name: 'Maria', comment: 'Atendimento muito cuidadoso.',
  approved: true, consent: true, ...overrides,
});

test('empty array has no published testimonial markup', () => {
  assert.equal(renderApprovedComments([]), '');
});

test('approved content is escaped in every text field', () => {
  const html = renderApprovedComments([record({
    name: '  A & <B> "C" \'D\'  ',
    comment: '<script>alert("test")</script> & \'care\'',
    service: 'Sofá & <cortina> "azul" \'verde\'',
  })]);
  assert.match(html, /^<div class="testimonial-grid"><article class="testimonial-card">/);
  assert.match(html, /<strong>A &amp; &lt;B&gt; &quot;C&quot; &#39;D&#39;<\/strong>/);
  assert.match(html, /&lt;script&gt;alert\(&quot;test&quot;\)&lt;\/script&gt; &amp; &#39;care&#39;/);
  assert.match(html, /<span>Sofá &amp; &lt;cortina&gt; &quot;azul&quot; &#39;verde&#39;<\/span>/);
  assert.doesNotMatch(html, /<script>|<cortina>|rating|star/i);
});

test('comment line endings and paragraphs are preserved as HTML breaks', () => {
  const html = renderApprovedComments([record({ comment: '  Primeira linha.\r\n\r\nOutra linha.\nÚltima.\rFim.  ' })]);
  assert.match(html, /Primeira linha\.<br><br>Outra linha\.<br>Última\.<br>Fim\./);
});

test('optional service is omitted when absent or blank', () => {
  assert.doesNotMatch(renderApprovedComments([record()]), /<span>/);
  assert.doesNotMatch(renderApprovedComments([record({ service: '   ' })]), /<span>/);
});

test('approval and publication consent require literal true, failing the entire batch', () => {
  for (const field of ['approved', 'consent']) {
    for (const value of [false, undefined, null, 'true', 1]) {
      assert.throws(
        () => renderApprovedComments([record(), record({ [field]: value })]),
        new RegExp(`Comment 2 must have ${field} set to true`),
      );
    }
  }
});

test('malformed fields, missing fields, and unsupported fields fail validation', () => {
  for (const input of [null, {}, 'comments', 1]) {
    assert.throws(() => renderApprovedComments(input), /must be a JSON array/);
  }
  for (const input of [null, [], 'comment', 12]) {
    assert.throws(() => renderApprovedComments([input]), /must be an object/);
  }
  for (const input of [undefined, null, 1, {}, '', '   ', 'a'.repeat(81)]) {
    assert.throws(() => renderApprovedComments([record({ name: input })]), /name must/);
  }
  for (const input of [undefined, null, 1, {}, '', '   ', 'a'.repeat(9), 'a'.repeat(1201)]) {
    assert.throws(() => renderApprovedComments([record({ comment: input })]), /comment must/);
  }
  for (const input of [null, 1, {}, 'a'.repeat(81)]) {
    assert.throws(() => renderApprovedComments([record({ service: input })]), /service must/);
  }
  assert.throws(() => renderApprovedComments([record({ rating: 5 })]), /unsupported field: rating/);
});

test('boundary lengths and maximum record count are accepted; excessive count fails', () => {
  assert.match(renderApprovedComments([record({ name: 'x', comment: 'x'.repeat(10) })]), /<strong>x<\/strong>/);
  assert.match(renderApprovedComments([record({ name: 'x'.repeat(80), comment: 'x'.repeat(1200), service: 'x'.repeat(80) })]), /testimonial-card/);
  assert.equal((renderApprovedComments(Array.from({ length: 100 }, () => record())).match(/<article /g) || []).length, 100);
  assert.throws(() => renderApprovedComments(Array.from({ length: 101 }, () => record())), /at most 100/);
});

test('reader validates actual file content and reports invalid JSON', () => {
  const directory = mkdtempSync(join(tmpdir(), 'lava-comments-'));
  try {
    const path = join(directory, 'comments.json');
    writeFileSync(path, JSON.stringify([record({ name: ' Maria ', service: ' Sofás ' })]));
    assert.deepEqual(readApprovedComments(path), [record({ name: 'Maria', service: 'Sofás' })]);
    writeFileSync(path, '[broken json');
    assert.throws(() => readApprovedComments(path), /Could not read approved comments JSON/);
    writeFileSync(path, JSON.stringify([record({ approved: false })]));
    assert.throws(() => readApprovedComments(path), /approved set to true/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('CLI supports stdin, emits only HTML, and emits no partial output on failure', () => {
  const valid = spawnSync(process.execPath, [renderer], { input: JSON.stringify([record()]), encoding: 'utf8' });
  assert.equal(valid.status, 0);
  assert.equal(valid.stderr, '');
  assert.equal(valid.stdout, renderApprovedComments([record()]));

  const invalid = spawnSync(process.execPath, [renderer], {
    input: JSON.stringify([record(), record({ consent: false })]), encoding: 'utf8',
  });
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stdout, '');
  assert.match(invalid.stderr, /Comment 2 must have consent set to true/);
});

test('CLI reads file path and importing the module has no CLI side effect', () => {
  const directory = mkdtempSync(join(tmpdir(), 'lava-comments-cli-'));
  try {
    const path = join(directory, 'comments.json');
    writeFileSync(path, JSON.stringify([record()]));
    const cli = spawnSync(process.execPath, [renderer, path], { encoding: 'utf8' });
    assert.equal(cli.status, 0);
    assert.equal(cli.stderr, '');
    assert.equal(cli.stdout, renderApprovedComments([record()]));
    const imported = spawnSync(process.execPath, ['--input-type=module', '-e', `await import(${JSON.stringify(new URL('../render-comments.mjs', import.meta.url).href)});`], { encoding: 'utf8' });
    assert.equal(imported.status, 0);
    assert.equal(imported.stdout, '');
    assert.equal(imported.stderr, '');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
