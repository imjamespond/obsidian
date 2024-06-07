- ~~useMutation应该是最优解，开始data为undefined~~，必须手动trigger才请求并获取数据,
  经过测试，<font color="#ff0000">key变化后data仍为上个key的缓存</font>，并不会变undefined，其声称并不会自动mutate所导致？

--- 
- ~~通过ref控制~~, 
```ts
const mounted = useRef(false)
const {data, mutate} = useSWR("some key", fetchData() {
  return mounted.current ? fetch() : Promise.resolve(undefined) 
} )
...
// 后面先改mounted为true,再mutate
// 这样第二次进来仍有缓存，因为只要有key不为undefined就会从缓存中存值而不会通过fetchData返回！！！
```

--- 
非微前端强制刷新
- 通过加一层state，劫持useSWR的data达到强制刷新的作用
```ts
const {data} = useSWR(/* some key */)
const [themeGraph, set_themeGraph] = useState<typeof data>()
useEffect(() => {
	set_themeGraph(prev => {
		if (prev && prev === data) { // 从缓存中读出
			mutate(undefined)
			return undefined
		}
	  return data
	})
}, [tn, data])
```

---
微前端加载时已有缓存清除
- 方法一, 在父组件mutate `revalidate: false`， 子组件这时还未创建，等mounted后创建会发请求
```ts
const [mounted, set_mounted] = useState(false)

useEffect(() => {
	mutate(undefined, { revalidate: false }
	set_mounted(true)
}, [])
```

- 方法二, mounted前检查是否已有缓存，子组件mutate会请求两次， `revalidate: false`不会发请求
  🚫
```
const {data, mutate} = useSWR(/* some key */)
const mounted = useRef(false)
useEffect(() => { 
	if (mounted.current === false && data) {
		mutate(undefined)
	}
	mounted.current = true
}, [data])
```
✅
```ts
const [mounted, set_mounted] = useState(false)
const {data, /*mutate*/} = useSWR(mounted ？ "some key" ：null)
useEffect(() => {
  if (mounted === false) {
    Mutate(undefined, { revalidate: false }) // 此处要用全局，避免null key返回的mutate
    set_mounted(true)
  }
}, [])
```