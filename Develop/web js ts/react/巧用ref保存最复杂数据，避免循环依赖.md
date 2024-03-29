```jsx
import React from 'react'

function MyButton(p) {
  return (
    <button onClick={()=>{
      p.setDt(p=>p+1)
      p.obj.current++
    }}>
     {p.obj.current}
    </button>
  );
}

export default function MyApp() {
  const [dt,setDt] = React.useState(0)
  const obj = React.useRef(0)
  return (
    <div>
      <h1>{JSON.stringify(obj)}</h1>
      <MyButton setDt={setDt} obj={obj}/>
    </div>
  );
}
```

--- 

当有一个复杂嵌套数据时，可以用ref保存而非state，当前 编辑行 用state即可
```ts
const foobarMap = useRef<Record<string,{foo:string,bar:number}>>({})
const [foobar, setFoobar] = useState<{foo:string,bar:number}>()
const key = useState('hello')

useEffect(()=>{
	setFoobar(foobarMap.current[key])
}, [key])

useEffect(()=>{
	foobarMap.current[key] = foobar
}, [key, foobar])

return <Form data={foobar}/>
```

如果foobarMap是state, 就会引起dead loop
```ts
const [foobarMap, setFoobarMap] = useState<Record<string,{foo:string,bar:number}>>({})
const [foobar, setFoobar] = useState<{foo:string,bar:number}>()
const key = useState('hello')

useEffect(()=>{
	setFoobar(foobarMap[key])
}, [key, foobarMap])

useEffect(()=>{
	setFoobarMap(prev=>{ 
		prev[key] = foobar 
		return {...prev}
	}) 
}, [key, foobar])
```

![[fk]]