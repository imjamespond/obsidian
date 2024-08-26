```ts
type IMsg<T, R, P = void, Ext = void> = { type: T; payload?: P; result?: R } & Ext;
export type Msg = IMsg<"run", string, string> | IMsg<"parse", object, string, { code: string }>;

export function sendMsg(message: Msg) {
  // new Function('"use strict";return ( function(fetch){ ' + code + ' }  )')()(parseFetch)
  // https://developer.chrome.com/docs/extensions/mv3/sandboxingEval/
  const iframe = document.getElementById("sandbox") as HTMLIFrameElement;
  iframe.contentWindow?.postMessage(message, "*");
}

/**
 * 输入key值，自动推导msg类型
 * @param key 
 * @param callback 
 */
export function createMsgListener<K extends Msg["type"], M extends Msg = Extract<Msg, { type: K }>>(key: K, callback: (msg: M) => void) {
  const onMessage: (event: MessageEvent<M>) => void = (event) => {
    if (event.data.type === key) {
      callback(event.data);
    }
  };
  onMount(() => {
    window.addEventListener("message", onMessage);
  });

  onCleanup(() => {
    window.removeEventListener("message", onMessage);
  });
}
```

parse中对应msg包含了code
```ts
createMsgListener("parse", (msg) => {
  console.log("on message", msg);
});
```