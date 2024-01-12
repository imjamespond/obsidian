
- mutate
```ts
	useSWR(
		ready ? 'datamodeler.getThemeGraph' : null,
		service.datamodeler.getThemeGraph
	)

  useEffect(() => {
    if (tn) {
      setReady(false)
    }
  }, [tn])

  useEffect(() => {
    if (tn && ready === false) { // tn 切换时
      mutateSomeData(undefined, { revalidate: false }) // 当 ready 为 false时 mutate
      setReady(true)
    }
  }, [tn, ready])
```

---