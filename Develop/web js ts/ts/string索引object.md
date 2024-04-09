```ts
const obj: Record<string, object> = {};
const foo = obj["foo" as keyof typeof obj];
console.log(foo);
```
or 
加注解`@ts-ignore`
