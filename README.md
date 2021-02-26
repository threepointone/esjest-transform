# esjest-transform

(DEPRECATED, use [esbuild-jest](https://github.com/aelbore/esbuild-jest/) instead)

A fast jest transform.

In your [jest configuration](https://jestjs.io/docs/en/configuration), add:

```js
module.exports = {
  // ...
  transform: {
    "\\.[jt]sx?$": "esjest-transform",
  },
  // ...
};
```
