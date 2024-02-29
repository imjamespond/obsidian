之前有讲过公司新买的服务器使用的是CentOS5.5，部署好Tomcat之后却发现输入114.80.*.*:8080(即ip:8080)却无法显示Tomcat默认的首页。因为以前部署在Win Server的VPS，Linux开发时也只用到localhost，所以就有点头大。

好吧，G一下网上有说是防火墙的问题，敲入
```
/etc/init.d/iptables stop

关闭之后再次查看114.80.*.*:8080(即ip:8080)发现果然成功。但是貌似安全隐患大大增加……使用

/etc/init.d/iptables status

查看防火墙信息，可以看到打开的端口。那么我们把需要使用的端口打开应该是一个比较可行的办法了，命令如下：

/sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT #8080为指定端口

/etc/rc.d/init.d/iptables save #将更改进行保存

/etc/init.d/iptables restart #重启防火墙以便改动生效，当然如果不觉得麻烦也可重启系统（命令：reboot）

当然了，还有另外直接在 /etc/sysconfig/iptables中增加一行：

-A RH-Firewall-1-INPUT -p tcp -m state --state NEW -m tcp --dport 8080 -j ACCEPT 
```
  

##### 关于CentOS防火墙总结（其他Linux发行版可参考）
```
查看防火墙信息

/etc/init.d/iptables status

  

开启指定端口

/sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT

/etc/rc.d/init.d/iptables save

或者

编辑 /etc/sysconfig/iptables添加行：

-A RH-Firewall-1-INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT  #也可使用 -I INPUT -p tcp --dport 8080 -j ACCEPT

  

使更改的防火墙生效

/etc/init.d/iptables restart #不推荐使用重启系统方式

关闭防火墙服务

/etc/init.d/iptables stop

  

永久关闭防火墙

chkconfig –level 35 iptables off #此方法源自网络，未实验，安全考虑拒绝使用此方法

  
```

_[原文链接](http://liluo.org/2010/08/centos-5-5-%E9%98%B2%E7%81%AB%E5%A2%99%E5%BC%80%E5%90%AF%E3%80%81%E5%85%B3%E9%97%AD%E4%BB%A5%E5%8F%8A%E5%BC%80%E6%94%BE%E6%8C%87%E5%AE%9A%E7%AB%AF%E5%8F%A3/)  
_

  

----------------------------

在我们使用CentOS系统的时候，CentOS防火墙有时是需要改变设置的。CentOS防火墙默认是打开的，设置CentOS防火墙开放端口方法如下：

**打开iptables的配置文件：**  
vi /etc/sysconfig/[iptables](https://so.csdn.net/so/search?q=iptables&spm=1001.2101.3001.7020)  
修改CentOS防火墙时注意：一定要给自己留好后路,留VNC一个管理端口和SSh的管理端口

**下面是一个iptables的示例：**
```
# Firewall configuration written by system-config-securitylevel  
# Manual customization of this file is not recommended.  
*filter  
:INPUT ACCEPT [0:0]  
:FORWARD ACCEPT [0:0]  
:OUTPUT ACCEPT [0:0]  
:RH-Firewall-1-INPUT - [0:0]  
-A INPUT -j RH-Firewall-1-INPUT  
-A FORWARD -j RH-Firewall-1-INPUT  
-A RH-Firewall-1-INPUT -i lo -j ACCEPT  
-A RH-Firewall-1-INPUT -p icmp –icmp-type any -j ACCEPT  
-A RH-Firewall-1-INPUT -p 50 -j ACCEPT  
-A RH-Firewall-1-INPUT -p 51 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state ESTABLISHED,RELATED -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 53 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state NEW -m udp -p udp –dport 53 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 22 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 25 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 80 -j ACCEPT  
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 443 -j ACCEPT  
-A RH-Firewall-1-INPUT -j REJECT –reject-with icmp-host-prohibited  
COMMIT

修改CentOS防火墙需要注意的是，你必须根据自己服务器的情况来修改这个文件。

举例来说，如果你不希望开放80端口提供web服务，那么应该相应的删除这一行：  
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 80 -j ACCEPT

全部修改完之后重启iptables:  
service iptables restart

你可以验证一下是否规则都已经生效：iptables -L
```
这样，我们就完成了CentOS防火墙的设置修改。