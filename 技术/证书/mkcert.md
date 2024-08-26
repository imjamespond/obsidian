https://github.com/FiloSottile/mkcert
https://blog.csdn.net/qq_45392321/article/details/119676301

输入mkcert-v1.4.3-windows-amd64.exe -install 命令 ，安装mkcert。将CA证书加入本地可信CA，使用此命令，就能帮助我们将mkcert使用的根证书加入了本地可信CA中，以后由该CA签发的证书在本地都是可信的。卸载命令 mkcert-v1.4.3-windows-amd64.exe -install
#### 测试mkcert是否安装成功
![|600](https://i-blog.csdnimg.cn/blog_migrate/0a45fb98a5cfa41635ca52d7a2ce7c80.png)
##### 查看CA证书存放位置
输入==mkcert-v1.4.3-windows-amd64.exe -CAROOT==命令。
![](https://i-blog.csdnimg.cn/blog_migrate/3136ac7e9092a11cfb399b2417a8df6a.png)

##### （5）生成自签证书,可供局域网内使用其他主机访问。
==直接跟多个要签发的域名或 ip 就行了==，比如签发一个仅本机访问的证书(可以通过127.0.0.1和localhost，以及 ipv6 地址::1访问)

需要在局域网内测试 https 应用，这种环境可能不对外，因此也无法使用像Let's encrypt这种免费证书的方案给局域网签发一个可信的证书，而且Let's encrypt本身也不支持认证 Ip。

证书可信的三个要素:

由可信的 CA 机构签发
访问的地址跟证书认证地址相符
证书在有效期内
如果期望自签证书在局域网内使用，以上三个条件都需要满足。很明显自签证书一定可以满足证书在有效期内，那么需要保证后两条。我们签发的证书必须匹配浏览器的地址栏，比如局域网的 ip 或者域名，此外还需要信任 CA。操作如下。
签发证书，加入局域网IP地址。

```
C:\>mkcert-v1.4.3-windows-amd64.exe localhost 127.0.0.1 ::1 192.168.2.25
Note: the local CA is not installed in the Java trust store.
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "::1"
 - "192.168.2.25"

The certificate is at "./localhost+3.pem" and the key at "./localhost+3-key.pem" ✅

It will expire on 13 November 2023 🗓

```

![|800](https://i-blog.csdnimg.cn/blog_migrate/6bc4321293a024a92d65058bf406de5a.png)

### test
python2 版本
```
#!/usr/bin/env python2

import BaseHTTPServer, SimpleHTTPServer
import ssl

httpd = BaseHTTPServer.HTTPServer(('0.0.0.0', 443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, certfile='./localhost+2.pem', keyfile='./localhost+2-key.pem', server_side=True, ssl_version=ssl.PROTOCOL_TLSv1_2)
httpd.serve_forever()
```
python3 版本
```
#!/usr/bin/env python3

import http.server
import ssl

httpd = http.server.HTTPServer(('0.0.0.0', 443), http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, certfile='./localhost+2.pem', keyfile='./localhost+2-key.pem', server_side=True, ssl_version=ssl.PROTOCOL_TLSv1_2)
httpd.serve_forever()
```

验证发现使用https://192.168.31.170本机访问也是可信的。然后需要将 CA 证书发放给局域网内其他的用户。

可以看到 CA 路径下有两个文件rootCA-key.pem和rootCA.pem两个文件，用户需要信任rootCA.pem这个文件。将rootCA.pem拷贝一个副本，并命名为rootCA.crt(因为 windows 并不识别pem扩展名，并且 Ubuntu 也不会将pem扩展名作为 CA 证书文件对待)，将rootCA.crt文件分发给其他用户，手工导入。
![](https://i-blog.csdnimg.cn/blog_migrate/47edc2c8e9fe5fe04668ba3263a1743e.png)

![](https://i-blog.csdnimg.cn/blog_migrate/dcfca6ceee7d0bc51c46f1465499f4c0.png)

![](https://i-blog.csdnimg.cn/blog_migrate/64a190cf4c486d6044a22de916db500d.png)


- ### Linux系统操作访问演示
```
[root@server ~]# cp -a rootCA.pem /etc/pki/ca-trust/source/anchors/ #将ca证书放在此路径下
[root@server ~]# /bin/update-ca-trust #执行此命令更新
[root@server ~]#
[root@server ~]# curl -I https://192.168.2.25:8000
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.9.6
Date: Fri, 13 Aug 2021 06:51:54 GMT
Content-type: text/html; charset=utf-8
Content-Length: 1536
```