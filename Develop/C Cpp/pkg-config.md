
2. PKG_CONFIG_PATH

　　pkg-config 默认会搜索 /usr/lib/pkgconfig 和/usr/share/pkgconfig下的 .pc 配置文件，若我们源码编译的库的路径不在 pkg-config 的搜索路径下，则可以通过环境变量 PKG_CONFIG_PATH 将自定义的路径添加到 pkg-config 的搜索路径。

export PKG_CONFIG_PATH=/your/path:$PKG_CONFIG_PATH