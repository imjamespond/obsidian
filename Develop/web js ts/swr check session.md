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

function WithSession({ children }: PropsWithChildren<unknown>) {
    const { isLoading, isValidating, error, data, mutate } = useSessionAuto()
    if (isLoading) {
        return <div>正在获取登录信息... </div>
    }
    if (!!error) { 
        // return <pre>{JSON.stringify({error, data}, undefined, 2)}</pre>
        return <Redirect to={`${baseUrl}/view/login`} />
    }
    if (data) {
        // return <div>{JSON.stringify(data)}</div>
        return <React.Fragment>{children}</React.Fragment>
    }
    return <div>登录信息为空</div>
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