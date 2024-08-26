```
查看空间
df -h

# list inode information instead of block usage, 看结点信息而非区块？索引？
df -i
```

---
https://www.jianshu.com/p/42eb8c495811
inode满的问题
在满滴目录执行 ls -lR |wc -l 得到递归文件数，wc -l行计数，或find ./somewhere| wc -l 效率更高
ls -l | head -n 100 限制100行， tail -n 100后100行
ls | xargs -n 9 rm -rf ，9个文件一组删除
crontab删除
```
find /run/docker/libcontainerd/ -regex ".*-std\(out\|err\|in\)"|xargs -n 9 rm -rf
```