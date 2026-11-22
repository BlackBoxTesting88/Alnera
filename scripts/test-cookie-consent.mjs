import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../app/legal/consent-store.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const sandbox = { exports: {} };
vm.runInNewContext(compiled, sandbox);
const { createConsent, parseConsent, mayUseMarketing, consentLifetime } = sandbox.exports;
const now = 1_800_000_000_000;
const version = 'test-policy:off';

test('unknown or malformed preferences fail closed', () => {
  for (const raw of [null, '', '{', '[]', '{}', 'true', 'null']) assert.equal(parseConsent(raw, version, now), null);
});
test('explicit rejection is preserved and never grants marketing', () => {
  const result = parseConsent(JSON.stringify(createConsent(false, version, now)), version, now + 1);
  assert.equal(result.marketing, false);
  assert.equal(mayUseMarketing(result, true), false);
});
test('marketing requires both consent and an available integration', () => {
  const result = parseConsent(JSON.stringify(createConsent(true, version, now)), version, now + 1);
  assert.equal(mayUseMarketing(result, false), false);
  assert.equal(mayUseMarketing(null, true), false);
  assert.equal(mayUseMarketing(result, true), true);
});
test('policy changes and expiration require a fresh decision', () => {
  const raw = JSON.stringify(createConsent(true, version, now));
  assert.equal(parseConsent(raw, 'next-policy', now + 1), null);
  assert.equal(parseConsent(raw, version, now + consentLifetime), null);
});
test('invalid timestamps and required-category tampering are rejected', () => {
  for (const patch of [{necessary:false}, {marketing:'yes'}, {updatedAt:now+120000}, {expiresAt:now-1}, {expiresAt:now+consentLifetime+1}]) {
    assert.equal(parseConsent(JSON.stringify({...createConsent(true,version,now),...patch}), version, now), null);
  }
});
