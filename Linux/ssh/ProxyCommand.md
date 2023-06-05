
ssh-overproxy.sh
```bash
proxy=${2:-'localhost:1080'}
ssh -o ProxyCommand="nc -x ${proxy} %h %p" ${1}

直接ssh
ssh-overproxy.sh '-p 29871 foobar@cn2'
将远程port3389映射到本地
ssh-overproxy.sh '-p29871 -L 33890:52.175.201.58:3389 foobar@cn2'
使用另一台机作socks代理
ssh-overproxy.sh '-D 10080 root@108.166.222.103'
```

---
https://stackoverflow.com/questions/26339490/how-is-git-push-through-network-working-proxy
```
The http and https proxy has been mentioned above:
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080

but the ssh proxy is different, you should add this under ~/.ssh/config, for windows user:
Host github.com
   User git
   ProxyCommand connect -S 127.0.0.1:8888 -a none %h %p
for linux user:
ProxyCommand 'nc -X 5 -x localhost:1080 %h %p'
```

---
ssh over socks
How to connect to a git repository using the SSH protocol
If the remote has a format like
jamespond@github.com:cms-sw/cmssw.git
ssh://git@github.com/cms-sw/cmssw.git
then you are connecting to the git server using the SSH protocol.
In this case, git relis on ssh to handle the connection; in order to connect through a SOCKS proxy you have to configure ssh itself, setting the ProxyCommand option in your ~/.ssh/config file:
Host github.com
    User                    jamespond
    ProxyCommand            nc -x localhost:1080 %h %p
OR On CentOS7 you can
Host github.com
    User                    git
    ProxyCommand            ssh cmsusr nc %h %p

---
Windows
ProxyCommand /mingw64/bin/connect -H 127.0.0.1:8123 %h %p

Host github.com
 User git

Host gitlab.com
 User git
