https://blog.csdn.net/weixin_46902396/article/details/124322638

一、基本介绍
平时我们在配置 Nginx 代理时，一般配置的都是基于 http 或是 https 协议的代理，也就是应用层。但是有些时候，我们并不想配置这种基于应用层的代理。比如说：我们要代理到数据库上，但是数据库是不支持应用层代理的。

所以，我们并不能像平常那样来配置，不过呢，在 Nginx 1.9.0 版本后，Nginx 便可以通过配置 ==--with-stream== 模块的方式，来实现基于四层的反向代理。因此，我们便可以通过**端口代理到端口**的方式来访问到数据库。

上面我们只是打个比方，其实我们是可以通过四层代理，来代理到任何使用到四层协议的服务上，而不仅仅是数据库。

二、使用 Nginx 实现四层代理配置 

```bash
1.安装 Nginx
[root@Nginx ~]# yum -y install pcre-devel zlib-devel popt-devel openssl-devel openssl
[root@Nginx ~]# wget http://www.nginx.org/download/nginx-1.21.0.tar.gz
[root@Nginx ~]# ls
anaconda-ks.cfg  nginx-1.21.0.tar.gz
[root@Nginx ~]# tar zxf nginx-1.21.0.tar.gz -C /usr/src/
[root@Nginx ~]# cd /usr/src/nginx-1.21.0/
[root@Nginx nginx-1.21.0]# useradd -M -s /sbin/nologin nginx
[root@Nginx nginx-1.21.0]# ./configure \
--prefix=/usr/local/nginx \
--user=nginx \
--group=nginx \
--with-file-aio \
--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-stream \
--with-pcre && make && make install
[root@Nginx nginx-1.21.0]# ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/
[root@Nginx nginx-1.21.0]# cd
[root@Nginx ~]# nginx
[root@Nginx ~]# netstat -anpt | grep 80
```

2.修改 Nginx 配置文件
stream 和 http 区域同级即可。
```bash
[root@Nginx ~]# cat <<END >> /usr/local/nginx/conf/nginx.conf
stream {
  upstream test_mysql {
    hash $remote_addr consistent;				# 通过配置一致性 hash 来防止调度异常
    server 192.168.1.1:3306 weight=5 max_fails=3 fail_timeout=30s;
  }
  server {
    listen 10086 so_keepalive=on;				# 开启 TCP 存活探测
    proxy_connect_timeout 10s;					# 连接超时时间
    proxy_timeout 300s;							# 端口保持时间
    proxy_pass test_mysql;
  }
}
END
[root@Nginx ~]# nginx -s reload
```

--- 
https://cloud.tencent.com/developer/article/2013908
# **Nginx系列之nginx四层反向代理**

> 上集说到nginx的http七层代理，其实它工作在OSI七层模型的应用层。由于其可以解析http协议，我们可以根据URI进行请求的分发，具有很大的灵活性，但是协议的解析存在性能的消耗。为了能获取更高的代理性能，nginx支持了四层代理，即传输层，就是我们常说的TCP/UDP层，没有协议解析，就是简单的TCP/UDP转发，代理性能突飞猛进，该功能依赖于ngx_http_upstream_module和ngx_stream_upstream_module，互联网公司将其作为入口代理来工作。

## **1. nginx配置**

```nginx
# nginx.conf

worker_processes auto;

error_log /var/log/nginx/error.log info;

events {
    worker_connections  1024;
}

stream {
    # 定义backend组
    upstream backend {
        # 指定负载均衡算法，这里是一致性hash算法，以$remote_addr作为hash的键.
        hash $remote_addr consistent;

        server backend1.example.com:12345 weight=5;
        server 127.0.0.1:12345            max_fails=3 fail_timeout=30s;
        server unix:/tmp/backend3;
    }

    # 定义dns组
    upstream dns {
       server 192.168.0.1:53535;
       server dns.example.com:53;
    }

    server {
        # 指定监听的端口，tcp/udp
        listen 12345;
        proxy_connect_timeout 1s;
        proxy_timeout 3s;
        # 代理至backend服务器组
        proxy_pass backend;
    }

    server {
        # 指定监听的端口，tcp/udp
        listen 127.0.0.1:53 udp reuseport;
        proxy_timeout 20s;
        # 代理至dns服务器组
        proxy_pass dns;
    }

    server {
        # 指定监听的端口，tcp/udp
        listen [::1]:12345;
        # 指定代理至本地socket文件
        proxy_pass unix:/tmp/stream.socket;
    }
}
```

经过以上简单的配置，nginx -s reload后，nginx即可作为四层反向代理[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)。这段配置的关键在于server配置端，指定监听的端口，`proxy_pass`来指定上游服务器或上游服务器组。与七层代理的配置区别主要在于http-->stream，没有localctation配置，直接监听端口，将端口的流量直接进行转发。

## **2. 上游服务器组的实现**

在如今的流量为王的时代，单机以及远远不能满足性能要求，这就需要我们在上游服务中提供多台服务器，形成服务器组。共同来提供服务，并可以采用不同的[负载均衡](https://cloud.tencent.com/product/clb?from_column=20065&from=20065)算法，更加灵活与可扩展。而做到这些需要依赖`ngx_stream_upstream_module`模块。示例:

```nginx
http {

    upstream backend {
        # 配置负载均衡算法
        hash $remote_addr consistent;
        server backend1.example.com       weight=5;
        server backend2.example.com:8080;
        server unix:/tmp/backend3;

        server backup1.example.com:8080   backup;
        server backup2.example.com:8080   backup;

    }

    server {
        listen 80;
        proxy_timeout 20s;
        # 代理至dns服务器组
        proxy_pass dns;
        proxy_pass http://backend;
    }
}
```

从配置我们可以看到使用==upstream定义了**backend**组==，并在后续的==server配置中引用==，放在`proxy_pass`指令后面。这样就快速实现多台服务器提供服务的效果，默认是轮询算法，权重默认都为1;

代理过程属性超时控制:

•proxy_connect_timeout: 指定与上游服务器建立连接的超时时间，默认为60s，配置上下文stream和server。

•proxy_timeout: 设置客户端或代理服务器连接上两次连续的读取或写入操作之间的超时。如果在此时间内没有数据传输，则连接将关闭。默认10m，配置上下文stream和server。

容错相关的配置:

•proxy_next_upstream: 如果无法建立与代理服务器的连接，决定是否将客户端连接传递给下一个服务器。配置上下文stream和server；默认开启;

•proxy_next_upstream_timeout: 限制允许将连接传递到下一台服务器的时间，配置上下文stream和server；默认关闭;

•proxy_next_upstream_tries: 限制将连接传递到下一个服务器的可能尝试次数，配置上下文stream和server，默认关闭;

限速相关的配置:

•proxy_download_rate：限制从代理服务器读取数据的速度。单位为bytes/s。默认为0，即关闭速率限制。该限制是针对每个连接设置的，因此，如果nginx同时打开与代理服务器的两个连接，则总速率会是指定限制的两倍。从nginx1.17.0开始，该指令后可以包含变量, 配置上下文stream和server。

•proxy_upload_rate：限制从代理服务器读取数据的速度。单位为bytes/s。默认为0，即关闭速率限制。该限制是针对每个连接设置的，因此，如果nginx同时打开与代理服务器的两个连接，则总速率会是指定限制的两倍。从nginx1.17.0开始，该指令后可以包含变量, 配置上下文stream和server。

upstream中的server的属性，我们也可以灵活配置，包括轮询算法、server权重等属性。

## **3. server的属性配置**

•weight: 指定server的权重，默认为1

•max_fails: 容错处理，配置与服务器通信失败达到多少次后判断服务器异常，通信过程中的超时时间由fail_timeout指定，默认是1次，0为禁用。

•fail_timeout: 指定与服务器通信的超时时间。

•更多配置参数请参考官方文档: http://nginx.org/en/docs/http/ngx_stream_upstream_module.html

## **4. 负载均衡算法**

•hash: 配置格式为 hash key [consistent]; 配置上下文为upstream。 该指定为服务器组指定基于hash的负载平衡方法，在服务器组中，客户端与服务器映射关系基于散列键key。key可以包含文本，变量及其两者组合。请注意，从组中添加或删除服务器可能会导致将大多数keys重新映射到其他服务器。 但是如果指定了consistent参数，则会使用ketama一致性哈希算法。该方法可确保在将服务器添加到组中或从组中删除服务器时，只有很少的key被重新映射到不同的服务器。这有助于为缓存服务器实现更高的缓存命中率。

•least_conn: 配置格式为 least_conn; 配置上下文为upstream。 指定组应使用least_conn负载平衡算法，该算法将请求传递到活动连接数最少的服务器，同时考虑服务器的权重。如果有多个这样的服务器，则依次使用加权循环平衡方法进行尝试。

•random: 配置格式为 random [two [method]]; 配置上下文为upstream。 指定组应使用random负载平衡算法，该算法将请求传递到随机选择的服务器，同时考虑服务器的权重。 可选的two参数指示nginx可以随机选择两个服务器，然后使用指定的method选择一个服务器。默认方法是least_conn，它将请求传递给活动连接数最少的服务器。

## **5. 模块的有用的内置变量**

```text
1. $status: 会话的处理状态码: 200、400、403、500、502、503。具体含义可参考http://nginx.org/en/docs/stream/ngx_stream_core_module.html;
2. $remote_addr：客户端地址;
3. $server_addr： 接受连接的服务器的地址;
```

复制

## **6. 总结**

依赖`ngx_stream_proxy_module`和`ngx_stream_upstream_module`等模块，nginx实现了强大的四层反向代理功能。相较于七层反向代理，性能更高。但是对于业务的请求分发，灵活性比较低，所以nginx的四层和七层代理我们要根据自己的要求灵活使用，让nginx发挥最大的作用。

--- 
https://www.zhihu.com/question/63434275
层次不一样，nginx转发属于应用层，iptables是网络层。

iptables转发一般用于nat内网服务器提供外网应用。比如一个ip做公网，服务器放在内网，公共ip就一个，把服务器就放在公网ip的电脑上话会有些问题，一般还要提供上网服务（做路由器），需要提供的服务可能也很多，比如，www，ftp，mail，那么通过iptables实现端口映射，把不同服务放到不同服务器上，又不需要很多公网ip。

nginx转发主要是负载均衡，而且比较灵活，比如部分转发，转发到不同的服务器上。iptables只能实现全部转发，按照端口，到达端口的数据全部转发给一台服务器。nginx转发http请求就灵活很多，比如对于静态内容，js，css，图片，可以利用memcache等缓存，直接提供服务，而其他复杂的请求可以转发过应用服务器，而且支持多个服务器。

# nginx与iptables作为网络连接代理的简单区别

[Feb 3, 2020](https://sdww2348115.github.io/tmp/iptables-nginx)

相比于iptables，使用Nginx作为网关主要有以下几个方面不足：

1.  工作于TCP层，转发效率不高
2.  任何新增/删除端口的操作，都需要重新构建nginx.conf配置文件，并执行nginx -s reload重启所有broker

## TCP层转发 vs. IP层转发

如下图所示，TCP层代理在转发数据时需要维持两个连接：`client->proxy的tcp连接`以及`proxy->server的连接`，当client端有数据到来时，Nginx需要将数据从内核缓冲区中拷贝至预置的buffer中，再将buffer中的数据塞到与server端连接的内核缓冲区中。相比iptables数据转发，Nginx转发会多一次数据拷贝，并使得程序多次在内核态/用户态切换，因此整体效率相比iptables转发要低。 ![nginx-iptables](https://sdww2348115.github.io/resources/img/nginx-iptables.png)

我做了一个简单的测试，Client端分别通过iptables的网关以及Nginx的网关向服务发送数据，发送1GB数据的耗时分别为:

-   使用Nginx作为网关,总耗时为42522ms
-   使用iptables作为网关,总耗时为30749ms

除数据转发耗时较长以外，由于Nginx创建了两个连接，因此随着连接的增多，承载Nginx的服务器的`内存`和`文件描述符`资源也会随之增加。其中：

-   文件描述符资源需要放开ulimit限制
-   每10000个链接约增加200MB内存消耗