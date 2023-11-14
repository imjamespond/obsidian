- ## check if a point is inside a triangle
px,py is inside xa,ya;xb,yb;xc,yc, xa < xb < xc, minx = xa, maxx = xc
`if (px > minx && px< maxx ) `==只能判断在矩形内==

## 面积法

### 内角和
此法直观，但效率低下。

### 同向法
![[Pasted image 20231114214421.png]]
要判断==**两个点**是否在**某条线段**的**同一侧**==可以通过叉积来实现。==连接PA，将PA和AB做叉积==，==再将CA和AB做叉积==，如果两个叉积的结果方向一致，那么两个点在同一侧。

### 重心法

该方法简单易懂，==速度也快，==只是多了点==向量==运算的知识。  
在xy坐标系平面中有一个三角形ABC，P是xy平面上的任一点，如下图所示。  
![这里写图片描述](https://img-blog.csdn.net/20151105151310874)
对于平面内任意一点P，都可以由如下方程来表示:

```
AP = u*AC + v*AB （1）
其中，两个大写字母表示向量，小写字母表示标量。
```

由该方程中u、v的符号可以判断出点P与三角形ABC的位置关系。

-P位于三角形内
```
u > 0
v > 0
u + v < 1
```

-P位于三角形边上

u = 0 且 0 < v < 1 //P在AB边上
v = 0 且 0 < u < 1 //P在AC边上
u > 0 且 v > 0 且 u+v < 1 //P在AB边上

-P位于三角形顶点上

u = 0 且 v = 0     //P位于A点
u = 0 且 v = 1     //P位于B点
u = 1 且 v = 0     //P位于C点

-P位于==三角形外==
```
u<0 或 v<0 或 n+v>1
```

-u,v 的求解

记AP=(x1,y1),AC=(x2,y2),AB=(x3,y3),则代入方程（1）解得：
```
u = (x1*y3-x3*y1)/(x2*y3-x3*y2)
v = (x1*y2-x2*y1)/(x3*y2-x2*y3)
```

==或者==用向量形式进行计算(以下默认两个大写字母表示一个向量)

分别在方程（1）的左右两端==同时点乘AC、AB==，得到下式：
```
AP·AC = u*AC·AC + v*AB·AC
AP·AB = u*AC·AB + v*AB·AB
```

因为两个向量点乘后得到一个数，所以上式解得：
```
u = [（AP·AC）(AB·AB)-(AP·AB)(AB·AC)]/[(AC·AC)(AB·AB)-(AC·AB)(AB·AC)]
v = [（AP·AC）(AC·AB)-(AP·AB)(AC·AC)]/[(AB·AC)(AC·AB)-(AB·AB)(AC·AC)]
```