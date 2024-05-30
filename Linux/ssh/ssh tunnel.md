[ssh参数是用于设置ssh命令的选项，可以影响ssh的连接方式、协议版本、端口号、认证方式等。**常用的ssh参数有**](https://wenku.csdn.net/answer/q53yy11dx0)[1](https://wenku.csdn.net/answer/q53yy11dx0)[2](https://blog.csdn.net/luolan_hust/article/details/113726978)[3](https://blog.csdn.net/its666/article/details/111267530)[4](https://segmentfault.com/a/1190000021888536)[5](https://zhuanlan.zhihu.com/p/35922004)：
- -p：指定SSH服务器的端口号，默认是22端口
- -l：指定要登录的用户名
- -i：指定用于身份验证的私钥文件
- -C：启用压缩功能，可以提高传输速度
- -X：启用X11转发，可以在远程主机上显示图形界面程序
- -N：不执行远程命令，只进行连接，常用于建立隧道
- -L：本地端口转发，将本地端口转发到远程主机
--- 
- -L
```bash
LOCAL_PORT=${2:-'12300'}
TARGET_PORT=${3:-'localhost:12300'}

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -CNT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -L ${LOCAL_PORT}:${TARGET_PORT} ${1}
  sleep 30
done
```

- -R
```bash
REMOTE_lISTENING_PORT=${2:-'12300'}
LOCAL_PROXY_PORT=${3:-'12300'}
LOCAL_PROXY_ADDR=${4:-'localhost'}

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -CNT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -R localhost:${REMOTE_lISTENING_PORT}:${LOCAL_PROXY_ADDR}:${LOCAL_PROXY_PORT} ${1}
  sleep 30
done
```

通过跳板进行内网端口映射
```bash

#if [[ $(id -u) -ne 0 ]]; then
#    echo "Please run as root"
#    exit
#fi

LOCAL_PORT=${3:-'2200'}
TARGET_PORT=${4:-'localhost:2200'}

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -L *:${LOCAL_PORT}:${TARGET_PORT} ${1} -J ${2}
  sleep 30
done

# 通过文件
LOCAL_PORT=${2:-'2200'}
TARGET_PORT=${3:-'localhost:2200'}
HOST=$(head -n 1 ${1})
JUMP_HOST=$(head -n 2 ${1})

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -L *:${LOCAL_PORT}:${TARGET_PORT} ${HOST} -J ${JUMP_HOST}
  sleep 30
done


# ./git.txt
# test@localhost -p2222
# git@some_vps

# bash tunnel.sh ./git.txt

# tunnel.sh 'test@localhost -p2222' git@git 2200 22 将内网22映射到本地2200
# metasoft@192.168.2.2 metasoft@58.67.156.50:2221 2222 localhost:22
```
命令不能指定两机的identity file ` -i /e/id_rsa`, 所以应在~/.ssh/config中配置

--- 
指定key的场景
```
Host git
  HostName 132.232.112.242
  User git
  IdentityFile E:\id_rsa
Host nano
  HostName localhost
  User test
  ProxyJump git
  IdentityFile E:\id_rsa
```
nano通过git作为跳板访问

```bash
LOCAL_PORT=${2:-'2200'}
TARGET_PORT=${3:-'localhost:2200'}
HOST=${1}

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -L *:${LOCAL_PORT}:${TARGET_PORT} ${HOST} -vvv
  sleep 30
done

# bash tunnel.sh 'nano -p2222' 80 192.168.8.1:80
```

--- 
tmux与screen的一个区别, tmux貌似不能使用.ssh中的key文件,screen正常