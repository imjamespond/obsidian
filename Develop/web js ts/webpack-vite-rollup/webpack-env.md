### [Is it possible to use `require.context` to do dynamic imports for Webpack?](https://stackoverflow.com/questions/50038473/is-it-possible-to-use-require-context-to-do-dynamic-imports-for-webpack)

There is a fourth argument for `require.context` which can help with this.

[https://webpack.js.org/api/module-methods/#requirecontext](https://webpack.js.org/api/module-methods/#requirecontext)

[https://github.com/webpack/webpack/blob/9560af5545/lib/ContextModule.js#L14](https://github.com/webpack/webpack/blob/9560af5545/lib/ContextModule.js#L14)

```javascript
const components = require.context('@/components', true, /[A-Z]\w+\.(vue)$/, 'lazy');
components.keys().forEach(filePath => {

  // load the component
  components(filePath).then(module => {

    // module.default is the vue component
    console.log(module.default);
  });
});
```