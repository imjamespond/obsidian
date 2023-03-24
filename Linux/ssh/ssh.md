~/.ssh/config 
```
Host vendor
  HostName 54.164.238.196
  User ubuntu
  Port 22
  IdentityFile ~/Documents/docs/aegisitsecurity-keypair.pem
...
ssh vendor
```

---
How can I ssh directly to a particular directory?
```
You can do the following:
ssh -t xxx.xxx.xxx.xxx "cd /directory_wanted ; bash --login"
This way, you will get a login shell right on the directory_wanted.

Explanation
-t Force pseudo-terminal allocation. This can be used to execute arbitrary screen-based programs on a remote machine, which can be very useful, e.g. when implementing menu services.
Multiple -t options force tty allocation, even if ssh has no local tty.
* If you don't use -t then no prompt will appear.
* If you don't add ; bash then the connection will get closed and return control to your local machine
* If you don't add bash --login then it will not use your configs because its not a login shell
```

---

```
ssh -o "StrictHostKeyChecking=no" -o "UserKnownHostsFile=/dev/null"
alias nocheckssh='ssh -o "StrictHostKeyChecking=no"'
```


---
<font size="1">作者：Kk111
链接：https://www.zhihu.com/question/28793890/answer/2031646166
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
</font>

我之前也是在windows上用mobaxterm的，确实是非常非常好用。转到mac之后，一度也寻找类似mobaxterm软件，后来我发现配置用了iterm 和 ssh config 之后基本打消了这个念头，因为更丝滑了。

常规配置

ssh config是怎么做呢？在~/.ssh目录下面新建config文件， 配置好别名：
```
Host * 
   Port 22
   ServerAliveInterval 120

Host target
    HostName $HOST
    Port $PORT
    IdentityFile ~/.ssh/id_rsa
    User user
```
其中ServerAliveInterval是为了保持心跳，$HOST是目标机器的IP，如192.168.10.22，$PORT 是 目标机器ssh server的端口， 如22， 2202。
这个配置文件可以像“类”那样继承的，==比如Host * 中的Port 22 和ServerAliveInterval 120 是可以被target继承的==，如果target的ssh server Port也是22，就不用再写了，如果不是22，才需要写出来。
### 然后配置免密登录：
```
ssh-copy-id -i .ssh/id_rsa user@$HOST -p $PORT
```
第一次输好密码,后面就不用输密码了，就像mobaxterm帮你记住了一样。
如果需要ssh/scp/rsync，在终端只要输别名就行:
```
ssh target
scp some_file target:/home/user
rsync -avP * target:/home/user/some_dir
```
我正常的操作流程是command+空格，呼出iterm，然后敲几个ssh或者scp这样的字符，zsh会自动补全常用的命令，其实比打开mobaxterm然后鼠标点击要方便的。
或者右击文件，打开iterm，然后输入scp命令也是很方便的：

看到这里，可能有知友会说这样的话我在~/.bashrc里写一个alias，像这样
```
alias ssh_target='ssh user@$HOST -p $PORT'
```
不也差不多嘛。确实，对于这种简单的场景，两者是差不多的。ssh config的便利性更体现在要通过跳板机登录的场景。

有跳板机配置

在某些场景下，往往是不能直接访问目标机器的，通常是用先登录一台机器（此机器通常被称为跳板机/堡垒机/gateway），然后再在这台机器上登录目标机器，我们可以借助ssh config来简化这种操作。在~/.ssh/config中配置：
```
Host gateway
    HostName $GATEWAY_HOST
    Port $GATEWAY_PORT
    IdentityFile ~/.ssh/id_rsa
    User $GATEWAY_USER

Host target
    HostName $TARGET_HOST
    User $TARGET_USER
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand ssh gateway nc %h %p 2> /dev/null # 或者 ProxyCommand ssh gateway -W %h:%p
```
其中：
```
%h 表示 hostname
%p 表示 port
```
然后配置免密登录，和上面一样,也只需要第一次输入密码：
```
ssh target 'mkdir -p .ssh && cat > .ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```
然后可以无感知地ssh/scp/rsync到目标机器，在终端中也只需要输入目标机器的别名就行:
```
ssh target
scp some_file target:/home/user
rsync -avP * target:/home/user/some_dir
```

使用RemoteCommand登录后执行自定义命令

mobaxterm可以在登录后执行自定义命令，在ssh config中Host下面增加如下两行可达到同样目的的：
```
RemoteCommand cd /xxx && /bin/bash
RequestTTY yes
```
其中RequestTTY为了避免执行ssh target之后hang住， RemoteCommand是在远程机器上执行的命令， 但是需要本机的open ssh版本大于等于7.6(可用ssh -V查看)，如果RemoteCommand不生效,  可把ssh config中的RemoteCommand和RequestTTY删除，用如下方式：
```
ssh -t target "cd xxx; bash"
```

更进一步

如果连'ssh target'中的'ssh '都不想敲呢，还有一招，可以补全这个'ssh '，在~/.bashrc(或者~/.bash_profie 或 ~/.zshrc类似文件)中增加
```
 # Auto complete ssh server defined in ~/.ssh/config
 # complete -W "$(awk '/^Host/{if ($2!="*") print $2}' ~/.ssh/config)" ssh

 # Define ssh alias for server defined in ~/.ssh/config
 for host in $(awk '/^Host/{if ($2!="*") print $2}' ~/.ssh/config); do
    alias $host="ssh $host"
 done
```
以后在终端中输入'target'就等于'ssh target'了，当然此时target最好取个有意义的名称。

如虎添翼

ssh config中配置的别名也可以用在python中，不论是否有跳板机，这是自然的，但是容易被忽略，比如
```
import subprocess

subprocess.check_call("scp some_file target:/home/user", shell=True)
```

SSH TUNNEL

mobaxterm里还有一个好用的功能是ssh tunnel(ssh 隧道)，因为我的tunnel不是太多，我是用alias来做的，
先安装autossh，autossh主要是帮助ssh程序在中断后自动重连的
```
brew install autossh
```
然后在~/.bashrc(或者~/.bash_profie 或 ~/.zshrc类似文件)中增加
```
alias t_some_tunnel='autossh -M 20001 -N -f -L 18123:127.0.0.1:8123 user@$HOST'
```
可以把$HOST上的18123端口映射到本地的8123 端口上， -M 20001的意思是设置监视端口20001用于监视这个ssh会话。  

---
<font size="1">
做一个推广，Data Analyst/Scientist 可以看下，一个把SQL翻译成Azure kusto和Pandas的翻译工具 ：
一个基本无害的SQL翻译器sql-translate.com/
更多：
Kk111：MacOS 应用推荐-Setapp篇
</font>