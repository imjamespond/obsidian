[b](https://www.bilibili.com/video/BV1Mu4y1w7DF/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=62c8a03e66ff063b9af3e473fadb8049)
https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API

### [Element.animate()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate)
```js
document.getElementById("tunnel").animate(
  [
    // keyframes
    { transform: "translateY(0px)" },
    { transform: "translateY(-300px)" },
  ],
  {
    // timing options
    duration: 1000,
    iterations: Infinity,
  },
);
```