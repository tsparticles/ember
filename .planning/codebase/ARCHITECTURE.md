# Architecture

**Analysis Date:** 2026-04-10

## Pattern Overview

**Overall:** Ember addon with re-export bridge pattern for host apps

**Key Characteristics:**
- Runtime logic lives in addon source and is exposed to consuming apps through Ember re-export shims.
- UI/template concerns are thin; the core behavior is encapsulated in an element modifier that initializes and tears down tsParticles instances.
- Repository-level workspace orchestration (pnpm + Lerna + Nx) is separate from addon runtime and focuses on building/testing package projects.

## Layers

**Workspace/Monorepo Orchestration Layer:**
- Purpose: Coordinate package discovery and cross-project build execution.
- Location: `package.json`, `pnpm-workspace.yaml`, `lerna.json`, `nx.json`
- Contains: Workspace declarations, build scripts, task caching defaults.
- Depends on: `pnpm`, `lerna`, `nx` tooling declared in root `package.json`.
- Used by: Local development and CI build/test commands.

**Addon Runtime Layer (Source of Truth):**
- Purpose: Implement addon functionality used by host Ember apps.
- Location: `components/ember/addon/`
- Contains: Component template `components/ember/addon/components/particles.hbs`, modifier `components/ember/addon/modifiers/particles.ts`, helper `components/ember/addon/helpers/unique-id-polyfill.ts`.
- Depends on: Ember APIs (`ember-modifier`, `@ember/destroyable`, helper API), tsParticles engine (`@tsparticles/engine`).
- Used by: Re-export layer and all consuming applications installing `@tsparticles/ember`.

**Public Re-export Layer (Addon-to-App Bridge):**
- Purpose: Re-export addon modules into the host app namespace Ember expects.
- Location: `components/ember/app/`
- Contains: Re-export files `components/ember/app/components/particles.js`, `components/ember/app/modifiers/particles.js`, `components/ember/app/helpers/unique-id-polyfill.js`.
- Depends on: Addon runtime module paths (`ember-tsparticles/...` alias from `components/ember/tsconfig.json`).
- Used by: Host app resolver when rendering `<Particles>` or invoking the modifier/helper.

**Dummy Application Layer (Development + Verification):**
- Purpose: Provide runnable example app for manual validation and integration behavior.
- Location: `components/ember/tests/dummy/app/`
- Contains: App bootstrap (`app.ts`, `router.ts`), controller orchestrating options/callbacks (`controllers/application.ts`), template usage (`templates/application.hbs`), sample config objects (`utils/options.ts`).
- Depends on: Addon public API and tsParticles preset/full loaders.
- Used by: `ember serve` and test pipeline assets.

**Test Layer:**
- Purpose: Validate integration behavior of component/modifier interaction.
- Location: `components/ember/tests/`
- Contains: Rendering tests `components/ember/tests/integration/components/particles-test.ts`, setup/bootstrap helpers `components/ember/tests/test-helper.ts`, helper wrappers `components/ember/tests/helpers/index.js`.
- Depends on: `ember-qunit`, `@ember/test-helpers`, `qunit-dom`, `sinon`, dummy app resolver paths.
- Used by: `ember test` and CI browser runs configured in `components/ember/testem.js`.

## Data Flow

**Particles render and lifecycle flow:**

1. Consumer renders `<Particles ... />` using `components/ember/addon/components/particles.hbs`, which creates a `<div>` with id `particles-{{unique-id-polyfill}}` unless an explicit id attribute is supplied.
2. The `{{particles ...}}` modifier from `components/ember/addon/modifiers/particles.ts` receives named args (`options`, `url`, `particlesInit`, `particlesLoaded`) and the target DOM element.
3. Modifier validates `element.id`, calls optional `particlesInit(tsParticles)`, then calls `tsParticles.load({ id, url, options })`.
4. When load resolves, modifier calls optional `particlesLoaded(container)`.
5. On teardown/re-run, destructor registered via `registerDestructor` destroys the container to release canvas/resources.

**State Management:**
- Addon runtime keeps no long-lived app state; lifecycle state is scoped to modifier invocation and local `container` variable in `components/ember/addon/modifiers/particles.ts`.
- Demo UI state uses Ember tracked properties in `components/ember/tests/dummy/app/controllers/application.ts` (`@tracked isConfettiVisible`).

## Key Abstractions

**Particles Modifier Abstraction:**
- Purpose: Bridge Ember render lifecycle to tsParticles engine lifecycle.
- Examples: `components/ember/addon/modifiers/particles.ts`
- Pattern: Class-based Ember modifier with async `modify()` and destructor registration.

**Template + Modifier Composition Abstraction:**
- Purpose: Keep component template declarative while delegating imperative canvas setup to modifier.
- Examples: `components/ember/addon/components/particles.hbs`
- Pattern: Template-only component invoking a custom modifier with named args.

**Unique Element ID Abstraction:**
- Purpose: Guarantee element id for engine initialization when consumer does not provide one.
- Examples: `components/ember/addon/helpers/unique-id-polyfill.ts`
- Pattern: Stateless helper returning random UUID-like string.

**Re-export Surface Abstraction:**
- Purpose: Publish addon internals to app namespace without duplicating logic.
- Examples: `components/ember/app/components/particles.js`, `components/ember/app/modifiers/particles.js`, `components/ember/app/helpers/unique-id-polyfill.js`
- Pattern: One-line default export forwarding.

## Entry Points

**Package Addon Entry Point:**
- Location: `components/ember/index.js`
- Triggers: Ember CLI addon resolution during build/install.
- Responsibilities: Export addon name metadata from package manifest.

**Consumer UI Entry Point:**
- Location: `components/ember/addon/components/particles.hbs`
- Triggers: Host app template rendering `<Particles>`.
- Responsibilities: Emit target DOM node and bind modifier arguments.

**Imperative Runtime Entry Point:**
- Location: `components/ember/addon/modifiers/particles.ts`
- Triggers: Modifier execution on element insertion/arg changes.
- Responsibilities: Initialize tsParticles engine, run callbacks, clean up container.

**Dummy App Boot Entry Point:**
- Location: `components/ember/tests/dummy/app/app.ts`
- Triggers: `ember serve`/test dummy app startup.
- Responsibilities: Initialize Ember application and load initializers.

**Test Harness Entry Point:**
- Location: `components/ember/tests/test-helper.ts`
- Triggers: `ember test` loading test suite.
- Responsibilities: Set application instance, configure assertions, start test runner.

## Error Handling

**Strategy:** Fail-fast for invalid DOM preconditions, otherwise defer to promise-based async flow.

**Patterns:**
- Explicit precondition error when element id is missing in `components/ember/addon/modifiers/particles.ts`.
- Async/await-based calls to `particlesInit`, `tsParticles.load`, and `particlesLoaded` without local try/catch; errors propagate to Ember/test runtime.

## Cross-Cutting Concerns

**Logging:** Console logging appears only in demo callback (`components/ember/tests/dummy/app/controllers/application.ts`), not in addon runtime path.
**Validation:** Runtime validation is minimal and focused on required element id (`components/ember/addon/modifiers/particles.ts`).
**Authentication:** Not applicable for current addon architecture; no auth subsystem is present in `components/ember/` runtime code.

---

*Architecture analysis: 2026-04-10*
