```ts
  const foobar = { foo: { bar: 123 }, hello: { bar: 321 } }
  const _foobar = produce(foobar, draft => {
	draft.foo = draft.hello
  }) 
  _foobar.foo.bar = 111 // Uncaught TypeError: Cannot assign to read only property 'bar' of object '#<Object>'
  console.log(_foobar)
```