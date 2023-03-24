client意外关闭, remote 侦听端口未关闭,
https://unix.stackexchange.com/questions/427189/how-to-cleanup-ssh-reverse-tunnel-socket-after-connection-closed
```
ss -ptn|grep 8090
CLOSE-WAIT 1      0      172.16.0.2:8090               223.104.67.51:20517   

sudo sh -c 'echo "StreamLocalBindUnlink yes" >> /etc/ssh/sshd_config'
```


---
https://linux.101hacks.com/unix/sshd/
if you want to run the sshd in the foreground and see the output, specify the -D option. -D option will not detach.
```
# Hostkey
cat /etc/ssh/sshd_config
ssh-keygen.exe -t rsa -f /etc/ssh/ssh_host_rsa_key
sshd -D
```


---
chmod 0700 -R /home/someone/.ssh/
权限导致不能用公钥登录问题