- iptables -F
To flush a specific chain, which will delete all of the rules in the chain

- iptables -L
iptables -L -n --line-numbers 
iptables -t nat -L -n -v
List Rules as Tables

- iptables -S
To list out all of the active iptables rules by specification,
-S TCP

```
iptables -I INPUT -p tcp -m state --state NEW -m tcp --dport 18000 -j ACCEPT
```
-A for append -I for prepend
加到最后会被第6行拒绝,所以应prepend
6    REJECT     all  --  0.0.0.0/0            0.0.0.0/0           reject-with icmp-host-prohibited 

```
iptables -t nat -A PREROUTING -p tcp --dport 18000 -j REDIRECT --to-port 80
本地发起连接无效?
```

---
replace firewalld with iptables
```
systemctl stop firewalld
systemctl disable firewalld
systemctl status firewalld

yum install -y iptables-services
systemctl start iptables
systemctl enable iptables
systemctl status iptables

iptables-save #打印当前配置

```


---

```
iptables -t nat -L
iptables -t nat -L -n -v

# 清除
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
iptables -t nat -F
iptables -t mangle -F
iptables -F
iptables -X

iptables-save 
```
