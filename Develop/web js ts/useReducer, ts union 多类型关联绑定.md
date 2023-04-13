用interface达成type类型与payload之间关联
```ts
interface IAct<A extends 'init' | 'page', T> {
  type: A
  payload: T
}
const reducer: React.Reducer<any, IAct<'init', any> | IAct<'page', Page>> = (prev, act) => {
  if (act.type === 'init') {
    return act.payload
  } else if (act.type === 'page') {
    return { ...prev, ...act.payload }
  }
  return prev
}

```