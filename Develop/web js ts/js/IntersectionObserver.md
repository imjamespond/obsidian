[guide](https://www.bilibili.com/video/BV12G411m7ak/?buvid=XYBA826BA47FA1770A56CAC97CD8F2A3DAE7D&is_story_h5=false&mid=W%2B8vlgPw8%2FLrz5E2mFtVbQ%3D%3D&p=1&plat_id=116&share_from=ugc&share_medium=android&share_plat=android&share_session_id=1d91b5cf-01be-4a74-9b17-bceb207d3207&share_source=WEIXIN&share_tag=s_i&timestamp=1696894246&unique_k=cFTnbuD&up_id=3494367331354766&vd_source=62c8a03e66ff063b9af3e473fadb8049)
https://jsfiddle.net/40kdas1z/5/

```js
    }, {
    	root: document.querySelector('.container'),
      rootMargin: '200px 0px 100px 0px'
    });
    io.observe(document.getElementById('target'));
```
200px表示target底部离开container顶部距离触发
100px表示target顶底与container底部距离触发