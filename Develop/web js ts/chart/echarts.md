- data
```ts
const angle = Math.PI / 3 * i * 2
{ 
  name: key,
  label: {
	formatter: _params => {
	  return (labels as any)[key]
	}
  },
  category: 0, symbolSize: 50, x: Math.cos(angle) * 100, y: Math.sin(angle) * 100
}
```
x,y 将影响force布局

- color 
  https://echarts.apache.org/zh/option.html#color

- geoCoordMap
  [[echarts中geoCoordMap中国地图中所有省份城市经纬度大全]]
  