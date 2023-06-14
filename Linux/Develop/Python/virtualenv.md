打包
```
--no-site-packages 令隔离环境不能访问系统全局的site-packages目录。
-p PYTHON_EXE, --python=PYTHON_EXE 指定所用的python解析器的版本，比如 --python=python2.5 就使用2.5版本的解析器创建新的隔离环境。 默认使用的是当前系统安装(/usr/bin/python)的python解析器

pip install virtualenv
virtualenv venv -p /Library/Frameworks/Python.framework/Versions/3.6/bin/python3 
source bin/activate
pip install -i https://mirrors.aliyun.com/pypi/simple/ tensorflow==1.2

直接压缩生成的venv文件夹：
tar -zcvf venv.tar.gz ./venv
然后拷贝迁移至其他服务器下进行解压：
进入./venv/bin/下修改activate文件中参数：
VIRTUAL_ENV="新环境的绝对路径"
export VIRTUAL_ENV
```
