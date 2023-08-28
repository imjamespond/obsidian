- `yarn create next-app --typescript` 或 `npx create-next-app@latest`

- [路由](https://nextjs.org/docs/app/building-your-application/routing) root dir 加`pages/index.tsx` 或 `test.tsx`可以
也可以加`app/test/page.tsx`

- `next.config.js`中配置export静态页面
```json
output: 'export',
```