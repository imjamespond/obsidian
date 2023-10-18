https://developer.mozilla.org/zh-CN/docs/Web/API/File

- ### Blob.slice()
  
Blob.slice()方法用于创建一个包含源 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)的指定字节范围内的数据的新 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。

[`start`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/slice#start) 可选

这个参数代表 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 里的下标，表示第一个会被会被拷贝进新的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 的字节的起始位置。如果你传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说，-10 将会是 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 的倒数第十个字节。它的默认值是 0，如果你传入的 start 的长度大于源 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 的长度，那么返回的将会是一个长度为 0 并且不包含任何数据的一个 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。

[`end`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/slice#end) 可选

这个参数代表的是 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 的一个下标，这个下标 -1 的对应的字节将会是被拷贝进新的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说， -10 将会是 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 的倒数第十个字节。它的默认值就是它的原始长度 (`size`).

[`contentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/slice#contenttype) 可选

给新的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 赋予一个新的文档类型。这将会把它的 type 属性设为被传入的值。它的默认值是一个空的字符串。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/slice#%E8%BF%94%E5%9B%9E%E5%80%BC)

一个新的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象，它包含了原始 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象的某一个段的数据。

--- 
https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
**`FileReader`** 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications
```js
function previewFile() {
  var preview = document.querySelector("img");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
```
将file转成b64, 可将file slice成多块再read然后上传