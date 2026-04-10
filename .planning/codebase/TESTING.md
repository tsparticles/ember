# Testing Patterns

**Analysis Date:** 2026-04-10

## Test Framework

**Runner:**
- QUnit `^2.25.0` with Ember test harness (`ember-qunit` `^9.0.4`) in `components/ember/package.json`.
- Config: `components/ember/testem.js` (browser launcher, CI headless flags, test page) and bootstrap in `components/ember/tests/test-helper.ts`.

**Assertion Library:**
- QUnit assertions + `qunit-dom` DOM assertions (`assert.dom(...)`) as configured in `components/ember/tests/test-helper.ts` and used in `components/ember/tests/integration/components/particles-test.ts`.

**Run Commands:**
```bash
pnpm --filter @tsparticles/ember run test:ember        # Run Ember test suite
pnpm --filter @tsparticles/ember run test              # Lint + tests (composite)
pnpm --filter @tsparticles/ember exec ember test --server  # Watch mode during development
```

## Test File Organization

**Location:**
- Primary tests are under `components/ember/tests/`.
- Integration tests follow Ember standard directory layout: `components/ember/tests/integration/components/`.
- Shared fixtures/helpers live in `components/ember/tests/helpers/`.

**Naming:**
- Use `*-test.ts` for test files, e.g. `components/ember/tests/integration/components/particles-test.ts`.

**Structure:**
```
components/ember/tests/
├── integration/components/*-test.ts
├── helpers/*.ts
└── test-helper.ts
```

## Test Structure

**Suite Organization:**
```typescript
module('Integration | Component | particles', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    sinon.restore();
  });

  test('generates a unique id', async function (this: Context, assert) {
    await render(hbs`<Particles />`);
    assert.dom('[data-test-id="particles"]').hasAttribute('id');
  });
});
```
Pattern source: `components/ember/tests/integration/components/particles-test.ts`.

**Patterns:**
- Setup pattern: `setupRenderingTest(hooks)` for component rendering tests in `components/ember/tests/integration/components/particles-test.ts`.
- Teardown pattern: global spy/stub cleanup in `hooks.afterEach(() => sinon.restore())` in `components/ember/tests/integration/components/particles-test.ts`.
- Assertion pattern:
  - DOM assertions: `assert.dom(selector).hasAttribute(...)`.
  - Call assertions: `assert.true(spy.calledOnce, '...')`.
  - Async completion: `const done = assert.async(); done();`.

## Mocking

**Framework:** Sinon via `ember-sinon-qunit` and direct `sinon` import (`components/ember/package.json`, `components/ember/tests/integration/components/particles-test.ts`).

**Patterns:**
```typescript
const loadSpy = sinon.spy(tsParticles, 'load');
// ... exercise render ...
assert.true(loadSpy.calledOnce, 'tsparticles engine load has been called');

const loadStub = sinon.stub(tsParticles, 'load');
// ... exercise render ...
assert.true(loadStub.calledOnce, 'tsparticles engine load has been called');
```
Pattern source: `components/ember/tests/integration/components/particles-test.ts`.

**What to Mock:**
- External engine entry points and callbacks (`tsParticles.load`, component callbacks like `particlesInit`) in `components/ember/tests/integration/components/particles-test.ts`.

**What NOT to Mock:**
- Ember rendering primitives and DOM assertions (`render`, `hbs`, `assert.dom`) are used as real integration behavior in `components/ember/tests/integration/components/particles-test.ts`.

## Fixtures and Factories

**Test Data:**
```typescript
export const LINK_OPTIONS = {
  fullScreen: { enable: false },
  particles: { /* ... */ },
  detectRetina: true,
};
```
Pattern source: `components/ember/tests/helpers/particles.ts`.

**Location:**
- Reusable fixture objects are stored in `components/ember/tests/helpers/particles.ts` and imported in tests using alias path `dummy/tests/helpers/particles`.

## Coverage

**Requirements:** None enforced (no coverage thresholds/config detected in `components/ember/package.json`, `components/ember/testem.js`, or root workflow files `/.github/workflows/ci.yml` and `/.github/workflows/nodejs.yml`).

**View Coverage:**
```bash
Not configured
```

## Test Types

**Unit Tests:**
- Not currently implemented (only placeholder directory `components/ember/tests/unit/.gitkeep` present).

**Integration Tests:**
- Primary and active test type. Component behavior is validated by rendering `<Particles />`, asserting DOM attributes, and validating callback/integration behavior in `components/ember/tests/integration/components/particles-test.ts`.

**E2E Tests:**
- Not used (no Playwright/Cypress/TestCafe config detected in repository root or `components/ember/`).

## Common Patterns

**Async Testing:**
```typescript
test('calls the loaded callback', async function (this: Context, assert) {
  assert.expect(0);
  const done = assert.async();

  this.particlesInit = async (engine) => {
    await loadFull(engine);
  };
  this.particlesLoaded = () => {
    done();
  };

  await render(hbs`<Particles @particlesInit={{this.particlesInit}} @particlesLoaded={{this.particlesLoaded}} />`);
});
```
Pattern source: `components/ember/tests/integration/components/particles-test.ts`.

**Error Testing:**
```typescript
Not detected in current test suite.
```
- No explicit assertions for thrown errors from `components/ember/addon/modifiers/particles.ts` are present in `components/ember/tests/integration/components/particles-test.ts`.

---

*Testing analysis: 2026-04-10*
