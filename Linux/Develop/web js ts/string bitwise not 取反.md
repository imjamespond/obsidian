```
var abc = "abc哈哈呵呵"
var enc = encodeURIComponent(abc)
var chars = []
for (var i=0;i<enc.length;i++) {
  const c= enc.charCodeAt(i)
  const cc = ~c
  console.log(c,cc)
  chars.push(cc)
}

console.log(String.fromCharCode(...chars))

var strc = []
for (var i=0;i<chars.length;i++) {
  const c= chars[i]
  const cc = ~c
  console.log(c,cc)
  strc.push(cc)
}

console.log(decodeURIComponent( String.fromCharCode(...strc)))
```