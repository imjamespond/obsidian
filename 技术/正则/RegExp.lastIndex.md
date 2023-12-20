https://www.bilibili.com/video/BV1cC4y1977a/?spm_id_from=top_right_bar_window_dynamic.content.click&vd_source=62c8a03e66ff063b9af3e473fadb8049
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex

考虑下面的语句： 

```
var re = /(hi)?/g;
```

匹配空字符串 

```
console.log(re.exec("hi"));
console.log(re.lastIndex);
```

返回 `["hi", "hi"]` ，`lastIndex` 等于 2。 

```
console.log(re.exec("hi"));
console.log(re.lastIndex);
```

返回 `["", undefined]`，即一个数组，其第 0 个元素为匹配的字符串。此种情况下为空字符串，是因为 `lastIndex` 为 2（且一直是 2），"`hi`" 长度为 2。