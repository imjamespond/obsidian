数组前加上`<const>`修饰
```ts
export const pageSizeOptions =  <const> [10, 20, 50, 100]
export type PageSizeOptions = typeof pageSizeOptions[number]
```