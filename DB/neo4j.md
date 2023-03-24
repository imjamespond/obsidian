1.  聚合查找关系最多的5个城市，列出其所有关系 与相关结点，with将第一次结果传递到第二次查询

```
MATCH (n:City)--(n1) with n as nn,count(*) as num order by num desc LIMIT 5
Match (nn)--(nn1) return nn, nn1
```


(nn)-[r]-(nn1) 包括关系

(nn)-[r]-->(nn1) 包括关系方向