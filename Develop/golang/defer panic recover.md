https://blog.golang.org/defer-panic-and-recover
A defer statement pushes a function call onto a list.  The list of saved calls is executed after the surrounding function returns
放进列表, 在包围的function返回后执行
```
func CopyFile(dstName, srcName string) (written int64, err error) {
    src, err := os.Open(srcName)
    if err != nil {
        return
    }
    defer src.Close()


    dst, err := os.Create(dstName)
    if err != nil {
        return
    }
    defer dst.Close()


    return io.Copy(dst, src)
}
```


The behavior of defer statements is straightforward and predictable. There are three simple rules: 

1. A deferred function's arguments are evaluated when the defer statement is evaluated.
In this example, the expression "i" is evaluated when the Println call is deferred. The deferred call will print "0" after the function returns.
func a() {
    i := 0
    defer fmt.Println(i)
    i++
    return
}
2. Deferred function calls are executed in Last In First Out后进先出 order after the surrounding function returns.
This function prints "3210":
func b() {
    for i := 0; i < 4; i++ {
        defer fmt.Print(i)
    }
}
3. Deferred functions may read and assign to the returning function's named return values.
In this example, a deferred function increments the return value iafter the surrounding function returns. Thus, this function returns 2:
func c() (i int) { //返回 i
    defer func() { i++ }() //将返回的i自增
    return 1
}

---
Panic is a built-in function that stops the ordinary flow of control and begins panicking. 停止正常流 When the function F calls panic, execution of F stops, any deferred functions in F are executed normally,and then F returns to its caller. To the caller, F then behaves like a call to panic对于调用者,F行径就像call了panic. The process continues up the stack until all functions in the current goroutine have returned, at which point the program crashes. Panics can be initiated by invoking panic directly. They can also be caused by runtime errors, such as out-of-bounds array accesses.
Recover is a built-in function that regains control of a panicking goroutine.重新取得控制  Recover is only useful inside deferred functions.只能和defer一并用 During normal execution, a call to recover will return nil and have no other effect. If the current goroutine is panicking, a call to recover will capture the value given to panic and resume normal execution.


Here's an example program that demonstrates the mechanics of panic and defer: 

package main

import "fmt"

func main() {
    f()
    fmt.Println("Returned normally from f.")
}

func f() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered in f", r)
        }
    }()
    fmt.Println("Calling g.")
    g(0)
    fmt.Println("Returned normally from g.")
}

func g(i int) {
    if i > 3 {
        fmt.Println("Panicking!")
        panic(fmt.Sprintf("%v", i))
    }
    defer fmt.Println("Defer in g", i)
    fmt.Println("Printing in g", i)
    g(i + 1)
}

The function g takes the int i, and panics if i is greater than 3, or else it calls itself with the argument i+1. The function f defers a function that calls recover and prints the recovered value (if it is non-nil). Try to picture what the output of this program might be before reading on. 

The program will output: 

Calling g.
Printing in g 0
Printing in g 1
Printing in g 2
Printing in g 3
Panicking!
Defer in g 3
Defer in g 2
Defer in g 1
Defer in g 0
Recovered in f 4 //停止向上panic
Returned normally from f.

If we remove the deferred function from f the panic is not recovered and reaches the top of the goroutine's call stack, terminating the program. This modified program will output: 

Calling g.
Printing in g 0
Printing in g 1
Printing in g 2
Printing in g 3
Panicking!
Defer in g 3
Defer in g 2
Defer in g 1
Defer in g 0
panic: 4

panic PC=0x2a9cd8
[stack trace omitted]













