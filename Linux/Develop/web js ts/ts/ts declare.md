TypeScript 1.5里术语名已经发生了变化。 “内部模块”现在称做“**命名空间**”。 “外部模块”现在则简称为“**模块**”，这是为了与 ECMAScript 2015里的术语保持一致，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。

---
Module 
```
// src/@types/jquery/index.d.ts
declare module 'jquery' {
	export default function (selector: string): any
}
// src/@types/lodash/debounce.d.ts
declare module 'lodash/debounce' {
	export default function (func: (args?:any)=>void, wait: number): ()=>void
}
// src/@types/leader-line/index.ts 
declare module 'leader-line' {
	export default class LeaderLine{
		constructor(dom1:any, dom2:any)
	}
}
```


```
// types/moment-plugin/index.d.ts 扩展原有模块, 
import * as moment from 'moment';
declare module 'moment' {
    export function foo(): moment.CalendarKey;
}

// src/index.ts
import * as moment from 'moment';
import 'moment-plugin';
moment.foo();
```

```
// types/foo-bar.d.ts 也可用于在一个文件中一次性声明多个模块的类型
declare module 'foo' {
    export interface Foo {
        foo: string;
    }
}
declare module 'bar' {
    export function bar(): string;
}
// src/index.ts
import { Foo } from 'foo';
import * as bar from 'bar';
let f: Foo;
bar.bar();
```


---
Class
```
// fish/index.d.ts, 也可用module
declare class RENDERER {
static init: ()=>void
}
export default RENDERER
import Fish from './fish/index'
Fish.init()
```






---

```
// global.d.ts
declare namespace MyPlugin {
    var n:number;
    var s:string;
    var f:(s:string)=>number;
}

MyPlugin.s.substr(0,1); 
MyPlugin.n.toFixed(); 
MyPlugin.f('文字').toFixed();
```

```
declare global {
    interface String {
        hump(input: string): string;
    }
}
// 注意: 修改"全局声明"必须在模块内部, 所以至少要有 export{}字样
// 不然会报错❌: 全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中
export {}
```
