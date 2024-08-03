https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout
https://developer.mozilla.org/en-US/docs/Web/CSS/grid

#css/grid #css/transition #css/has

[阮一峰 Grid 网格布局教程](https://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

【网格布局中的动画【渡一教育】】 https://www.bilibili.com/video/BV17Q4y1H7v9/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb
【网格布局中的动画【渡一教育】】 https://www.bilibili.com/video/BV1zU411o7nk/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb
【旋转中的视差效果【渡一教育】】 https://www.bilibili.com/video/BV1Cz421a7C9/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb

```jsx
<div
  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 10, maxHeight: 300, overflow: 'auto', marginBottom: 10, padding: 0, gridTemplateRows:'1fr' }}
>
</div>
```

---
#row-gap
https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
| Chrome | Edge | Firefox | Opera | Safari |
| ---- | ---- | ---- | ---- | ---- |
| `row-gap` | 47<br> | 16<br> | 52<br> | 34<br> |
| Supported in Flex Layout | ==84==<br> | 84<br> | 63<br> | 70<br> |
**84以上才支持flex**
