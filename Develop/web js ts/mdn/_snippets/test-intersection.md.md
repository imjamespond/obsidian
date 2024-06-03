
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
    }

    p>div {
      width: 300px;
      height: 300px;
      float: left;
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
      ent.target.setAttribute("style", ent.isIntersecting ? "background:lightblue;" : "background:yellow;")
      ent.target.innerHTML = ent.intersectionRatio.toFixed(5)
      console.debug('ent', ent.target, ent.isIntersecting, ent.intersectionRatio)
    })
  }, {
    root,
    rootMargin: '0px 5000px 0px 5000px',
    threshold: 1
  })
  for (let i = 0; i < 10; i++) {
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