https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type

【使用CSS实现滚动吸附效果【渡一教育】-哔哩哔哩】 https://b23.tv/s7bR2Nm

```css
/* parent 吸附效果 不能停留*/
scroll-snap-type: x mandatory;
/* children 靠左,中,右; 不可跳跃*/
scroll-snap-align: start;
scroll-snap-stop: always; 
```