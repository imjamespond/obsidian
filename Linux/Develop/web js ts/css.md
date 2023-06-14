- flex + ellipsis, 此例中外层flex用space-between，将title 和 btn置于两端，title也是flex,其又分成icon和text，这两个child都是block属性，key point是两个地方加overflow: hidden
```jsx
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
	<div style={{ display: 'flex', flex: '1', alignItems: 'center', overflow: 'hidden' }}>
		<MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
		<div
		style={{ marginLeft: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
		{initds?.cnName}{item.config?.custName ? ` (${item.config.custName})` : ''}
		</div>
	</div>
	<Space style={{ flex: '0' }}>
	...
	</Space>
</div>
```
![[Pasted image 20230411105328.png|200]]

--- 
- flex 容器最小宽度
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

--- 
backgroud有白线
flex: wrap后, 容器后面的div 背景在特定宽度下会往上移一个像素并产生白线, 原因是backgroud origin加了padding-box,删除后就没了