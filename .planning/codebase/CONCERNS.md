# Codebase Concerns

**Analysis Date:** 2026-04-10

## Tech Debt

**Documentation duplication and drift:**
- Issue: `components/ember/README.md` contains repeated sections (entire usage blocks duplicated multiple times), which increases maintenance cost and causes documentation drift.
- Files: `components/ember/README.md`
- Impact: Updates to usage/API guidance can become inconsistent across duplicate sections; consumers may follow stale examples.
- Fix approach: Deduplicate `components/ember/README.md` into single sections per topic and keep one canonical example per feature.

**Toolchain/version inconsistency across CI and workspace:**
- Issue: CI workflows and workspace metadata use different Node/pnpm baselines (`node 16` in `ci.yml`, `node 20` in `nodejs.yml`, `pnpm@10` in root `package.json`, and pnpm action pinned to `8` in workflows).
- Files: `.github/workflows/ci.yml`, `.github/workflows/nodejs.yml`, `package.json`, `components/ember/package.json`
- Impact: Build/test behavior can differ between pipelines and local development, creating non-reproducible failures.
- Fix approach: Standardize Node and pnpm versions across workflows and package metadata, then enforce via a single documented baseline.

## Known Bugs

**Preset loading is currently non-functional in tests/demo path:**
- Symptoms: Preset-loading integration test is explicitly skipped with `skip('Preset loading is not working')`; related implementation is commented out.
- Files: `components/ember/tests/integration/components/particles-test.ts`, `components/ember/tests/dummy/app/controllers/application.ts`
- Trigger: Rendering `Particles` with preset-based initialization path.
- Workaround: Use explicit options objects (`@options`) plus `loadFull` path instead of preset loader callback.

## Security Considerations

**Unrestricted remote config URL consumption:**
- Risk: `@url` is passed directly to `tsParticles.load` without validation/sanitization, allowing arbitrary remote JSON fetches in browser context.
- Files: `components/ember/addon/modifiers/particles.ts`, `components/ember/README.md`
- Current mitigation: Not detected in addon code.
- Recommendations: Add optional URL validation/allowlist hook (protocol/domain checks), document trusted-source requirement, and provide callback for fetch/load failures.

## Performance Bottlenecks

**Potential repeated engine initialization on modifier updates:**
- Problem: The modifier `modify` method always calls `tsParticles.load(...)` when invoked, with no guard against equivalent args.
- Files: `components/ember/addon/modifiers/particles.ts`
- Cause: No memoization or diffing of `options`/`url` inputs before reloading container.
- Improvement path: Cache last applied config per element and skip reload when unchanged; optionally support incremental update path if tsParticles API allows.

## Fragile Areas

**ID generation polyfill relies on suppressed TypeScript error and random string trick:**
- Files: `components/ember/addon/helpers/unique-id-polyfill.ts`, `components/ember/addon/components/particles.hbs`
- Why fragile: Uses a cryptic one-liner with `@ts-expect-error`; low readability and high chance of accidental breakage during refactors/tooling upgrades.
- Safe modification: Replace with explicit UUID utility (or Ember-native stable helper) and keep template ID format contract unchanged.
- Test coverage: Only indirect coverage via `hasAttribute('id')` in `components/ember/tests/integration/components/particles-test.ts`; no direct uniqueness/collision tests.

## Scaling Limits

**Compatibility/testing matrix has narrow functional assertions:**
- Current capacity: One integration test file covers happy-path rendering/callbacks and contains one skipped scenario.
- Limit: Behavioral regressions in teardown, error path, and preset loading can pass CI undetected as feature surface expands.
- Scaling path: Expand integration suite and add unit-level tests for modifier lifecycle and failure branches.

## Dependencies at Risk

**`babel-eslint` is legacy/deprecated in modern ESLint stacks:**
- Risk: Parser incompatibility and maintenance gaps when upgrading ESLint/TypeScript/Ember tooling.
- Impact: Lint pipeline instability and blocked dependency updates.
- Migration plan: Replace `babel-eslint` with `@babel/eslint-parser` (or Ember-recommended parser setup), validate with existing `.eslintrc.js` overrides.

## Missing Critical Features

**No explicit error callback path for tsParticles load failures:**
- Problem: Public API exposes `particlesInit` and `particlesLoaded` callbacks, but no error callback from `tsParticles.load` failures is surfaced.
- Blocks: Consumers cannot reliably instrument fallback UI/telemetry on load errors.

## Test Coverage Gaps

**Modifier lifecycle teardown is not explicitly asserted:**
- What's not tested: Destruction path calling `container?.destroy()` through registered destructor.
- Files: `components/ember/addon/modifiers/particles.ts`, `components/ember/tests/integration/components/particles-test.ts`
- Risk: Memory leaks/canvas residue regressions may ship unnoticed.
- Priority: High

**Error branch for missing element `id` is untested:**
- What's not tested: Throw path `The specified element must have an id attribute.`
- Files: `components/ember/addon/modifiers/particles.ts`, `components/ember/tests/integration/components/particles-test.ts`
- Risk: Runtime exceptions may be triggered by template/customization changes without test guardrails.
- Priority: Medium

**No unit test suite exists despite unit test directory placeholder:**
- What's not tested: Helper-level logic and isolated modifier behavior under controlled inputs.
- Files: `components/ember/tests/unit/.gitkeep`, `components/ember/addon/helpers/unique-id-polyfill.ts`, `components/ember/addon/modifiers/particles.ts`
- Risk: Low-level regressions are only caught indirectly via rendering tests.
- Priority: Medium

---

*Concerns audit: 2026-04-10*
