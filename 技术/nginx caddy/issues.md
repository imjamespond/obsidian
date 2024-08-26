### 502 while proxy_pass upstream  
https://stackoverflow.com/questions/23948527/13-permission-denied-while-connecting-to-upstreamnginx
```
cat /var/log/nginx/error.log
```
2021/01/13 03:55:16 [crit] 1704#0: *69 connect() to 192.168.0.246:80 failed (13: Permission denied) while connecting to upstream, client: 192.168.0.154, server: _, request: "GET /favicon.ico HTTP/1.1", upstream: "http://192.168.0.246:80/favicon.ico", host: "192.168.0.245", referrer: "http://192.168.0.245/"
[root@localhost ~]# setsebool -P httpd_can_network_connect 1
```
setsebool -P httpd_can_network_connect 1
```

