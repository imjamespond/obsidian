[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 **`charCodeAt()`** 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 `0` 和 `65535` 之间。

`charCodeAt()` 方法总是将字符串当作 [UTF-16 码元](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)序列进行索引，因此它可能==返回单独代理项==（lone surrogate）。如果要获取给定索引处的==完整 Unicode 码位==，请使用 [`String.prototype.codePointAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 方法。

```js
const str = "🌃";
for (let i = 0; i < str.length; i++) {
  console.log(str[i],str.codePointAt(i), str.charCodeAt(i));
}
```

```
> "�" 127747 1f303(完整码位) 55356
> "�" 57091 df03(后位) 57091
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
- 如果 `index` 处的元素是一个 UTF-16 ==后尾代理==（trailing surrogate），则_==**只_返回后尾代理的码元**==。

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

因为<span style="background:rgba(140, 140, 140, 0.12)">使用字符串索引进行循环</span>会导致同一码位被==访问两次==（一次是前导代理，一次是后尾代理），而==第二次==调用 `codePointAt()` 时_只_返回后尾代理项，==所以最好避免使用索引进行循环。==

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

--- 
### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#%E5%8F%82%E6%95%B0)

[`index`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#index)

要返回的字符的索引，从零开始。将被[转换为整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#%E6%95%B4%E6%95%B0%E8%BD%AC%E6%8D%A2)——`undefined` 被转换为 0。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#%E8%BF%94%E5%9B%9E%E5%80%BC)

一个整数，介于 `0` 和 `65535` 之间，表示指定 `index` 处字符的 UTF-16 码元值。如果 `index` 超出了 `0` 到 `str.length - 1` 的范围，则 `charCodeAt()` 返回 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#%E6%8F%8F%E8%BF%B0)

字符串中的字符从左到右进行索引。第一个字符的索引为 `0`，而在名为 `str` 的字符串中，最后一个字符的索引为 `str.length - 1`。

Unicode 码位的范围是 `0` 到 `1114111`（`0x10FFFF`）。`charCodeAt()` 方法始终返回一个小于 `65536` 的值，因为更高的码位由_一对_ 16 位代理伪字符（surrogate pseudo-character）来表示。因此，为了获取值大于 `65535` 的完整字符，不仅需要检索 `charCodeAt(i)`，而且还要使用 `charCodeAt(i + 1)`（就像操作具有两个字符的字符串一样），或者使用 [`codePointAt(i)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 方法。有关 Unicode 的信息，请参见 [UTF-16 字符、Unicode 码位和字素簇](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_%E5%AD%97%E7%AC%A6%E3%80%81unicode_%E7%A0%81%E4%BD%8D%E5%92%8C%E5%AD%97%E7%B4%A0%E7%B0%87)。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#%E7%A4%BA%E4%BE%8B)

### [使用 charCodeAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#%E4%BD%BF%E7%94%A8_charcodeat)

以下示例返回 `65`，即 A 的 Unicode 值。



```
"ABC".charCodeAt(0); // 返回 65
```

`charCodeAt()` 可能会返回单独代理项，它们不是有效的 Unicode 字符。



```
const str = "𠮷𠮾";
console.log(str.charCodeAt(0)); // 55362 或 d842，不是有效的 Unicode 字符
console.log(str.charCodeAt(1)); // 57271 或 dfb7，不是有效的 Unicode 字符
```

要获取给定索引处的完整 Unicode 码位，请使用 [`String.prototype.codePointAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 方法。



```
const str = "𠮷𠮾";
console.log(str.codePointAt(0)); // 134071
```

**备注：** ==避免使用 `charCodeAt()` 来重新实现 `codePointAt()`==。从 UTF-16 代理到 Unicode 码位的转换相当复杂，而且 `codePointAt()` 可能更加高效，因为它直接使用字符串的内部表示形式。如果需要，可以安装一个 `codePointAt()` 的 polyfill。

以下是将一对 UTF-16 码元转换为 Unicode 码位的可能算法，改编自 [Unicode 常问问题](https://unicode.org/faq/utf_bom.html#utf16-3)：



```
// 常量
const LEAD_OFFSET = 0xd800 - (0x10000 >> 10);
const SURROGATE_OFFSET = 0x10000 - (0xd800 << 10) - 0xdc00;

function utf16ToUnicode(lead, trail) {
  return (lead << 10) + trail + SURROGATE_OFFSET;
}
function unicodeToUTF16(codePoint) {
  const lead = LEAD_OFFSET + (codePoint >> 10);
  const trail = 0xdc00 + (codePoint & 0x3ff);
  return [lead, trail];
}

const str = "𠮷";
console.log(utf16ToUnicode(str.charCodeAt(0), str.charCodeAt(1))); // 134071
console.log(str.codePointAt(0)); // 134071
```