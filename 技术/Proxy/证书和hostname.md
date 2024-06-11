![[Pasted image 20240611162852.png|300]]

上图实现**域名**加**证书**加**443**端口无缝访问，
- [生成](trojan-go)一个比如cn2域名的自签名证书，参看win[[证书安装]]， 
- 远端使用go-trojan fallback到一个go的==http服务端口8000的文件server==，
- 服务器配置cn2的hosts指向127.0.0.1，这样proxy过来时等于==访问自己==
- ff 或 chrome的omega-switch上配置这个trojan的代理（不用配置hosts），但因为trojan代理也用到了cn2， 所以**trojan client端需要配置cn2的hosts**