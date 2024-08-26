https://www.msys2.org/
https://www.cnblogs.com/zfc2201/p/7748204.html
It consists of a command line terminal called mintty, bash, version control systems like git and subversion, tools like tar and awk and even build systems like autotools, all based on a modified version of Cygwin....
To provide easy installation of packages and a way to keep them updated it features a package management system called Pacman, which should be familiar to Arch Linux users. 

```
pacman -S tmux openssh
 pacman -Q #列出已经安装的软件包,+e排除系统库

MSYS2 的源配置文件在 msys64\etc\pacman.d 目录下：
[mirrorlist.msys]
#中国科学技术大学开源软件镜像
Server = http://mirrors.ustc.edu.cn/msys2/msys/$arch
#北京理工大学开源软件镜像
Server = http://mirror.bit.edu.cn/msys2/REPOS/MSYS2/$arch
#清华大学开源软件镜像
Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch
```

tmux
```
tmux new -s your_session_name
tmux new -s sleepy -d "sleep 100"
tmux ls

退出
ctrl + b, d
exit
To close the window, press Ctrl+B, and then quickly hit X

进入tmux
ctrl + b 进入快捷键,按s选择session

Ctrl+B, and then D, detach
tmux attach-session -t foobar
tmux a -t [name] #The “a” command is short for attach-session
tmux a # #you can use the # shortcut to connect to the last created session:

```

---

Install Go lang with:

```
 pacman -S mingw-w64-x86_64-go
```

Configure env variables: 

```
export GOROOT=/mingw64/lib/go
export GOPATH=/mingw64
```

Start using Go :) 

go get will download (in mingw64/src), compile and make binaries available on your path (/mingw64/bin) 