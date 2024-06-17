- #### steps 帧动画
```css
animation: animate 1s steps(28) infinite;
@keyframes animate {
    from {
        background-position: 0 0;
    }
    to {
        background-position: -2800px 0;
    }
}
```
【逐帧动画【渡一教育】】 https://www.bilibili.com/video/BV1FV4y1i7rw/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb

- 【利用延迟实现复杂动画【渡一教育】】 https://www.bilibili.com/video/BV1tM4m1z7aJ/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb
- 
- 动画暂停
```css
animation-play-state: paused;
```

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation#%3Csingle-animation-fill-mode%3E) [`animation-fill-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode)
```css
/* @keyframes duration 时间 | easing-function 加速 | delay 延时 | iteration-count 次数 | direction 方向 | fill-mode 执行后样式 | play-state 启停 | name 桢动画名 */
animation: 3s ease-in 1s 2 reverse both paused slidein;

/* @keyframes duration | easing-function | delay | name */
animation: 3s linear 1s slidein;

/* two animations */
animation:
  3s linear slidein,
  3s ease-out 5s slideout;
```