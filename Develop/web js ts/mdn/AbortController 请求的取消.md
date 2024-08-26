
```js
let controller;
function fetchVideo() {
  controller && controller.abort();
  controller = new AbortController();
  const signal = controller.signal;
  fetch(url, { signal })
    .then((response) => {
      console.log("Download complete", response);
    })
    .catch((err) => {
      console.error(`Download error: ${err.message}`);
    });
}
```

【请求的取消【渡一教育】】 https://www.bilibili.com/video/BV1KZ421M7v2/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb