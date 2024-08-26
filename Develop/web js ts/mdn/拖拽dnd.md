https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/draggable
### 示例
https://github.com/imjamespond/frontend-2022/blob/data-model-product-2405/src/view/test/draggable.tsx
--- 

[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes) **draggable** 是一种[枚举 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Enumerated "Currently only available in English (US)")属性，用于标识元素是否允许使用浏览器原生行为或 [HTML 拖放操作 API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API) 拖动。

`draggable` 属性可以应用于严格属于 [HTML 命名空间 (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Namespace "Currently only available in English (US)")的元素，这意味着它不能应用于 [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)。关于命名空间声明的简介和作用的更多信息，请参阅[命名空间速成课](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Namespaces_Crash_Course)。

`draggable` 可以有如下取值：

-   `true`：表示元素可以被拖动
-   `false`：表示元素不可以被拖动

--- 
[拖拽排序](https://www.bilibili.com/video/BV1uN411u7GP/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=62c8a03e66ff063b9af3e473fadb8049)
[课表](https://www.bilibili.com/video/BV1jw411p73v/)

[Flipjs动画](https://www.bilibili.com/video/BV1Yu411E7io/?spm_id_from=333.788.recommend_more_video.0&vd_source=62c8a03e66ff063b9af3e473fadb8049)

--- 
[dragleave 不准确](https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element)
```js
dragleave: function(e) {
   // Get the location on screen of the element.
   var rect = this.getBoundingClientRect();

   // Check the mouseEvent coordinates are outside of the rectangle
   if(e.x > rect.left + rect.width || e.x < rect.left
   || e.y > rect.top + rect.height || e.y < rect.top) {
       $(this).removeClass('red');
   }
}

function isOutside(x: number, y: number, elem: HTMLElement) {
  const rect = elem.getBoundingClientRect();
  return x > rect.left + rect.width || x < rect.left || y > rect.top + rect.height || y < rect.top;
}

```