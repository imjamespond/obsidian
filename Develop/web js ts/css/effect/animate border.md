[b](https://www.bilibili.com/video/BV1c84y1R73s/?spm_id_from=trigger_reload&vd_source=62c8a03e66ff063b9af3e473fadb8049)

```css

.btn { 
  padding: 0.5rem; 
  position:relative;
  overflow: hidden; 
}


.btn:before {
  content: '';
  position:absolute;
  width: 200%;
  height: 200%;
  background-color: red;
  top: 50%;
  left: 50%;
  z-index:-2;
  transform-origin: 0px 0px;
  animation: rotation 3s infinite linear;
}


.btn:after {
  content: '';
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  left: 5px;
  top: 5px;
  background-color: #eee;
  z-index:-1;
}

@keyframes rotation {
  to {
    transform:rotate(1turn);
  }
}
```