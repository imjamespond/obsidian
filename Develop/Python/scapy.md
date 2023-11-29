在python中可以通过scapy这个库轻松实现构造数据包、发送数据包、分析数据包，为[网络编程](https://so.csdn.net/so/search?q=%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B&spm=1001.2101.3001.7020)之利器！

```python
sniff(filter=f"tcp port {port} and tcp[13] == 24", prn=lambda pkt: parse_mysql_packet(pkt, table_names), session=tcp_session, timeout=runtime)
```

另外一个十分重要的函数就是sniff()，如果使用过Tcpdump，那么对这个函数的使用就不会感到陌生。通过这个函数可以在自己的程序中捕获经过本机网卡的数据包。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020020817001683.png)

这里有个比较坑的地方，就是他不能实时回显，你必须得终止嗅探他才会回显他嗅探到的包。

这个函数强大的地方在于可以使用番薯filter对数据包进行过滤。例如，指定之捕获与192.168.1.107有关的数据包，可以使用“host 192.168.1.107”：

```python
sniff(filter="192.168.1.107")
```

同样，也可以使用filter来过滤指定的协议，例如ICMP类型的数据包。

```python
sniff(filter="icmp")
```

如果要同时满足多个条件，可以使用“and”、“or”等关系运算符来表达：

```python
sniff(filter=" host 192.168.1.107 and icmp")
```

另外两个很重要的参数是**iface、count**。iface可以用来指定所要进行监听的网卡，例如，指定eth0作为监听网卡，就可以使用：

```python
sniff(iface="eth0")
```

而count则用来指定监听到数据包的数量，达到指定的数量就会停止监听，例如，只监听30个数据包：

```python
sniff(count=30)
```

现在设计一个综合性的监听器他会在网卡eth0上监听源地址或者目标地址为192.168.1.107的ICMP数据包，到收到3个这样的数据包就停止：

```python
sniff(filter="icmp and host 192.168.1.107",count=30,iface="eth0")
```

运行结果：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200208171714680.png)如果要查看这三个数据包的内容，可以使用"_"，在Scapy中这个符号表示是上一条语句的执行结果。例如：

```python
a=_
a.nsummart()
```

运行结果：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200208172000741.png)刚刚使用过的函数 pkt.summary()用来以摘要的形式显示pkt的内容，这个摘要长度为一行。

```python
p=IP(dst="www.baidu.com")
p.summary()
```

运行结果：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200208172217356.png)**注：函数pkt.summary的作用与pkt.nsummary()相同，只是操作对象是单个数据包**