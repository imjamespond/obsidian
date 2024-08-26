https://www.redhat.com/sysadmin/getting-started-socat

2. Use socat as a TCP port forwarder:
For a single connection, enter:
```
# socat TCP4-LISTEN:81 TCP4:192.168.1.10:80
```
For multiple connections, use the fork option as used in the examples below:
```
# socat TCP4-LISTEN:81,fork,reuseaddr TCP4:TCP4:192.168.1.10:80
```
This example listens on port 81, accepts connections, and forwards the connections to port 80 on the remote host.
```
# socat TCP-LISTEN:3307,reuseaddr,fork UNIX-CONNECT:/var/lib/mysql/mysql.sock
```
The above example listens on port 3307, accepts connections, and forwards the connections to a Unix socket on the remote host.

---
https://www.cnblogs.com/dgp-zjz/p/14471821.html
最简单的地址就是一个减号“-”，代表标准输入输出，而在命令行输入：
1. socat - -     # 把标准输入和标准输出对接，输入什么显示什么
2. 因为 socat 就是把左右两个地址的输入输出接在一起，==因此颠倒左右两个地址影响不大==,
服务端在 TCP-LISTEN 地址后面加了 fork 的参数后，就能同时应答多个链接过来的客户端，每个客户端会 fork 一个进程出来进行通信，加上 reuseaddr 可以防止链接没断开玩无法监听的问题。
```
socat TCP-LISTEN:8080,fork,reuseaddr  TCP:192.168.1.3:80
```
3. 地址除了 TCP 和 TCP-LISTEN 外，==另外一个重要的地址类型就是 EXEC 可以执行程序并且把输入输出和另外一个地址串起来==，比如服务端：
```
socat TCP-LISTEN:8080,fork,reuseaddr  EXEC:/usr/bin/bash    # 服务端提供 shell
socat - TCP:localhost:8080                                  # 客户端登录
```
完善一点可以加些参数：
```
socat TCP-LISTEN:8080,fork,reuseaddr  EXEC:/usr/bin/bash,pty,stderr   # 服务端
socat file:`tty`,raw,echo=0 TCP:localhost:8080                        # 客户端
```
这样可以把 bash 的标准错误重定向给标准输出，并且用终端模式运行。客户端可以像刚才那样登录，但是还可以更高级点，<font color="red">用 tty 的方式访问，这样基本就得到了一个全功能的交互式终端了</font>，可以在里面运行 vim, emacs 之类的程序。