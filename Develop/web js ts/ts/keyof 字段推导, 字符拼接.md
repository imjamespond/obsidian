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
---
[# 从字段到函数的推导【渡一教育】](https://www.bilibili.com/video/BV1yi421R7XA/?-Arouter=story&buvid=XYBA826BA47FA1770A56CAC97CD8F2A3DAE7D&from_spmid=tm.recommend.0.0&is_story_h5=true&mid=W%2B8vlgPw8%2FLrz5E2mFtVbQ%3D%3D&p=1&plat_id=163&share_from=ugc&share_medium=android&share_plat=android&share_session_id=bf48bf86-accd-4e6c-82db-1edb752af36b&share_source=WEIXIN&share_tag=s_i&spmid=main.ugc-video-detail-vertical.0.0&timestamp=1711669564&unique_k=igVRoDI&up_id=174874061)