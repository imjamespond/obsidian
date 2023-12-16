
- [WithValue](https://golang.google.cn/pkg/context/#example_WithValue)
```go
package main

import (
	"context"
	"fmt"
)

func main() {
	type favContextKey string // 重命名类型

	f := func(ctx context.Context, k favContextKey) {
		if v := ctx.Value(k); v != nil {
			fmt.Println("found value:", v)
			return
		}
		fmt.Println("key not found:", k)
	}

	k := favContextKey("language")
	ctx := context.WithValue(context.Background(), k, "Go") // language -> Go

	f(ctx, k)
	f(ctx, favContextKey("color"))

}
```

https://www.bilibili.com/video/BV1Rh411P7oN/?spm_id_from=333.788.recommend_more_video.1&vd_source=62c8a03e66ff063b9af3e473fadb8049


---
https://zhuanlan.zhihu.com/p/136664236
```go
func main() {
    // 创建一个监听8000端口的服务器
    http.ListenAndServe(":8000", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := r.Context()
        // 输出到STDOUT展示处理已经开始
        fmt.Fprint(os.Stdout, "processing request\n")
    // 通过select监听多个channel
        select {
        case <-time.After(2 * time.Second):
      // 如果两秒后接受到了一个消息后，意味请求已经处理完成
      // 我们写入"request processed"作为响应
            w.Write([]byte("request processed"))
        case <-ctx.Done():

      // 如果处理完成前取消了，在STDERR中记录请求被取消的消息
            fmt.Fprint(os.Stderr, "request cancelled\n")
        }
    }))
}
你可以通过运行服务器并在浏览器中打开localhost:8000进行测试。如果你在2秒钟前关闭浏览器，则应该在终端窗口上看到“request cancelled”字样。

```

```go
func operation1(ctx context.Context) error {
  // 让我们假设这个操作会因为某种原因失败
  // 我们使用time.Sleep来模拟一个资源密集型操作
    time.Sleep(100 * time.Millisecond)
    return errors.New("failed")
}


func operation2(ctx context.Context) {
  // 我们使用在前面HTTP服务器例子里使用过的类型模式
    select {
    case <-time.After(500 * time.Millisecond):
        fmt.Println("done")
    case <-ctx.Done():
        fmt.Println("halted operation2")
    }
}


func main() {
    // 新建一个上下文
    ctx := context.Background()
  // 在初始上下文的基础上创建一个有取消功能的上下文
    ctx, cancel := context.WithCancel(ctx)
  // 在不同的goroutine中运行operation2
    go func() {
      operation2(ctx)
    }()


  err := operation1(ctx)
  // 如果这个操作返回错误，取消所有使用相同上下文的操作
    if err != nil {
        cancel()
    }
}
```

```go
func main() {
    // 创建一个超时时间为100毫秒的上下文
    ctx := context.Background()
    ctx, _ = context.WithTimeout(ctx, 100*time.Millisecond)


    // 创建一个访问Google主页的请求
    req, _ := http.NewRequest(http.MethodGet, "http://google.com", nil)
    // 将超时上下文关联到创建的请求上
    req = req.WithContext(ctx)


    // 创建一个HTTP客户端并执行请求
    client := &http.Client{}
    res, err := client.Do(req)
    // 如果请求失败了，记录到STDOUT
    if err != nil {
        fmt.Println("Request failed:", err)
        return
    }
    // 请求成功后打印状态码
    fmt.Println("Response received, status code:", res.StatusCode)
}
```






