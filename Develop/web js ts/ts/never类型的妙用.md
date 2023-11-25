[bsite](https://www.bilibili.com/video/BV1TK4y1F7TH/?spm_id_from=333.999.top_right_bar_window_history.content.click&vd_source=62c8a03e66ff063b9af3e473fadb8049)
- 禁止某类型
```ts
type BanType<Ban,T> = T extends Ban ? never : T
function foo <T>(x: BanType<number, T>) {}
foo (123) // wrong
foo ('123') // OK
```
- 联合体约束
```ts
type M = 'a' | 'b' // | 'c'
function foo(m: M) {
  if (m === 'a') { }
  else if (m === 'b') { }
  else { const n: never = m } // wrong if add 'c' to M
}
```
