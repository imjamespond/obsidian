- yum
http://mirrors.cloud.aliyuncs.com/centos/7/os/x86_64/repodata/repomd.xml: [Errno 14] HTTP Error 404 - Not Found Trying other mirror.
出现该问题可能有以下原因：
1, CentOS 6/8的源地址内容已移除：CentOS 6与CentOS 8操作系统结束了生命周期（EOL）
[解决](https://help.aliyun.com/zh/ecs/support/the-yum-command-fails-with-the-http-error-404-not-found-trying-other-mirror-prompt)将CentOS默认Base源更换为阿里Base源
`mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup`
`wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo`


