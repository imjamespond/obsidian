
[【让文字适应纹理【渡一教育】】](https://www.bilibili.com/video/BV1T1421U7i6/?share_source=copy_web)

[【交融动画效果【渡一教育】】 ](https://www.bilibili.com/video/BV1em42177t9/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb)

【文字的交融展开【渡一教育】】 https://www.bilibili.com/video/BV1Xe411v7JQ/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb
【文字的交融展开【渡一教育】】 https://www.bilibili.com/video/BV1Dr42177hA/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb
- css法
子
filter: blur
父
~~background: white~~
~~fillter: contrast(10)~~
会改变颜色
- svg
  filter: url(some-svg-filter)
---


```tsx
export const gooey = (
  <div
    style={{ display: "none" }}
    dangerouslySetInnerHTML={{
      __html: `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
<defs>
<filter id="goo">
<feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur"/> 
<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" result="goo" />
<feBlend in="SourceGraphic" in2="goo" />
</filter> 
</defs>
</svg>
`,
    }}
  />
);

...

const style = {filter: "url(#goo)",}
```