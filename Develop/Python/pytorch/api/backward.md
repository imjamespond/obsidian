https://pytorch.org/docs/stable/generated/torch.Tensor.backward.html
# TORCH.TENSOR.BACKWARD[](https://pytorch.org/docs/stable/generated/torch.Tensor.backward.html#torch-tensor-backward)

Tensor.backward(_gradient=None_, _retain_graph=None_, _create_graph=False_, _inputs=None_)[[source]](https://pytorch.org/docs/stable/_modules/torch/_tensor.html#Tensor.backward)[](https://pytorch.org/docs/stable/generated/torch.Tensor.backward.html#torch.Tensor.backward)

Computes the gradient of current tensor wrt graph leaves.计算当前梯度

The graph is differentiated using the chain rule. If the tensor is non-scalar (i.e. its data has more than one element) and requires gradient, the function additionally requires specifying `gradient`. It should be a tensor of matching type and location, that contains the gradient of the differentiated function w.r.t. `self`.
该图使用链式法则进行微分。 如果==张量是非标量==（即其数据具有多个元素）==并且需要梯度==，则该函数还需要==指定梯度==。 它应该是类型和位置匹配的张量，其中包含微分函数的梯度。 自己。

This function accumulates gradients in the leaves - you might need to zero `.grad` attributes or set them to `None` before calling it. See [Default gradient layouts](https://pytorch.org/docs/stable/autograd.html#default-grad-layouts) for details on the memory layout of accumulated gradients.


> [!NOTE]
> 
> If you run any forward ops, create `gradient`, and/or call `backward` in a user-specified CUDA stream context, see [Stream semantics of backward passes](https://pytorch.org/docs/stable/notes/cuda.html#bwd-cuda-stream-semantics).


> [!NOTE]
> 
> When `inputs` are provided and a given input is not a leaf, the current implementation will call its grad_fn (though it is not strictly needed to get this gradients). It is an implementation detail on which the user should not rely. See [https://github.com/pytorch/pytorch/pull/60521#issuecomment-867061780](https://github.com/pytorch/pytorch/pull/60521#issuecomment-867061780) for more details.

Parameters

- **gradient** ([_Tensor_](https://pytorch.org/docs/stable/tensors.html#torch.Tensor "torch.Tensor") _or_ _None_) – Gradient w.r.t. the tensor. If it is a tensor, it will be automatically converted to a Tensor that does not require grad unless `create_graph` is True. None values can be specified for scalar Tensors or ones that don’t require grad. If a None value would be acceptable then this argument is optional.
    
- **retain_graph** ([_bool_](https://docs.python.org/3/library/functions.html#bool "(in Python v3.12)")_,_ _optional_) – If `False`, the graph used to compute the grads will be freed. Note that in nearly all cases setting this option to True is not needed and often can be worked around in a much more efficient way. Defaults to the value of `create_graph`.
    
- **create_graph** ([_bool_](https://docs.python.org/3/library/functions.html#bool "(in Python v3.12)")_,_ _optional_) – If `True`, graph of the derivative will be constructed, allowing to compute higher order derivative products. Defaults to `False`.
    
- **inputs** (_sequence_ _of_ [_Tensor_](https://pytorch.org/docs/stable/tensors.html#torch.Tensor "torch.Tensor")) – Inputs w.r.t. which the gradient will be accumulated into `.grad`. All other Tensors will be ignored. If not provided, the gradient is accumulated into all the leaf Tensors that were used to compute the attr::tensors.