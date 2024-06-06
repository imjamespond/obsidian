
UFW全称为Uncomplicated Firewall，是Ubuntu系统上配置iptables防火墙的工具。UFW提供一个非常友好的命令用于创建基于IPV4，IPV6的防火墙规则。

由于Ubuntu下的iptables操作起来比较复杂，依赖关系比较多，所以使用UFW时可以简化很多操作。当然Debian同样适用。无论是桌面版还是服务器版, UFW的命令行用法是一样的。

1.安装方法
`sudo apt-get install ufw`

2.使用方法
2.1 启动防火墙并设置开机启动
```
sudo ufw enable
sudo ufw default deny
```
注：开启防火墙并关闭外部主机对本机的访问（不影响本机对外部主机访问）

2.2 关闭
```
sudo ufw disable
```
2.3 查看防火墙状态
 开启了为 active, 没开启为 inactive
```
sudo ufw status
```
2.4 开启、禁用端口及其他服务命令
```
sudo ufw allow port_number // 开放 port_number 端口
 
sudo ufw delete allow port_number // 删除 port_number 端口
 
sudo ufw allow from 192.168.1.1 // 允许来自 192.168.1.1 的主机的访问
 
sudo ufw deny smtp // 禁止外部访问smtp服务
 
sudo ufw delete allow smtp // 删除上面建立的某条规则
```
2.5 重置所有的规则
```
sudo ufw reset
```
3 查看防火墙状态
```
sudo ufw status
```
4 转换日志状态
```
sudo ufw logging on|off
```
5 使用案例
 对于大部分防火墙操作来说， 其实无非就是的打开关闭端口。如果要打开SSH服务器的22端口， 我们可以这样：
```
sudo ufw allow 22
```
由于在/etc/services中， 22端口对应的服务名是ssh。所以下面的命令是一样的：
```
sudo ufw allow ssh
```
删除已经添加过的规则：
```
sudo ufw delete allow 22
```
只打开使用tcp/ip协议的22端口：
```
sudo ufw allow 22/tcp
```
 

iptables的使用
1 启动iptables
`modprobe ip_tables`
2 关闭iptables（关闭命令要比启动复杂）
```
iptables -F
 
iptables -X
 
iptables -Z
 
iptables -P INPUT ACCEPT
 
iptables -P OUTPUT ACCEPT
 
iptables -P FORWARD ACCEPT
 
modprobe -r ip_tables
```
依次执行以上命令即可关闭iptables，否则在执行modproble -r ip_tables时将会提示FATAL: Module ip_tables is in use.

3 常用命令介绍
清除预设表filter中的所有规则链的规则

iptables -F
清除预设表filter中使用者自定链中的规则

 iptables -X
以数字形式查看iptables规则

iptables -L -n
抛弃所有不符合三种链规则的数据包

 
iptables -P INPUT DROP
 
iptables -P OUTPUT DROP
 
iptables -P FORWARD DROP
允许IP访问

命令语法：iptables -t 表名 -I 链名 匹配条件 -j 动作（DROP、REJECT、ACCEPT）
示例：

iptables -t filter -I INPUT -s 192.168.1.146 -j ACCEPT
开放SSH端口22

iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --sport 22 -j ACCEPT
删除SSH端口22

 
iptables -D INPUT -p tcp --dport 22 -j ACCEPT
 
iptables -D INPUT -p tcp --sport 22 -j ACCEPT
 

保存iptables规则 文件不存在则新建

iptables-save > /etc/sysconfig/iptables
 设置开机启动
  ubuntu18 /etc/networkd-dispatcher/routable.d/50-ifup-hooks文件添加 iptables-restore < /etc/sysconfig/iptables

  ubuntu16 修改 /etc/network/interfaces ，添加下面末尾2行脚本
```
auto eth0
 
iface eth0 inet dhcp
 
pre-up iptables-restore < /etc/sysconfig/iptables
 
post-down iptables-save > /etc/sysconfig/iptables
```
 
 

 

防火墙对比
SELinux、Netfilter、iptables、firewall和UFW五者关系

1 五者是什么？
1、SELinux是美国国家安全局发布的一个强制访问控制系统
2、Netfilter是Linux 2.4.x引入的一个子系统，作为一个通用的、抽象的框架，提供一整套的hook函数的管理机制
3、iptables是Linux下功能强大的应用层防火墙工具。

4、firewall是centos7里面新的防火墙管理命令
5、ufw是Ubuntu下的一个简易的防火墙配置工具。






2 五者关系？
1、Netfilter管网络，selinux管本地。
2、iptables是用于设置防火墙，防范来自网络的入侵和实现网络地址转发、QoS等功能，而SELinux则可以理解为是作为Linux文件权限控制（即我们知道的rwx）的补充存在的
3、ufw是自2.4版本以后的Linux内核中一个简易的防火墙配置工具，底层还是调用iptables来处理的，iptables可以灵活的定义防火墙规则， 功能非常强大。但是产生的副作用便是配置过于复杂。因此产生一个相对iptables简单很多的防火墙配置工具：ufw

4、firewall是centos7里面新的防火墙管理命令，底层还是调用iptables来处理的，主要区别是iptables服务，每次更改都意味着刷新所有旧规则并从/etc/sysconfig/iptables读取所有新规则，firewall可以在运行时更改设置，而不丢失现有连接。
5、iptables是Linux下功能强大的应用层防火墙工具, 说到iptables必然提到Netfilter，iptables是应用层的，其实质是一个定义规则的配置工具，而核心的数据包拦截和转发是Netfiler。Netfilter是Linux操作系统核心层内部的一个数据包处理模块

iptables和Netfilter关系图：
![](https://img-blog.csdn.net/20171120142409881?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzQ4NzA2MzE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)


iptables和fillwall关系图：
![](https://img-blog.csdn.net/20180702201415783?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpaXRkYXI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)




 
 