【手写Promise.all【渡一教育】】 https://www.bilibili.com/video/BV1qi421h7As/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb


```js
function PromiseAll(promises: Parameters<typeof Promise.all>[0]) {
  let resolve: Function, reject: Function;
  let running = 0, index = 0;

  const promise = new Promise((rsv, rej) => {
    resolve = rsv
    reject = rej
  });
  const results: unknown[] = []

  for (const p of promises) {
    const i = index;
    running++;
    index++;
    Promise.resolve(p)
      .then((data) => {
        running--;
        results[i] = data
        if (running === 0) {
          resolve(results)
        }
      })
      .catch((err) => reject(err))
  }

  return promise;
}
const sleep = (timeout: number) => new Promise((rs) => { window.setTimeout(rs, timeout) })
PromiseAll([1, 2, sleep(3000).then(() => 3), sleep(1000).then(() => 4)]).then(console.log);

```