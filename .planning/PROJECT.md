# tsParticles Ember v4 Modernization

## What This Is

This project upgrades and modernizes the `@tsparticles/ember` package so it aligns with the latest ecosystem expectations and the ongoing tsParticles `4.0.0-beta` line. It focuses on dependency refresh, API/runtime compatibility, and syntax/tooling modernization while preserving the addon's current user-facing behavior for Ember consumers.

## Core Value

Deliver a reliable, modern Ember wrapper for tsParticles v4 beta that is easy to maintain and safe to adopt.

## Requirements

### Validated

- ✓ Ember addon exposes a reusable particles surface to host apps via `<Particles>` and modifier wiring — existing
- ✓ Runtime integration loads and tears down particle containers through tsParticles lifecycle hooks — existing
- ✓ Integration testing and dummy app flows already validate baseline rendering and callbacks — existing

### Active

- [ ] Upgrade package dependencies and tooling to latest stable versions where compatible
- [ ] Move tsParticles package usage to the `4.0.0-beta` line used by active development
- [ ] Migrate addon and test code to more modern syntax and conventions without regressions
- [ ] Preserve or improve test coverage during migration and modernization

### Out of Scope

- New product features unrelated to modernization/migration — keep scope focused on upgrade quality
- Re-architecture of tsParticles core libraries — this repo should consume, not redesign, engine internals

## Context

The repository is a brownfield pnpm/Lerna/Nx workspace with an Ember addon at `components/ember/`. A fresh codebase map exists under `.planning/codebase/` and confirms existing runtime flow based on `components/ember/addon/modifiers/particles.ts`, template wiring in `components/ember/addon/components/particles.hbs`, and integration coverage in `components/ember/tests/integration/components/particles-test.ts`. The main objective provided is to bring the project up to date across dependencies and syntax, while adopting the tsParticles v4 beta packages currently under development.

## Constraints

- **Compatibility**: Preserve addon behavior expected by current Ember consumers during migration — avoid breaking existing API usage
- **Dependency policy**: Prefer latest stable toolchain versions, with explicit use of `4.0.0-beta` for tsParticles packages — objective-driven constraint
- **Scope**: Prioritize modernization and reliability over feature expansion — keep delivery focused and testable
- **Quality**: Maintain automated testability through migration — prevent silent regressions

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Prioritize modernization + v4 beta migration as first milestone | User objective explicitly targets versions and modern syntax | — Pending |
| Keep planning in auto mode with quick depth and parallel execution | Fast initialization with clear next execution path | — Pending |
| Keep planning docs tracked in git | Preserve project memory and traceability | — Pending |

---
*Last updated: 2026-04-10 after initialization*
