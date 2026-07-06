// CSS is minified in production only, mirroring the JS build (which skips
// minification when NODE_ENV=development via Gradle's `-Pdev`).
const isProduction = process.env.NODE_ENV !== "development";

module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": {},
    "postcss-url": {
      url: "copy",
    },
    autoprefixer: {},
    ...(isProduction ? { cssnano: {} } : {}),
  },
});
