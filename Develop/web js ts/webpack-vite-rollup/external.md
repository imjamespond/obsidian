#webpack
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

- template.html
```html
<!-- <% if (process.env.NODE_ENV === 'production') { %> -->
<script src="https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/antd@4.20.7/dist/antd.min.js"></script>
<!-- <% } %> -->
```
- webpack
```json
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'antd': 'antd'
    }
```

#rollup
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