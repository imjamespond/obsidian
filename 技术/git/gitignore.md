https://www.v2ex.com/t/1061643#reply18

假设我的 windows 设备工作目录下有如下文件目录结构  
.gitignore  
.\a  
.\a\1.txt  
.\a\2.dll  
.\a\a1  
.\a\a1\3.txt  
.\a\a1\4.dll  
  
问题 1:  
如何设置.gitignore 让 git 只追踪 a 目录和 a\a1 目录下的所有 txt  
  
问题 2:  
如何让 git 只追踪 a 目录及所有递归子目录下的 txt 文件,但排除其它扩展名文件.
```
1  
  
a/*  
!a/*.txt  
!a/a1  
a/a1/*  
!a/a1/*.txt  
  
2  
  
a/**/*.*  
!a/**/*.txt
```