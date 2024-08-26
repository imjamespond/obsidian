
```python
import torch
arr = torch.tensor([[1,2],[3,4]])
print(arr[:, (1)]) # 所有行，取第1列
'''
tensor([2, 4])
'''
```

--- 
### TORCH.TENSOR.TYPE
Tensor.type(dtype=None, non_blocking=False, **kwargs) → str or Tensor
Returns the type if dtype is not provided, else ==casts this object to the specified type==转成指定类型.

If this is already of the correct type, no copy is performed and the original object is returned.

Parameters
- dtype (dtype or string) – The desired type

- non_blocking (bool) – If True, and the source is in pinned memory and destination is on the GPU or vice versa, the copy is performed asynchronously with respect to the host. Otherwise, the argument has no effect.

- **kwargs – For compatibility, may contain the key async in place of the non_blocking argument. The async arg is deprecated.

--- 
#### 通过[numel()](https://zhuanlan.zhihu.com/p/588104206)函数，我们可以迅速查看一个张量到底又多少元素。

1. 获取tensor中一共包含多少个元素
```
import torch
x = torch.randn(3,3)
print("number elements of x is ",x.numel())
y = torch.randn(3,10,5)
print("number elements of y is ",y.numel())
```
输出
```
number elements of x is 9
number elements of y is 150
```
