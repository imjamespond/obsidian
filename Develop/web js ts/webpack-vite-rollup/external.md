webpack
https://github.com/react-grid-layout/react-draggable/blob/master/webpack.config.js
```js
  ...
    library: 'ReactDraggable',
    libraryTarget: 'umd',
  ...
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  },
```

rollup
https://github.com/paol-imi/muuri-react/blob/master/rollup.config.js
```js
{
	input,
	output: {
	  file: 'dist/muuri-react.js',
	  format: 'umd',
	  name: 'MuuriReact',
	  globals: {react: 'React', muuri: 'Muuri'},
	  banner,
	},
	external: ['react', 'muuri'],
}
```