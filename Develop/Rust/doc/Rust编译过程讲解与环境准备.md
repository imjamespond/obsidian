https://zhuanlan.zhihu.com/p/679407589
### 1.了解编译过程

目前主流编译平台有，GNU、MSVC、LLVM。因为rustc调用了llvm，因此我们以LLVM为例，我们从C语言的编译过程聊，再对比Rust，看它们的编译过程有何差异。

![](https://pic4.zhimg.com/80/v2-202d54b24d00be069990e951e0ae9e87_1440w.webp)

LLVM架构图

clang下载链接： [https://releases.llvm.org/download.html](https://link.zhihu.com/?target=https%3A//releases.llvm.org/download.html)

```text
# 保存编译过程中的临时文件
$ clang -save-temps hello.c 
# 打印编译阶段
$ clang -ccc-print-phases hello.c
            +- 0: input, "hello.c", c -----------> hello.c >
         +- 1: preprocessor, {0}, cpp-output ----> hello.i
      +- 2: compiler, {1}, ir -------------------> hello.bc
   +- 3: backend, {2}, assembler ----------------> hello.s
+- 4: assembler, {3}, object --------------------> hello.o
5: linker, {4}, image ---------------------------> a.exe
```

### 第一步：预处理

输入是hello.c，输出是hello.i

```c
#include <stdio.h>
int main() {
    printf("Hello World!\n");
    return 0;
}
# 等价的gcc指令：gcc -E hello.c -o hello.i
$clang -E -c hello.c -o hello.i
# 查看.i文件内容
$cat hello.i
  __attribute__((__format__ (scanf, 2, 0))) __attribute__ ((__nonnull__ (2)))
...
# 1650 "D:/usr/msys2/clang64/include/stdio.h" 2 3
# 2 "hello.c" 2
int main() {
    printf("Hello World!\n");
    return 0;
}
```

将.i 文件导出为LLVM IR后以备下一步使用

```text
clang -emit-llvm hello.i -c -o hello.bc # 导出二进制的LLVM IR
clang -emit-llvm hello.c -S -o hello.ll # 导出文本类型的LLVM IR
```

### 第二部：编译

将预处理完的文件进行一些列的词法分析、语法分析、语义分析和优化后生成的汇编指令代码。 这一步我们就可以使用LLVM的llc命令对上一步的IR文件编译了。

```objdump-nasm
# 等价的gcc指令：gcc -S hello.i -o hello.s
$llc hello.ll -o hello.s
$ cat hello.s
        .text
        .def    @feat.00;
        .scl    3;
        .type   0;
        .endef
        .globl  @feat.00
.set @feat.00, 0
        .file   "hello.c"
        .def    main;
        .scl    2;
        .type   32;
        .endef
        .globl  main                            # -- Begin function main
        .p2align        4, 0x90
main:                                   # @main
.seh_proc main
# %bb.0:
        pushq   %rbp
        .seh_pushreg %rbp
        subq    $48, %rsp
        .seh_stackalloc 48
        leaq    48(%rsp), %rbp
        .seh_setframe %rbp, 48
        .seh_endprologue
        callq   __main
        movl    $0, -4(%rbp)
        leaq    .L.str(%rip), %rcx
        callq   printf
        xorl    %eax, %eax
        addq    $48, %rsp
        popq    %rbp
        retq
        .seh_endproc
                                        # -- End function
        .section        .rdata,"dr"
.L.str:                                 # @.str
        .asciz  "Hello\302\240World!\n"
```

### 第三步：汇编

把汇编代码转变成机器可以执行的指令，过程相对编译阶段简单，没有复杂的语法，也不需要优化，只需要对照汇编指令和机器指令对照表一一翻译即可。

```text
#等价的gcc指令：gcc -c add.s -o add.o
clang -fmodules -c hello.s -o hello.o
```

### 第四步：链接

目标文件和依赖的库 打包成一个可执行文件

```text
clang hello.o -o hello
```

链接分为静态链接和动态链接。。

### 总结：

![](https://pic1.zhimg.com/80/v2-31eaae70b8233ade53c777f9e1ad5c30_1440w.webp)

到现在我们就可以回答一个问题：编译器究竟做了什么呢？

首先就是将**源码**转换为目标平台可以直接识别的**指令文件**。分为两类：**可执行文件**和**库**。 在编译最后产生的image，不同操作系统有不同的格式（这里的格式指的是文件的布局结构），在Windows通常是PE，Linux上则是ELF。

### ELF格式

现在我们得到了可执行文件，我们在思考`可执行文件`究竟是什么？ 答案就是可执行文件内包含了初始状态的进程数据。

通常可执行文件、目标文件、静态链接库（Linux的.a,Windows的.obj）和动态链接库（Linux的.so,Windows的DLL）都是ELF格式的文件

ELF文件中主要包含`程序指令`和`程序数据`

ELF的结构：

- File Header 主要包含了文件是否为可执行文件、目标硬件、目标操作系统、段表等。段表描述了各个段在文件中的偏移等信息。
- .text section 代码段
- .data section 数据段
- .bss section 未初始化的全局变量和局部静态变量，在文件中不占空间。
- ...

```text
od -x ./hello # 以16进制查看文件 
xxd -b ./hello # 以2进制查看文件 
hexdump -C ./hello # 以16进制查看文件 
file ./add # 查看文件的头信息 
ldd ./add # 查看可执行文件依赖的动态库 
objdump -h ./add # 打印ELF文件的各个段 
size ./add # 查看ELF各个段的长度 
readelf -h ./add # 查看ELF文件的信息 
clang -ccc-print-phases hello.c # 查看编译过程
```

### Rust中的编译过程

通过前面的介绍，我们知道LLVM有一个好处，就是将前端和后端通过IR中间语言隔离开了。 !

![](https://pic2.zhimg.com/80/v2-192e46577c7d298e0ee53a9f2d8ad2f1_1440w.webp)

LLVM IR

这样一来，Rust只需要实现一个前端就可以了。Rust实现的编译器就是rustc.exe，它就包含了rust前端编译器，LLVM和调用连接器。连接器后续极有可能也会使用llvm提供的连接器，目前还是使用mvsc或者GNU的连接器，这也是为什么安装Rust时，需要单独安装vs环境或者gcc环境的原因。

![](https://pic2.zhimg.com/80/v2-ff081128f6aa0806350a30ff484651ad_1440w.webp)

rustc结构

把这个过程说清楚之后，下一节我们来实践安装Rust。

### 2.安装Rust

如果你只是想体验一下Rust或者快速验证想法可以访问[https://play.rust-lang.org](https://link.zhihu.com/?target=https%3A//play.rust-lang.org/)

正式的学习和开发还是需要在你的本地安装Rust，这就用到了Rustup。

Rustup是Rust社区提供的工具链管理工具，使用Rustup来安装和管理工具链，并且可以随时切换工具链的版本。访问地址： [https://rustup.rs/](https://link.zhihu.com/?target=https%3A//rustup.rs/)

![](https://pic3.zhimg.com/80/v2-2545079699f11a133ff3088acd1b50da_1440w.webp)

本节课用到的软件可以直接通过官网下载或者加群获取：添加微信code2c，回复“加群”

### 在windows11安装Rust

这里以windows11为例，其它版本也是类似。在windows平台有两个版本可供选择：

  

[x86_64-pc-windows-gnu​static.rust-lang.org/rustup/dist/x86_64-pc-windows-gnu/rustup-init.exe](https://link.zhihu.com/?target=https%3A//static.rust-lang.org/rustup/dist/x86_64-pc-windows-gnu/rustup-init.exe)

[x86_64-pc-windows-msvc​static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe](https://link.zhihu.com/?target=https%3A//static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)

GNU 和 MSVC 都是编译器工具链，它们提供一套工具和库，这些工具和库被用来构建、链接和调试应用程序。Rust使用了它们提供的**连接器**，其实还有第三种选择就是LLVM，我认为Rust最终会在各个平台使用LLVM的**连接器**来取代目前的GNU和MSVC的地位，因为rust编译器在汇编阶段使用的就是LLVM，为了统一起来极有可能会采用LLVM的连接器，但目前这项工作还没有完成。为了获得更好的兼容性和运行效率，我们在windows平台上选择MSVC。

[https://www.rust-lang.org/zh-CN/learn/get-started](https://link.zhihu.com/?target=https%3A//www.rust-lang.org/zh-CN/learn/get-started)

下面的命令窗口提示，你的电脑缺少vc++环境（连接器和windows api库），也就是需要安装MSVC。

![](https://pic4.zhimg.com/80/v2-620a1f9c4233b9db2dfc3949ae47c667_1440w.webp)

这里我们选择第一项，他会下载vs的安装包。。。等待它下载完成。

下载完成会弹出安装弹框，点击“继续”，接下来会下载安装程序并安装vs。

![](https://pic3.zhimg.com/80/v2-e0630a89355536f4d8524a9870e7762a_1440w.webp)

msvc与windows sdk必须勾选，然后点击“安装”

![](https://pic4.zhimg.com/80/v2-ff529308e621a5175078cc264d690153_1440w.webp)

出现下面界面就说明已经安装成功了，就可以关掉了。

![](https://pic4.zhimg.com/80/v2-ff529308e621a5175078cc264d690153_1440w.webp)

关掉vs，回到cmd继续安装rust，选择第一项默认安装即可。

![](https://pic2.zhimg.com/80/v2-73ac8d3d0ba01c7a80f310be46dac875_1440w.webp)

到这一步下载工具链并设置好PATH环境变量。

![](https://pic1.zhimg.com/80/v2-80de9b80c41dc46bda4d430a04388224_1440w.webp)

当看到上面这个提示就说明已经安装完成了，最后测试rust是否安装成功

```text
# 查看rustup版本
rustup -V
# 查看工具链
rustup show
# 查看cargo版本
cargo -V
# 查看编译器版本
rustc -V
```

### 在Linux安装Rust

### Hello world

任何一门编程语言的入门都少不了Hello world，我们快速写一个helloworld程序，准备玩起来： 创建一个文件`hello.rs`

```rust
// hello.rs
fn main() {
    println!("Hello, world!");
}
```

编译并执行：

```text
$ rustc hello.rs
$ .\hello.exe # on Windows
```

接下来我们需要选择一个趁手的编辑器，目前有vim、vscode和去年jetbrains推出的RustRover，可以根据你的喜好选择。我强烈建议你试用一下RustRover，虽然它还在测试阶段。 [https://www.jetbrains.com/rust/](https://link.zhihu.com/?target=https%3A//www.jetbrains.com/rust/) ![[attach/Pasted image 20240118214914.png]]

经过上面的步骤，我们已经能愉快开发rust项目。 但是开发项目通常会有一套规范或者说最佳实践，来管理项目依赖和约定目录结构，不至于像早期c/c++每个项目都有一套自己规范。现代语言通常都有的工具，在js中有npm，java中有maven，rust同样提供了类似的工具来管理项目就是cargo。有了cargo我们就可以创建rust package，构建以及发布package到官方仓库。

下面简单演示如何使用cargo新建一个项目：

```text
$ cargo new hello_world
$ cd hello_world
$ tree .
.
├── Cargo.toml
└── src
    └── main.rs

1 directory, 2 files
```

cargo的基本知识在下一节中介绍。

### 参考和拓展

- 《程序员的自我修养》2.1小节
- [rust语言自举，为什么还需要GNU 和 MSVC？](https://link.zhihu.com/?target=https%3A//blog.csdn.net/qimablue/article/details/131290451)
- [为什么go仅仅160M的安装包就可以编译程序？而rust却还需要几个G的msvc才能编译？](https://link.zhihu.com/?target=https%3A//rustmagazine.github.io/rust_magazine_2021/chapter_5/faq.html)