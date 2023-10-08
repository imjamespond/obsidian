https://www.bilibili.com/video/BV18F411S7cL/?spm_id_from=333.851.b_7265636f6d6d656e64.6&vd_source=62c8a03e66ff063b9af3e473fadb8049

```css
.tab {
  width: 150px;
  height: 40px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  position: relative;
}

.tab::before,
.tab::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0; 
}

.tab::before {
  left: -10px;
  background: radial-gradient(circle at 0 0, transparent 10px, #fff 10px);
}
.tab::after {
  right: -10px;
  background: radial-gradient(circle at 10px 0, transparent 10px, #fff 10px);
}
```