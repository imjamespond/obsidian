- 切回0时isLoading，无数据，**==经测试1和react17没问题，版本2只能上react18？==**
```tsx
const fetcher = () => {
  return new Promise<number>((resolve, reject) => {
    const timeout = Math.random() * 1000 + 2000
    setTimeout(() => {
      resolve(timeout)
    }, timeout)
  })
  // return Promise.resolve(123)
}
function Test0() {
  const swr = useSWR('useSWR', fetcher)
  const [type, set_type] = useState<0 | 1>(1)
  if (type > 0) {
    return <Test1 set_type={set_type} />
  }
  return <Fragment>
    {JSON.stringify(swr)}
    <div>Test0</div>
    <button onClick={() => set_type(1)}>switch 1</button>
  </Fragment>
}

function Test1({ set_type }: any) {
  return <Fragment>
    <div>Test1</div>
    <button onClick={() => set_type(0)}>switch 0</button>
  </Fragment>
}
```