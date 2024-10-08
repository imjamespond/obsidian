 [精读《useRef 与 createRef 的区别》](https://zhuanlan.zhihu.com/p/110247813)
## 1 引言

`useRef` 是常用的 API，但还有一个 `createRef` 的 API，你知道他们的区别吗？通过 [React.useRef and React.createRef: The Difference](https://link.zhihu.com/?target=https%3A//blog.bitsrc.io/react-useref-and-react-createref-the-difference-afedb9877d0f) 这篇文章，你可以了解到何时该使用它们。

## 2 概述

其实原文就阐述了这样一个事实：`useRef` ==仅能用在 FunctionComponent==，`createRef` 仅能用在 ClassComponent。

第一句话是显然的，因为 Hooks 不能用在 ClassComponent。

第二句话的原因是，`createRef` 并没有 Hooks 的效果，==其值会随着 FunctionComponent 重复执行而不断被初始化==：

```text
function App() {
  // 错误用法，永远也拿不到 ref
  const valueRef = React.createRef();
  return <div ref={valueRef} />;
}
```

上述 `valueRef` 会随着 App 函数的 Render 而重复初始化，**这也是 Hooks 的独特之处，虽然用在普通函数中，但在 React 引擎中会得到超出普通函数的表现，比如初始化仅执行一次，或者引用不变**。

为什么 `createRef` 可以在 ClassComponent 正常运行呢？这是因为 ClassComponent 分离了生命周期，使例如 `componentDidMount` 等初始化时机仅执行一次。

原文完。

## 3 精读

那么知道如何正确创建 Ref 后，还知道如何正确更新 Ref 吗？

由于 Ref 是贯穿 FunctionComponent 所有渲染周期的实例，理论上在任何地方都可以做修改，比如：

```text
function App() {
  const valueRef = React.useRef();

  valueRef.current += 1;

  return <div />;
}
```

但其实上面的修改方式是不规范的，React 官方文档里要求我们避免在 Render 函数中直接修改 Ref，请先看下面的 FunctionComponent 生命周期图：

![](https://pic2.zhimg.com/80/v2-319c65b729ccf403f8ea6431a2c7df1d_1440w.webp)

从图中可以发现，在 `Render phase` 阶段是不允许做 “side effects” 的，也就是写副作用代码，这是因为这个阶段可能会被 React 引擎随时取消或重做。

修改 Ref 属于副作用操作，因此不适合在这个阶段进行。我们可以看到，在 `Commit phase` 阶段可以做这件事，或者在回调函数中做（脱离了 React 生命周期）。

当然有一种情况是可以的，即 [懒初始化](https://link.zhihu.com/?target=https%3A//reactjs.org/docs/hooks-faq.html%23how-to-create-expensive-objects-lazily)：

```text
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```

懒初始化的情况下，副作用最多执行一次，而且仅用于初始化赋值，所以这种行为是被允许的。

为什么对副作用限制的如此严格？因为 FunctionComponent 增加了内置调度系统，为了优先响应用户操作，可能会暂定某个 React 组件的渲染，具体可以看第 99 篇精读：[精读《Scheduling in React》](https://link.zhihu.com/?target=https%3A//github.com/dt-fe/weekly/blob/v2/099.%25E7%25B2%25BE%25E8%25AF%25BB%25E3%2580%258AScheduling%2520in%2520React%25E3%2580%258B.md)

Ref 不仅可以拿到组件引用、创建一个 Mutable 副作用对象，还可以配合 `useEffect` 存储一个较老的值，最常用来拿到 `previousProps`，React 官方利用 Ref 封装了一个简单的 Hooks 拿到上一次的值：

```text
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

由于 `useEffect` 在 Render 完毕后才执行，因此 `ref` 的值在当前 Render 中永远是上一次 Render 时候的，我们可以利用它拿到上一次 Props：

```text
function App(props) {
  const preProps = usePrevious(props);
}
```

要实现这个功能，还是要归功于 `ref` 可以将值 “在各个不同的 Render 闭包中传递的特性”。最后，不要滥用 Ref，Mutable 引用越多，对 React 来说可维护性一般会越差。