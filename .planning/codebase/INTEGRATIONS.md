# External Integrations

**Analysis Date:** 2026-04-10

## APIs & External Services

**Particle Rendering Engine:**
- tsParticles Engine - Client-side particle rendering and container lifecycle management.
  - SDK/Client: `@tsparticles/engine` imported in `components/ember/addon/modifiers/particles.ts`.
  - Auth: Not applicable (no credentialed API client usage detected).

**Preset/Plugin Ecosystem:**
- tsParticles full loader and presets - Optional runtime feature loading for effects like confetti/stars.
  - SDK/Client: `tsparticles`, `tsparticles-preset-stars` referenced in `components/ember/tests/dummy/app/controllers/application.ts` and `components/ember/README.md`.
  - Auth: Not applicable.

**Package/Registry Infrastructure:**
- npm registry publishing target for addon package distribution.
  - SDK/Client: npm/pnpm tooling via `components/ember/package.json` and root workspace `package.json`.
  - Auth: Not declared in repo files reviewed (token names not hardcoded).

## Data Storage

**Databases:**
- Not detected.
  - Connection: Not applicable.
  - Client: Not applicable.

**File Storage:**
- Local filesystem only for project assets/build artifacts (`components/ember/images/*`, `components/ember/dist/*`).

**Caching:**
- CI dependency cache through GitHub Actions cache in `.github/workflows/ci.yml` (pnpm store path cache).

## Authentication & Identity

**Auth Provider:**
- None in addon runtime.
  - Implementation: No auth framework/package usage detected in `components/ember/addon/**` and `components/ember/app/**`.

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry/Bugsnag/etc. integrations found).

**Logs:**
- Console logging used in callback examples/dummy controller (`components/ember/tests/dummy/app/controllers/application.ts`, `components/ember/README.md`).

## CI/CD & Deployment

**Hosting:**
- GitHub-hosted CI runners (`ubuntu-latest`) in `.github/workflows/ci.yml` and `.github/workflows/nodejs.yml`.

**CI Pipeline:**
- GitHub Actions with Node + pnpm setup, install, lint/test/build workflows.
  - Primary workflows: `.github/workflows/ci.yml` (tests, floating deps, Ember try matrix), `.github/workflows/nodejs.yml` (build:ci).

## Environment Configuration

**Required env vars:**
- No required secret env vars detected for addon runtime.
- `CI` is consumed in `components/ember/testem.js` for Chrome launch flags.

**Secrets location:**
- Repository relies on GitHub Actions secrets mechanism if needed, but no explicit secret variable names are declared in checked workflow files.
- `.env` files are not present in repository root; no local secret files detected during mapping.

## Webhooks & Callbacks

**Incoming:**
- None (no webhook endpoint/server code detected).

**Outgoing:**
- Optional HTTP fetch initiated by tsParticles when `@url` is provided to `<Particles />`; URL passed to `tsParticles.load({ url })` in `components/ember/addon/modifiers/particles.ts` and documented in `components/ember/README.md`.
- Ember callback hooks (local, not webhooks): `particlesInit` and `particlesLoaded` in `components/ember/addon/modifiers/particles.ts`.

---

*Integration audit: 2026-04-10*
