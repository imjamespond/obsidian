https://zhuanlan.zhihu.com/p/151649142

基于 alpha blending 的简单方式渲染

对于透明物体的渲染，简单处理方式是对透明物体 一般步骤： 

1. 先绘制不透明物体（threejs从近向远排序绘制）
2. 关闭透明材质的深度写入（depthwrite=false）
3. 打开透明材质的深度测试（depthTest=true）
4. 透明物体根据相机距离进行排序（从远向近的顺序绘制）