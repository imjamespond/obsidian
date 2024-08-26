
[xhr 与 fetch 异同](https://www.bilibili.com/video/BV1WX4y1j7BB/?spm_id_from=333.788&vd_source=62c8a03e66ff063b9af3e473fadb8049)
![[Pasted image 20231018172011.png|300]]

---
https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

`Promise<Response> fetch(input[, init]);`

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#%E5%8F%82%E6%95%B0)

[_?input_](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#input)

定义要获取的资源。这可能是：

-   一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 字符串，包含要获取资源的 URL。一些浏览器会接受 `blob:` 和 `data:` 作为 schemes.
-   一个 **[`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)** 对象。

[_init_](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#init) 可选

一个配置项对象，包括所有对请求的设置。可选的参数有：

-   `method`: 请求使用的方法，如 `GET`、`POST`。
-   **`headers`:** 请求的头信息，形式为 **[`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)** 的对象或包含 [`ByteString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 值的对象字面量。
-   `body`: 请求的 body 信息：可能是一个 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、`BufferSource`、[`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)、[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 或者 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
-   `mode`: 请求的模式，如 `cors`、`no-cors` 或者 `same-origin`。
-   `credentials`: 请求的 credentials，如 `omit`、`same-origin` 或者 `include`。为了在当前域名内自动发送 **==cookie==**，必须提供这个选项，从 Chrome 50 开始，这个属性也可以接受 [`FederatedCredential` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential "Currently only available in English (US)") 实例或是一个 [`PasswordCredential` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential "Currently only available in English (US)") 实例。
-   `cache`: 请求的 cache 模式：`default`、 `no-store`、 `reload` 、 `no-cache`、 `force-cache` 或者 `only-if-cached`。
-   `redirect`: 可用的 redirect 模式：`follow` (自动重定向), `error` (如果产生重定向将自动终止并且抛出一个错误），或者 `manual` (手动处理重定向)。在 Chrome 中默认使用 `follow`（Chrome 47 之前的默认值是 `manual`）。
-   `referrer`: 一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 可以是 `no-referrer`、`client` 或一个 URL。默认是 `client`。
-   `referrerPolicy`: 指定了 HTTP 头部 referer 字段的值。可能为以下值之一：`no-referrer`、 `no-referrer-when-downgrade`、`origin`、`origin-when-cross-origin`、 `unsafe-url`。
-   `integrity`: 包括请求的 [subresource integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity) 值（例如： `sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=`）。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#%E8%BF%94%E5%9B%9E%E5%80%BC)

一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，resolve 时回传 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象。