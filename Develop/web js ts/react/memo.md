https://react.dev/reference/react/memo
`memo` lets you skip re-rendering a component when its props are unchanged.

React ==normally re-renders a component whenever its parent re-renders.== With memo, you can create a ==**component that React will not re-render when its parent re-renders**== so long as its new props are the same as the old props. Such a component is said to be memoized.

---

更新数组导致全部子组件渲染
```tsx
function Test() {

  const [foo, set_foo] = React.useState([{ k: '1', v: 0 }, { k: '2', v: 0 }])

  const update_foo = React.useCallback((index: number, v: any) => {
    set_foo(prev => {
      const f = { ...prev[index], v }
      const foo = [...prev]
      foo.splice(index, 1, f) // 精准更新单个obj
      return foo
    })
  }, [])

  return <div>
    <button onClick={() => {
      set_foo(prev => [...prev])
    }}>foo</button>
    {foo.map((f, i) => <FooMemo key={f.k} index={i} foo={f} update_foo={update_foo} />)}
  </div>
}

function Foo({ foo, update_foo, index }: any) {
  console.debug('foo', foo.k)
  return <div>
    {JSON.stringify(foo)}
    <button onClick={() => {
      update_foo(index, foo.v + 1)
    }}>add</button>
  </div>
}

const FooMemo = React.memo( // 只有新的foo才会更新
  Foo,
  // (prev, next) => {
  //   const equal = prev.foo === next.foo
  //   console.debug(prev, next, equal)
  //   return equal
  // }
)
```
注意不能直接`foo.v += 1`然后`set_foo(prev => [...prev])`更新, 这样memo的prev.foo和next.foo是相同值, 没有对比意义
如果不用memo, 直接`foo.v += 1`再 `set_foo(prev => [...prev])`将触发每一个数组元素渲染，也可以
