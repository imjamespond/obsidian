- [安装](https://nextjs.org/docs/getting-started/installation)`yarn create next-app --typescript` 或 `npx create-next-app@latest`

- [路由](https://nextjs.org/docs/app/building-your-application/routing) root dir 加`pages/index.tsx` 或 `test.tsx`可以
也可以加`app/test/page.tsx`，(ver13后支持)
从tailwind配置可看出
![[Pasted image 20230831134726.png|400 ]]

- `next.config.js`中配置export静态页面, `npm run build`即可
```json
output: 'export',
```

- [deploying](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#deploying)
```nginx
server {
  listen 80;
  server_name acme.com;
 
  root /var/www/out;
 
  location / {
      try_files $uri $uri.html $uri/ =404;
  }
 
  # This is necessary when `trailingSlash: false`.
  # You can omit this when `trailingSlash: true`.
  location /blog/ {
      rewrite ^/blog/(.*)$ /blog/$1.html break;
  }
 
  error_page 404 /404.html;
  location = /404.html {
      internal;
  }
}
```
