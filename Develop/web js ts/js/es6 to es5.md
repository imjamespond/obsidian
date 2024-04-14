- **`??`**
```ts
const foo: string | undefined = "foo"
const bar = foo ?? "bar"
console.log(bar)

var foo = "foo";
var bar = foo !== null && foo !== void 0 ? foo : "bar";
console.log(bar);
```

- arrow function
```ts
const bar = [1,2,3,4].map(item=>item)
console.log(bar)

var bar = [1, 2, 3, 4].map(function (item) {
  return item;
});
console.log(bar);
```

- `??=`
```ts
const foo: { [k: string]: string } = {};
foo["bar"] ??= "bar";
console.log(foo);

var foo = {};
(_foo$_bar = foo[_bar = "bar"]) !== null && _foo$_bar !== void 0 ? _foo$_bar : foo[_bar] = "bar";
console.log(foo);
```

- `解构`
```ts
const foo = { foo: "foo", bar: "far" };
const bar = { bar: "bar" };
const foobar = { ...foo, ...bar };
console.log(foobar);

var foo = {
  foo: "foo",
  bar: "far"
};
var bar = {
  bar: "bar"
};
var foobar = _objectSpread(_objectSpread({}, foo), bar);
console.log(foobar);
// es6的方法无法转,只能转语法
console.log(Object.entries(foobar).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    k = _ref2[0],
    v = _ref2[1];
  return console.log(k, v);
}));
```

```ts
function f(x:number, y:number, z:number) {
  // ...
}
const args  = [0, 1, 2] as const;
f(...args);

function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(void 0, args);
```