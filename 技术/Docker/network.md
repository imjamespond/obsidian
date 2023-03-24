https://docs.docker.com/network/
https://docs.docker.com/network/network-tutorial-host/

bridge, 默认的,独立容器网络
host, 直接用主机网络
```
docker run --name ngx0 -d --network host  nginx:alpine
```