```html
<video width="550" height="350" id="video" class="video-js vjs-default-skin col-lg-12 vjs-big-play-centered" poster="https://pbs.twimg.com/amplify_video_thumb/1710159401850695680/img/z8JyZMhRolrh0jn0.jpg" controls="" autoplay="" preload="auto" data-setup="{}" style="padding: 0;" src="blob:https://bad.news/8ce69dcc-6201-4e84-a9d9-968b182904c3">
</video>
```

blob返回的代码有，
```js
                            if (r && e.isAAC && H) {
                                if (H > 0 && H < F)
                                    V = Math.round((j - _) / v),
                                    o.b.log(C(H, !0) + " ms hole between AAC samples detected,filling it"),
                                    V > 0 && ((l = D.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (l = K.subarray()),
                                    N += V * l.length);
                                else if (H < -12) {
                                    o.b.log("drop overlapping AAC sample, expected/parsed/delta: " + C(_, !0) + " ms / " + C(j, !0) + " ms / " + C(-H, !0) + " ms"),
                                    N -= K.byteLength;
                                    continue
                                }
                                j = _
                            }
```
https://nochev.github.io/hls.js/docs/html/file/src/remux/mp4-remuxer.js.html
