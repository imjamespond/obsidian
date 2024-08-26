# 线性回归的从零开始实现
## 生成数据集

为了简单起见，我们将\[**根据带有噪声的线性模型构造一个人造数据集。**]
我们的任务是使用这个有限样本的数据集来恢复这个模型的参数。
我们将使用低维数据，这样可以很容易地将其可视化。
在下面的代码中，我们生成一个包含==1000个样本==的数据集，
每个样本包含从标准正态分布中采样的==2个特征==。
我们的合成数据集是一个矩阵$\mathbf{X}\in \mathbb{R}^{1000 \times 2}$。

(**我们使用==线性模型参数==$\mathbf{w} = [2, -3.4]^\top$、$b = 4.2$和噪声项$\epsilon$生成数据集及其标签：**
$$\mathbf{y}= \mathbf{X} \mathbf{w} + b + \mathbf\epsilon.$$)

$\epsilon$可以视为模型预测和标签时的潜在观测误差。
在这里我们认为标准假设成立，即$\epsilon$服从均值为0的正态分布。
为了简化问题，我们将==标准差设为0.01==。
下面的代码生成合成数据集。
```python
def synthetic_data(w, b, num_examples):  #@save
    """生成y=Xw+b+噪声"""
    X = torch.normal(0, 1, (num_examples, len(w))) # 1000行2列，每行2个输入参数和w一样
    y = torch.matmul(X, w) + b
    y += torch.normal(0, 0.01, y.shape) # 产生误差？
    print('y',y[0])
    return X, y.reshape((-1, 1)) # n行1列，[[y1]...[y1000]]

true_w = torch.tensor([2, -3.4])
true_b = 4.2
features, labels = synthetic_data(true_w, true_b, 1000)
```
X = torch.normal(mean=0, std=1, ==size==\=(1000, 2)), 1000组(行)数据，X 列和w一样为2，std=1输入参数产生区别
torch.matmul(X, w) + b，行1000列2 × 行2， y的shape为1000
torch.normal(0, 0.01, y.shape)==标准差设为0.01==。结果产生误差





## 定义模型
接下来，我们必须\[**定义模型，将模型的==输入==和==参数==同模型的==输出==关联起来。**]
回想一下，要计算线性模型的==输出==，
我们只需计算==输入特征$\mathbf{X}$==和==模型权重$\mathbf{w}$==的矩阵-向量乘法后加上偏置$b$。
注意，上面的$\mathbf{Xw}$是一个向量，而$b$是一个标量。
回想一下 :numref:`subsec_broadcasting`中描述的广播机制：
当我们用一个向量加一个标量时，标量会被加到向量的每个分量上。
```python
def linreg(X, w, b):  #@save
    """线性回归模型"""
    return torch.matmul(X, w) + b # 10行1列
```
## **定义损失函数**
因为需要计算损失函数的梯度，所以我们应该先定义损失函数。
这里我们使用 :numref:`sec_linear_regression`中描述的平方损失函数。
在实现中，我们需要将==真实值`y`==的形状转换为和==预测值`y_hat`==的形状相同。
```python
def squared_loss(y_hat, y):  #@save
    """均方损失""" # y 10行1列
    return (y_hat - y.reshape(y_hat.shape)) ** 2 / 2
```
## (**定义优化算法**)

正如我们在 :numref:`sec_linear_regression`中讨论的，线性回归有解析解。
尽管线性回归有解析解，但本书中的其他模型却没有。
这里我们介绍小批量随机梯度下降。

在每一步中，使用从数据集中随机抽取的一个小批量，然后根据参数计算损失的梯度。
接下来，朝着减少损失的方向更新我们的参数。
下面的函数实现小批量随机梯度下降更新。
该函数接受模型参数集合、学习速率和批量大小作为输入。==每==
==一步更新的大小==由==学习速率`lr`决定==。
因为我们计算的==损失==是一个批量==样本的总和==，所以我们用批量大小（`batch_size`）
来规范化步长，这样步长大小就不会取决于我们对批量大小的选择。
```python
def sgd(params, lr, batch_size):  #@save
    """小批量随机梯度下降"""
    with torch.no_grad():
        for param in params:
            param -= lr * param.grad / batch_size
            param.grad.zero_()
```



## 训练

现在我们已经准备好了模型训练所有需要的要素，可以实现主要的\[**训练过程**]部分了。
理解这段代码至关重要，因为从事深度学习后，
相同的训练过程几乎一遍又一遍地出现。
在每次迭代中，我们读取一小批量训练样本，并通过我们的模型来获得一组预测。
计算完损失后，我们开始反向传播，存储每个参数的梯度。
最后，我们调用优化算法`sgd`来更新模型参数。

概括一下，我们将执行以下循环：

* 初始化参数
* 重复以下训练，直到完成
    * 计算梯度$\mathbf{g} \leftarrow \partial_{(\mathbf{w},b)} \frac{1}{|\mathcal{B}|} \sum_{i \in \mathcal{B}} l(\mathbf{x}^{(i)}, y^{(i)}, \mathbf{w}, b)$
    * 更新参数$(\mathbf{w}, b) \leftarrow (\mathbf{w}, b) - \eta \mathbf{g}$

在每个*迭代周期*（epoch）中，我们使用`data_iter`函数遍历整个数据集，
并将训练数据集中所有样本都使用一次（假设样本数能够被批量大小整除）。
这里的迭代周期个数`num_epochs`和学习率`lr`都是超参数，分别设为3和0.03。
设置超参数很棘手，需要通过反复试验进行调整。
我们现在忽略这些细节，以后会在 :numref:`chap_optimization`中详细介绍。
```python
lr = 0.03
num_epochs = 3
net = linreg
loss = squared_loss


for epoch in range(num_epochs):
    for X, y in data_iter(batch_size, features, labels):
        l = loss(net(X, w, b), y)  # X和y的小批量损失
        # 因为l形状是(batch_size,1)，而不是一个标量。l中的所有元素被加到一起，
        # 并以此计算关于[w,b]的梯度
        l.sum().backward()
        sgd([w, b], lr, batch_size)  # 使用参数的梯度更新参数
    with torch.no_grad():
        train_l = loss(net(features, w, b), labels)
        print(f'epoch {epoch + 1}, loss {float(train_l.mean()):f}')
```

因为我们使用的是自己合成的数据集，所以我们知道真正的参数是什么。 因此，我们可以通过\[**比较真实参数和通过训练学到的参数来评估训练的成功程度**]。 事实上，真实参数和通过训练学到的参数确实非常接近。

