自签名证书
```

openssl genrsa -out cn2.key 2048
# openssl rsa -text -in ./cn2.key
openssl rsa -in cn2.key -pubout -out cn2-public.key
openssl req -new -key cn2.key -out cn2.csr
openssl x509 -req -days 3650 -in cn2.csr -signkey cn2.key -out cn2.cer

common name填cn2
server配置hosts:127.0.0.1 cn2
mac中crt安装到系统,始终信任
certificate relies on legacy Common Name field, use SANs instead, go报错。。所以用以下方式生成san

openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 365 -key ca.key -subj "/C=CN/ST=GD/L=SZ/O=Noone, Inc./CN=Noone Root CA" -out ca.crt

openssl req -newkey rsa:2048 -nodes -keyout server.key -subj "/C=CN/ST=GD/L=SZ/O=Noone, Inc./CN=*.cn2" -out server.csr
openssl x509 -req -extfile <(printf "subjectAltName=DNS:cn2,DNS:www.cn2") -days 3650 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt
```

```
不验证

client
{
  "run_type": "client",
  "local_addr": "127.0.0.1",
  "local_port": 1080,
  "remote_addr": "97.64.17.204",
  "remote_port": 1443,
  "password": ["noonewillguess@2021"],
  "ssl": {
"cert": "my.crt",//using custom cert
"verify": false,
"verify_hostname": false
  }
}

server
{
  "run_type": "server",
  "local_addr": "0.0.0.0",
  "local_port": 1443,
  "remote_addr": "127.0.0.1",
  "remote_port": 80,
  "password": ["noonewillguess@2021"],
  "ssl": {
    "cert": "my.crt",
    "key": "my.key",
"verify": false,
"verify_hostname": false
  }
}
```

troj需要额外起个http server，转发非troj的数据
```
import SimpleHTTPServer
import SocketServer

PORT = 80

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
```

---
使用ip+签名证书
```
scp -P??? foobar@cn2:/etc/letsencrypt/live/jamespond.xyz/fullchain.pem jms.fullchain.pem

{
"run_type": "client",
"local_addr": "127.0.0.1",
"local_port": 1080,
"remote_addr": "97.64.17.204",
"remote_port": 4431,
"password": ["noonewillguess@2021"],
"ssl": {
"cert": "jms.fullchain.pem",
"sni": "jamespond.xyz"
}
}
```









