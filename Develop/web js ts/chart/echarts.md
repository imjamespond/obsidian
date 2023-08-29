- data
```ts
{ 
  name: key,
  label: {
	formatter: _params => {
	  return (labels as any)[key]
	}
  },
  category: 0, symbolSize: 50, x: Math.random() * 1000, y: Math.random()* 1000
}
```
x,y 将影响force布局
