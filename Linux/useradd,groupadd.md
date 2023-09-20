- useradd
-m 　制定用户的登入目录。

- groupadd

--- 
- [用户添加到组的四个方法](https://zhuanlan.zhihu.com/p/63408566)
usermod
```bash
# 加入
usermod -a -G mygroup user1
id user1
# uid=1008(user1) gid=1008(user1) groups=1008(user1),1012(mygroup)
# 要更改用户的主要组
usermod -g mygroup user3
```

使用 gpasswd 命令
```
gpasswd -M user1 mygroup
gpasswd -d user1 mygroup
```

我们可以通过编辑 ==`/etc/group`== 文件手动将用户添加到任何组中。