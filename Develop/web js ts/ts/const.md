- # as const
```ts
const Foobar = () => {
    const foo = 123, bar = (who: string) => 'hello ' + who
    return [foo, bar] as const
}
const [foo,bar] = Foobar()
console.log(foo, bar('foobar'))
```