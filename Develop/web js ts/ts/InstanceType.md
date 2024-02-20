https://www.bilibili.com/video/BV1XV411D7Hv/?spm_id_from=333.1007.tianma.1-2-2.click&vd_source=62c8a03e66ff063b9af3e473fadb8049
或用React的 #react/FunctionComponent
`export type ExtractFCProps<T> = T extends React.FunctionComponent<infer P> ? P : never`

--- 
InstanceType
InstanceType 译为实例类型， 用来获取构造函数的返回类型
ts中的定义
```
/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

例
```ts
class People {
  name: string
  age: number

  constructor(name: string) {
    this.name = name;
  }
}

type IType = InstanceType<typeof People>
// type IType = People
// 因为constructor默认返回this
// constructor People(name: string): People
```

作者：顾十三
链接：https://juejin.cn/post/6923523666340741128
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。