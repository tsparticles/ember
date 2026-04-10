# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**
- TypeScript 6.x - Addon logic and typed test/dummy app code in `components/ember/addon/**/*.ts`, `components/ember/tests/**/*.ts`, and compiler config in `components/ember/tsconfig.json`.
- JavaScript (Node/CommonJS + Ember re-export files) - Build/config/runtime glue in `components/ember/index.js`, `components/ember/ember-cli-build.js`, `components/ember/config/environment.js`, and root workspace config in `package.json`.

**Secondary:**
- Handlebars (Ember templates) - Component and dummy app templates in `components/ember/addon/components/particles.hbs` and `components/ember/tests/dummy/app/templates/application.hbs`.
- YAML - CI and workspace package grouping in `.github/workflows/*.yml` and `pnpm-workspace.yaml`.

## Runtime

**Environment:**
- Node.js 14+ for package compatibility (`components/ember/package.json` `engines.node`).
- CI currently runs Node 20 in `.github/workflows/nodejs.yml` and Node 16 in `.github/workflows/ci.yml`.

**Package Manager:**
- pnpm 10.33.0 declared at workspace root in `package.json` (`packageManager`).
- Lerna configured to use pnpm in `lerna.json` (`npmClient: pnpm`).
- Lockfile: present (`pnpm-lock.yaml`).

## Frameworks

**Core:**
- Ember.js / Ember Source `~6.12.0` - Addon host framework (`components/ember/package.json`).
- Ember CLI `~6.11.2` - Build/test command surface (`components/ember/package.json`, `components/ember/ember-cli-build.js`).
- ember-modifier `^4.3.0` - Core modifier abstraction used by the particles integration (`components/ember/addon/modifiers/particles.ts`).
- tsParticles Engine `@tsparticles/engine ^3.9.1` - Runtime particle engine loaded by the addon modifier (`components/ember/addon/modifiers/particles.ts`).

**Testing:**
- QUnit `^2.25.0` + ember-qunit `^9.0.4` - Test runner and Ember test integration (`components/ember/package.json`, `components/ember/tests/integration/components/particles-test.ts`).
- @ember/test-helpers `^5.4.1` - Rendering and async test helpers (`components/ember/tests/integration/components/particles-test.ts`).
- Sinon `^21.0.1` + ember-sinon-qunit `^7.5.0` - Spies/stubs for engine calls (`components/ember/tests/integration/components/particles-test.ts`).

**Build/Dev:**
- ember-cli-typescript `^5.3.0` + TypeScript `^6.0.2` - Type-checking and TS transpilation (`components/ember/package.json`, `components/ember/tsconfig.json`).
- ember-auto-import `^2.13.1` + webpack `^5.106.0` - Package auto-import and bundling (`components/ember/package.json`).
- Embroider test setup `^4.0.0` - Optional modern build pipeline in tests (`components/ember/ember-cli-build.js`).
- Nx `^22.6.4` + Lerna `^8.2.4` - Monorepo orchestration (`package.json`, `nx.json`, `lerna.json`).

## Key Dependencies

**Critical:**
- `@tsparticles/engine` `^3.9.1` - Core rendering engine invoked through `tsParticles.load` in `components/ember/addon/modifiers/particles.ts`.
- `tsparticles` `^3.9.1` - Full feature loader used in examples/tests (`README.md`, `components/ember/tests/integration/components/particles-test.ts`).
- `ember-modifier` `^4.3.0` - Lifecycle wrapper around DOM element binding (`components/ember/addon/modifiers/particles.ts`).
- `ember-cli-typescript` `^5.3.0` - Required for typed addon/test code (`components/ember/tsconfig.json`).

**Infrastructure:**
- `pnpm` workspace + lockfile - Deterministic installs and workspace linking (`pnpm-workspace.yaml`, `pnpm-lock.yaml`).
- `lerna` - Runs package-level scripts in CI and local build (`package.json` scripts, `.github/workflows/ci.yml`).
- `nx` - Cached task execution defaults (`nx.json`).
- `husky` + `@commitlint/*` - Commit workflow enforcement configured at root dependencies (`package.json`).

## Configuration

**Environment:**
- Base addon runtime configuration is minimal and static in `components/ember/config/environment.js`.
- Dummy app environment matrix (dev/test/prod switches) is configured in `components/ember/tests/dummy/config/environment.js`.
- CI-aware browser launch behavior uses `process.env.CI` in `components/ember/testem.js`.
- `.env*` files: Not detected in repository root (`/Users/matteo/Projects/GitHub/tsparticles/ember`).

**Build:**
- Workspace/build orchestration: `package.json`, `lerna.json`, `nx.json`, `pnpm-workspace.yaml`.
- Ember addon build: `components/ember/ember-cli-build.js`, `components/ember/index.js`.
- TypeScript: `components/ember/tsconfig.json`.
- Lint/format settings: `components/ember/.eslintrc.js`, `components/ember/.prettierrc.js`, `components/ember/.template-lintrc.js`.
- CI pipelines: `.github/workflows/ci.yml`, `.github/workflows/nodejs.yml`.

## Platform Requirements

**Development:**
- Use Node >=14 to satisfy addon engine constraints (`components/ember/package.json`).
- Use pnpm workspace tooling from root (`package.json` + `pnpm-lock.yaml`).
- Use Ember CLI commands defined in `components/ember/package.json` (`build`, `start`, `test:ember`).

**Production:**
- Deployment target is npm package distribution of the Ember addon (`components/ember/package.json` name `@tsparticles/ember`).
- Runtime target is browser/DOM canvas via Ember app consumption (`components/ember/addon/components/particles.hbs`, `components/ember/addon/modifiers/particles.ts`).

---

*Stack analysis: 2026-04-10*
