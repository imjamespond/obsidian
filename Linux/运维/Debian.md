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



--- 

下面总结一下有关apt-get的常用但容易混淆的指令:
apt-get autoclean:
    如果你的硬盘空间不大的话，可以定期运行这个程序，==将已经删除了的软件包的.deb安装文件从硬盘中删除掉==。如果你仍然需要硬盘空间的话，可以试试apt-get clean，这会把你已安装的软件包的安装包也删除掉，当然多数情况下这些包没什么用了，因此这是个为硬盘腾地方的好办法。
apt-get clean:
    类似上面的命令，但它==删除包缓存中的所有包==。这是个很好的做法，因为多数情况下这些包没有用了。但如果你是拨号上网的话，就得重新考虑了。
apt-get autoremove:
    删除为了满足其他软件包的依赖而安装的，但现在==不再需要的软件包==。
其它：
apt-get remove 软件包名称：
    删除已安装的软件包（保留配置文件）。
apt-get --purge remove 软件包名称：
     删除已安装包（不保留配置文件)。
