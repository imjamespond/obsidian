

for 中 select多个channel表示 在一个线程中读取多个channel？但是多个不同协程可以向这些channel中放入数据，只是统一在一个协程中取出？

--- 
每秒select一次 consume一条数据， 5秒后select出 done chan并退出线程
```go
package main
import (
"time"
"fmt"
)


func main() {
    messages := make(chan int, 10)
    done := make(chan bool)


    defer close(messages)
    // consumer
    go func() {
        ticker := time.NewTicker(1 * time.Second)
        for _ = range ticker.C { // 阻塞1秒
            select {
            case <-done: // 从done取
                fmt.Println("child process interrupt...")
                return
            default: // 从message取
                fmt.Printf("send message: %d\n", <-messages)
            }
        }
    }()


    // producer
    for i := 0; i < 10; i++ {
        messages <- i
    }
    time.Sleep(5 * time.Second)
    close(done)
    time.Sleep(1 * time.Second)
    fmt.Println("main process exit!")
}
```
