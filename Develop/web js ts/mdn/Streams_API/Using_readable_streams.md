
### [读取流](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API/Using_readable_streams#%E8%AF%BB%E5%8F%96%E6%B5%81)

现在你已经附着了你的 reader，你可以使用 [`ReadableStreamDefaultReader.read()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStreamDefaultReader/read) 方法从流中读取数据分块。你从流中读出分块后，可以做你喜欢的事。例如，我们的简单流式读取示例将分块送入新的自定义 `ReadableStream` 中（我们将在下一节发现更多信息），然后从中创建一个新的响应，将它作为 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 使用，然后通过 [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static) 从该 blob 创建一个对象 URL，并将其显示在屏幕上的 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素中，有效地创建了我们最初获取的图像的副本。

```js
// Fetch the original image
fetch("./tortoise.png")
  // Retrieve its body as ReadableStream
  .then((response) => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        return pump();
        function pump() {
          return reader.read().then(({ done, value }) => {
            // When no more data needs to be consumed, close the stream
            if (done) {
              controller.close();
              return;
            }
            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            return pump();
          });
        }
      },
    });
  })
  // Create a new response out of the stream
  .then((stream) => new Response(stream))
  // Create an object URL for the response
  .then((response) => response.blob())
  .then((blob) => URL.createObjectURL(blob))
  // Update image
  .then((url) => console.log((image.src = url)))
  .catch((err) => console.error(err));
```

让我们详细看看如何==使用 `read()`==。在 `pump()` 函数中，我们首先调用 `read()`，其返回一个包含对象的 promise——这里有我们要读去的结果，==其形式为 `{ done, value }`==：

```
reader.read().then(({ done, value }) => {
  /* … */
});
```

这个结果可能是三种不同的类型之一：

- 如果==有分块可用==，则 promise 将使用 `{ value: theChunk, done: false }` 形式的对象来兑现。
- 如果==流已经关闭==，则 promise 将使用 `{ value: undefined, done: true }` 形式的对象来兑现。
- 如果流发生错误，则 promise 将因相关错误被拒绝。

其次，我们检查 `done` 是否为 `true`。如果是，则没有更多的分块要读取（value 的值是 `undefined`），所以我们退出这个函数并且使用 [`ReadableStreamDefaultController.close()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStreamDefaultController/close) 关闭自定义的流：

```
if (done) {
  controller.close();
  return;
}
```

**备注：** `close()` 是新自定义流的一部分，而不是我们在这个讨论的一部分。我们将在下一节阐述更多关于自定义流的内容。

如果 `done` 为 `true`，我们处理已经读取的新分块（包含在结果对象的 `value` 属性），然后再次调用 `pump()` 函数去读取下一个分块。

```js
// Enqueue the next data chunk into our target stream
controller.enqueue(value);
return pump();
```

这是当你在使用流的 reader 时，将看见的标准的模式：

1. 编写一个从流的读取开始的函数。
2. 如果流中没有更多的分块要读取，你需要退出这个函数。
3. 如果流中有更多的分块要读取，你可以处理当前的分块后，再次运行该函数。
4. 你继续链接 `pipe` 函数，直到没有更多流要读取，在这种情况下，请遵循步骤 2。

**备注：** 该函数看起来像 `pump()` 调用自己并且导致一个潜在的深度递归。然而，因为 `pump` 是异步的并且每次调用 `pump()` 都是在 promise 处理程序的末尾，事实上，它类似于 promise 处理程序的链式结构。