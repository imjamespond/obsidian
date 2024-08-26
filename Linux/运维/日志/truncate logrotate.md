## truncate 命令清空日志文件
```shell
truncate -s 0 /var/log/**/*.log 
  -c, --no-create        do not create any files
  -o, --io-blocks        treat SIZE as number of IO blocks instead of bytes
  -r, --reference=RFILE  base size on RFILE
  -s, --size=SIZE        set or adjust the file size by SIZE bytes
      --help     display this help and exit
      --version  output version information and exit
```

---

### 配置文件 `/etc/logrotate.conf`
包含目录include /etc/logrotate.d  
```shell
cat /etc/logrotate.d/rsyslog 

/var/log/syslog
/var/log/mail.info
/var/log/mail.warn
/var/log/mail.err
/var/log/mail.log
/var/log/daemon.log
/var/log/kern.log
/var/log/auth.log
/var/log/user.log
/var/log/lpr.log
/var/log/cron.log
/var/log/debug
/var/log/messages
{
        rotate 4
        weekly
        missingok
        notifempty
        compress
        delaycompress
        sharedscripts
        postrotate
                /usr/lib/rsyslog/rsyslog-rotate
        endscript
}
```
- delaycompress, 第一个不压缩
- 每周生成

logrotate 是怎么做到滚动日志时不影响程序正常的日志输出呢？logrotate 提供了两种解决方案。 1. create 2. copytruncate
一个典型的配置文件如下：
```shell
/var/log/log_file {
    monthly
    rotate 5
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        /usr/bin/killall -HUP rsyslogd
    endscript
}
```
-   monthly: 日志文件将==按月轮循==。其它可用值为`daily`，`weekly`或者`yearly`。
-   rotate 5: 一次将==存储 5 个归档日志==。对于第六个归档，时间==最久的归档将被删除==。
-   compress: 在轮循任务完成后，已轮循的归档将使用 gzip 进行压缩。
-   delaycompress: 总是与 compress 选项一起用，delaycompress 选项指示 logrotate 不要将最近的归档压缩，压缩 将在下一次轮循周期进行。这在你或任何软件仍然需要读取最新归档时很有用。
-   missingok: 在日志轮循期间，任何错误将被忽略，例如 “文件无法找到” 之类的错误。
-   notifempty: 如果日志文件为空，轮循不会进行。
-   create 644 root root: ==以指定的权限创建==全新的日志文件，同时 logrotate 也会重命名原始日志文件。
-   postrotate/endscript: 在所有==其它指令完成后==，postrotate 和 endscript 里面指定的命令将被执行。在这种情况下，rsyslogd 进程将立即再次读取其配置并继续运行。

```text
/var/log/log_file {
    size=50M
    rotate 5
    dateext
    create 644 root root
    postrotate
        /usr/bin/killall -HUP rsyslogd
    endscript
}
```
在上面的配置文件中，我们只想要轮询一个日志文件，size=50M 指定日志文件大小可以==增长到 50MB==, dateext 指 示让旧日志文件以==创建日期命名。==

> 常见配置参数  
-   daily ：指定转储周期为每天
-   weekly ：指定转储周期为每周
-   monthly ：指定转储周期为每月
-   rotate count ：指定日志文件删除之前转储的次数，0 指没有备份，==5 指保留 5 个备份==
-   tabooext [+] list：让 logrotate 不转储指定扩展名的文件，缺省的扩展名是：.rpm-orig, .rpmsave, v, 和～
-   missingok：在日志轮循期间，任何错误将被忽略，例如 “文件无法找到” 之类的错误。
-   size size：当日志文件到达指定的大小时才转储，bytes (缺省) 及 KB (sizek) 或 MB (sizem)
-   compress： 通过 gzip 压缩转储以后的日志
-   nocompress： 不压缩
-   copytruncate：用于还在打开中的日志文件，把当前日志备份并截断
-   nocopytruncate： 备份日志文件但是不截断
-   create mode owner group ： 转储文件，使用指定的文件模式创建新的日志文件
-   nocreate： 不建立新的日志文件
-   delaycompress： 和 compress 一起使用时，转储的日志文件到下一次转储时才压缩
-   nodelaycompress： 覆盖 delaycompress 选项，转储同时压缩。
-   errors address ： 专储时的错误信息发送到指定的 Email 地址
-   ifempty ：即使是空文件也转储，这个是 logrotate 的缺省选项。
-   notifempty ：如果是空文件的话，不转储
-   mail address ： 把转储的日志文件发送到指定的 E-mail 地址
-   nomail ： 转储时不发送日志文件
-   olddir directory：储后的日志文件放入指定的目录，必须和当前日志文件在同一个文件系统
-   noolddir： 转储后的日志文件和当前日志文件放在同一个目录下
-   prerotate/endscript： 在转储以前需要执行的命令可以放入这个对，这两个关键字必须单独成行


