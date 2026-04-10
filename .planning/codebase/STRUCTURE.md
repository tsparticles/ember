# Codebase Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```text
[project-root]/
├── components/                  # Workspace packages (active addon is here)
│   └── ember/                   # `@tsparticles/ember` addon project
│       ├── addon/               # Addon source implementation
│       ├── app/                 # Re-export bridge for consumer apps
│       ├── config/              # Addon/test scenario configuration
│       ├── tests/               # Integration tests + dummy app
│       ├── types/               # Type declarations and path support
│       ├── index.js             # Addon package entry
│       ├── ember-cli-build.js   # Dummy app build pipeline
│       └── testem.js            # Browser test runner config
├── .planning/codebase/          # Generated architecture/quality/stack mapping docs
├── package.json                 # Workspace scripts and package manager metadata
├── pnpm-workspace.yaml          # pnpm package globs
├── lerna.json                   # Lerna package and versioning config
└── nx.json                      # Nx target defaults/cache behavior
```

## Directory Purposes

**`components/ember/addon/`:**
- Purpose: Hold canonical addon runtime implementation.
- Contains: Ember template/component artifacts, modifier logic, helpers.
- Key files: `components/ember/addon/components/particles.hbs`, `components/ember/addon/modifiers/particles.ts`, `components/ember/addon/helpers/unique-id-polyfill.ts`

**`components/ember/app/`:**
- Purpose: Re-export addon modules into host app namespace.
- Contains: One-line re-export modules for components/helpers/modifiers.
- Key files: `components/ember/app/components/particles.js`, `components/ember/app/modifiers/particles.js`, `components/ember/app/helpers/unique-id-polyfill.js`

**`components/ember/tests/`:**
- Purpose: Store automated tests and dummy Ember app used for manual/runtime verification.
- Contains: Integration tests, test setup, dummy app source/config/assets.
- Key files: `components/ember/tests/integration/components/particles-test.ts`, `components/ember/tests/test-helper.ts`, `components/ember/tests/dummy/app/templates/application.hbs`, `components/ember/tests/dummy/app/controllers/application.ts`

**`components/ember/config/`:**
- Purpose: Addon-level config and Ember version scenario matrix.
- Contains: Environment config and ember-try scenarios.
- Key files: `components/ember/config/environment.js`, `components/ember/config/ember-try.js`

**`components/ember/types/`:**
- Purpose: TypeScript declaration support for templates and dummy namespace.
- Contains: `.d.ts` declarations used by TS compiler path mapping.
- Key files: `components/ember/types/global.d.ts`, `components/ember/types/dummy/index.d.ts`

## Key File Locations

**Entry Points:**
- `components/ember/index.js`: Addon package entry exported to Ember CLI.
- `components/ember/addon/components/particles.hbs`: Primary render entry for consumer usage.
- `components/ember/addon/modifiers/particles.ts`: Runtime engine initialization entry.
- `components/ember/tests/dummy/app/app.ts`: Dummy app bootstrap entry.
- `components/ember/tests/test-helper.ts`: Test harness bootstrap entry.

**Configuration:**
- `package.json`: Root workspace scripts and tooling dependencies.
- `pnpm-workspace.yaml`: Workspace package discovery patterns.
- `lerna.json`: Lerna orchestration configuration.
- `nx.json`: Task cache defaults.
- `components/ember/tsconfig.json`: TypeScript path aliases and include scope.
- `components/ember/ember-cli-build.js`: Dummy app build behavior.
- `components/ember/testem.js`: CI/dev browser test runtime options.
- `components/ember/config/environment.js`: Addon env placeholder config.
- `components/ember/tests/dummy/config/environment.js`: Dummy app runtime environment values.

**Core Logic:**
- `components/ember/addon/modifiers/particles.ts`: tsParticles lifecycle integration.
- `components/ember/addon/helpers/unique-id-polyfill.ts`: id generation helper.
- `components/ember/addon/components/particles.hbs`: component-to-modifier wiring.

**Testing:**
- `components/ember/tests/integration/components/particles-test.ts`: Integration behavior assertions.
- `components/ember/tests/helpers/particles.ts`: Shared test fixture options.
- `components/ember/tests/helpers/index.js`: Standardized test setup wrappers.
- `components/ember/tests/dummy/app/`: Example application used in testing and manual validation.

## Naming Conventions

**Files:**
- Ember artifact naming uses lowercase kebab-case for component/helper/modifier filenames: `particles.hbs`, `unique-id-polyfill.ts`, `particles-test.ts`.
- Re-export bridge files mirror addon artifact names exactly: `components/ember/app/modifiers/particles.js` ↔ `components/ember/addon/modifiers/particles.ts`.
- Test files follow `*-test.ts` naming under behavior-specific subdirectories: `components/ember/tests/integration/components/particles-test.ts`.

**Directories:**
- Ember conventional directories are used consistently: `addon/components`, `addon/modifiers`, `addon/helpers`, `tests/integration/components`, `tests/dummy/app/controllers`.
- Workspace package folders are grouped by domain under top-level `components/` (active package at `components/ember/`).

## Where to Add New Code

**New Feature:**
- Primary code: add runtime implementation in `components/ember/addon/` (choose `components/`, `modifiers/`, `helpers/` based on concern).
- Tests: add integration coverage in `components/ember/tests/integration/` and, when useful for demonstration, extend `components/ember/tests/dummy/app/`.

**New Component/Module:**
- Implementation: create in `components/ember/addon/components/` (template/component) or `components/ember/addon/modifiers/` (imperative lifecycle).
- Public exposure: add corresponding re-export in `components/ember/app/...` so host apps can resolve it.

**Utilities:**
- Shared helpers: place pure helper logic in `components/ember/addon/helpers/` and re-export via `components/ember/app/helpers/`.
- Type declarations/supporting types: place in `components/ember/types/` and update `components/ember/tsconfig.json` paths/include when required.

## Special Directories

**`components/ember/dist/`:**
- Purpose: Built package artifacts.
- Generated: Yes.
- Committed: Yes (directory present in repository).

**`components/ember/tests/dummy/`:**
- Purpose: In-repo demo app for addon validation.
- Generated: No (source-controlled app scaffold and usage examples).
- Committed: Yes.

**`.planning/codebase/`:**
- Purpose: Generated mapping docs consumed by planning/execution workflows.
- Generated: Yes.
- Committed: Yes (intended to be versioned guidance docs).

**`.nx/`:**
- Purpose: Nx workspace metadata/cache state (e.g., `workspace-data`).
- Generated: Yes.
- Committed: Yes (directory present in repository snapshot).

---

*Structure analysis: 2026-04-10*
