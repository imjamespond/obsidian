
|  |  |  |
| ---- | ---- | ---- |
| oauth2服务 | 不对外公开 | 获取access token，例如：<br>https://xxx.com/cgi-bin/token<br>?grant_type=client_credential<br>&appid=APPID&secret=APPSECRET |
| 传统的权限验证服务器 | 对外公开 | 调用oauth2服务 |
| resource服务 | 对外公开 |  |


