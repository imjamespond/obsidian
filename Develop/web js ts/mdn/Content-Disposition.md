https://developer.mozilla.org/zh-CN/docs/web/http/headers/content-disposition
- 在常规的 HTTP 应答中，**`Content-Disposition`** 响应标头指示回复的内容该以何种形式展示，是以_内联_的形式（即网页或者页面的一部分），还是==以_附件_的形式下载并保存到本地。==

```
Content-Disposition: form-data; name="fieldName"
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"
```
[`filename`](https://developer.mozilla.org/zh-CN/docs/web/http/headers/content-disposition#filename)
后面是要传送的文件的初始名称的字符串。这个参数总是可选的，而且不能盲目使用：路径信息必须舍掉，同时要进行一定的转换以符合服务器文件系统规则。这个参数主要用来提供展示性信息。当与 `Content-Disposition: attachment` 一同使用的时候，它被用作"保存为"对话框中呈现给用户的默认文件名。
[`filename\*`](https://developer.mozilla.org/zh-CN/docs/web/http/headers/content-disposition#filename_2)
`filename` 和 `filename*` 两个参数的唯一区别在于，`filename*` 采用了 [RFC 5987](https://tools.ietf.org/html/rfc5987) 中规定的编码方式。当 `filename` 和 `filename*` 同时出现的时候，应该优先采用 `filename*`，假如二者都支持的话。
-   在 `filename` 和 `filename*` 两个参数同时出现的情况下，Firefox 5 可以更好地处理 `Content-Disposition` HTTP 响应标头。它会遍历所有提供的名称，==假如 `filename*` 存在的话，就采用它的值==，即使 `filename` 更靠前。之前的版本会采用出现在前面的参数的值，导致有更合适的名称而不被使用。参见 [Firefox bug 588781](https://bugzil.la/588781)。

## [示例](https://developer.mozilla.org/zh-CN/docs/web/http/headers/content-disposition#%E7%A4%BA%E4%BE%8B)
以下是一则可以触发“保存为”对话框的服务器应答：
```
200 OK
Content-Type: text/html; charset=utf-8
Content-Disposition: attachment; filename="cool.html"
Content-Length: 22

<HTML>Save me!</HTML>
```
这个简单的 HTML 文件会被下载到本地而不是在浏览器中展示。大多数浏览器默认会建议将 `cool.html` 作为文件名。