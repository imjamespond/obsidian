https://zhuanlan.zhihu.com/p/356436234
https://zhuanlan.zhihu.com/p/363346400

#### **LVS三种工作模式**
- NAT(Net Address Transition)即网络地址转换模式
- DR(Direct Router)即直接路由模式(RS处理完成后，直接封数据包VIP->CIP，返回给客户端，不经过LVS)(RS和LVS必须在同一机房中，很显然，ARP欺骗条件要求LVS和DS要在同一个物理局域网内，那有没有不需要再同一个局域网内的？但是是有，那就是隧道模式)
- TUN(Tunnel)即隧道模式

名词定义：
```
CIP: Client IP 客户端的IP
VIP: Virtual IP LVS实例IP，一般是暴露在公网中的地址；向外部直接面向用户请求，作为用户请求的目标的IP地址
DIP: Director IP，主要用于和内部主机通讯的IP地址
RIP: Real IP 后端服务器的真实IP
DS: Director Server 指的是前端负载均衡器节点
RS: Real Server 后端真实的工作服务器
```

本次实验以最常用的DR模式作为目标
```bash
# 安装ifconfig ipvsadm命令
yum install -y net-tools ipvsadm

# 添加VIP 这里掩码是16还是24根据具体情况而定
ifconfig eth0:vip ${nodeVIP}/16

# 清空所有规则
ipvsadm -C

# -A添加流量进入规则
ipvsadm -A  -t ${nodeVIP}:80  -s rr

# 在上面的进入规则下面添加流量出去（分发给RS）的规则
ipvsadm -a  -t ${nodeVIP}:80  -r  ${node2IP} -g -w 1
ipvsadm -a  -t ${nodeVIP}:80  -r  ${node3IP} -g -w 1
```

- 查看规则ipvsadm -ln，输出如下，说明成功负载到了node2和node3
```text
IP Virtual Server version 1.2.1 (size=4096)
Prot LocalAddress:Port Scheduler Flags
  -> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  172.17.0.100:80 rr
  -> 172.17.0.4:80                Route   1      0          0         
  -> 172.17.0.5:80                Route   1      0          0
```

#### 测试
在宿主机下面执行循环访问
```bash
while true; do curl ${nodeVIP}; sleep 1 ;done
```
-   node1中：netstat -natp看不到很多socket链接 ipvsadm -lnc查看偷窥小本本TCP 01:42 FIN_WAIT 172.17.0.1:55416 172.17.0.100:80 172.17.0.4:80 FIN_WAIT： 连接过，偷窥了所有的包 SYN_RECV： 基本上lvs都记录了，证明lvs没事，一定是后边网络层出问题
-   node2和node3中：netstat -natp看到很多socket链接


--- 
https://blog.csdn.net/qq_34556414/article/details/107765199
```bash
[root@localhost ~]# yum install ipvsadm -y  #通过ipvsadm来管理ip_vs模块
[root@localhost ~]# lsmod | grep -i ip_vs
[root@localhost ~]# modprobe ip_vs   #加载ip_vs模块，如果不加载就实现不了负载均衡了
[root@localhost ~]# lsmod | grep -i ip_vs
ip_vs                 141092  0 
nf_conntrack          133387  1 ip_vs
libcrc32c              12644  3 xfs,ip_vs,nf_conntrack
```

```bash
#ipvsadm  -A 代表添加VIP -t代表TCP协议 -s指定算法 rr轮询模式
[root@localhost ~]# ipvsadm -A -t 172.20.2.120:80 -s rr
[root@localhost ~]# ipvsadm -L -n
IP Virtual Server version 1.2.1 (size=4096)
Prot LocalAddress:Port Scheduler Flags
  -> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  172.20.2.120:80 rr
 
#-a表示在VIP集群当中添加后端服务器真实IP  -r表示real server  -m表示NAT 模式 -g表示DR模式 -w表示权重（在虚拟集群172.20.2.120:80中，加入后端Realserver服务器192.168.179.103:80）
[root@localhost ~]# ipvsadm -a -t 172.20.2.120:80 -r 192.168.179.103:80 -m -w 100
[root@localhost ~]# ipvsadm -L -n
IP Virtual Server version 1.2.1 (size=4096)
Prot LocalAddress:Port Scheduler Flags
  -> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  172.20.2.120:80 rr
  -> 192.168.179.103:80           Masq    100    0          0 
 
-a，往虚拟服务器集群中添加真实服务器；
-t，TCP协议；
-r，指定后端realserver服务器的IP和端口；
-m，指定NAT转发模式；
-w，weight权重设置；
 
#该文件内容为0，表示禁止数据包转发，1表示允许，将其修改为1。（LVS NAT模式能够实现数据转发，还要依靠Linux内核开启转发功能，所以需要如下设置）
[root@localhost ~]# cat /proc/sys/net/ipv4/ip_forward
0
[root@localhost ~]# echo 1 > /proc/sys/net/ipv4/ip_forward
[root@localhost ~]# cat /proc/sys/net/ipv4/ip_forward
1
```