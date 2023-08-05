```ts
import useSWRInfinite from 'swr/infinite'
```

-   `options`: 接受 `useSWR` 支持的所有选项，以及 4 个额外选项：
    -   `initialSize = 1`: 最初应加载的页面数量
    -   `revalidateAll = false`: 始终尝试重新验证所有页面
    -   `revalidateFirstPage = true`: 始终尝试重新验证第一页
    -   `persistSize = false`: (size是指共多少页) key 发生变化时，若true size不重置为1, 比如之前size5，新key就会请求5次 获取5页数据；否则size重置为1。如果key foo, size为8，切到bar，==再切回foo，size还是8，有8页缓存==，若要重新请求新数据则要mutate(undefined),这时默认还是拿size8的8页数据，~~若要只取1页数据则要setSize(1), 但这样mutate只对page1的缓存清空~~
参考代码：
```tsx
import useSWR, { mutate as swrMutate } from 'swr';

  useEffect(() => {
    if (mutateRef.current) {
      mutateRef.current = false
      let hasCache = false
      swrMutate(
        (key) => {
          if (typeof key === 'object' && (key as any).url === 'authservice.logs') {
            const logsKey = key as logsKeyType
            if (logsKey?.args.params?.appId === params.appId && logsKey?.args.params?.appLogContextId === params.appLogContextId) {
              hasCache = true
              return true
            }
          }
          return false
        },
        undefined, { revalidate: false }
      )
      if (hasCache) {
        setSize(2) // 防止请求之前全size数据
      }
    }
  }, [params.appLogContextId, setSize])
```