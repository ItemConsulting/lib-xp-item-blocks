# AGENTS.md

This file provides guidance to AI agents like Claude and Copilot when working with code in this repository.

## Description

**Item                                                                                                                                                                             Blocks** (`no.item:lib-xp-item-blocks` / npm `@item-enonic-types/lib-blocks`) is an Enonic XP **library**, not a standalone app. It ships a set of reusable content "blocks" (XP mixins) — accordion, card(s), factbox, images, link, map, quote, text, etc. — that consuming XP apps embed and render.

It is dual-published:
- **Maven JAR** (`repo.itemtest.no`) — the runtime artifact: compiled server JS, FreeMarker templates, and CSS. Consumers add it via `include "no.item:lib-xp-item-blocks:<version>"` in their `build.gradle`.
- **npm package** (`@item-enonic-types/lib-blocks`) — **types only** (`.d.ts`) plus CSS, so consumers get type-safe imports of the block functions the JAR provides at runtime.

See `README.md` for the consumer-facing install and usage instructions.

## Build system

Gradle is the primary build tool (`com.enonic.xp.base` plugin), with the `com.github.node-gradle.node` plugin driving npm and `no.item.xp.codegen` generating TypeScript types from the XML schemas. Unlike a full XP app, this library does **not** require an Enonic CLI sandbox to build — the JAR is produced from compiled TypeScript + resources and published to a Maven repo; it is consumed by apps rather than deployed on its own.

Key wiring in `build.gradle`:
- `jar` depends on `npmBuild` (`npm run build`), so the JAR always contains freshly compiled output.
- `check` depends on `npmCheck` (`npm run check`).
- `npmBuild` sets `NODE_ENV=development` when `-Pdev`/`-Pdevelopment` is passed (skips minification).
- The `jar` task excludes dev-only artifacts: `*.freemarker.js`, `*.stories.css`, `assets/styles/blocks`, `site/storybook-utils.js`.

The `xpVersion` in `gradle.properties` (currently `7.0.0`) is the target XP version; the `@enonic-types/*` packages in `package.json` should match it.

## Commands

### npm scripts (primary for TypeScript/CSS work)

```bash
npm run build                 # Build server + assets + CSS concurrently
npm run build:server          # Server TS → build/resources/main        (node tsup/build.js)
npm run build:assets          # Client TS → build/resources/main/assets (node tsup/build.js)
npm run build:postcss         # CSS via PostCSS → build/resources/main/assets

npm run check                 # check:types + lint + check:styles (what CI and Gradle run)
npm run check:types           # Type-check assets + server + storybook concurrently
npm run check:types:server    # Server (src/main/resources, excluding assets)
npm run check:types:assets    # Client (src/main/resources/assets)
npm run check:types:storybook # Stories + Storybook helpers (.storybook/tsconfig.json)
npm run check:styles          # stylelint (no fix) — enforced in check/CI

npm run lint                  # Biome: lint AND format-check (fails on unformatted code)
npm run format                # Biome: apply fixes + format in place
npm run stylelint             # stylelint --fix on CSS (local autofix)

npm run storybook             # Storybook dev server on :6006
npm run build-storybook       # Static Storybook build
```

### Versioning & publishing (changesets)

```bash
npx changeset                 # Record a change (author a changeset)
npm run versioning            # Apply changesets: bump package.json + gradle.properties version
npm run release               # = npm run build (what changesets publishes)
```

### Gradle

```bash
./gradlew build               # npmInstall → npmCheck → npmBuild → jar
./gradlew build -Pdev         # Development build (NODE_ENV=development, no minification)
./gradlew check               # Type checking + linting only (npm run check)
./gradlew dev                 # Deploy to a linked sandbox and watch (local dev only)
./gradlew publish             # Publish the Maven JAR to repo.itemtest.no
```

## CI/CD

GitHub Actions (`.github/workflows/`):
- **`main.yml` (CI)** — on every branch: `npm install`, then `npm run check && npm run build`. No sandbox/JVM needed for this step.
- **`publish.yml` (Publish)** — after a successful CI run on `main`: uses `changesets/action` to either open a "Version Packages" PR or, once merged, publish the npm package (`npm run release`) and create a GitHub release. The `versioning` script keeps `package.json` and `gradle.properties` versions in sync.

## Architecture

### Blocks are XP mixins

Each block lives in `src/main/resources/site/mixins/blocks-<name>/` and is a small bundle of co-located files:

| File | Purpose |
|------|---------|
| `blocks-<name>.xml` | XP mixin schema (fields the editor fills in) |
| `blocks-<name>.ts` | Server render logic — the exported function consumers call |
| `blocks-<name>.freemarker.ts` | Typed wrapper that renders the FreeMarker template |
| `blocks-<name>.ftlh` | The FreeMarker template |
| `blocks-<name>.stories.ts` | Storybook story (browser/dev only) |
| CSS in `assets/styles/blocks/` | Block styling |

Shared helpers live in `lib/item-blocks/` (`arrays`, `contents`, `images`, `utils`, `types`). `blocks/blocks.ts` is the dispatcher that renders a list of blocks; `services/theme-selector/` backs the theme picker.

### Generated types (`xp-codegen`)

The `no.item.xp.codegen` Gradle plugin reads the `*.xml` schemas and generates `.d.ts` types under `.xp-codegen/`, mirroring the `site/mixins/**` tree. The server tsconfig merges `.xp-codegen` into the source tree via `rootDirs`, so a block imports its own generated type with `import type { BlocksMap } from "."`. Do not hand-edit `.xp-codegen/` — regenerate it from the schemas.

### Dual build: server vs. client (tsup)

`tsup.config.ts` dispatches by output directory (`node tsup/build.js` invokes it): a build into `build/resources/main` routes to `tsup/server.ts`, one into `.../assets` routes to `tsup/client.ts`.

**Server** (`src/main/resources/**/*.ts`, excluding `assets/`):
- `target: "es5"`, `format: "cjs"`, `platform: "neutral"` — runs on XP's **Nashorn** engine, so no modern-JS runtime features.
- XP framework libs (`/lib/xp/*`, `/lib/enonic/asset`, `@enonic-types/*`) are `external` (provided by the runtime); a few packages are bundled via `noExternal`.
- Emits `*.freemarker.js` companions (excluded from the JAR).

**Client** (`src/main/resources/assets/**/*.ts`):
- `format: ["esm"]`, `platform: "browser"`, minified unless `NODE_ENV=development`.

CSS is built separately with **PostCSS** (`postcss.config.js`: `postcss-import`, `postcss-url` copy, `autoprefixer`, and `cssnano` — minification runs in production only, matching the JS build). The `browserslist` in `package.json` (`"defaults"`) drives autoprefixer. Native CSS nesting is shipped as-is (no `postcss-nesting`), consistent with the unpolyfilled `:has()`/`@container` usage. stylelint is not part of the PostCSS build; it runs standalone via `check:styles`.

### TypeScript configs (four, split by domain)

| Config | Domain | Notes |
|--------|--------|-------|
| `tsconfig.json` (root) | Build tooling (`tsup/*.ts`) | `types: ["node"]`, `lib: ["es2023"]`, no DOM; excludes `src/**` |
| `src/main/resources/tsconfig.json` | XP server (Nashorn) | Enonic globals, no DOM, `/lib` + `/*` paths, `rootDirs` with `.xp-codegen`; excludes `*.stories.ts`, `site/storybook-utils.ts`, `assets/` |
| `src/main/resources/assets/tsconfig.json` | Client (browser) | DOM lib |
| `.storybook/tsconfig.json` | Storybook (browser) | `lib: ["dom"]`, `moduleResolution: "bundler"`, storybook globals; **owns** type-checking of `*.stories.ts` + `storybook-utils.ts` (`*.css`/`*.ftlh` ambients in `.storybook/globals.d.ts`) |

Keep the domain split: server code must not gain DOM/browser types, and stories/Storybook helpers are checked only by the Storybook config. When a story imports server code via the `/lib/*` convention, the `.storybook` config mirrors the server `paths` so it resolves.

### Tooling

- **Biome** handles linting **and** formatting for TS/JS/JSON (replaces ESLint + Prettier). `npm run lint` = `biome check .` fails on lint issues *and* unformatted code. Config: `biome.json` (2-space indent, 120 print width, double quotes; CSS/SVG left to stylelint). `.json` files allow `//` comments.
- **stylelint** owns CSS linting/formatting (`stylelint-config-standard` + `stylelint-order`), run standalone (not as a PostCSS plugin): `check:styles` in `check`/CI, `stylelint` for local autofix.
- **Storybook** (v10, SWC compiler) is for local component development; it transpiles without type-checking, which is why `check:types:storybook` exists.
- **changesets** drives versioning and npm publishing.
- There is currently **no test suite** in this repo.
