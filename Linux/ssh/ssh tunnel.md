
- -L
```bash
LOCAL_PORT=${2:-'12300'}
TARGET_PORT=${3:-'localhost:12300'}

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -L ${LOCAL_PORT}:${TARGET_PORT} ${1}
  sleep 30
done
```

- -R
```bash
REMOTE_lISTENING_PORT=${2:-'12300'}
LOCAL_PROXY_PORT=${3:-'12300'}

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -R localhost:${REMOTE_lISTENING_PORT}:localhost:${LOCAL_PROXY_PORT} ${1}
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