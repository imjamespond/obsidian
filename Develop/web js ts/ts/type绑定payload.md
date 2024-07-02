- 接口+联合类型
```ts
export enum ActType {
  Add,
  Edit,
  His,
  Menu,
}
export type Act = IAct<ActType.Add, undefined> 
| IAct<ActType.Edit | ActType.His, { id: string }> 
| IAct<ActType.Menu, RowType>;
```

- ~~函数~~，无法推测
```ts
// type IDoThing<T extends string, P> = (type: T, payload: P) => void;
// const doThing: IDoThing<'foo', number> | IDoThing<'bar', string> = (type, payload) => {
//   console.log(type, payload);
// };
```