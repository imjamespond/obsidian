
- ### **`yield*` 表达式**用于委托给另一个[`generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) 或可迭代对象。
## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*#%E6%8F%8F%E8%BF%B0)

`yield*` 表达式迭代操作数，并产生它返回的每个值。

`yield*` 表达式本身的值是当迭代器关闭时返回的值（即`done`为`true`时）。
### [委托给其他生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*#%E5%A7%94%E6%89%98%E7%BB%99%E5%85%B6%E4%BB%96%E7%94%9F%E6%88%90%E5%99%A8)

以下代码中，`g1()` `yield` 出去的每个值都会在 `g2()` 的 `next()` 方法中返回，就像那些 `yield` 语句是写在 `g2()` 里一样。

```
function* g1() {
  yield 2;
  yield 3;
  yield 4;
}

function* g2() {
  yield 1;
  yield* g1();
  yield 5;
}

var iterator = g2();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### [委托给其他可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*#%E5%A7%94%E6%89%98%E7%BB%99%E5%85%B6%E4%BB%96%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1)

除了生成器对象这一种可迭代对象，`yield*` 还可以 `yield` 其他任意的可迭代对象，比如说数组、字符串、`arguments` 对象等等。



```
function* g3() {
  yield* [1, 2];
  yield* "34";
  yield* arguments;
}

var iterator = g3(5, 6);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: "3", done: false }
console.log(iterator.next()); // { value: "4", done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: 6, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### [`yield*` 表达式的值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*#yield_%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%9A%84%E5%80%BC)

`yield*` 是一个表达式，不是语句，所以它会有自己的值。
<span style="background:#d2cbff">yield*  yieldFn() 把yieldFn返回的向上返回</span>


```
function* g4() {
  yield* [1, 2, 3];
  return "foo";
}

var result;

function* g5() {
  result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true },
// 此时 g4() 返回了 { value: "foo", done: true }

console.log(result); // "foo"
```