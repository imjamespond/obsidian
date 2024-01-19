
https://www.debian.org/doc/manuals/debian-handbook/sect.firewall-packet-filtering.zh-cn.html
```bash
# apt install -y nftables
Reading package lists... Done
...
# systemctl enable nftables.service
Created symlink /etc/systemd/system/sysinit.target.wants/nftables.service → /lib/systemd/system/nftables.service.
```


```bash
vi /etc/sysctl.conf 
net.ipv4.conf.all.route_localnet=1
/sbin/sysctl -p

man nft
/usr/sbin/nft -h
vi ~/.bash_profile
alias nft=/usr/sbin/nft
nft list ruleset

```

### [10.8. 使用 nftables 配置端口转发](https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/securing_networks/configuring-port-forwarding-using-nftables_getting-started-with-nftables)
您可以使用 `nftables` 来转发数据包。例如，您可以将端口 `8022` 上的传入 IPv4 数据包转发到本地系统上的端口 `22`。
**流程**
1. 创建一个名为 `nat` 、具有 `ip` 地址系列的表：
    
    `nft add table ip nat`
    
2. 向表中添加 `prerouting` 和 `postrouting` 链：
    
    `nft -- add chain ip nat prerouting { type nat hook prerouting priority -100 \; }`
    
    注意
    将 `--` 选项传递给 `nft` 命令，以防止 shell 将负优先级值解析为 `nft` 命令的选项。
    
3. 向 `prerouting` 链中添加一条规则，将端口 `8022` 上的传入数据包重定向到本地端口 `22` ：
    
    `nft add rule ip nat prerouting tcp dport 8022 redirect to :22`

```
nft list ruleset
table ip nat {
        chain prerouting {
                type nat hook prerouting priority dstnat; policy accept;
                tcp dport 443 redirect to :2443
        }
}
```

- 删除 `nft delete table ip nat`

再次使用 handle 显示规则集。验证后续添加的规则是否已添加到指定位置：

```
# nft -a list table inet nftables_svc
table inet nftables_svc { # handle 13
  chain INPUT { # handle 1
    type filter hook input priority filter; policy accept;
    tcp dport 22 accept # handle 2
    tcp dport 636 accept # handle 5
    tcp dport 443 accept # handle 3
    tcp dport 80 accept # handle 6
    reject # handle 4
  }
}
```
删除带有句柄 6 的规则：

```
# nft delete rule inet nftables_svc INPUT handle 6
```
要删除规则，您必须指定句柄。

显示规则集，并验证删除的规则不再存在：

```
# nft -a list table inet nftables_svc
table inet nftables_svc { # handle 13
  chain INPUT { # handle 1
    type filter hook input priority filter; policy accept;
    tcp dport 22 accept # handle 2
    tcp dport 636 accept # handle 5
    tcp dport 443 accept # handle 3
    reject # handle 4
  }
}
```

---
https://farkasity.gitbooks.io/nftables-howto-zh/content/chapter3/simple_rule_management.html
### 删除规则

你需要使用 `-a` 选项获得要删除规则的句柄。句柄是内核自动赋予的且独立的指代规则。

```
% nft list table filter -a
table ip filter {
    chain input {
             type filter hook input priority 0;
    }

    chain output {
        type filter hook output priority 0;
        ip daddr 192.168.1.1 counter packets 1 bytes 84 # handle 5
    }
}
```

你可以使用下面的命令删除句柄号是 5 的规则：

```
% nft delete rule filter output handle 5
```

**注意**：有计划支持通过下面的命令删除规则：

```
% nft delete rule filter output ip saddr 192.168.1.1 counter
```

但是现在还没有实现。所以现在还需要使用句柄来删除规则。

### 删除链中的所有规则

你可以使用下面的命令==删除一条链中的所有规则==：

```
% nft delete rule filter output
```

你也可以使用下面的命令删除一个表中的所有规则：

```
% nft flush table filter
```