- 微应用
```ts
export function useThemeGroup(initData: React.MutableRefObject<{ init: boolean; data?: Datamodeler.EasyDataModelerConceptualTreeNode }>) {
  return useSWR('datamodeler.getThemeGroup', (urlkey) => {
    // 优先更新主应用数据
    if (initData.current.init) {
      const data = initData.current.data
      if (data) {
        initData.current.init = false; // init done and clear
        initData.current.data = undefined
      }
      return Promise.resolve(data); // 放入缓存，过期后才重新请求
    }
    return service.datamodeler.getThemeGroup(urlkey);
  });
}

  const app = useApp();
  const initData = useRef({ init: app?.initThemeGroup, data: app?.themeGroup });
  const { data, mutate, isValidating, isLoading, error } = useThemeGroup(initData);

  useEffect(() => {
    if (initData.current.init) {
      // 更新主应用数据
      initData.current.data = app?.themeGroup;
      initData.current.data && mutate();
    }
  }, [app?.themeGroup]);
```

- 主应用, 保证一次性, [[qiankun]]封装组件
```tsx
let initThemeGroup = true;

function FC() {
  const { data, isLoading } = useThemeGroup(!initThemeGroup);
  useEffect(() => {
    if (data) {
      initThemeGroup = false;
    }
  }, [data]);
  return (
    <React.Fragment>
      <QianKun
        name={"ent-model"}
        entry={"/data-atlas/"}
        props={{
          type: ViewType.EntModel,
          paddingY,
          theme,
          initThemeGroup,
        }}
        state={{ themeGroup: data, themeGroupLoading: isLoading }}
      />
    </React.Fragment>
  );
}
```

--- 
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

- 但要注意的是，主应用数据要在getStatus() === =="MOUNTED"==后才能update，所以update只适用于手动触发，目前只能在初始时传值！
- 还需考虑子应用刷新数据**无法同步** 到主应用的问题