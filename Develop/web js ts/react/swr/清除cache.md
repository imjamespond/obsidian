
- mutate
```ts
  const {data:_themeGraph} = useSWR(/* some key */)

  const [themeGraph, set_themeGraph] = useState<typeof _themeGraph>()
  useEffect(() => {
    set_themeGraph(prev => {
      if (prev && prev === themeGraph) { // 从缓存中读出
        mutateThemeGraph(undefined)
        return undefined
      }
      return _themeGraph
    })
  }, [tn, _themeGraph])
```

---

