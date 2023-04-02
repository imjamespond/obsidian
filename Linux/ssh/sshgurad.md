https://cloud.tencent.com/developer/article/1987952
```shell
apt install sshguard
systemctl status sshguard
```

##### 第 4 步：如何将 SSH 阻止的主机列入白名单
要将被阻止的主机列入白名单，只需在白名单文件中指定其主机名或 IP 地址即可：
```
/etc/sshguard/whitelist - Ubuntu/Debian 
/etc/sshguard.whitelist - RHEL-based distros
```
之后，请务必重新启动 sshguard 守护程序和防火墙后端以应用更改。

---
- ufw
```shell
vim.tiny etc/ufw/before.rules
```
```
# allow all on loopback
-A ufw-before-input -i lo -j ACCEPT
-A ufw-before-output -o lo -j ACCEPT

# hand off control for sshd to sshguard
:sshguard - [0:0]
-A ufw-before-input -p tcp --dport 22 -j sshguard
```

- iptables
```
如果您仍在使用 Iptables，首先，在 Iptables 中为 sshguard 创建一个新的链式规则，以阻止不需要的访客。
# iptables -N sshguard

接下来，更新 INPUT 链以将流量引导至 sshguard 并阻止来自恶意方的所有流量。
# iptables -A INPUT -j sshguard

要阻止滥用者访问特定端口，例如 SSH、POP 和 IMAP，请运行以下命令：
# iptables -A INPUT -m multiport -p tcp --destination-ports 22,110,143 -j sshguard

最后，保存规则以使更改生效。
# iptables-save > /etc/iptables/iptables.rules

```

- firewalld
```
$ sudo firewall-cmd --permanent --zone=public --add-rich-rule="rule source ipset=sshguard4 drop"

$ sudo firewall-cmd --reload 
$ sudo systemctl restart sshguard

$ sudo firewall-cmd —-info-ipset=sshguard4
```