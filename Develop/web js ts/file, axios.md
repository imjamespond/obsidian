File 接口没有定义任何方法，但是它从 Blob 接口继承了以下方法：

--- 
- Blob.slice([start[, end[, contentType]]])
返回一个新的 Blob 对象，它包含有源 Blob 对象中指定范围内的数据。

- start 可选
这个参数代表 Blob 里的下标，表示第一个会被会被拷贝进新的 Blob 的字节的起始位置。如果你传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说，-10 将会是 Blob 的倒数第十个字节。它的默认值是 0，如果你传入的 start 的长度大于源 Blob 的长度，那么返回的将会是一个长度为 0 并且不包含任何数据的一个 Blob 对象。

- end 可选
这个参数代表的是 Blob 的一个下标，这个下标 -1 的对应的字节将会是被拷贝进新的Blob 的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。举例来说， -10 将会是 Blob 的倒数第十个字节。它的默认值就是它的原始长度 (size).

- contentType 可选
给新的 Blob 赋予一个新的文档类型。这将会把它的 type 属性设为被传入的值。它的默认值是一个空的字符串。

- 返回值
一个新的 Blob 对象，它包含了原始 Blob 对象的某一个段的数据。

---

```js
const config = {
      headers:{
        'Content-Type':'multipart/form-data',
      },
      transformRequest: [function (data) {
        return data
      }],
      onUploadProgress: progressEvent => {
        let persent = (progressEvent.loaded / progressEvent.total * 100 | 0) //上传进度百分比
        console.log(persent)
      },
    }
const data = new FormData();
data.append('file', files[0]);
axios.request({ data, ...config})
```
- **transformRequest**：
作用：表示允许在向服务器发送前，修改请求数据
使用要求：
1、只能用在 ‘PUT’, ‘POST’ 和 ‘PATCH’ 这几个请求方法
2、后面数组中的函数必须返回==一个字符串，或 ArrayBuffer，或 Stream==

- **transformResponse：**
作用：在传递给 then/catch 前，允许修改响应数据