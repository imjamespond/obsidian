假设原来的依赖为`[foo,bar]`，bar是无效依赖
```js
useEffect(()=>{
	// if(foo changed)
	// then do something with bar
},[foo,bar])
```
可以通过barRef解决
```js
// const barRef
useEffect(()=>{
	barRef.current = bar
},[bar])
useEffect(()=>{
	// if(foo changed)
	// then do something with barRef
},[foo])
```