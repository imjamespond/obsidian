```ts
export function useThemeGroup(initData?: React.MutableRefObject<Any>) {
  return useSWR('datamodeler.getThemeGroup', (url) => {
    // 优先更新主应用数据
    if (AppSubject.value?.hasData && initData?.current) {
      const data = initData.current;
      initData.current = undefined; // init done and clear
      return Promise.resolve(data);
    }
    return service.datamodeler.getThemeGroup(url);
  });
}

  // 主应用数据在context中更新
  const app = useApp(); 
  const initData = useRef(app?.initData);
  const { data, mutate } = useThemeGroup(initData);

  useEffect(() => {
    // 更新主应用数据
    initData.current = app?.initData;
    initData.current && mutate();
  }, [app?.initData]);
```

但要注意的是，主应用数据要在getStatus() === "MOUNTED"后才能update，所以update只适用于手动触发，目前只能在初始时传值！