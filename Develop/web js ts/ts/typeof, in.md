- 用一个obj约束另一obj的key类型
```ts
{[k in keyof PageParams]: string}
```