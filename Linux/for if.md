## list cpp files
```shell
function_listcpp()
{
    for f in $1/*; do
        if [ -f $f ]&&[ `echo $f | grep -c ".cpp" ` -gt 0 ]; then
            echo `pwd`/$f
        elif [[ -d $f ]]; then
            echo "dir: " $f
            function_listcpp $f
        fi
    done
}

function_listcpp "."
```

```bash
for i in “file1” “file2” “file3”
for i in /boot/*
for i in /etc/*.conf
for i in $(seq -w 10) --》等宽的01-10
for i in {1…10}
for i in $( ls )
for I in $(< file)
for i in “$@” --》取所有位置参数，可简写为for i 

#!/bin/bash
j=$1
for ((i=1; i<=j; i++))
do
touch file$i && echo file $i is ok
done

```

$@: 所有位置变量的内容
$#: 位置变量的个数
$0: 文件名
$*: 所有位置变量的内容

---

```
-e filename 如果 filename存在，则为真 
-d filename 如果 filename为目录，则为真 
-f filename 如果 filename为常规文件，则为真 
-L filename 如果 filename为符号链接，则为真 
-r filename 如果 filename可读，则为真 
-w filename 如果 filename可写，则为真 
-x filename 如果 filename可执行，则为真 
-s filename 如果文件长度不为0，则为真 
-h filename 如果文件是软链接，则为真
```

## 二.常用的例子:

### 1.判断文件夹是否存在

```bash
#shell判断文件夹是否存在 #如果文件夹不存在，创建文件夹if [ ! -d "/myfolder" ]; then  mkdir /myfolderfi
```

### 2.判断文件夹是否存在并且是否具有可执行权限

```bash
#shell判断文件,目录是否存在或者具有权限folder="/var/www/"file="/var/www/log" # -x 参数判断 $folder 是否存在并且是否具有可执行权限if [ ! -x "$folder"]; then  mkdir "$folder"fi
```

### 3.判断文件夹是否存在

```bash
# -d 参数判断 $folder 是否存在if [ ! -d "$folder"]; then  mkdir "$folder"fi
```

### 4.判断文件是否存在

```bash
# -f 参数判断 $file 是否存在if [ ! -f "$file" ]; then  touch "$file"fi
```

### 5.判断一个变量是否有值

```bash
# -n 判断一个变量是否有值if [ ! -n "$var" ]; then  echo "$var is empty"  exit 0fi
```

### 6.判断两个变量是否相等.

```bash
# 判断两个变量是否相等if [ "$var1" = "$var2" ]; then  echo '$var1 eq $var2'else  echo '$var1 not eq $var2'fi
```