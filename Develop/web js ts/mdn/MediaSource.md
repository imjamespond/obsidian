#MediaSource

[媒体分块](https://developer.mozilla.org/zh-CN/docs/Web/API/SourceBuffer)

```js
const video = document.querySelector("video");

const assetURL = "frag_bunny.mp4";
// Need to be specific for Blink regarding codecs
// ./mp4info frag_bunny.mp4 | grep Codec
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
  const mediaSource = new MediaSource();
  //console.log(mediaSource.readyState); // closed
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener("sourceopen", sourceOpen);
} else {
  console.error("Unsupported MIME type or codec: ", mimeCodec);
}

function sourceOpen(_) {
  //console.log(this.readyState); // open
  const mediaSource = this;
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, function (buf) {
    sourceBuffer.addEventListener("updateend", function (_) {
      mediaSource.endOfStream();
      video.play();
      //console.log(mediaSource.readyState); // ended
    });
    sourceBuffer.appendBuffer(buf);
  });
}

function fetchAB(url, cb) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    cb(xhr.response);
  };
  xhr.send();
}
```

确定支持解码 `MediaSource.isTypeSupported(mimeCodec)`

`const mediaSource = new MediaSource();` -> 
`video.src = URL.createObjectURL(mediaSource);` -> 
`ajax onload xhr.response` -> 
`sourceBuffer.appendBuffer(buf);` -> 
`sourceBuffer.addEventListener("updateend"` -> 
`video.play();`