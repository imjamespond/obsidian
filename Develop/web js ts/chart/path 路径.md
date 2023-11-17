#svg #path
https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths

- 首先是“Move to”命令，M，前面已经提到过，它需要两个参数，分别是需要移动到的点的 x 轴和 y 轴的坐标
```
M x y
(or)
m dx dy
```

- 能够真正画出线的命令有三个（M 命令是移动画笔位置，但是不画线），==最常用的是“Line to”命令==，`L`，`L`需要两个参数，分别是一个点的 x 轴和 y 轴坐标，L 命令将会在当前位置和新位置（L 前面画笔所在的点）之间画一条线段。
```
L x y
(or)
l dx dy
```
另外还有两个简写命令，用来绘制水平线和垂直线。==`H`，绘制水平线。`V`，绘制垂直线。==这两个命令都只带一个参数，标明在 x 轴或 y 轴移动到的位置，因为它们都只在坐标轴的一个方向上移动。
```
H x
(or)
h dx
V y
(or)
v dy
```

- 最后，我们可以通过一个==“闭合路径命令”Z== 来简化上面的 path，`Z`命令会从当前点画一条直线到路径的起点，尽管我们不总是需要闭合路径，但是它还是经常被放到路径的最后。另外，Z 命令不用区分大小写。
```
Z
(or)
z
```
例
```html
 <path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>
```


### [贝塞尔曲线](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths#%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF)

我们从稍微复杂一点的三次贝塞尔曲线 C 入手，三次贝塞尔曲线需要定义一个点和两个控制点，所以用 C 命令创建三次贝塞尔曲线，需要设置三组坐标参数：
```
C x1 y1, x2 y2, x y
(or)
c dx1 dy1, dx2 dy2, dx dy
```

这里的==最后一个坐标 (x,y) 表示的是曲线的终点==，另外两个坐标是控制点，==(x1,y1) 是起点==的控制点，==(x2,y2) 是终点==的控制点。如果你熟悉代数或者微积分的话，会更容易理解控制点，控制点描述的是曲线起始点的斜率，曲线上各个点的斜率，是从起点斜率到终点斜率的渐变过程。（文字描述不好，维基百科上有图示，更直观。）
![Cubic Bézier Curves with grid](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/cubic_b%C3%A9zier_curves_with_grid.png)
```html
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">

  <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent"/>
  <path d="M 70 10 C 70 20, 110 20, 110 10" stroke="black" fill="transparent"/>
  <path d="M 130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent"/>
  <path d="M 10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent"/>
  <path d="M 70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent"/>
  <path d="M 130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent"/>
  <path d="M 10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent"/>
  <path d="M 70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent"/>
  <path d="M 130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent"/>

</svg>
```

上面的例子里，创建了 9 个三次贝塞尔曲线。有一点比较遗憾，标记控制点的代码会比较庞大，所以在这里舍弃了。（之前所有点都用 circle 标记，此处一样，只不过没把代码列出来）。如果你想更准确地控制它们，可以自己动手把他们画出来。图例上的曲线从左往右看，控制点在水平方向上逐渐分开，图例上的曲线从上往下看，控制点和曲线坐标之间离得越来越远。这里要注意观察，曲线沿着起点到第一控制点的方向伸出，逐渐弯曲，然后沿着第二控制点到终点的方向结束。



你可以将若干个贝塞尔曲线连起来，从而创建出一条很长的平滑曲线。通常情况下，一个点某一侧的控制点是它另一侧的控制点的对称（以保持斜率不变）。这样，你可以使用一个简写的贝塞尔曲线命令 S，如下所示：

S x2 y2, x y
(or)
s dx2 dy2, dx dy

S 命令可以用来创建与前面一样的贝塞尔曲线，但是，如果 S 命令跟在一个 C 或 S 命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。如果 S 命令单独使用，前面没有 C 或 S 命令，那当前点将作为第一个控制点。下面是 S 命令的语法示例，图中左侧红色标记的点对应的控制点即为蓝色标记点。

![A smooth S-shaped curve is drawn from two Bézier curves. The second curve keeps the same slope of the control points as the first curve, which is reflected to the other side.](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/shortcut_cubic_b%C3%A9zier_with_grid.png)

XMLCopy to Clipboard

```
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
</svg>
```

另一种可用的贝塞尔曲线是二次贝塞尔曲线 Q，它比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

Q x1 y1, x y
(or)
q dx1 dy1, dx dy

![Quadratic Bézier with grid](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/quadratic_b%C3%A9zier_with_grid.png)

XMLCopy to Clipboard

```
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
</svg>
```

就像三次贝塞尔曲线有一个 S 命令，二次贝塞尔曲线有一个差不多的 T 命令，可以通过更简短的参数，延长二次贝塞尔曲线。

T x y
(or)
t dx dy

和之前一样，快捷命令 T 会通过前一个控制点，推断出一个新的控制点。这意味着，在你的第一个控制点后面，可以只定义终点，就创建出一个相当复杂的曲线。需要注意的是，T 命令前面必须是一个 Q 命令，或者是另一个 T 命令，才能达到这种效果。如果 T 单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。

![Two quadratic curves form one smooth S-shaped curve. The second curve's control points are reflected across the horizontal axis](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/shortcut_quadratic_b%C3%A9zier_with_grid.png)

XMLCopy to Clipboard

```
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>
```

虽然三次贝塞尔曲线拥有更大的自由度，但是两种曲线能达到的效果总是差不多的。具体使用哪种曲线，通常取决于需求，以及对曲线对称性的依赖程度。

### [弧形](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths#%E5%BC%A7%E5%BD%A2)

弧形命令 A 是另一个创建 SVG 曲线的命令。基本上，弧形可以视为圆形或椭圆形的一部分。假设，已知椭圆形的长轴半径和短轴半径，并且已知两个点（在椭圆上），根据半径和两点，可以画出两个椭圆，在每个椭圆上根据两点都可以画出两种弧形。所以，仅仅根据半径和两点，可以画出四种弧形。为了保证创建的弧形唯一，A 命令需要用到比较多的参数：

 A rx ry x-axis-rotation large-arc-flag sweep-flag x y
 a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy

弧形命令 A 的前两个参数分别是 x 轴半径和 y 轴半径，它们的作用很明显，不用多做解释，如果你不是很清楚它们的作用，可以参考一下椭圆 [ellipse](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/ellipse)命令中的相同参数。弧形命令 A 的第三个参数表示弧形的旋转情况，下面的例子可以很好地解释它：

![SVGArcs_XAxisRotation_with_grid](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/svgarcs_xaxisrotation_with_grid.png)

XMLCopy to Clipboard

```
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
</svg>
```

如图例所示，画布上有一条对角线，中间有两个椭圆弧被对角线切开 (x radius = 30, y radius = 50)。第一个椭圆弧的 x-axis-rotation（x 轴旋转角度）是 0，所以弧形所在的椭圆是正置的（没有倾斜）。在第二个椭圆弧中，x-axis-rotation 设置为 -45，所以这是一个旋转了 45 度的椭圆，并以短轴为分割线，形成了两个对称的弧形。参看图示中的第二个椭圆形。

对于上图没有旋转的椭圆，只有 2 种弧形可以选择，不是 4 种，因为两点连线（也就是对角线）正好穿过了椭圆的中心。像下面这张图，就是普通的情况，可以画出两个椭圆，四种弧。

![Show the 4 arcs on the Ellipse example](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/svgarcs_xaxisrotation_with_grid_ellipses.png)

XMLCopy to Clipboard

```
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320">
  <path d="M 10 315
           L 110 215
           A 36 60 0 0 1 150.71 170.29
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
  <circle cx="150.71" cy="170.29" r="2" fill="red"/>
  <circle cx="110" cy="215" r="2" fill="red"/>
  <ellipse cx="144.931" cy="229.512" rx="36" ry="60" fill="transparent" stroke="blue"/>
  <ellipse cx="115.779" cy="155.778" rx="36" ry="60" fill="transparent" stroke="blue"/>
</svg>
```

上面提到的四种不同路径将由接下来的两个参数决定。如前所讲，还有两种可能的椭圆用来形成路径，它们给出的四种可能的路径中，有两种不同的路径。这里要讲的参数是 large-arc-flag（角度大小）和 sweep-flag（弧线方向），large-arc-flag 决定弧线是大于还是小于 180 度，0 表示小角度弧，1 表示大角度弧。sweep-flag 表示弧线的方向，0 表示从起点到终点沿逆时针画弧，1 表示从起点到终点沿顺时针画弧。下面的例子展示了这四种情况。

![Four examples are shown for each combination of large-arc-flag and sweep-flag for two circles overlapping, one in the top right, the other in the bottom left. For sweep-flag = 0, when large-arc-flag = 0, the interior arc of the top right circle is drawn, and when large-arc-flag = 1, the exterior arc of the bottom left circle is drawn. For sweep-flag = 1, when large-arc-flag = 0, the interior arc of the bottom left circle is drawn, and when large-arc-flag = 1, the exterior arc of the top right circle is drawn.](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/svgarcs_flags.png)

XMLCopy to Clipboard

```
<svg width="325" height="325" xmlns="http://www.w3.org/2000/svg">
  <path d="M 80 80
           A 45 45, 0, 0, 0, 125 125
           L 125 80 Z" fill="green"/>
  <path d="M 230 80
           A 45 45, 0, 1, 0, 275 125
           L 275 80 Z" fill="red"/>
  <path d="M 80 230
           A 45 45, 0, 0, 1, 125 275
           L 125 230 Z" fill="purple"/>
  <path d="M 230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 Z" fill="blue"/>
</svg>
```

你应该已经猜到了，最后两个参数是指定弧形的终点，弧形可以简单地创建圆形或椭圆形图标，比如你可以创建若干片弧形，组成一个_饼图_。

如果你是从 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 过渡到 SVG，那么弧形会比较难以掌握，但它也是非常强大的。用路径来绘制完整的圆或者椭圆是比较困难的，因为圆上的任意点都可以是起点同时也是终点，无数种方案可以选择，真正的路径无法定义。通过绘制连续的路径段落，也可以达到近似的效果，但使用真正的 circle 或者 ellipse 元素会更容易一些。