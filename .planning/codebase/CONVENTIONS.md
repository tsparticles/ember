# Coding Conventions

**Analysis Date:** 2026-04-10

## Naming Patterns

**Files:**
- Use `kebab-case` for feature files and tests: `components/ember/addon/modifiers/particles.ts`, `components/ember/addon/helpers/unique-id-polyfill.ts`, `components/ember/tests/integration/components/particles-test.ts`.
- Use Ember addon re-export shims in `app/` with the same basename as addon modules: `components/ember/app/components/particles.js`, `components/ember/app/modifiers/particles.js`, `components/ember/app/helpers/unique-id-polyfill.js`.

**Functions:**
- Use `camelCase` for function and method names: `loadFullOptions`, `loadStarsPreset`, `loadedCallback` in `components/ember/tests/dummy/app/controllers/application.ts`.
- Use `async` methods for lifecycle and callback flows that call tsParticles APIs: `modify` in `components/ember/addon/modifiers/particles.ts` and async test functions in `components/ember/tests/integration/components/particles-test.ts`.

**Variables:**
- Use `camelCase` for mutable/local symbols: `container`, `loadSpy`, `particlesInitSpy` in `components/ember/addon/modifiers/particles.ts` and `components/ember/tests/integration/components/particles-test.ts`.
- Use `UPPER_SNAKE_CASE` for reusable constants and selector maps: `LINK_OPTIONS` in `components/ember/tests/helpers/particles.ts`, `SELECTORS` in `components/ember/tests/integration/components/particles-test.ts`.

**Types:**
- Use `PascalCase` for interfaces and classes: `ParticlesModifierSignature`, `Context`, `ApplicationController` in `components/ember/addon/modifiers/particles.ts`, `components/ember/tests/integration/components/particles-test.ts`, and `components/ember/tests/dummy/app/controllers/application.ts`.
- Use type-only imports where applicable: `import type { Container, Engine, Options }` in `components/ember/addon/modifiers/particles.ts`.

## Code Style

**Formatting:**
- Tool used: Prettier via `components/ember/.prettierrc.js` and lint pipeline in `components/ember/package.json`.
- Key settings:
  - `singleQuote: true` in `components/ember/.prettierrc.js`.
  - 2-space indentation, LF line endings, UTF-8, trim trailing whitespace in `components/ember/.editorconfig`.
  - Keep no final newline in Handlebars templates (`[*.hbs]`) per `components/ember/.editorconfig`.

**Linting:**
- Tool used: ESLint (`components/ember/.eslintrc.js`) with `eslint-plugin-ember`, `eslint-plugin-qunit`, `eslint-plugin-prettier`, and `eslint-plugin-node`.
- Key rules/config:
  - Base extends: `eslint:recommended`, `plugin:ember/recommended`, `plugin:prettier/recommended`.
  - Test override applies `plugin:qunit/recommended` for `tests/**/*-test.{js,ts}`.
  - Node/config files use `plugin:node/recommended` with `sourceType: 'script'` for files such as `components/ember/testem.js` and `components/ember/ember-cli-build.js`.
  - Template linting uses `extends: 'recommended'` in `components/ember/.template-lintrc.js`.

## Import Organization

**Order:**
1. Ember/platform and third-party imports first (e.g., `@ember/test-helpers`, `qunit`, `sinon`, `tsparticles`) in `components/ember/tests/integration/components/particles-test.ts`.
2. Local app/test imports next (e.g., `dummy/tests/helpers/particles`, `../utils/options`) in `components/ember/tests/integration/components/particles-test.ts` and `components/ember/tests/dummy/app/controllers/application.ts`.
3. Keep type imports explicit when supported (`import type`) as shown in `components/ember/addon/modifiers/particles.ts`.

**Path Aliases:**
- Use aliases defined in `components/ember/tsconfig.json`:
  - `dummy/tests/*` → `tests/*`
  - `dummy/*` → `tests/dummy/app/*`, `app/*`
  - `ember-tsparticles` and `ember-tsparticles/*` → `addon` paths
  - `*` → `types/*`

## Error Handling

**Patterns:**
- Validate required DOM preconditions and fail fast with `throw new Error(...)` before invoking tsParticles APIs, as in `components/ember/addon/modifiers/particles.ts`.
- Prefer optional checks before callback execution (`if (particlesInit)`, `if (particlesLoaded && container)`) in `components/ember/addon/modifiers/particles.ts`.
- Cleanup side effects with Ember destructors (`registerDestructor`) rather than relying on implicit teardown in `components/ember/addon/modifiers/particles.ts`.

## Logging

**Framework:** console

**Patterns:**
- Restrict `console.log` to dummy/demo app code (`components/ember/tests/dummy/app/controllers/application.ts`).
- Keep addon runtime modules (`components/ember/addon/modifiers/particles.ts`, `components/ember/addon/helpers/unique-id-polyfill.ts`) free of logging.

## Comments

**When to Comment:**
- Add targeted comments for framework/tooling behavior and non-obvious constraints, e.g. Testem container notes in `components/ember/testem.js` and polyfill rationale in `components/ember/addon/helpers/unique-id-polyfill.ts`.
- Use inline template-lint suppression only where required by Ember template semantics, e.g. `components/ember/addon/components/particles.hbs`.

**JSDoc/TSDoc:**
- Not used in addon/test runtime files (`components/ember/addon/**/*.ts`, `components/ember/tests/**/*.ts`).

## Function Design

**Size:**
- Keep methods compact and single-purpose. Example: `modify` in `components/ember/addon/modifiers/particles.ts` performs validation, init, load, callback, and teardown in one linear flow.

**Parameters:**
- Use typed named args for modifier APIs via signature interfaces (`ParticlesModifierSignature`) in `components/ember/addon/modifiers/particles.ts`.
- Use strongly-typed callback parameters (`Engine`, `Container`) in `components/ember/tests/dummy/app/controllers/application.ts` and `components/ember/tests/integration/components/particles-test.ts`.

**Return Values:**
- Async functions return `Promise<void>` implicitly for setup/callback methods (`modify`, `loadFullOptions`, test cases) in `components/ember/addon/modifiers/particles.ts`, `components/ember/tests/dummy/app/controllers/application.ts`, and `components/ember/tests/integration/components/particles-test.ts`.

## Module Design

**Exports:**
- Use default exports for primary module unit (classes/helpers): `components/ember/addon/modifiers/particles.ts`, `components/ember/addon/helpers/unique-id-polyfill.ts`, `components/ember/tests/dummy/app/controllers/application.ts`.
- Use named exports for reusable test fixtures/constants: `components/ember/tests/helpers/particles.ts`.

**Barrel Files:**
- Traditional barrel files are not used.
- Ember re-export bridge modules in `components/ember/app/*.js` are used to expose addon implementations to consuming apps.

---

*Convention analysis: 2026-04-10*
