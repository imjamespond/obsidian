### enumerate()说明

enumerate()是python的内置函数  
enumerate在字典上是枚举、列举的意思  
对于一个可迭代的（iterable）/可遍历的对象（如列表、字符串），enumerate将其组成一个索引序列，利用它可以同时获得索引和值  
enumerate多用于在for循环中得到计数  
例如对于一个seq，得到：

```python
(0, seq[0]), (1, seq[1]), (2, seq[2])
```

enumerate()返回的是一个enumerate对象，例如：

```python
In[1]: enumerate(identities)
Out[1]:<enumerate at 0x7f06897b8870>
```

### enumerate()使用

```python
list1 = ["这", "是", "一个", "测试"]
for index, item in enumerate(list1):
    print index, item
>>>
0 这
1 是
2 一个
3 测试
```

指定起始位置:

```python
list1 = ["这", "是", "一个", "测试"]
for index, item in enumerate(list1, 1):
    print index, item
>>>
1 这
2 是
3 一个
4 测试
```

### 补充

如果要统计文件的行数，可以这样写：

```python
count = len(open(filepath, 'r').readlines())
```

这种方法简单，但是可能比较慢，当文件比较大时甚至不能工作。

可以利用enumerate()：

```python
count = 0
for index, line in enumerate(open(filepath,'r'))： 
    count += 1
```

  
  
作者：GA_17  
链接：https://www.jianshu.com/p/a4bd3d44dd88  
来源：简书  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

--- 
- 如果对一个列表，既要遍历索引又要遍历元素时，首先可以这样写：
```python
list1 = ["这", "是", "一个", "测试"]
for i in range (len(list1)):
    print i ,list1[i]
```

==这样没有索引==
```python
for letter in 'Python':     # 第一个实例
   print("当前字母: %s" % letter)
 
fruits = ['banana', 'apple',  'mango']
for fruit in fruits:        # 第二个实例
   print ('当前水果: %s'% fruit)

```