backgroud有白线
flex: wrap后, 容器后面的div 背景在特定宽度下会往上移一个像素并产生白线, 原因是backgroud origin加了padding-box,删除后就没了

---
flex 容器最小宽度
容器 display: flex
子元素 flexBasis:800,flexGrow:1,flexShrink:0
flexGrow1,自适应; flexShrink0,最小宽度,flexBasis:宽度值
The flex CSS shorthand property: 
```
1. a <number> for <flex-grow>.  增长因子,  宽度足够时, 超出基础宽度, 不足时==不会缩小==
2. a <number> for <flex-shrink>. 缩小因子,  宽度足够时, 达到基础宽度, 不足时==会缩小==
3. a valid value for width for <flex-basis>. 基础宽度
```
外层div overflow auto
内层div minWidth (1000px)