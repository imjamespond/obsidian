- 用户 `/etc/passwd`
文件以：分隔符
第一列 root 为用户名称，第二列为密码占位符
第二列 x 要用密码登录，为空时，需要密码即可登录
第三列 0 UID
第四列 0 GID
第五列 root 为用户附加基本信息，一般为储存账户名全称、联系方式等信息
第六列 /root 用户家目录位置
第七列 /bin/bash 账户登录shell，/bin/bash账户可登录,/sbin/nologin表示账户无法登录系统

- 密码`/etc/shadow`

- 组`/etc/group`  
第一列 组用户名称
第二列 密码占位符
第三列 GID
第四列 ==**组成员信息**==（注：仅显示附加，基本成员不显示）
通过设置组密码，添加组管理员
```
gpasswd wyy
Changing the password for group wyy
```