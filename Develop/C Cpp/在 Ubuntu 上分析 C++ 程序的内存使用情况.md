在 Ubuntu 上分析 C++ 程序的内存使用情况，有几种工具可以推荐：

1. **Valgrind**：
- Valgrind 是一个著名的内存调试和分析工具，其中的 Massif 工具可以用来分析程序的内存使用情况。它可以帮助你识别内存泄漏和内存使用模式。

2. **gperftools**：
- gperftools （之前称为 Google Performance Tools ）提供了一个堆分析器和 CPU 分析器。它的 `heap-profiler` 功能可以生成程序的内存分配情况的详细报告。

3. **Memcheck (Valgrind 的一部分)**：
- Memcheck 是 Valgrind 中的一个工具，专门用于检测内存泄漏、内存越界等问题。

4. **Massif (Valgrind 的一部分)**：
- Massif 是 Valgrind 工具集中的一个堆分析工具，它可以生成堆使用的图表，帮助你理解内存使用情况。

5. **GCC/g++ 的 `-ftime-report` 选项**：
- 编译时加上 `-ftime-report` 选项，GCC 会在编译结束后输出程序的时间消耗报告，其中包含了一些内存使用信息。

6. **Clang 的 `-fsanitize=memory` 选项**：
- 使用 Clang 编译器的内存 sanitizer 可以帮助检测内存泄漏和越界问题。

7. **KCachegrind**：
- KCachegrind 是一个图形化的分析器，可以读取 Callgrind 工具生成的文件，它提供了一个直观的界面来查看程序的性能数据。

8. **Callgrind (Valgrind 的一部分)**：
- Callgrind 是 Valgrind 工具集中的一个分析工具，它可以生成程序调用的详细报告，包括函数级别的内存分配情况。

9. **Brendan Gregg's "Memory Profiler"**：
- 这是一个简单的工具，可以监控程序的内存使用情况，并且生成火焰图。

10. **perf**：
- `perf` 是 Linux 内核提供的性能分析工具，它也可以用来分析内存访问模式。

使用这些工具时，您可能需要对程序进行编译，以便包含额外的调试信息，例如使用 `-g` 选项。然后，运行相应的分析工具，并根据生成的报告来识别内存使用问题。

例如，使用 Valgrind 的基本命令如下：

```shell
valgrind --tool=massif ./your_program
```

这将启动 Massif 并分析 `your_program` 的内存使用情况。分析完成后，Valgrind 会显示内存使用图表和数据。