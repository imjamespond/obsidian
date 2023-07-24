- [useTransition](https://react.dev/reference/react/useTransition)
==a React Hook that lets you update the state without blocking the UI.== 
tab切换时卡，

- [useDeferedValue](https://react.dev/reference/react/useDeferredValue)
==a React Hook that lets you defer updating a part of the UI.==
频繁改变input value 时，忽略中间一些value的计算，[和debounce的区别是](https://juejin.cn/post/7126533788896591886)，debounce会always延迟，而defer只是cpu慢时延时，快时不会延时