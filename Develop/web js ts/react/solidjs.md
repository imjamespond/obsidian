#solidjs

- 通过splitProps，将signal取值转为对象取值
```tsx


function FC({
  flex = '1'
}) {
  console.debug('fetch form')

  const onMessage = function (event: MessageEvent) {
    console.log('on message', event)
    dispatchArgs({ payload: { ...event.data, id: Date.now() }, type: 'set' })
  }

  onMount(() => {
    window.addEventListener('message', onMessage);
  })

  onCleanup(() => {
    window.removeEventListener('message', onMessage)
  })

  const [args, setArgs] = useContext(Context)!

  const [argsStr, setArgsStr] = createSignal<string>('')

  createEffect(on(args, () => {
    setArgsStr(JSON.stringify(args(), null, 2))
  }))



  const dispatchArgs = (action: Act) => {
    setArgs(state => {
      switch (action.type) {
        case 'set':
          return action.payload
        case 'url':
          return { ...state, url: action.payload } as Args
        case 'init':
          return { ...state, init: { ...state?.init, ...action.payload } } as Args
        default:
          return state
      }
    })
  }

  type Args = ReturnType<typeof args>
  type ArgsStr = ReturnType<typeof argsStr>
  const Render = (props: { args: Args, argsStr: ArgsStr }) => {
    const [local] = splitProps(props, ['args', 'argsStr']) // keep reactive
    return (
      <>
        <div style={{ flex }}>
          <FormItem left={'url'} right={<input class='w-100' value={local.args?.url ?? ''} onChange={e => dispatchArgs({ type: 'url', payload: e.target.value })} />} />
          <FormItem left={'method'} right={<select value={local.args?.init?.method ?? ''} onChange={e => dispatchArgs({ type: 'init', payload: { 'method': e.target.value } })}>
            {['GET', 'POST', 'PUT', 'DELETE'].map((v) => <option value={v}>{v}</option>)}
          </select>} />
          <FormItem left={'body'} right={<textarea style={{ "min-height": "100px" }} class='w-100' value={local.args?.init?.body?.toString() ?? ''}
            onChange={e => dispatchArgs({ type: 'init', payload: { 'body': e.target.value } })} />}
          /> 
          <FormItem left={'args'} right={(
            <textarea class='w-100' style={{ height: 'calc(100vh - 350px)' }}
              value={local.argsStr}
              onChange={e => {
                setArgsStr(e.target.value)
                try {
                  dispatchArgs({ type: 'set', payload: JSON.parse(e.target.value) })
                } catch (error) {
                  console.error(error)
                }
              }}
            />
          )} />
        </div>
      </>
    )
  }

  return <Render args={args()} argsStr={argsStr()} />
}

```