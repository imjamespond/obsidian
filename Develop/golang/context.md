
- [WithValue](https://golang.google.cn/pkg/context/#example_WithValue)
```go
package main

import (
	"context"
	"fmt"
)

func main() {
	type favContextKey string // 重命名类型

	f := func(ctx context.Context, k favContextKey) {
		if v := ctx.Value(k); v != nil {
			fmt.Println("found value:", v)
			return
		}
		fmt.Println("key not found:", k)
	}

	k := favContextKey("language")
	ctx := context.WithValue(context.Background(), k, "Go") // language -> Go

	f(ctx, k)
	f(ctx, favContextKey("color"))

}
```