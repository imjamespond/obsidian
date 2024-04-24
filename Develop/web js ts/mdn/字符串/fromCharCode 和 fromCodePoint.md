[语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E8%AF%AD%E6%B3%95)
```
String.fromCodePoint(num1)
String.fromCodePoint(num1, num2)
String.fromCodePoint(num1, num2, /* …, */ numN)
```

[参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E5%8F%82%E6%95%B0)
[`numN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#numn)
一个介于 `0` 和 `0x10FFFF`（包括两者）之间的整数，表示一个 Unicode 码位。

 [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E8%BF%94%E5%9B%9E%E5%80%BC)
通过使用指定的码位序列创建的字符串。

 [异常](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E5%BC%82%E5%B8%B8)
如果 `numN` 不是整数、小于 `0` 或者在转换为数字后大于 `0x10FFFF`，则会抛出该异常。
 [说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E8%AF%B4%E6%98%8E)
`fromCodePoint()` 是 `String` 的静态方法，因此始终使用 `String.fromCodePoint()` 调用它，而不是作为你创建的 `String` 值的方法。

Unicode 码位范围从 `0` 到 `1114111`（`0x10FFFF`）。在 UTF-16 中，每个字符串索引是一个取值范围为 `0` 到 `65535` 的码元。较高的码位由一对 16 位代理伪字符表示。因此，`fromCodePoint()` 可能返回一个字符串，其在 UTF-16 码元中的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length) 大于传递的参数个数。有关 Unicode 的更多信息，请参阅 [UTF-16 字符、Unicode 码位和字素簇](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E7%A4%BA%E4%BE%8B)

### [使用 fromCodePoint()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E4%BD%BF%E7%94%A8_fromcodepoint)

有效输入：
```
String.fromCodePoint(42); // "*"
String.fromCodePoint(65, 90); // "AZ"
String.fromCodePoint(0x404); // "\u0404" === "Є"
String.fromCodePoint(0x2f804); // "\uD87E\uDC04"
String.fromCodePoint(194564); // "\uD87E\uDC04"
String.fromCodePoint(0x1d306, 0x61, 0x1d307); // "\uD834\uDF06a\uD834\uDF07"
```

无效输入：
```
String.fromCodePoint("_"); // RangeError
String.fromCodePoint(Infinity); // RangeError
String.fromCodePoint(-1); // RangeError
String.fromCodePoint(3.14); // RangeError
String.fromCodePoint(3e-2); // RangeError
String.fromCodePoint(NaN); // RangeError
```

### [与 fromCharCode() 的比较](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E4%B8%8E_fromcharcode_%E7%9A%84%E6%AF%94%E8%BE%83)

`String.fromCharCode()` 方法无法通过==指定其码==位来==返回补充字符==（即码位 `0x010000` 至 `0x10FFFF`）。相反，它需要使用 ==UTF-16 代理==对来返回补充字符：

```
String.fromCharCode(0xd83c, 0xdf03); // 码位 U+1F303（夜晚与星星）=== "\uD83C\uDF03"
String.fromCharCode(55356, 57091);
```

另一方面，`String.fromCodePoint()` 可以通过==指定其码位==（相当于 UTF-32 码元）==返回 4 个字节的补充字符==，以及更常见的 2 个字节的 BMP 字符：

```
String.fromCodePoint(0x1f303); // 或十进制数 127747
```
## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

|  | desktop |  |  |  |  | mobile |  |  |  |  |  | server |  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|  | Chrome | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno | Node.js |
| `fromCodePoint` | 41<br><br>Toggle history | 12<br><br>Toggle history | 29<br><br>Toggle history | 28<br><br>Toggle history | 9<br><br>Toggle history | 41<br><br>Toggle history | 29<br><br>Toggle history | 28<br><br>Toggle history | 9<br><br>Toggle history | 4.0<br><br>Toggle history | 41<br><br>Toggle history | 1.0<br><br>Toggle history | 4.0.0<br><br>Toggle history |

--- 
**`String.fromCharCode()`** 静态方法返回由指定的 UTF-16 ==码元==序列创建的字符串。

## [尝试一下](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B)

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E8%AF%AD%E6%B3%95)



```
String.fromCharCode(num1)
String.fromCharCode(num1, num2)
String.fromCharCode(num1, num2, /* …, */ numN)
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E5%8F%82%E6%95%B0)

[`numN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#numn)

一个介于 `0` 和 `65535`（`0xFFFF`）之间的数字，表示一个 UTF-16 码元。大于 `0xFFFF` (4 * 4 = 16位)的数字会被截断为最后的 16 位。不进行有效性检查。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E8%BF%94%E5%9B%9E%E5%80%BC)

一个长度为 `N` 的字符串，由 `N` 个指定的 UTF-16 码元组成。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E6%8F%8F%E8%BF%B0)

因为 `fromCharCode()` 是 `String` 的静态方法，所以始终使用 `String.fromCharCode()` 来调用它，而不是作为你创建的 `String` 值的方法。

Unicode 码位的范围是从 `0` 到 `1114111`==（`0x10FFFF`）==。==**`charCodeAt()`** 总是返回一个小于 `65536` 的值==，因为较高的码位由_一对_ 16 位代理伪字符组成。因此，==为了生成一个值**大于** `65535` 的完整字符，需要提供**两个码元**==（就好像操作一个包含两个字符的字符串）。有关 Unicode 的信息，请参阅 [UTF-16 字符、Unicode 码位和字素簇](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)。

由于 `fromCharCode()` ==仅适用于 16 位的值==（与 `\u` 转义序列相同），因此需要==使用代理对来返回补充字符==。
例如，`String.fromCharCode(0xd83c, 0xdf03) === "\ud83c\udf03"` 都返回==码位 `U+1F303`== "Night with Stars" 即"🌃"。
虽然补充码位值（例如 ==`0x1f303`==）与表示它的两个代理值（例如 `0xd83c` 和 `0xdf03`）之间存在数学关系，但每次使用补充码位时都需要额外的步骤来计算或查找代理对值。
##### 出于这个原因，使用 [`String.fromCodePoint()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) 更方便，它可以根据实际的码位值返回补充字符。例如，`String.fromCodePoint(0x1f303)` 返回码位 `U+1F303` "Night with Stars"。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E7%A4%BA%E4%BE%8B)

### [使用 fromCharCode()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E4%BD%BF%E7%94%A8_fromcharcode)

在 UTF-16 中，BMP 字符使用单个码元：
```
String.fromCharCode(65, 66, 67); // 返回 "ABC"
String.fromCharCode(0x2014); // 返回 "—"
String.fromCharCode(0x12014); // 也返回 "—"；数字 1 被截断并忽略
String.fromCharCode(8212); // 也返回 "—"；8212 是 0x2014 的十进制表示
```

在 UTF-16 中，==补充字符==需要==两个码元==（即一个代理对）：
```
String.fromCharCode(0xd83c, 0xdf03); // 码位 U+1F303 "Night with
String.fromCharCode(55356, 57091); // Stars" == "\uD83C\uDF03"

String.fromCharCode(0xd834, 0xdf06, 0x61, 0xd834, 0xdf07); // "\uD834\uDF06a\uD834\uDF07"
```

## [规范](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E8%A7%84%E8%8C%83)

|Specification|
|---|
|[ECMAScript Language Specification  <br># sec-string.fromcharcode](https://tc39.es/ecma262/multipage/text-processing.html#sec-string.fromcharcode)|

## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString%2FfromCharCode&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.String.fromCharCode%60%0A*+Report+started%3A+2024-04-23T09%3A28%3A44.448Z%0A%0A%3C%2Fdetails%3E&title=javascript.builtins.String.fromCharCode+-+%3CSUMMARIZE+THE+PROBLEM%3E&template=data-problem.yml "Report an issue with this compatibility data")

| |desktop|   |   |   |   |mobile|   |   |   |   |   |server|   |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
||Chrome|Edge|Firefox|Opera|Safari|Chrome Android|Firefox for Android|Opera Android|Safari on iOS|Samsung Internet|WebView Android|Deno|Node.js|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|`fromCharCode`|1<br><br>Toggle history|12<br><br>Toggle history|1<br><br>Toggle history|4<br><br>Toggle history|1<br><br>Toggle history|18<br><br>Toggle history|4<br><br>Toggle history|10.1<br><br>Toggle history|1<br><br>Toggle history|1.0<br><br>Toggle history|4.4<br><br>Toggle history|1.0<br><br>Toggle history|0.10.0<br><br>Toggle history|

### Legend

Tip: you can click/tap on a cell for more information.