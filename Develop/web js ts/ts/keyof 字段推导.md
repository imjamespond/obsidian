```ts
type Watcher<T> = {
  on<K extends string & keyof T>(
    event: `${K}Changed`,
    callback: (prev: T[K], next: T[K]) => void
  ): void;
};

/**
 * 全局声明
 * @param obj 
 */
declare function watch<T>(obj: T): Watcher<T>;

const fooWatcher = watch({
  foo: 123,
  bar: 'hello'
})

fooWatcher.on('fooChanged', (prev, next) => {
  console.log(prev, next)
})
```

- `string & keyof T` 这样可以排除 T中的Symbol类型
- 通过 `fooChanged` 可以反推 K