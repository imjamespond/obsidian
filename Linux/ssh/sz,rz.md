**Linux基础：利用SSH上传、下载（使用sz与rz命令）**

1. 首先，你的Linux端（CentOS, Ubuntu）需要安装rz/sz命令，也就是 lszrz 包。
2. 其次，windows端需要支持ZModem的telnet/ssh客户端 (Xshell，SecureCRT支持,好像putty不支持)，SecureCRT就可以用SecureCRT登陆到Unix/Linux主机（telnet或ssh均可）
3. 运行命令 `rz`，即是接收文件，xshell就会弹出文件选择对话框，选好文件之后关闭对话框，文件就会上传到linux里的当前目录。 如果要上传文件，直接用鼠标点住文件往X-shell里面一拖即是
4. 运行命令 `sz` file 就是发文件到windows上（保存的目录是可以配置） 比ftp命令方便多了，而且服务器不用再开FTP服务了