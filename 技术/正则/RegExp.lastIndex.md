
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex

考虑下面的语句：

JSCopy to Clipboard

```
var re = /(hi)?/g;
```

匹配空字符串

JSCopy to Clipboard

```
console.log(re.exec("hi"));
console.log(re.lastIndex);
```

返回 `["hi", "hi"]` ，`lastIndex` 等于 2。

JSCopy to Clipboard

```
console.log(re.exec("hi"));
console.log(re.lastIndex);
```

返回 `["", undefined]`，即一个数组，其第 0 个元素为匹配的字符串。此种情况下为空字符串，是因为 `lastIndex` 为 2（且一直是 2），"`hi`" 长度为 2。