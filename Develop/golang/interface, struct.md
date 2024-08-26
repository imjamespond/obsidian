拷贝地址，相当于传了*this进来。可以改变 成员变量
### func (foo *Foo) hello(){}
默认拷贝，无法改变 成员变量
### func (foo Foo) world(){}
可以针对pointer和reference分别实现接口

传接口相当于传pointer?  比如foo(bar IBar) 就不能写成foo(bar *IBar)

---

基本geometry interface 有两个方法
rect和circle为geom的实现(struct), 其皆有这两个方法

---
```go
package main

import (
    "fmt"
    "math"
)

type geometry interface {
    area() float64
    perim() float64
}

type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}

func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}

func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}

func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}

func main() {
    r := rect{width: 3, height: 4}
    c := circle{radius: 5}

    measure(r)
    measure(c)
}
```

---
[is context.Context() pass-by-value?](https://www.reddit.com/r/golang/comments/6zkzwu/is_contextcontext_passbyvalue/)

Since there is no `*` in front of the type, it is passed by value.

```
func foo(ctx context.Context)  // Pass by value
func foo(ctx *context.Context) // Pass by pointer
```

However, `context.Context` is an interface. All interfaces are implemented with two machine-size (i.e., 64-bit on most machines) words, so they are small values and in most cases it is acceptable to pass them by value.