https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel
### [发送者](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/message_event#%E5%8F%91%E9%80%81%E8%80%85)
```js
const channel = new BroadcastChannel("example-channel");
const messageControl = document.querySelector("#message");
const broadcastMessageButton = document.querySelector("#broadcast-message");

broadcastMessageButton.addEventListener("click", () => {
  channel.postMessage(messageControl.value);
});
```

### [接收者 1](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/message_event#%E6%8E%A5%E6%94%B6%E8%80%85_1)

```js
const channel = new BroadcastChannel("example-channel");
channel.addEventListener("message", (event) => {
  received.textContent = event.data;
});
```

### [接收者 2](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel/message_event#%E6%8E%A5%E6%94%B6%E8%80%85_2)

```js
const channel = new BroadcastChannel("example-channel");
channel.addEventListener("message", (event) => {
  received.textContent = event.data;
});
```