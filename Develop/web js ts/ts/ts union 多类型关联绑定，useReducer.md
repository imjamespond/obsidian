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

- useReducer将参数集中成一个params管理
keyword onchange时太频繁，单独出来，page直接放入params, set_page则用不上，只在前端分页中使用
```ts
  const [keyword, set_keyword] = useState<string>()
  const [page] = usePage()
  const [params, dispatch] = useReducer(reducer, { ...page })

  const reportsSwr = useSWR<any>(
    params.dirId ? { url: 'rptCtlgService.listCurrentUserPrivilegeReportsByPage', params } : null,
    ({ params }) => {
      return rptCtlgService.listReportsByPage(params)
    })
```

---

### [Extract](https://stackoverflow.com/questions/70043499/get-extract-the-type-of-a-type-that-is-one-of-the-types-in-a-union-type-typesc)
```ts
//export type UnionTypeOfAB = { a: {}; id: number } | { b: {}; id: number };
import {UnionTypeOfAB} from './generated.ts';

interface A {
  a: {};
}

interface B {
  b: {};
}

type A_Type = Extract<UnionTypeOfAB, A>; 
// can use an inline interface instead of declaring one:
//type A_Type = Extract<UnionTypeOfAB, {a:{}}>;

/*A_type result:
 type A_Type = {
  a: {};
  id: number;
} */

type B_Type = Extract<UnionTypeOfAB, B>;
/*B_type result:
 type B_Type = {
  b: {};
  id: number;
} */
```
