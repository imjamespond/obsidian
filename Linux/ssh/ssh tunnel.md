通过跳板进行内网端口映射
```bash

#if [[ $(id -u) -ne 0 ]]; then
#    echo "Please run as root"
#    exit
#fi

LOCAL_PORT=${2:-'2200'}
TARGET_PORT=${3:-'localhost:2200'}
HOST=$(head -n 1 ${1})
JUMP_HOST=$(head -n 2 ${1})

while true
do
  echo $(date)" ssh tunnel start..."
  ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
    -L *:${LOCAL_PORT}:${TARGET_PORT} ${HOST} -J ${JUMP_HOST} -i /e/id_rsa
  sleep 30
done

# ./git.txt
# test@localhost -p2222
# git@some_vps

# bash tunnel.sh ./git.txt
# tunnel.sh 'test@localhost -p2222' git@git 2200 22 将内网22映射到本地2200

```


tmux与screen的一个区别, tmux貌似不能使用.ssh中的key文件,screen正常