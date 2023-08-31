- [安装](https://nextjs.org/docs/getting-started/installation)`yarn create next-app --typescript` 或 `npx create-next-app@latest`

- [路由](https://nextjs.org/docs/app/building-your-application/routing) root dir 加`pages/index.tsx` 或 `test.tsx`可以
也可以加`app/test/page.tsx`，(ver13后支持)
从tailwind配置可看出
![[Pasted image 20230831134726.png|400 ]]

- `next.config.js`中配置export静态页面, `npm run build`即可
```json
output: 'export',
```

