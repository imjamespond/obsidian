https://stackoverflow.com/questions/6007881/what-does-the-0x-syntax-do-in-python

The `[0] * x` creates a list with `x` elements. So,

```python
>>> [ 0 ] * 5
[0, 0, 0, 0, 0]
>>> 
```

Be warned that they all point to the same object. This is cool for immutables like integers but a pain for things like lists.

```python
>>> t = [[]] * 5
>>> t
[[], [], [], [], []]
>>> t[0].append(5)
>>> t
[[5], [5], [5], [5], [5]]
>>> 
```

The `**` operator is used for exponentation.

```python
>>> 5 ** 2 
25
```