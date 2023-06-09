https://blog.csdn.net/weixin_34265814/article/details/91441364
BehaviorSubject
BehaviorSubject 是 Subject 的变体之一。BehaviorSubject 的特性就是它会存储“当前”的值。这意味着你始终可以直接拿到 BehaviorSubject 最后一次发出的值。
详细讲解一下：
我们首先创建了一个 subject，并在其中注册了一个订阅者A。由于 subject 是一个 BehaviorSubject，所以订阅者A 会立即收到 subject 的初始值（一个随机数），并同时将其打印。
subject 随即广播下一个值。订阅者A 再次打印收到的值。
第二次订阅 subject 并称其为订阅者B。同样，订阅者B 也会立即收到 subject 当前存储的值并打印。
subject 再次广播下一个新的值。这时，两个订阅者都会收到这个值并打印。
最后，我们通过简单地访问 .value 属性的形式获取了 subject 当前的值并打印。这在同步的场景下非常好用，因为你不必订阅 Subject 就可以获取它的值。
另外，你可能发现了 BehaviorSubject 在创建时是需要设置一个初始值的。这一点在 Observable 上就非常难实现，而在 BehaviorSubject 上，只要传递一个值就行了。
```
import * as Rx from "rxjs";
const subject = new Rx.BehaviorSubject(Math.random());
// 订阅者 A
subject.subscribe((data) => {
console.log('Subscriber A:', data);
});
subject.next(Math.random());
// 订阅者 B
subject.subscribe((data) => {
console.log('Subscriber B:', data);
});
subject.next(Math.random());
console.log(subject.value)
// 输出
// Subscriber A: 0.24957144215097515
// Subscriber A: 0.8751123892486292
// Subscriber B: 0.8751123892486292
// Subscriber A: 0.1901322109907977
// Subscriber B: 0.1901322109907977
// 0.1901322109907977

```

ReplaySubject
相比 BehaviorSubject 而言，ReplaySubject 是可以给新订阅者发送“旧”数据的。另外，ReplaySubject 还有一个额外的特性就是它可以记录一部分的 observable execution，从而存储一些旧的数据用来“重播”给新来的订阅者。
当创建 ReplaySubject 时，你可以指定存储的数据量以及数据的过期时间。也就是说，你可以实现：给新来的订阅者“重播”订阅前一秒内的最后五个已广播的值。示例代码如下：
```

import * as Rx from "rxjs";
const subject = new Rx.ReplaySubject(2);
// 订阅者 A
subject.subscribe((data) => {
console.log('Subscriber A:', data);
});
subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())
// 订阅者 B
subject.subscribe((data) => {
console.log('Subscriber B:', data);
});
subject.next(Math.random());
// Subscriber A: 0.3541746356538569
// Subscriber A: 0.12137498878080955
// Subscriber A: 0.531935186034298
// Subscriber B: 0.12137498878080955
// Subscriber B: 0.531935186034298
// Subscriber A: 0.6664809293975393
// Subscriber B: 0.6664809293975393
```
之前提到了你还可以设置 ReplaySubject 的数据过期时间。让我们来看看下面这个例子：
同样解读一下代码：
我们创建了一个 ReplaySubject，指定其存储最近两次广播的值，但只保留 100ms；
订阅 subject 并称其为订阅者A；
我们让这个 subject 每 200ms 广播一次。订阅者A 每次都会收到值并打印；
我们设置在程序执行一秒后再次订阅 subject，并称其为订阅者B。这意味着在它开始订阅之前，subject 就已经广播过五次了。由于我们在创建 subject 时就设置了数据的过期时间为 100ms，而广播间隔为 200ms，所以订阅者B 在开始订阅后只会收到前五次广播中最后一次的值。
```
import * as Rx from "rxjs";
const subject = new Rx.ReplaySubject(2, 100);
// 订阅者A
subject.subscribe((data) => {
console.log('Subscriber A:', data);
});
setInterval(() => subject.next(Math.random()), 200);
// 订阅者B
setTimeout(() => {
subject.subscribe((data) => {
console.log('Subscriber B:', data);
});
}, 1000)
// Subscriber A: 0.44524184251927656
// Subscriber A: 0.5802631630066313
// Subscriber A: 0.9792165506699135
// Subscriber A: 0.3239616040117268
// Subscriber A: 0.6845077617520203
// Subscriber B: 0.6845077617520203
// Subscriber A: 0.41269171141525707
// Subscriber B: 0.41269171141525707
// Subscriber A: 0.8211466186035139
// Subscriber B: 0.8211466186035139
```

AsyncSubject
BehaviorSubject 和 ReplaySubject 都可以用来存储一些数据，而 AsyncSubject 就不一样了。AsyncSubject 只会在 Observable execution 完成后，将其最终值发给订阅者。请看代码：
创建 AsyncSubject；
订阅 subject 并称其为订阅者A；
subject 连续广播三次，但什么也没发生；
再次订阅 subject 并称其为订阅者B；
subject 又广播了一次，但还是什么也没发生；
subject 完成。两个订阅者这才收到传来的值并打印至终端。
```
import * as Rx from "rxjs";
const subject = new Rx.AsyncSubject();
// 订阅者A
subject.subscribe((data) => {
console.log('Subscriber A:', data);
});
subject.next(Math.random())
subject.next(Math.random())
subject.next(Math.random())
// 订阅者B
subject.subscribe((data) => {
console.log('Subscriber B:', data);
});
subject.next(Math.random());
subject.complete();
// Subscriber A: 0.4447275989704571
// Subscriber B: 0.4447275989704571
```


---
fromEventPattern
fromEventPattern 允许您将任何支持注册事件处理程序功能的API转换为Observable。它类似于fromEvent，但更加灵活。实际上，的所有用例 fromEvent 都可以很容易地由 fromEventPattern（尽管以更详细的方式）处理。
```
fromEventPattern<T>(addHandler: , removeHandler?: , resultSelector?: ): Observable<T | T[]>
Observable<T | T[]>：可观察到的事件发生时，它发出传递给已注册事件处理程序的第一个参数。或者，它发出此时返回的任何项目函数。
```
发出发生在DOM文档上的点击。
```
import { fromEventPattern } from 'rxjs';


function addClickHandler(handler) {
  document.addEventListener('click', handler);
}


function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}


const clicks = fromEventPattern(
  addClickHandler,
  removeClickHandler
);
clicks.subscribe(x => console.log(x));


// 每当你点击浏览器中的任何地方时，DOM MouseEvent
// 对象将被记录。
```





