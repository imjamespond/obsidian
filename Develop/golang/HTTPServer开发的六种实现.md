![[example]]

--- 
学完了`net/http`和`fasthttp`两个HTTP协议接口的客户端实现，接下来就要开始Server的开发，不学不知道一学吓一跳，居然这两个库还支持Server的开发，太方便了。

相比于Java的HTTPServer开发基本上都是使用Spring或者Springboot框架，总是要配置各种配置类，各种`handle`对象。Golang的Server开发显得非常简单，就是因为特别简单，或者说没有形成特别统一的规范或者框架，我发现了很多实现方式，HTTP协议基于还是`net/http`和`fasthttp`，但是`handle`语法就多种多样了。

先复习一下：**[Golang语言HTTP客户端实践](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/e8kjdeI6WzMhNYnC9X2oRg)**、**[Golang fasthttp实践](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/9otWDl2mSGEo9fboyToNnw)**。

在Golang语言方面，实现某个功能的库可能会比较多，有机会还是要多跟同行交流，指不定就发现了更好用的库。下面我分享我学到的六种Server开发的实现Demo。

## **第一种**

基于`net/http`实现，这是一种比较基础的，对于接口和`handle`映射关系处理并不优雅，不推荐使用。

```text
func TestHttpSer(t *testing.T) {
 server := http.Server{
  Addr: ":8001",
  Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
   if strings.Index(r.URL.String(), "test") > 0 {
    fmt.Fprintf(w, "这是net/http创建的server第一种方式")
    return
   }
   fmt.Fprintf(w, task.FunTester)
   return
  }),
 }
 server.ListenAndServe()
 log.Println("开始创建HTTP服务")

}

```

## **第二种**

第二种也是基于`net/http`，这种编写语法可以很好地解决第一种的问题，handle和path有了类似配置的语法，可读性提高了很多。

```text
type indexHandler struct {
 content string
}

func (ih *indexHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
 fmt.Fprintf(w, ih.content)
}

func TestHttpSer2(t *testing.T) {
 http.Handle("/test", &indexHandler{content: "这是net/http第二种创建服务语法"})
 http.Handle("/", &indexHandler{content: task.FunTester})
 http.ListenAndServe(":8001", nil)
}

```

## **第三种**

第三个基于`net/http`和`github.com/labstack/echo`，后者主要提供了`Echo`对象用来处理各类配置包括接口和handle映射，功能很丰富，可读性最佳。

```text
func TestHttpSer3(t *testing.T) {
 app := echo.New()
 app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
  AllowOrigins: []string{"*"},
  AllowMethods: []string{echo.GET, echo.DELETE, echo.POST, echo.OPTIONS, echo.PUT, echo.HEAD},
  AllowHeaders: []string{echo.HeaderContentType, echo.HeaderAuthorization},
 }))
 app.Group("/test")
 {
  projectGroup := app.Group("/test")
  projectGroup.GET("/", PropertyAddHandler)
 }
 app.Server.Addr = ":8001"
 gracehttp.Serve(app.Server)

}
```

## **第四种**

第四种依然基于`net/http`实现，引入了`github.com/gin-gonic/gin`的路由，看起来接口和`handle`映射关系比较明晰了。

```text
func TestHttpServer4(t *testing.T) {
 router := gin.New()

 api := router.Group("/okreplay/api")
 {
  api.POST("/submit", gin.HandlerFunc(func(context *gin.Context) {
			context.JSON(http.StatusOK,task.FunTester)

  }))

 }
 s := &http.Server{
  Addr:           ":8001",
  Handler:        router,
  ReadTimeout:    1000 * time.Second,
  WriteTimeout:   1000 * time.Second,
  MaxHeaderBytes: 1 << 20,
 }
 s.ListenAndServe()
}
```

## **第五种**

第五种基于`fasthttp`开发，使用都是`fasthttp`提供的API，可读性尚可，handle配置倒是更像Java了。

```text
func TestFastSer(t *testing.T) {
 address := ":8001"
 handler := func(ctx *fasthttp.RequestCtx) {
  path := string(ctx.Path())
  switch path {
  case "/test":
   ctx.SetBody([]byte("这是fasthttp创建服务的第一种语法"))
  default:
   ctx.SetBody([]byte(task.FunTester))
  }
 }
 s := &fasthttp.Server{
  Handler: handler,
  Name:    "FunTester server",
 }

 if err := s.ListenAndServe(address); err != nil {
  log.Fatal("error in ListenAndServe", err.Error())
 }

}
```

## **第六种**

第六种依然基于`fasthttp`，用到了`github.com/buaazp/fasthttprouter`，有点奇怪两个居然不在一个GitHub仓库里。使用语法跟第三种方式有点类似，比较有条理，有利于阅读。

```text
func TestFastSer2(t *testing.T) {
 address := ":8001"

 router := fasthttprouter.New()
 router.GET("/test", func(ctx *fasthttp.RequestCtx) {
  ctx.Response.SetBody([]byte("这是fasthttp创建server的第二种语法"))
 })
 router.GET("/", func(ctx *fasthttp.RequestCtx) {
  ctx.Response.SetBody([]byte(task.FunTester))
 })
 fasthttp.ListenAndServe(address, router.Handler)
}

```

## **Have Fun ~ Tester ！**

- **[颇具年代感的《JMeter中文操作手册》](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/5Yx9nUkndsHQ0mdyuqUuHQ)**
- **[140道面试题目（UI、Linux、MySQL、API、安全）](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/TNI0g_ldTY_t5oWfVgAvXg)**
- **[图解HTTP脑图](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/100Vm8FVEuXs0x6rDGTipw)**
- **[分享一份Fiddler学习包](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/3J6hKKqt9GTlo4Z9SiJiLw)**
- **[测试之JVM命令脑图](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/qprqyv0j3SCvGw1HMjbaMQ)**
- **[好书推荐《Java性能权威指南》](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/YWd5Yx6n7887g1lMLTcsWQ)**
- **[如何选择正确的自动化测试工具](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/_Ee78UW9CxRpV5MoTrfgCQ)**
- **[用Groovy处理JMeter变量](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/BxtweLrBUptM8r3LxmeM_Q)**
- **[HTTP接口测试基础【FunTester框架教程】](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/xnjI5tqTobd4_3seBDvOHQ)**
- **[功能测试与非功能测试](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/oJ6PJs1zO0LOQSTRF6M6WA)**
- **[如何维护自动化测试](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/4eh4AN_MiatMSkoCMtY3UA)**
- **[Jira API的踩坑记](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/Mw9AzcK8tlceXEgaKqLVeg)**
- **[性能瓶颈调优【粉丝投稿】](https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/GS2scJtLCYIKVs8pOBOCNg)**

- END -