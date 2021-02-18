const esbuild = require("esbuild");
const babelJest = require("babel-jest");
const path = require("path");

const babelTransformer = babelJest.createTransformer({
  plugins: ["@babel/plugin-transform-modules-commonjs"],
  parserOpts: {
    plugins: ["jsx", "typescript"],
  },
});

const loaders = ["js", "jsx", "ts", "tsx", "json"];
module.exports = {
  createTransformer(options) {
    return {
      process(input, filepath, config, transformOptions) {
        // TODO: implement cacheKey
        // TODO: import.meta via  @babel/plugin-transform-import-meta/ babel-plugin-transform-import-meta
        // TODO: should probably disable babelrc resolution
        const { esbuild: esbuildOptions } = transformOptions;
        let result;

        if (input.indexOf("ock(") >= 0) {
          result = babelTransformer.process(
            input,
            filepath,
            config,
            transformOptions
          );
        } else result = { code: input };

        const ext = path.extname(filepath).slice(1);

        const transformed = esbuild.transformSync(result.code, {
          loader: ext === "js" ? "jsx" : loaders.includes(ext) ? ext : "text",
          sourcemap: true,
          sourcesContent: true,
          sourcefile: filepath,
          format: "cjs",
          target: "es2018",
          ...(esbuildOptions || {}),
        });

        // via https://github.com/aelbore/esbuild-jest/blob/bfb90e1a14127ef3c45b006bacc00cf92e8b288d/src/index.ts#L47-L58
        const map = {
          ...JSON.parse(transformed.map),
          sourcesContent: null,
        };
        const code =
          transformed.code +
          "\n//# sourceMappingURL=data:application/json;base64," +
          Buffer.from(JSON.stringify(map)).toString("base64");

        return { code, map };
      },
    };
  },
};
