```bash

LOCAL=${3:-'12300'}
REMOTE=${2:-'12300'}


while true

do
echo $(date)" ssh tunnel start..."

ssh -NT -o ExitOnForwardFailure=yes -o ServerAliveInterval=60 -o ServerAliveCountMax=100 \
-L *:${REMOTE}:localhost:${LOCAL} ${1}

sleep 30
done

```


tmux与screen的一个区别, tmux貌似不能使用.ssh中的key文件,screen正常