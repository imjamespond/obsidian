- ## [Hooks](https://cn.react-redux.js.org/api/hooks/)

```jsx
const store = createStore(rootReducer)

// 从 React 18 开始
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

- ## [connect()](https://cn.react-redux.js.org/api/connect)

```js
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```