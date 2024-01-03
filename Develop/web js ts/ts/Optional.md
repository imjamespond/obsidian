```ts
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

```ts
interface Foobar {
	foo: string
	bar: number
}
function createFoobar(args: Optional<Foobar, 'foo'|'bar'>)
```