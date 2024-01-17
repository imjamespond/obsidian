
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