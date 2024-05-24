- [CSS下划线动画](https://www.bilibili.com/video/BV1dT4y1W7iF/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb)
```css
some-el:{
background: linear-gradient(to right, red, green) no-repeat right bottom;
background-size: 0px 2px;
transition: background-size 1s;
}

some-el:hover: {
background-position: left bottom;
background-size: 100% 2px;
}
```

- radical-gradient
```css
.root-0-2-9 .__km-bg {
  background: radial-gradient(circle at 100% -150px, #f1f4f9 50%, #00000008 50%, #ffffff00 52%), 
radial-gradient(circle at 100% -500px, #ebf0f5 80%, #00000008 80%, #ffffff00 82%), 
linear-gradient(180deg, #e2e8f000, #e2e8f0);
}
```
`circle at 100% -150px`指定圆心位置