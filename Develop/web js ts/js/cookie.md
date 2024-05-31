#天坑
- 某场景
一个非常slow==请求A==（带set-cookie session操作）
退出操作
登录操作, 更新session
...
这时==请求A==完成，把之前滴session又设回来
后面正常请求全是401