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