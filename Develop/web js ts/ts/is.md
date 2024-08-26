
https://www.bilibili.com/video/BV1Tc41117AR/?spm_id_from=333.999.top_right_bar_window_history.content.click&vd_source=62c8a03e66ff063b9af3e473fadb8049
```ts

type Foo { name: string}
type Bar {}

function isFoo(obj: Foo | Bar ): obj is Foo {
	return 'name' in obj
}

```