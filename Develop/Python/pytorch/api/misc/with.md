`with torch.no_grad():`

Python 中的 with 语句用于异常处理，封装了 try…except…finally 编码范式，提高了易用性。

**with** 语句使代码更清晰、更具可读性， 它简化了文件流等公共资源的管理。

在处理文件对象时使用 with 关键字是一种很好的做法。

我们可以看下以下几种代码实例：

不使用 **with**，也不使用 **try…except…finally**

```python
file = open('./test_runoob.txt', 'w')
file.write('hello world !')
file.close()
```

以上代码如果在调用 write 的过程中，出现了异常，则 close 方法将无法被执行，因此资源就会一直被该程序占用而无法被释放。 接下来我们呢可以使用 **try…except…finally** 来改进代码：
```python
file = open('./test_runoob.txt', 'w')
try:
    file.write('hello world')
finally:
    file.close()
```

以上代码我们对可能发生异常的代码处进行 try 捕获，发生异常时执行 except 代码块，finally 代码块是无论什么情况都会执行，所以文件会被关闭，不会因为执行异常而占用资源。

使用 **with** 关键字：
```python
with open('./test_runoob.txt', 'w') as file:
    file.write('hello world !')
```

使用 **with** 关键字系统会==自动调用 f.close()== 方法， ==with 的作用等效于 try/finally 语句是一样的==。

我们可以在执行 with 关键字后检验文件是否关闭：
```python
>>> with open('./test_runoob.txt') as f:
...     read_data = f.read()

>>> # 查看文件是否关闭
>>> f.closed
True

'''
with 语句实现原理建立在上下文管理器之上。

上下文管理器是一个实现 __enter__ 和 __exit__ 方法的类。

使用 with 语句确保在嵌套块的末尾调用 __exit__ 方法。

这个概念类似于 try...finally 块的使用。
'''
```

```python
with open('./test_runoob.txt', 'w') as my_file:
    my_file.write('hello world!')

```
以上实例将 hello world! 写到 ./test_runoob.txt 文件上。

在文件对象中定义了 `__enter__` 和 `__exit__` 方法，即文件对象也实现了上下文管理器，首先调用 `__enter__` 方法，然后执行 with 语句中的代码，最后调用 `__exit__` 方法。 ==即使出现错误，也会调用 `__exit__` 方法，也就是会关闭文件流。==

--- 
## 关于 torch.no_grad()
首先从requires_grad讲起：

requires_grad
在pytorch中，tensor有一个requires_grad参数，如果设置为True，则反向传播时，该tensor就会自动求导。tensor的requires_grad的属性默认为False,若一个节点（叶子变量：自己创建的tensor）requires_grad被设置为True，那么所有依赖它的节点requires_grad都为True（即使其他相依赖的tensor的requires_grad = False）

当requires_grad设置为False时,反向传播时就不会自动求导了，因此大大节约了显存或者说内存。

with torch.no_grad的作用
在该模块下，==所有计算得出的tensor的requires_grad都自动设置为False。==

即使一个tensor（命名为x）的requires_grad = True，在with torch.no_grad计算，由x得到的新tensor（命名为w-标量）requires_grad也为False，且grad_fn也为None,即不会对w求导。例子如下所示： 

```python
x = torch.randn(10, 5, requires_grad = True)
y = torch.randn(10, 5, requires_grad = True)
z = torch.randn(10, 5, requires_grad = True)
with torch.no_grad():
    w = x + y + z
    print(w.requires_grad)
    print(w.grad_fn)
print(w.requires_grad)


False
None
False

```