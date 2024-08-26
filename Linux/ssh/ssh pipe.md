``` bash
cat ~/.ssh/id_rsa.pub| ssh test@nano "cat"
cat ~/.ssh/id_rsa.pub| ssh root@192.168.0.209 "su deploy -c 'whoami; cat;'"
cat ~/.ssh/id_rsa.pub| ssh root@192.168.0.209 "su deploy -c 'tee -a ~/.ssh/authorized_keys'" # append to file
```

[`tee`](https://zhuanlan.zhihu.com/p/34510815) 命令基于标准输入读取数据，标准输出或文件写入数据

we sent a publickey packet, wait for reply receive 51, 权限问题
`chmod 600 ./authorized_keys`