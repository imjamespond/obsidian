- event.stopPropagation
方法阻止捕获和冒泡阶段中当前事件的进一步传播

- event.preventDefault
告诉[用户代理](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)：如果此事件没有被显式处理，它默认的动作也不应该照常执行。此事件还是继续传播，除非碰到事件监听器调用 stopPropagation() 或 stopImmediatePropagation()，才停止传播。