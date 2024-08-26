- iter() 函数用来生成迭代器。
`for i in iter(lst):`

- next() 返回迭代器的下一个项目。
next() 函数要和生成迭代器的 iter() 函数一起使用。

- for inline 转成标签
```python
text_labels = ['t-shirt', 'trouser', 'pullover', 'dress', 'coat',
                'sandal', 'shirt', 'sneaker', 'bag', 'ankle boot']
labels = [9, 0, 0, 3, 0, 2, 7, 2, 5, 5, 0, 9, 5, 5, 7, 9, 1, 0]

print([ text_labels[i] for i in labels])
```