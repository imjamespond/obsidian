# api-tpl-go

轻量好用的 Go API 项目框架

> 1.  Table `User` refers to `ent/schema/user.go`
> 2.  执行 `[ent.sh](http://ent.sh/)` 生成 ORM 代码 (只要 `ent/schema` 目录下有变动都需要执行)
> 3.  Set `GOPROXY` ( `go env -w GOPROXY="[https://proxy.golang.com.cn](https://proxy.golang.com.cn/),direct"` )

-   路由使用 [chi](https://github.com/go-chi/chi)
-   ORM 使用 [ent](https://github.com/ent/ent)
-   Redis 使用 [go-redis](https://github.com/redis/go-redis)
-   日志使用 [zap](https://github.com/uber-go/zap)
-   配置使用 [viper](https://github.com/spf13/viper)
-   命令行使用 [cobra](https://github.com/spf13/cobra)
-   MQ 使用 [nsq](https://github.com/nsqio/nsq)
-   Websocket 使用 [gorilla](https://github.com/gorilla/websocket)
-   能够自定义参数验证器
-   包含基础的登录授权功能
-   包含 认证、请求日志、跨域 中间价
-   包含基于 Redis 的简单分布式锁
-   包含 HTTP 、AES 、RSA 等众多实用的工具方法
-   简单好用的 API Result 统一输出方式