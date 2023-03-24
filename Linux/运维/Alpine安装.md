https://zhuanlan.zhihu.com/p/107963371
```
setup-alpine
```

配置网络, 安装镜像的系统中也能设置保存
https://blog.csdn.net/WHQ78164/article/details/113851686
```
vi /etc/network/interfaces

auto eth1
iface eth1 inet dhcp

service networking restart
```

配置源
vi /etc/apk/repositories

安装docker
```
The Docker package is in the 'Community' repository. See Repositories how to add a repository.
apk仓库切至community
apk update
apk add docker
```

https://pkgs.alpinelinux.org/package/edge/main/x86/libseccomp