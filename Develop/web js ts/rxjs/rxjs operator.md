

debounce but first

```
.pipe(throttleTime(1000, undefined, { leading: true, trailing: true })) // no debounce effect
// .pipe(
// connect((val) => concat(
// val.pipe(take(1)), // excute only once, not every senconds
// val.pipe(debounceTime(1500))
// ))
// )
// .pipe(debounce(() => {
// const interval = performance.now() - $debounce.current
// const debounce = interval < 2000 ? 2000 : 0
// $debounce.current = performance.now()
// return timer(debounce)
// }))
.subscribe((validate) => {

validate()
})
return () => {

$$throttle.unsubscribe()
}

最后onsubmit无效, validate返回的 promise没有resolve
```

--- 

过滤,限制
```
observer.pipe(
filter((x) => !!x), // 过滤出有效数据
take(1), // 只做一次挂载渲染
)
```

throttle
```
1. import { fromEvent } from 'rxjs';
2. import { throttle } from 'rxjs/operators';
3. const clicks = fromEvent(document, 'click');
4. const result = clicks.pipe(throttle(ev => interval(1000)));
5. result.subscribe(x => console.log(x));
```
双击
```
1. import { fromEvent, asyncScheduler } from 'rxjs';
2. import { throttleTime, withLatestFrom } from 'rxjs/operators';
3. // defaultThottleConfig = { leading: true, trailing: false }
4. const throttleConfig = {
5. leading: false,
6. trailing: true
7. }
8. const click = fromEvent(document, 'click');
9. const doubleClick = click.pipe(
10. throttleTime(400, asyncScheduler, throttleConfig)
11. );
12. doubleClick.subscribe((throttleValue: Event) => {
13. console.log(`Double-clicked! Timestamp: ${throttleValue.timeStamp}`);
14. });
```
