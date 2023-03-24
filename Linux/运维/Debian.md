1,关机命令
systemctl poweroff

---
安装ssh
```
cat /etc/apt/sources.list
deb cdrom:[Debian GNU/Linux 11.6.0 _Bullseye_ - Official arm64 DVD Binary-1 20221217-10:40]/ bullseye main
没有的话
apt-cdrom add
apt update
```
apt-get install openssh-server

---
离线安装配置网络

```
vim.tiny /etc/network/interfaces
...aad
auto ens160
iface ens160 inet dhcp
...save
ifup ens160
```

systemctl status
systemctl enable systemd-networkd
systemctl start systemd-networkd

---
高级安装
启动时选advance -> (图形化) expert install


---
默认shell
https://www.howtogeek.com/669835/how-to-change-your-default-shell-on-linux-with-chsh/
```
cat /etc/shells
```

To set your login shell, use chsh with no parameters:
```
chsh
```
