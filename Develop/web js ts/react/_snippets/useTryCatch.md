- 统一try catch可以统一处理后端返回的错误，又不需要侵入式在axios中拦截错误造成代码僵化
```ts
// 例一： 显式声明泛型
  const [bindFn] = useTryCatch<[CustomerTag.CustomerTag]>(async (record) => {
    techJobId && await bind({ params: { env }, body: { assocNumberIdList: [record.id], assocStringIdList: [], techJobId } })
    message.success('操作成功')
    _mutate({
      url: 'datarequirement.binding.getBindingDataList', args: {
        params: { techJobId, env }
      }
    }, undefined)
  }, [])
  
// 例二： 隐式推断泛型
  const [delFn] = useTryCatch(async (item: DataReq.DataRequirementVO) => {
    await del({ params: { env, id: item.id } })
    message.success('删除成功')
    mutate(undefined)
  }, [])
```


```ts
export function useSafeState<T = unknown>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {

  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  const [state, setState] = useState<T>(() => initialState)

  const setSafeState = useCallback<React.Dispatch<React.SetStateAction<T>>>((...args) => {
    if (mounted.current) {
      setState(...args)
    } else {
      console.warn('setSafeState when unmounted', args)
    }
  }, [])
  return [state, setSafeState]
}


type UseCallbackParams = Parameters<typeof useCallback>
type UseTryCatchCallback<T extends any[]> = (...args: T) => Promise<void>
export function useTryCatch<T extends any[]>(callback: UseTryCatchCallback<T>, deps: UseCallbackParams[1]):
  [UseTryCatchCallback<T>, boolean] {

  const [loading, set_loading] = useSafeState(false)

  const msg = useMsg()

  const cb = useCallback(async (...args: T) => {
    set_loading(true)
    try {
      await callback(...args)
    } catch (error) {
      console.error(error)
      if (typeof error === 'string') {
        msg.error(error)
      } else if (error && typeof error === 'object' && typeof (error as Api.Error).message === 'string') {
        msg.error( (error as Api.Error).message)
      }
    }
    set_loading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [cb, loading]
}
```