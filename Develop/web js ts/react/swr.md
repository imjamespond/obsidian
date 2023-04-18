
- ### Trigger， method为POST
```
service:
	signin: MutationFetcher<any, { username: string, password: string }, string>
impl:
  signin: (_key, { arg }) => {
    const body = qs.stringify(arg)
    return request('post', `/api/auth/signin`, {
      body, 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
  },
call:
	const { trigger, data, error } = useSWRMutation("api/signin", service.signin,)
	...
	onclick: 
      trigger({
        "username": "test",
        "password": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"
      }).catch((err)=>{
        console.debug(err)
      })
```

<font color="blue" size="4">setArgs相同参数触发request，这种情况属于 Key地址变化hash没变， 或hash发生变化，的混合场景, <b>method应该为GET时</b></font>
```
  useEffect(()=>{
    console.debug(prevData.current, data)
    /**
     * 1. args变动, prev data === cache data, mutate；若args不同，data地址肯定不同，不会mutate
     * 2. async data变动，async data !== prev data, not mutate
     */
    if (data && prevData.current === data) {
      mutate(undefined)
    } 
    prevData.current = data
  }, [args, data])

with error
  useEffect(()=>{
    console.debug(prevData.current, data)
    if (data && prevData.current === data) {
      mutate(undefined)
    } else if (error && prevError.current === error) {
      mutate(undefined)
    }
    prevData.current = data
    prevError.current = error
  }, [args, data, error])
```
以上是相同界面，如果是modal则设置destroyonclose,dequeinterval为0即可，每次open会重新请求相同key

<font color="grey">OR 可以通过设置一个refresh的state，这样mutate可以和swr请求分离，这种情况属于 Key没变化，强制刷新</font>
```
  const [refresh, set_refresh] = useState(false)
  useEffect(() => {
    if (refresh) {
      set_refresh(false)
      mutate(undefined)
    }
  }, [refresh])
。。。
<button onClick={() => set_refresh(true)}>test</button>
```

--- 
- ### 级联请求
```tsx
const args = useReduce({datesource, database, schema, table})
const { databases, loadingDatabases } = swr(datesource ? 'getDatabases' : null ,getDatabases)
const { schemas, loadingSchemas } = swr(database ? 'getSchemas' : null, getSchemas)
const { tables, loadingTables } = swr(schema ? 'getTables' : null, getTables)
const disable = loadingDatabases || loadingSchemas || loadingTables
...
<select disable={disable} >databases</select>
<select disable={disable} >schemas</select>
<select disable={disable} >tables</select>
```


--- 
- ## modal, dawer...
visible时发请求，收起后空缓存，但visible限制不再revalidate, 避免两次请求
```tsx
  const listSwr = useSWR<any, any, foobar['listKey'] | null>(
    visible ? { url: 'service.list', args: { params: { env } } } : null,
    service.list
  )

  useEffect(() => {
    if (visible === false) {
      listSwr.mutate(undefined)
    }
  }, [visible])

// 或者仅在 增删改时 mutate！
```

---
- ### mutate with updateFunc, 
```
  const { data, mutate, isLoading, isValidating } = useSWR('aaa', () => {
    console.debug('query')
    return new Promise<string>((rsv) => {
      setTimeout(() => {
        rsv('aaa')
      }, 1000)
    })
  })

render....
            {data},{JSON.stringify({ isLoading, isValidating })}
            <button onClick={async () => {
              try {
                const rs = await mutate(
                  () => {
                    console.debug('update')
                    return new Promise<string>((rsv) => {
                      setTimeout(() => {
                        rsv('bbb')
                      }, 2000)
                    })
                  },
                  { revalidate: false, optimisticData: 'ccc' }//不触发请求，用update返回data更新
                )
                console.debug('update done', rs)
              } catch (error) { 
              } 
            }}>bbb</button>
```

```
const { data, isLoading, mutate } = useswr(...)
...in some callback
mutate(undefined) // 删除旧数据,请求新数据
mutate() // 只请求新数据
//////////console中两次render////////////
render.. undefined
render.. undefined
...react: onStateUpdate
...swr: onRevalidate 
```


---
同级两个route使用swr必须要refreshonmount，否则不会请求
上下级只要上级使用swr，下级就会有值

```
export default () => {
const { cache } = useSWRConfig()
const { data, error } = useSWR(key, fetcher, {
revalidateOnFocus: false,
revalidateOnMount: !cache.get(key),
revalidateOnReconnect: false,
refreshWhenOffline: false,
refreshWhenHidden: false,
refreshInterval: 0,
})
return [data, error]
}
只有第一次加载才请求,
```

或1.0.0之后
```
import useSWRImmutable from 'swr/immutable'
// ...
useSWRImmutable(key, fetcher, options)
```

或在顶层mutate
```
App.tsx
const { mutate } = useFoo()

useEffect(() => {
// console.debug(mutate)
mutate()
}, [mutate])

useFoo.ts
return useSWR(key, fetcher, {
revalidateOnFocus: false,
revalidateOnMount: false,
revalidateOnReconnect: false,
refreshWhenOffline: false,
refreshWhenHidden: false,
refreshInterval: 0,
})

mutate(undefined) //重置
```