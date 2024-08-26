https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

Canvas 2D API 的 **`CanvasRenderingContext2D.globalCompositeOperation`** 属性设置要在绘制新形状时应用的合成操作的类型，其中 type 是用于标识要使用的合成或混合模式操作的字符串。

在 [Canvas Tutorial](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial) 中查看 [Compositing](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing) 章节。

## [值](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#%E5%80%BC)

标识要使用的合成或混合模式操作的字符串。可以是以下值之一：

[`"source-over"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#source-over)

这是==默认==设置，并在现有画布上绘制新图形。

[`"source-in"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#source-in)

仅在新形状和目标画布重叠的地方绘制新形状。其他的都是透明的。

[`"source-out"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#source-out)

在不与现有画布内容重叠的地方绘制新图形。

[`"source-atop"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#source-atop)

只在与现有画布内容重叠的地方绘制新图形。

[`"destination-over"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#destination-over)

在现有画布内容==的后面==绘制新的图形。

[`"destination-in"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#destination-in)

仅保留现有画布内容和新形状重叠的部分。其他的都是透明的。

[`"destination-out"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#destination-out)

仅保留现有画布内容和新形状不重叠的部分。

[`"destination-atop"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#destination-atop)

仅保留现有画布内容和新形状重叠的部分。新形状是在现有画布内容的后面绘制的。

[`"lighter"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#lighter)

两个重叠图形的颜色是通过颜色值相加来确定的。

[`"copy"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#copy)

只显示新图形。

[`"xor"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#xor)

形状在重叠处变为透明，并在其他地方正常绘制。

[`"multiply"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#multiply)

将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。

[`"screen"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#screen)

像素被倒转、相乘、再倒转，结果是一幅更明亮的图片（与 `multiply` 相反）。

[`"overlay"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#overlay)

`multiply` 和 `screen` 的结合。原本暗的地方更暗，原本亮的地方更亮。

[`"darken"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#darken)

保留两个图层中最暗的像素。

[`"lighten"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#lighten)

保留两个图层中最亮的像素。

[`"color-dodge"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#color-dodge)

将底层除以顶层的反置。

[`"color-burn"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#color-burn)

将反置的底层除以顶层，然后将结果反过来。

[`"hard-light"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#hard-light)

类似于 `overlay`，`multiply` 和 `screen` 的结合——但上下图层互换了。

[`"soft-light"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#soft-light)

柔和版本的 `hard-light`。纯黑或纯白不会导致纯黑或纯白。

[`"difference"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#difference)

从顶层减去底层（或反之亦然），始终得到正值。

[`"exclusion"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#exclusion)

与 `difference` 类似，但对比度较低。

[`"hue"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#hue)

保留底层的亮度（luma）和色度（chroma），同时采用顶层的色调（hue）。

[`"saturation"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#saturation)

保留底层的亮度和色调，同时采用顶层的色度。

[`"color"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#color)

保留了底层的亮度，同时采用了顶层的色调和色度。

[`"luminosity"`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#luminosity)

保持底层的色调和色度，同时采用顶层的亮度。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#%E7%A4%BA%E4%BE%8B)

### [改变合成操作](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#%E6%94%B9%E5%8F%98%E5%90%88%E6%88%90%E6%93%8D%E4%BD%9C)

这是一段使用 `globalCompositeOperation` 属性的简单的代码片段，绘制了 2 个矩形在重叠时相互排斥的情况。

#### HTML

```html
<canvas id="canvas"></canvas>
```

#### JavaScript

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.globalCompositeOperation = "xor";

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
```

#### 结果