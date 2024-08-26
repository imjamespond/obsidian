react hook面世已经有一段时间了，相信很多人都已经在代码中用上了hooks。而对于 `useEffect` 和 `useLayoutEffect`，我们使用的最多的应该就是`useEffect`。那他们两个到底有什么不一样的地方？

### 使用方式

这两个函数的使用方式其实非常简单，他们都接受一个函数一个数组，只有在数组里面的值改变的情况下才会再次执行 effect。所以对于使用方式我就不过多介绍了，不清楚的可以先参考[官网](https://link.zhihu.com/?target=https%3A//zh-hans.reactjs.org/docs/hooks-reference.html) 。

### 差异

- `useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，和 `componentDidMount` 等价。

### 具体表现

我们用一个很简单的例子

```js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState("hello world")

  useEffect(() => {
    let i = 0;
    while(i <= 100000000) {
      i++;
    };
    setState("world hello");
  }, []);

  // useLayoutEffect(() => {
  //   let i = 0;
  //   while(i <= 100000000) {
  //     i++;
  //   };
  //   setState("world hello");
  // }, []);

  return (
    <>
      <div>{state}</div>
    </>
  );
}

export default App;
```

这是它的效果

![动图封面](https://pic1.zhimg.com/v2-1bd5e1f4ee47d408cb4d09f784dbd544_b.jpg)

而换成 `useLayoutEffect` 之后闪烁现象就消失了

![动图封面](https://pic1.zhimg.com/v2-090a4d5a6deb4dd492ebd262aefaac0c_b.jpg)

看到这里我相信你应该能理解他们的区别了，因为 ==`useEffect` 是渲染完之后异步执行的，所以会导致 hello world 先被渲染到了屏幕上，再变成 world hello，就会出现闪烁现象==。而 `useLayoutEffect` 是渲染之前同步执行的，所以会等它执行完再渲染上去，就避免了闪烁现象。也就是说我们最好把操作 dom 的相关操作放到 `useLayouteEffect` 中去，避免导致闪烁。
