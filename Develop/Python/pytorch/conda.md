**conda在指定环境下安装包：**
`$conda install -n env_name pandas` 

--- 
```shell
# 创建一个名为python34的环境，指定Python版本是3.5（不用管是3.5.x，conda会为我们自动寻找3.５.x中的最新版本）
conda create --name py35 python=3.5
```

```shell
# 安装好后，使用activate激活某个环境
activate py35 # for Windows
source activate py35 # for Linux & Mac
(py35) user@user-XPS-8920:~$
 # 激活后，会发现terminal输入的地方多了py35的字样，实际上，此时系统做的事情就是把默认2.7环境从PATH中去除，再把3.4对应的命令加入PATH

(py35) user@user-XPS-8920:~$ python --version
Python 3.5.5 :: Anaconda, Inc.
# 可以得到`Python 3.5.5 :: Anaconda, Inc.`，即系统已经切换到了3.５的环境
```

```text
# 如果想返回默认的python 2.7环境，运行
deactivate py35 # for Windows
source deactivate py35 # for Linux & Mac
```

## 删除环境

```text
# 删除一个已有的环境
conda remove --name py35 --all
```

## 查看系统中的所有环境

用户安装的不同Python环境会放在`~/anaconda/envs`目录下。查看当前系统中已经安装了哪些环境，使用`conda info -e`。

```text
user@user-XPS-8920:~$ conda info -e
# conda environments:
#
base                  *  /home/user/anaconda2
caffe                    /home/user/anaconda2/envs/caffe
py35                    /home/user/anaconda2/envs/py35
tf                       /home/user/anaconda2/envs/tf
```