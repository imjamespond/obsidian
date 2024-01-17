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