1. 用interface达成type类型与payload之间关联
```ts
interface IAct<A /* extends 'init' | 'page' */, T> {
  type: A
  payload: T
}
const reducer: React.Reducer<
  ({ dirId?: string, keyword?: string } & Page),
  IAct<'dirId', any> | IAct<'page', Page> | IAct<'keyword', string | undefined>> = (
    prev, act
  ) => {
    if (act.type === 'dirId') {
      return { ...prev, ...act.payload, pageNum: 1, keyword: undefined } // 跳至第1页，重置搜索
    } else if (act.type === 'page') {
      return { ...prev, ...act.payload }
    } else if (act.type === 'keyword') {
      return { ...prev, keyword: act.payload ?? undefined, pageNum: 1 } // 跳至第1页
    }
    return prev
  }

```

- 前置条件变化，清keyword
```ts
  useEffect(() => {
    set_keyword('')
    if (catalogCache) {
      dispatch({
        type: 'dirId', payload: {
          recursive: true,
          dirId: catalogCache.key,
        }
      })
    }
  }, [catalogCache])
```

- 搜索框逻辑，为空时触发search
```tsx
<Input.Search
  value={keyword}
  onSearch={() => dispatch({ type: 'keyword', payload: keyword })}
  onChange={(e) => {
	set_keyword(e.target.value)
	if (e.target.value === "") {
	  dispatch({ type: 'keyword', payload: undefined })
	}
  }}
  allowClear
  enterButton
  placeholder="请输入报表名称"
/>
```