# esjest-transform

(work in progress, but feel free to give it a spin)

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
