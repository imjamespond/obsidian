- Alias
```nginx
location /data-platform-demo {
          alias  /var/www/data-platform-admin-new/dist;
          try_files $uri $uri/ /data-platform-demo/index.html;
}
```

访问location用alias替换, 找不到后访问index.html

--- 

- override root
```nginx
location /data-atlas/ {
	root /var/demo; # override root of server
	try_files $uri $uri/ /data-atlas/index.html;
}
```

---

- Remove prefix
```nginx
location = /gogs {
    return 302 /gogs/;
}
location /gogs/ {
    proxy_pass http://127.0.0.1:8090/;  # note the trailing slash here, it matters!
}
```


---

- Cache with proxy_pass

~ 表示正则
~* \.(css|js)$ 表示匹配末段
~ ^\/(.*\.(css|js))$ 表示匹配开始到末尾, /要escape

```nginx
    location ~ ^\/(.*\.(css|js))$ {
        expires 30d;
        add_header Pragma public;
        add_header Cache-Control "public";


        proxy_pass http://localhost:18090/$1;
        proxy_set_header Host $host;
        proxy_buffering off;
    }


    location / {
        proxy_pass http://localhost:18090/;
        proxy_set_header Host $host;
        proxy_buffering off;
    }

    location /sns {
        proxy_buffering     off;
        proxy_set_header Host $host;
        proxy_set_header   X-Real-IP   $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass   http://192.168.2.5:8083;
    }
```

--- 
- server
```
server {
        listen       7090;
        server_name  keymobile.com.cn www.keymobile.com.cn;
```

--- 
- ##### 包含
```
http {

  include ./conf.d/*.conf;

  server {...
}

```