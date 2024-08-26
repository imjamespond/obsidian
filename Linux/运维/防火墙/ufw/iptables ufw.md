- 参看[[sshgurad]]

--- 
#### iptables与nftables,ufw与firewalld以及netfilter详解

名称解释
netfilter：netfilter可以理解为linux内核处理网络堆栈的一个框架，提供了钩子函数用于其它内核模块（iptables和nftables）具体实现网络数据处理方法；

iptables与nftables：==iptables与nftables可以理解为具有相同功能的内核模块==，作用是实现了netfilter提供的钩子函数，用于真正处理网络数据包，我们称之为防火墙软件，nftables的出现是用于替换iptables;

<font color="#245bdb">ufw，firewalld</font>，==iptalbes配置工具“iptables”==和==nftables配置工具“nft”==：<font color="#245bdb">ufw，firewalld，iptables</font>(这里指的是iptables配置工具，不同于iptables内核模块)，<font color="#245bdb">nft等</font>，这些软件是属于<font color="#245bdb">用户工具</font>，用于管理iptables和nftables防火墙内核模块的，他们的作用是相同的，但执行命令和管理方式有差异。

#### iptables与nftables的区别
iptables与nftables同属于netfilter组织，两者都是用于实现netfilter框架用于处理网络数据包的钩子函数，==iptables应用时间早于nftables==，nftables在较新的系统中作为默认的防火墙软件，有替换iptables的趋势。下面举例说明不同版本的系统使用的防火墙软件：

|系统名称|版本|防火墙软件|
|---|---|---|
|ubuntu|20.04|iptables|
|ubuntu|22.04|nftables|
|centos|7|iptables|
|centos|8|nftables
#### ufw，firewalld，iptables(管理工具)与iptables的关系
在较旧的操作系统中，如ubuntu20.04，centos7等，ufw，firewalld，iptables(管理工具)有相同的作用，都是用于配置iptables防火墙内核模块。

在ubuntu上我们常用ufw作为防火墙配置工具，在centos上用firewalld作为防火墙配置工具，实际上，不管是使用ufw，firewalld，还是执行iptables配置命令，最终都是作用于iptables防火墙内核模块，只是他们执行的命令和管理方式不同。

在ubuntu20.04系统上启用ufw并使用ufw执行防火墙命令时，产生的结果可以通过执行iptables命令（iptables -L）查看；在centos7上使用firewalld管理防火墙时，命令执行的结果同样也可以通过执行iptables命令（iptables -L）查看，实际上ufw和firewalld是对iptables配置工具进行了高级封装，使得管理员在配置防火墙时可以通过执行相对简单，更容易理解的ufw或firewall-cmd命令配置防火墙，而不是通过执行复杂难懂的iptables命令配置防火墙，相当于把更简单易懂的ufw或firewall-cmd命令转换为复杂难懂的iptables命令配置iptables防火墙

ufw，firewalld，nft(nftables配置工具)与nftables的关系
在较新的系统中，如ubuntu22.04，centos8等，ufw，firewalld，nft(nftables配置工具)有相同的作用，都是用于配置nftables防火墙内核模块。

在ubuntu22.04系统中，启用ufw并执行防火墙配置命令后，我们不仅可以通过nft命令查看防火墙规则，也可以使用iptables配置工具查看配置的防火墙规则。在这里我们也许会疑惑，新的系统中默认使用nftables作为防火墙软件，那么ufw软件对nft管理工具进行高级封装，对nftables防火墙进行配置，所以ufw和nft都可以用于配置和查看nftables防火墙规则，这个好理解，但为什么iptables配置工具也可以管理nftables防火墙呢？
