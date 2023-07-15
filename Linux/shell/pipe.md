```bash
cat>test<<EOF
这是一个由shell创建的文件
this is a file created by shell.
we want to make a good world.
EOF
```
其中，<<EOF 表示当遇到EOF时结束输入，**cat>test<<EOF** 这中间没有空格。  
另外生成文件名和EOF中的内容，均支持变量。  
注意：此方法是覆盖test文件，如果想追加写入test文件，可使用 **cat>>test<<EOF** 方式

--- 

https://blog.csdn.net/olizxq/article/details/81263867

6、参数代换：xargs
功能：
xargs 是在做什么的呢？就以字面上的意义来看， x 是加减乘除的乘号，args 则是 arguments (参数) 的意思，所以说，这个玩意儿就是在产生某个命令的参数的意思！ xargs 可以读入 stdin 的数据，并且以空格符或断行字符作为分辨，将 stdin 的数据分隔成为 arguments 。 因为是以空格符作为分隔，所以，如果有一些档名或者是其他意义的名词内含有空格符的时候， xargs 可能就会误判了。

格式：
xargs [-0epn] command
选项与参数：
-0 ：如果输入的 stdin 含有特殊字符，例如 `, , 空格键等等字符时，这个 -0 参数可以将他还原成一般字符。这个参数可以用于特殊状态喔！
-e ：这个是 EOF (end of file) 的意思。后面可以接一个字符串，当 xargs 分析到这个字符串时，就会停止继续工作！
-p ：在运行每个命令的 argument 时，都会询问使用者的意思；
-n ：后面接次数，每次 command命令运行时，要使用几个参数的意思。看范例三。
当 xargs 后面没有接任何的命令时，默认是以 echo 来进行输出喔！

举例：
```
范例一：将 /etc/passwd 内的第一栏取出，仅取三行，使用 finger 这个命令将每个账号内容秀出来
>> cut -d':' -f1 /etc/passwd |head -n 3| xargs finger
Login: root                             Name: root
Directory: /root                        Shell: /bin/bash
Never logged in.
No mail.
No Plan.
......底下省略.....
# 由 finger account 可以取得该账号的相关说明内容，例如上面的输出就是 finger root
# 后的结果。在这个例子当中，我们利用 cut 取出账号名称，用 head 取出三个账号，
# 最后则是由 xargs 将三个账号的名称变成 finger 后面需要的参数！

范例二：同上，但是每次运行 finger 时，都要询问使用者是否动作？
>> cut -d':' -f1 /etc/passwd |head -n 3| xargs -p finger
finger root bin daemon ?...y
.....(底下省略)....
# 呵呵！这个 -p 的选项可以让用户的使用过程中，被询问到每个命令是否运行！

范例三：将所有的 /etc/passwd 内的账号都以 finger 查阅，但一次仅查阅五个账号
>> cut -d':' -f1 /etc/passwd | xargs -p -n 5 finger
finger root bin daemon adm lp ?...y
.....(中间省略)....
finger uucp operator games gopher ftp ?...y
.....(底下省略)....
# 在这里鸟哥使用了 -p 这个参数来让您对于 -n 更有概念。一般来说，某些命令后面
# 可以接的 arguments 是有限制的，不能无限制的累加，此时，我们可以利用 -n
# 来帮助我们将参数分成数个部分，每个部分分别再以命令来运行！这样就 OK 啦！^_^

范例四：同上，但是当分析到 lp 就结束这串命令？
>> cut -d':' -f1 /etc/passwd | xargs -p -e'lp' finger
finger root bin daemon adm ?...
# 仔细与上面的案例做比较。也同时注意，那个 -e'lp' 是连在一起的，中间没有空格键。
# 上个例子当中，第五个参数是 lp 啊，那么我们下达 -e'lp' 后，则分析到 lp
# 这个字符串时，后面的其他 stdin 的内容就会被 xargs 舍弃掉了！
————————————————
版权声明：本文为CSDN博主「简之」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/olizxq/article/details/81263867
```
使用xargs的原因是，很多命令其实并不支持管道命令，因此我们可以通过xargs来提供该命令引用standard input之用：
```
范例五：找出 /sbin 底下具有特殊权限的档名，并使用 ls -l 列出详细属性
>> find /sbin -perm +7000 | ls -l
# 结果竟然仅有列出 root 所在目录下的文件！这不是我们要的！
# 因为 ll (ls) 并不是管线命令的原因啊！

>> find /sbin -perm +7000 | xargs ls -l
-rwsr-xr-x 1 root root 70420 May 25  2008 /sbin/mount.nfs
-rwsr-xr-x 1 root root 70424 May 25  2008 /sbin/mount.nfs4
-rwxr-sr-x 1 root root  5920 Jun 15  2008 /sbin/netreport
....(底下省略)....
```


#### 7、关于减号-的用途

功能：  
在管道命令中，经常会用到前一个命令的stdout作为这次的stdin，某些命令需要用到文件名来进行处理时，该stdin与stdout可以利用减号“-”来替代。

```
tar -cvf - /home | tar -xvf -
```