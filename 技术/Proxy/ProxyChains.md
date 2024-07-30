
https://github.com/rofl0r/proxychains-ng
[proxychains.conf](https://github.com/rofl0r/proxychains-ng/blob/master/src/proxychains.conf)
```
socks5	192.168.67.78	1080	lamer	secret
http	192.168.89.3	8080	justu	hidden
socks4	192.168.1.49	1080
http	192.168.39.93	8080	
```
https://proxychains.sourceforge.net/howto.html 
```
配置顺序
proxychains looks for config file in following order:
1) ./proxychains.conf
2) $(HOME)/.proxychains/proxychains.conf
3) /etc/proxychains.conf **
```

socks5 好像要注释 `proxy_dns` 

--- 
ProxyChains是一款Linux系统下的代理工具，由于很多优秀的程序位于[GitHub](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fwww.coorw.com%2Ftag%2Fgithub&source=article&objectId=2288071)社区，使用国内[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)部署GitHub上面的程序时，经常会在拉取安装包时下载超时失败，或是访问国外网站非常慢，例如用`git`、`wget`等等，这个时候就可以通过`proxychain`工具来使用socks或http代理进行[网络加速](https://cloud.tencent.com/product/dsa?from_column=20065&from=20065)访问。

### Debian/Ubuntu系统安装

1、直接通过 apt 包管理工具就可以安装，有两个版本，任选其一；

```bash
apt update 
apt install proxychains -y
或
apt install proxychains4 -y
```

### Centos系统安装

#### 1、有epel源

```bash
yum install -y proxychains-ng
```

#### 2、无epel源

```bash
git clone https://ghproxy.com/https://github.com/rofl0r/proxychains-ng.git
```

(2)编译和安装

```bash
yum install gcc
cd proxychains-ng
./configure --prefix=/usr --sysconfdir=/etc
make 
make install
make install-config
cd .. && rm -rf proxychains-ng
which proxychains
```

### ProxyChain配置使用

1、提前准备好一个可用的socks或http代理，如果自己有国外服务器可以通过 X-UI工具 搭建，也可以购买现成的代理：[pigcha](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Frun.weaksharedptr.com%2Fregister%3Fshare_id%3D94237f08-abc0-4ead-a388-0ec6fcfc8164&source=article&objectId=2288071)

2、安装后默认配置文件在 `/etc/proxychains.conf` 或 `/etc/proxychains4.conf` ，通过vi或nano编辑该文件，拉到最下面填入自己的代理信息，如果没设置用户密码认证则省略，添加后保存退出。

```bash
[ProxyList]
# add proxy here ...
# meanwile
# defaults set to "tor"
#socks4  127.0.0.1 9050  ##注释掉或者直接删掉默认的本地代理
socks5  连接IP地址 连接端口 用户名 密码
```

3、这时候通过在安装命令前加上proxychains4就可以使用了，比如 `proxychains4 curl cip.cc`，我们可以看到IP已经变成socks代理的IP。

4、但proxychains4太长不好记忆，可以通过`alias`给它设置了一个别名 pc 。

命令行输入： `vi /etc/profile` 编辑文件，在最后面添加如下内容

```bash
alias pc=proxychains4
```

刷新profile

```bash
source /etc/profile
```

测试

```bash
pc curl cip.cc
```

5、也可以命令行直接输入 `proxychains4 bash` ，这样就能新建一个具有全局代理功能的新终端，不需要在每条命令前都加proxychains了，输入exit退出终端。