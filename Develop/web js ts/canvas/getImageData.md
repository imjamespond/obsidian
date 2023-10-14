https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData#%E8%BF%94%E5%9B%9E%E5%80%BC)
一个[`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 对象，包含 canvas 给定的矩形图像数据。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData#%E5%B1%9E%E6%80%A7)

[`ImageData.data`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData/data) 只读
[`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) 描述了一个一维数组，包含==以 RGBA 顺序的数据==，数据使用 ==`0` 至 `255`（包含）的整数表示。==
[`ImageData.height`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData/height) 只读
无符号长整型（`unsigned long`），使用像素描述 **ImageData** 的实际高度。
[`ImageData.width`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData/width) 只读
无符号长整型（`unsigned long`），使用像素描述 **ImageData** 的实际宽度。

# ImageData.data
只读的 **`ImageData.data`** 属性，返回 [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) ，描述一个一维数组，包含以 RGBA 顺序的数据，数据使用 `0` 至 `255`（包含）的整数表示。
## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData/data#%E8%AF%AD%E6%B3%95)
imagedata.data
## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData/data#%E7%A4%BA%E4%BE%8B)
```js
var imagedata = new ImageData(100, 100);
imagedata.data; // Uint8ClampedArray[40000]
```