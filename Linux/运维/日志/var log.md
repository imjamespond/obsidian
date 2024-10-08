清除：[[truncate logrotate]]

## /var/log
### # utmp、wtmp、btmp
Linux用户登录信息放在三个文件中：
1. /var/run/utmp：记录当前正在登录系统的用户信息，默认由==who和w==记录当前登录用户的信息，uptime记录系统启动时间；
2. /var/log/wtmp：记录当前正在登录和历史登录系统的用户信息，默认由==last==命令查看；
3. /var/log/btmp：记录===失败的登录===尝试信息，默认由==lastb==命令查看。
这三个文件都是二进制数据文件，并且三个文件结构完全相同，是由/usr/include/bits/utmp.h文件定义了这三个文件的结构体

下面开始介绍查看这三个日志文件的命令了。分别是`lastlog、last、lastb、ac、who、w、users、utmpdump`。
其中last、lastb、who、utmpdump可以通过指定参数而查看三个中的任意一个文件。
- ### lastlog
列出所有用户最近登录的信息，或者指定用户的最近登录信息
- ### last
列出==当前==和==曾经登入系统==的用户信息，它默认读取的是/var/log/wtmp文件的信息
- ### lastb
列出失败尝试的登录信息，和last命令功能完全相同，只不过它默认读取的是<font color="red">/var/log/btmp</font>文件的信息
- ### ac
输出所有用户总的连接时间，默认单位是小时。
- #### who
查看当前登入系统的用户信息。
- #### w
查看当前登入系统的用户信息及用户当前的进程
- #### users
显示当前正在登入统的用户名

- #### utmpdump
utmpdump用于转储二进制日志文件到文本格式的文件以便查看，同时也可以修改二进制文件
utmpdump <font color="#ff0000">/var/log/btmp</font> > /tmp/btmp.log
```
[6] [267280] [    ] [bms     ] [ssh:notty   ] [178.161.243.41      ] [178.161.243.41 ] [2023-03-28T04:51:29,000000+00:00]
```
1.  Type of record (`ut_type`)
2.  ===PID=== of login process (`ut_pid`)
3.  ===Terminal=== name suffix, or `inittab(5)` ID (`ut_id`)
4.  ===***Username***=== (`ut_user`)
5.  ===Device name=== or tty - "`/dev/`" (`ut_line`)
6.  Hostname for remote login, or kernel version for run-level messages (`ut_host`)
7.  Internet ***===address of remote host===*** (`ut_addr_v6`)
8.  ===Time=== entry was made (`ut_time` or actually `ut_tv.tv_sec`)

--- 
###  /var/log/secure
```shell
tail /var/log/secure
```
1. 事件的日期和时间  
2. 事件的来源主机 ( 通常是写主机名 )  
3. 产生这个事件的程序[进程号]  
4. 实际的日志信息

###  /var/log/message
```
journal: 2023-03-29_06:49:01.02740 Connection closed by 183.65.30.50 port 50834 [preauth]#015
Mar 29 14:49:01 VM_0_17_centos systemd: Started Session 2387003 of user root.
Mar 29 14:49:01 VM_0_17_centos systemd: Starting Session 2387003 of user root.
```

### auth.log
```
Mar 26 00:02:06 localhost sshd[249484]: Invalid user ravi from 8.219.167.236 port 60114
Mar 26 00:02:06 localhost sshd[249484]: pam_unix(sshd:auth): check pass; user unknown
Mar 26 00:02:06 localhost sshd[249484]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=8.219.167.236 
Mar 26 00:02:07 localhost sshd[249486]: Invalid user admin from 209.159.213.193 port 48404
Mar 26 00:02:07 localhost sshd[249486]: pam_unix(sshd:auth): check pass; user unknown
Mar 26 00:02:07 localhost sshd[249486]: pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=209.159.213.193 
Mar 26 00:02:08 localhost sshd[249484]: Failed password for invalid user ravi from 8.219.167.236 port 60114 ssh2
Mar 26 00:02:08 localhost sshd[249484]: Received disconnect from 8.219.167.236 port 60114:11: Bye Bye [preauth]
Mar 26 00:02:08 localhost sshd[249484]: Disconnected from invalid user ravi 8.219.167.236 port 60114 [preauth]
Mar 26 00:02:09 localhost sshd[249486]: Failed password for invalid user admin from 209.159.213.193 port 48404 ssh2
Mar 26 00:02:09 localhost sshd[249486]: Received disconnect from 209.159.213.193 port 48404:11: Bye Bye [preauth]
Mar 26 00:02:09 localhost sshd[249486]: Disconnected from invalid user admin 209.159.213.193 port 48404 [preauth]
```