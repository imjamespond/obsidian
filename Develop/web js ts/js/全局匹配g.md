"g" 修饰符规定全局匹配。
```js
const foo = /bar/g
undefined
foo.test("foobar")
true
foo.lastIndex
6
foo.test("foobar bar")
true
foo.lastIndex
10
foo.test("foobar bar")
false
foo.lastIndex
0
```

---

> [!NOTE] Global pattern flags  https://regex101.com/
> **g modifier**: global. All matches (don't return after first match)
**m modifier**: multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
