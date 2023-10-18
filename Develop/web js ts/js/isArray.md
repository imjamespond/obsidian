https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof
https://blog.csdn.net/weixin_42289279/article/details/131343054

        众所周知，js中使用 typeof 只能检测基本数据类型，包括：number、string、boolean、undefined、symbol。函数的 typeof 返回值是function。而null、Array、Object以及除 Function 外的所有构造函数的类型都是 'object'。所以无法使用typeof去判断js的数组类型

         关于typeof的知识点可以查看我另一篇博客：整理typeof返回值_程序猿小野的博客-CSDN博客。下面说明js如何判断数组类型：

1. 通过 Array.isArray() 判断  （推荐使用）
Array.isArray() 用于判断的值是否是一个数组，返回一个布尔值。是数组返回true，不是返回false

```js
let arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
 
let obj = { name: 'Yee' };
console.log(Array.isArray(obj)); // false
```
IE8 及以下版本：不支持
IE9+、Edge、Chrome、Firefox、Safari：支持

2. 通过Object.prototype.toString.call() 判断
Object.prototype.toString.call()可以获取到对象的不同类型，比如：'[object Number]'、'[object String]'、'[object Object]'、'[object Null]'、'[object Undefined]' 等等。


```js
let arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr)); // [object Array]
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
 
let obj = { name: 'Yee' };
console.log(Object.prototype.toString.call(obj)); // [object Object]
console.log(Object.prototype.toString.call(obj) === '[object Array]'); // false
```

上面说到，IE8及以下版本不支持Array.isArray()，如果需要考虑兼容性问题可以做如下封装：

```js
if (!Array.isArray) {
    Array.isArray = function(argument) {
        return Object.prototype.toString.call(argument) === '[object Array]';
    }
}
```

 3. 通过 constructor 判断
每一个引用类型都有一个constructor属性，由于自定义构造函数会创建一个特殊的对象类型，因此它的constructor属性在原型未被重写时也就是使用默认原型时指向创建它的构造函数。


```js
let arr = [1, 2, 3];
console.log(arr.constructor === Array); // true
 
let obj = { name: 'Yee' };
console.log(obj.constructor === Array); // false
```

4. 通过 instanceof 判断
	instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，返回一个布尔值

```js
let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
 
let obj = { name: 'Yee' };
console.log(obj instanceof Array); // false
```

## instanceof 和 Array.isArray() 的差异
- Array.isArray()
```js
//  Array.prototype 也是一个数组。
console.log(Array.isArray(Array.prototype)); // true
 
// 修改原型对象指向数组原型的对象，也可以被分辨出来
let obj = { name: 'Yee', __proto__: Array.prototype }
console.log(Array.isArray(obj)); // false
 
// isArray可以跨iframe工作
let iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
let arr = new xArray(1, 2, 3);
console.log(arr); // [1,2,3]
console.log(Array.isArray(arr)); // true
```
- instanceof
```js
// 不能正确判断 Array.prototype
console.log(Array.prototype instanceof Array); // false
 
// 如果修改原型对象指向，instanceof 无法准确分辨
let obj = { name: 'Yee', __proto__: Array.prototype }
console.log(obj instanceof Array); // true
 
// 不能跨iframe 工作
let iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
let arr = new xArray(1, 2, 3);
console.log(arr); // [1,2,3]
console.log(arr instanceof Array); // false
```


综上，在判断对象是否为数组时，采用Array.isArray() 更加可靠
————————————————
版权声明：本文为CSDN博主「程序猿小野」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_42289279/article/details/131343054