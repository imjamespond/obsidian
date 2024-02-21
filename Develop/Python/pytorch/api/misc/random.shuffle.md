#range #shuffle
```python
import random
indices = list(range(100)) # 0-100 array
print(indices)
random.shuffle(indices) # 打乱数组
print(indices)
num = len(indices)
for i in range(0, num, 3):
  print(indices[i: min(i+3, num)])
```
`range(start, stop[, step])`
