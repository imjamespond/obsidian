- 长轮询
1，轮询时：...
2，轮询间隔时：   比如轮询时 收到一条消息id 是8，然后间隔几秒， 你那边有新消息， 9和10，先推送给别的轮询客户端，再把9，10压入栈， 这时栈里可能有 id为1。。。。。7，8，9，10的消息，这时我发新轮询，我传8给你，你就从栈里找8之后的消息立即返回给我,就是9,和10， 如果传id为7，你就返回8 9 10。
栈可以用redis实现，保证操作原子性
![[Pasted image 20230825161632.png|400]]
3，超时：...
```ts

{
    longPolling: ({ }) => {
      kmDebug('longPolling', new Date().toLocaleString())
      return request('get', `/api/mot/pop/longPolling`, {
        timeout: (process.env.NODE_ENV === "development" ? 10 : 40) * 1000,
        params: { requestId: Date.now().toString() }
      })
        .catch((err) => {
          kmDebug('longPolling err', new Date().toLocaleString(), err)
        })
    }
}

export function usePortalMsg() {
  return useSWR('long-polling', service.eventManagement.pop.longPolling, {
    revalidateOnFocus: false,
    shouldRetryOnError: false, errorRetryInterval: 0, errorRetryCount: 0,
    dedupingInterval: 0,
    refreshInterval: (process.env.NODE_ENV === "development" ? 15 : 5) * 1000,
  })
}
```
通过pollingmsg来取其他数据，比如未读数
```ts
  /* 门户消息 */
  const lastMsg = useRef(undefined)
  const { data: portalMsg, mutate: mutaePortalMsg } = usePortalMsg({ params: { readStatus: 0, pageSize: 1 } })
  const { data: pollingMsg } = usePollingMsg(lastMsg)

  useEffect(() => {
    if (pollingMsg && Array.isArray(pollingMsg)) {
      pollingMsg.forEach(item => {
        notification.info({ description: item.content, message: item.sendObject, duration: 10 })
      })
      if (pollingMsg.length) {
        lastMsg.current = pollingMsg[pollingMsg.length - 1]
      }
      mutaePortalMsg(undefined)
    }
  }, [pollingMsg])
```


- Axios 下载post文件
```ts
import { AxiosResponse } from "axios";

export function downloadFile (response: AxiosResponse){
  // const response = await requestRaw({ params, responseType: 'blob' });
  /* 从请求头中获取文件名称,用于将文件流转换成对应文件格式的文件,防止文件损坏 */
  let split = response.headers['content-disposition'].split("=");
  /* 将数据流转换为对应格式的文件,并创建a标签,模拟点击下载,实现文件下载功能 */
  let fileReader = new FileReader();
  fileReader.readAsDataURL(response.data);
  fileReader.onload = (e: any) => {
    let a = document.createElement('a');
    a.download = decodeURIComponent(split[1]);
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}
```

--- 

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