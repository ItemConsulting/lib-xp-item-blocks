// Ambient declarations for the side-effect asset imports used in stories
// (e.g. `import "./foo.css"`). Storybook resolves these at build time via its
// webpack/SWC pipeline; TypeScript only needs to know the modules exist.
// `*.ftlh` is already declared by `@itemconsulting/xp-storybook-utils/global`.
declare module "*.css";
