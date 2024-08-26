

```ts
  export type AnyType = boolean | number | string | symbol | null | undefined | object;
  export type AnyList = AnyType[]
```

```ts
const list: Misc.AnyList = []

list.push(123, true, "string...", null, { foo: '123', bar: 321 }, undefined, [1, 2, 3])
```