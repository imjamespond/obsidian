
#### go build release mode

在 Go 编程语言中，"build" 命令用于编译程序，而 "release mode" 是编译时的模式选项。在 release 模式下，编译器会优化代码以提高性能和减小二进制文件的大小。

为了在 Go 中构建 release 模式下的可执行文件，可以使用以下命令：

`go build -ldflags="-s -w" -o <output_file> <main_package>`

-ldflags 参数用于指定编译器的链接选项。其中，-s 选项表示移除符号表和调试信息，-w 选项表示移除 DWARF 调试信息。 -o 参数用于指定输出文件的名称，<output_file> 是你要输出的文件名, <main_package> 是你的项目的入口文件所在的包。

`go build -ldflags="-s -w" -o myapp main.go`

这样就会在当前目录下生成一个名为 myapp 的可执行文件。

--- 

- **Go 交叉编译**

Golang 支持交叉编译，在一个平台上生成另一个平台的可执行程序

##### **一 Mac 下编译 Linux 和 Windows 64位可执行程序**

```go
  CGO_ENABLED=0 
  GOOS=linux 
  GOARCH=amd64 
  go build main.go
  ​
  CGO_ENABLED=0 
  GOOS=windows 
  GOARCH=amd64 
  go build main.go
```

##### **二 Linux 下编译 Mac 和 Windows 64位可执行程序**

```go
  CGO_ENABLED=0 
  GOOS=darwin 
  GOARCH=amd64 
  go build main.go
  ​
  CGO_ENABLED=0 
  GOOS=windows 
  GOARCH=amd64 
  go build main.go
```

##### **三 Windows 下编译 Mac 和 Linux 64位可执行程序**

```go
  SET CGO_ENABLED=0
  SET GOOS=darwin
  SET GOARCH=amd64
  go build main.go
  ​
  SET CGO_ENABLED=0
  SET GOOS=linux
  SET GOARCH=amd64
  go build main.go
```

GOOS：目标平台的操作系统（darwin、freebsd、linux、windows） GOARCH：目标平台的体系架构（386、amd64、arm） 交叉编译不支持 CGO 所以要禁用它

> [!Warning]
> go1.17 发现直接使用set 是不起作用的， 必须要使用go env -w 来设置
> 

---
- buildmode
```
go help buildmode
The 'go build' and 'go install' commands take a -buildmode argument which
indicates which kind of object file is to be built. Currently supported values
are:

        -buildmode=archive
                Build the listed non-main packages into .a files. Packages named
                main are ignored.

        -buildmode=c-archive
                Build the listed main package, plus all packages it imports,
                into a C archive file. The only callable symbols will be those
                functions exported using a cgo //export comment. Requires
                exactly one main package to be listed.

        -buildmode=c-shared
                Build the listed main package, plus all packages it imports,
                into a C shared library. The only callable symbols will
                be those functions exported using a cgo //export comment.
                Requires exactly one main package to be listed.

        -buildmode=default
                Listed main packages are built into executables and listed
                non-main packages are built into .a files (the default
                behavior).

        -buildmode=shared
                Combine all the listed non-main packages into a single shared
                library that will be used when building with the -linkshared
                option. Packages named main are ignored.

        -buildmode=exe
                Build the listed main packages and everything they import into
                executables. Packages not named main are ignored.

        -buildmode=pie
                Build the listed main packages and everything they import into
                position independent executables (PIE). Packages not named
                main are ignored.

        -buildmode=plugin
                Build the listed main packages, plus all packages that they
                import, into a Go plugin. Packages not named main are ignored.

On AIX, when linking a C program that uses a Go archive built with
-buildmode=c-archive, you must pass -Wl,-bnoobjreorder to the C compiler.
```