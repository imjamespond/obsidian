https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
[guide](https://www.bilibili.com/video/BV12G411m7ak/?buvid=XYBA826BA47FA1770A56CAC97CD8F2A3DAE7D&is_story_h5=false&mid=W%2B8vlgPw8%2FLrz5E2mFtVbQ%3D%3D&p=1&plat_id=116&share_from=ugc&share_medium=android&share_plat=android&share_session_id=1d91b5cf-01be-4a74-9b17-bceb207d3207&share_source=WEIXIN&share_tag=s_i&timestamp=1696894246&unique_k=cFTnbuD&up_id=3494367331354766&vd_source=62c8a03e66ff063b9af3e473fadb8049)
https://jsfiddle.net/40kdas1z/5/

```html
<div class="container">
  <div class="pad"></div>
  <div id="target"></div>
  <div class="pad"></div>
</div>
<span id="info">isIntersecting = true</span>
```

```js
    }, {
	    root: document.querySelector('.container'),
		rootMargin: '200px 0px 100px 0px'
    });
    io.observe(document.getElementById('target'));
```
200px表示target底部离开container顶部距离触发
100px表示target顶底与container底部距离触发

---
【Intersection Observer【渡一教育】】 https://www.bilibili.com/video/BV14M4m1k79N/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb

---

[[test-intersection.md]]

---
要感受阈值是如何工作的，请尝试滚动下面的盒子，每一个带颜色盒子的四个边角都会展示自身在根元素中的可见程度百分比，所以==在你滚动根元素的时候你将会看到四个边角的数值一直在发生变化==。每一个盒子都有不同的阈值：

- 第一个盒子为==每个可见度百分点==设置了一个阈值；也就是说，[`IntersectionObserver.thresholds`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds "此页面目前仅提供英文版本") 数组为 `[0.00, 0.01, 0.02, /*...,*/ 0.99, 1.00]`。
- 第二个盒子只有一个阈值，位于 50% 刻度处。
- 第三个盒子每隔 10% 的可见度设置一个阈值（0%、10%、20% 等）。
- 最后一个盒子每 25% 设置一个阈值