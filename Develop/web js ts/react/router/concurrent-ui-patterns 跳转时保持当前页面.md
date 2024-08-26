https://17.reactjs.org/docs/concurrent-mode-patterns.html

https://stackoverflow.com/questions/64368597/keep-the-current-page-rendered-until-the-new-page-is-loaded-with-react-lazy-and

https://stackoverflow.com/questions/72932889/react-router-lazy-suspense-usetransition-how-to-stay-on-current-page-until-n
https://stackoverflow.com/questions/66039626/react-lazy-suspens-react-router-dont-change-route-until-component-is-fetched

backgroundLocation
https://github.com/remix-run/react-router/blob/dev/examples/modal/src/App.tsx#L56

[remix build, start. client side实现](https://github.com/imjamespond/frontend-2022/tree/remix-test) 

[next14实现](https://github.com/imjamespond/frontend-2022/tree/next14-test)

[umi discuss](https://github.com/umijs/umi/discussions/12369)
- [ transitionRouter](https://github.com/MoeYc/umi/blob/d34c1bc8ef4fb390cbb0fd7b7469e19fe28c2962/docs/docs/api/config.md#transitionrouter)
仅 React 18 可用。
在切换页面时自动使用 `startTransition` 标记为非紧急更新，这可以避免 loading 态突然出现又消失的闪烁效果等[问题](https://react.dev/reference/react/Suspense#preventing-already-revealed-content-from-hiding)，提升用户体验。
- [自定义link](https://github.com/imjamespond/frontend-2022/tree/test-umi-2405) ==参考[antd link](https://github.com/ant-design/ant-design/blob/cf6e9c8b6efc830338aab8121c573eccc001afc8/.dumi/theme/common/Link.tsx#L34)==
startTransition中navigate