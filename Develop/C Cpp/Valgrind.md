1、Valgrind概述
Valgrind是一套Linux下，开放源代码（GPL V2）的仿真调试工具的集合。
Valgrind由内核（core）以及基于内核的其他调试工具组成。内核类似于一个框架（framework），它模拟了一个CPU环境，并提供服务给其他工具；而其他工具则类似于插件 (plug-in)，利用内核提供的服务完成各种特定的内存调试任务。
![|400](https://i-blog.csdnimg.cn/blog_migrate/594f62e99db7f4b7edfa7e4a0e1d60e3.png)
2、工具下载安装
安装：

```
1、tar –xf valgrind-3.17.0.tar.bz2
2、cd valgrind-3.17.0
3、./configure         // 运行配置脚本生成makefile文件，可以--help查看配置项，自行按需配置，比如修改编译工具、修改安装路径等
4、make
5、make install        //安装生成可执行文件，可执行文件的路径有参数--prefix指定，需要在PATH中添加环境变量；若不加参数--prefix指定，仅使用默认配置，则会自动关联

```