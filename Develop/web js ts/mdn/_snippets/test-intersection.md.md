当内部元素高超过容器可以反过来检测不相交，则滚动至 底部
```html
<html>

<head>
  <title>Document title</title>
  <style>
    #root {
      height: 500px;
      overflow: auto;
      background: #efefef;
    }

    p {
      width: 3000px;
      background: red;
    }

    p::after {
      clear: both;
      content: "";
      display: block;
    }

    p>div {
      width: 300px;
      height: 700px;
      float: left;
    }

    p>div.active {
      background: lightblue;
    }
  </style>
</head>

<body>
  <div id="root">
  </div>
</body>
<script>
  const root = document.querySelector('#root')
  const ob = new IntersectionObserver((entries) => {
    console.debug('intersecting')
    entries.forEach((ent,) => {
      ent.target.className = ent.isIntersecting ? "active" : ""
      ent.target.innerHTML = ent.intersectionRatio.toFixed(5)
      console.debug('ent', ent.target, ent.isIntersecting, ent.intersectionRatio)
    })
  }, {
    root,
    rootMargin: '-101% 5000px 0px 5000px',
    threshold: 0
  })
  for (let i = 0; i < 1; i++) {
    const p = document.createElement('p')
    root.appendChild(p)
    for (let j = 0; j < 10; j++) {
      const div = document.createElement('div')
      p.appendChild(div)
      ob.observe(div)
    }
  }
</script>

</html>
```

rootMargin 向外扩展交叉距离，容器顶边和物体底边交叉，右，容器底边和物体顶部交叉， 左。

![[Pasted image 20240607100025.png|100]]
`'-90% 5000px 1000px 5000px'`, 底边距容器顶-90%，因此-110%表示红色没滚动到底部就触发事件，变为不交叉，1000px表示底部在1000px距离就已经交叉避免和前面参数冲突