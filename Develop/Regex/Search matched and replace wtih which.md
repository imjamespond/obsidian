使用（）+ 【^】避免选中-I， 再通过$1，将匹配值取回实现替换
```
 -([^I])
 ,\n" -$1
```
替换前
![](img/1.png)
替换后
![](img/2.png)