
- [Example 1](https://webpack.js.org/plugins/split-chunks-plugin/#defaults-example-1)：Create a `commons` chunk, which includes all code shared between entry points. 包含共用code
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
};
```

- Example 2：Create a `vendors` chunk, which includes all code from `node_modules` in the whole application.<font color="#ff0000">chunk which 包含node_module中的代码</font>
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```