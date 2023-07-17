
- 服务
http://192.168.0.209:8999/zeppelin/#/helium

- 前端项目
https://github.com/apache/zeppelin/tree/master/zeppelin-web
bower代理，.bowerrc
```
"proxy": "http://127.0.0.1:1080",
"https-proxy": "http://127.0.0.1:1080",
"strict-ssl": false
```
安装
`pnpm i`
运行
`npm run dev:helium`

- 映射服务到localhost 8080
`tunnel.sh root@192.168.0.209 8080 localhost:8999`

- 访问
`http://localhost:9000/zeppelin/#/helium`


- Issues:
Can't resolve 'scrollmonitor==/scrollMonitor.js=='
删除之，因为somehow这个库没有此文件，package.json已经引入另外的路径的index.js