https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter
https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter-function/drop-shadow
https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter
**`backdrop-filter`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。因为它适用于元素_背后_的所有元素，为了看到效果，必须使元素或其背景至少部分透明。

## 照片背景

对于下面的这种效果，我们来分析一下。 首先图片在上一层，下层是一个模糊的背景。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8acad7ddf91d47ff839ac525b1fa9264~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

`<div class="bkImg">   <img src="" class="Img"/> </div>`

```css
.bkImg {
  background-color: #222;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background-image: url();
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.Img {
  position: relative;
  max-height: 90%;
  max-width: 90%;
  z-index: 1;
}
```

现在效果是这样的： 背景并不是我们所期望的，这里我们的背景是一张图片，这张图片跟上面的图片是一张图片。如果我们直接在 div 使用 backdrop-filter 的话，是否可行，答案是不可行。我们在上一个例子中明确指出。元素或者元素背景要透明或者干脆就没背景。 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e14b35c2f8b34b78a3fcb4bc44209412~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

此时我们就考虑在 after 上添加。

  `.bkImg::after {     backdrop-filter: blur(50px);     content: "";     display: block;     height: 100%;     left: 0;     position: absolute;     top: 0;     width: 100%;     z-index: 0;   }`

