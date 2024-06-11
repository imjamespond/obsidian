```yml
proxies:
  # socks5
  - name: "socks"
    type: socks5
    server: 192.168.31.111
    port: 1080
proxy-groups:
  - name: Proxy
    type: select
    proxies:
    - socks

rules:
- MATCH,Proxy
```