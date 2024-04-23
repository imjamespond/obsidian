[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 **`charCodeAt()`** 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 `0` 和 `65535` 之间。

`charCodeAt()` 方法总是将字符串当作 [UTF-16 码元](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)序列进行索引，因此它可能==返回单独代理项==（lone surrogate）。如果要获取给定索引处的==完整 Unicode 码位==，请使用 [`String.prototype.codePointAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 方法。

```js
const str = "🌃";
for (let i = 0; i < str.length; i++) {
  console.log(str[i],str.codePointAt(i), str.charCodeAt(i));
}
> "�" 127747 55356
> "�" 57091 57091
```

--- 
[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 **`codePointAt()`** 方法返回一个非负整数，==该整数是==从给定索引开始的字符的 Unicode ==码位值==。请注意，==**索引**仍然基于 UTF-16 码元，而不是 Unicode 码位==。

## [尝试一下](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B)

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E8%AF%AD%E6%B3%95)

```
codePointAt(index)
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E5%8F%82%E6%95%B0)

[`index`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#index)

需要返回的字符的（从零开始的）索引。会被[转换为整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#%E6%95%B4%E6%95%B0%E8%BD%AC%E6%8D%A2)——`undefined` 会转换为 0。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E8%BF%94%E5%9B%9E%E5%80%BC)

一个非负整数，表示给定 `index` 处字符的==码位值==。

- 如果 `index` 超出了 `0` – `str.length - 1` 的范围，`codePointAt()` 返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。
- 如果 `index` 处的元素是一个 UTF-16 ==前导代理==（leading surrogate），则返回代理_对_的码位。
- 如果 `index` 处的元素是一个 UTF-16 ==后尾代理==（trailing surrogate），则_只_返回后尾代理的码元。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E6%8F%8F%E8%BF%B0)

字符串中的字符从左到右进行索引。第一个字符的索引为 `0`，而字符串 `str` 中最后一个字符的索引为 `str.length - 1`。

Unicode 码位范围从 `0` 到 `1114111`（`0x10FFFF`）。在 UTF-16 中，每个字符串索引是一个取值范围为 `0` – `65535` 的码元。较高的码位由一个由_一对_ 16 位代理伪字符表示。因此，`codePointAt()` 返回的码位可能跨越两个字符串索引。有关 Unicode 的信息，请参阅 [UTF-16 字符、Unicode 码位和字素簇](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E7%A4%BA%E4%BE%8B)

### [使用 codePointAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E4%BD%BF%E7%94%A8_codepointat)



```
"ABC".codePointAt(0); // 65
"ABC".codePointAt(0).toString(16); // 41

"😍".codePointAt(0); // 128525
"\ud83d\ude0d".codePointAt(0); // 128525
"\ud83d\ude0d".codePointAt(0).toString(16); // 1f60d

"😍".codePointAt(1); // 56845
"\ud83d\ude0d".codePointAt(1); // 56845
"\ud83d\ude0d".codePointAt(1).toString(16); // de0d

"ABC".codePointAt(42); // undefined
```

### [在循环中使用 codePointAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#%E5%9C%A8%E5%BE%AA%E7%8E%AF%E4%B8%AD%E4%BD%BF%E7%94%A8_codepointat)

因为使用字符串索引进行循环会导致同一码位被访问两次（一次是前导代理，一次是后尾代理），而第二次调用 `codePointAt()` 时_只_返回后尾代理项，==所以最好避免使用索引进行循环。==



```
const str = "\ud83d\udc0e\ud83d\udc71\u2764";

for (let i = 0; i < str.length; i++) {
  console.log(str.codePointAt(i).toString(16));
}
// '1f40e'、'dc0e'、'1f471'、'dc71'、'2764'
```

相反，可以使用 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Loops_and_iteration#for...of_%E8%AF%AD%E5%8F%A5) 语句或[字符串展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)，这两种方法都会调用字符串的 [`@@iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator)，从而按照码位进行迭代。然后，可以使用 `codePointAt(0)` 获取每个元素的码位值。



```
for (const codePoint of str) {
  console.log(codePoint.codePointAt(0).toString(16));
}
// '1f40e'、'1f471'、'2764'

[...str].map((cp) => cp.codePointAt(0).toString(16));
// ['1f40e', '1f471', '2764']
```