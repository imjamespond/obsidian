- ### interface + super class
使用接口约束，say在super中定义，参数可不带类型
```typescript
interface IA<T> {
  say: (arg: T) => void
}
class A<T> implements IA<T> {
  say
  constructor({ say }: IA<T>) {
    this.say = say
  }
}

class AA extends A<string> {
  constructor(){
    super({
      say: (arg)=>{
        console.log(arg)
      }
    })
  }
}

new AA().say("[123]")
```

- ### abstract super class  
这样虽然简洁，但是say方法需要带参数类型
```typescript
abstract class A<T> {
  abstract say(arg: T):void
}

class AA extends A<string> {
  say(arg: string): void {
    console.log(arg)
  }
}

new AA().say('[321]')
```