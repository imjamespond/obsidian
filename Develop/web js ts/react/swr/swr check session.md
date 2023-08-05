1. WithSession 用一个route wrap 保证switch只命中一个login或checksession
2. 出错就跳至登录
```tsx
<Router>
	<Switch>
		<Route path={`${baseUrl}/view/login`} component={Login} />
		<Route component={() => (
			<WithSession>
				<Switch>
					<Route path={`${baseUrl}/menu`} component={()=><Spin/>} />
...
					<Route component={() => RedirectToHome} />
				</Switch>
			</WithSession>
		)} />
	</Switch>
</Router>
```

- with session
```tsx
function WithSession({ children }: PropsWithChildren<unknown>) {
    const location = useLocation()
    const dispatch = useDispatch()
    const { isLoading, isValidating, error, data, mutate } = useSessionAuto()

    const routes = useMemo(() => {
        if (data) {
            dispatch({
                type: session_info,
                session_info: { data, status: 200 }
            })
            // return <div>{JSON.stringify(data)}</div>
            return <React.Fragment>{children}</React.Fragment>
        }
        return <div>用户信息为空</div> 
    }, [data]);

    useEffect(()=>{
      if(!!error) {
        message.info("用户信息已过期，请重新登录", 1)
      }
    }, [error])

    if (isLoading) {
        return <div style={{ color: '#eee' }}>正在获取用户信息... </div>
    }
    if (!!error) {
        // return <pre>{JSON.stringify({error, data}, undefined, 2)}</pre>
        return <Redirect to={{ pathname: `${baseUrl}/view/login`, state: location.pathname }} />
    }
    return routes
}
```

1. 自动轮询
```tsx
import useSWR, { SWRConfiguration } from 'swr';
import request from './api'
import { kmDebug } from './misc';

export const sessionInfo = '/api/auth/sessionInfo'

export function useSessionAuto() {
  return useSession(true, { refreshInterval: 3 * 1000, dedupingInterval: 1000, errorRetryCount: 0 })
}

export function useSession(isKey: boolean, config?: SWRConfiguration) {
  kmDebug(d => d('=======request sessionInfo==========', isKey))
  const result = useSWR(isKey ? sessionInfo : null, (url) => {
    kmDebug(d => d('=======request sessionInfo=========='))
    return request('post', url)
  }, config)
  return result
}
```

1. login请求
```
	// swr
    const signin = useSWRMutation<any>("/api/auth/signin", signinReq, { optimisticData: {} })
    const signinOK = signin.data === "ok"
    const { data: session, error: sessionError, mutate } = useSession(signinOK)
...
	// on submit
	signin.reset()
	// await trigger({ ...value, password })
	const result = await signin.trigger({ ...value, password })
	if (result === "ok") {
		// mutate(undefined) // 重复？
		message.success("登录成功！")
	}
...
	// render
    if (signinOK && session && sessionError === undefined) { // session ok 后跳至首页
        return RedirectToHome
    }
```

- with session and redux

```tsx
function WithSession({ children }: PropsWithChildren<unknown>) {
  const location = useLocation()
  const dispatch = useDispatch()
  const session = useSelector((state: any) => {
    return state.session
  })
  const { error, data } = useSessionAuto()
  const isLoading = data === undefined && error === undefined;
  const hasError = !!error

  const routes = useMemo(() => {
    if (data && JSON.stringify(session.user) !== '{}') {
      // return <div>{JSON.stringify(data)}</div>
      return <React.Fragment>{children}</React.Fragment>
    }
    return <Loading />
  }, [session, data]);

  useEffect(() => {
    if (data) {
      dispatch(getUserInfo({ data, status: 200 }))
    }
  }, [data])

  useEffect(() => {
    if (hasError) {
      message.info("用户信息已过期，请重新登录", 1)
    }
  }, [error])

  if (isLoading) {
    return <Loading />
  }
  if (hasError) {
    // return <pre>{JSON.stringify({error, data}, undefined, 2)}</pre>
    return <Redirect to={{ pathname: `${baseUrl}/view/login`, state: location.pathname }} />
  }
  return routes
}
```