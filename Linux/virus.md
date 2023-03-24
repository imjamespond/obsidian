https://blog.51cto.com/zhuxingye/1735794
Linux下10个随机字符进程名病毒的处理
```
vi  /etc/crontab
*/3 * * * * root /etc/cron.hourly/gcc.sh

cp /lib/libudev.so

不要直接殺掉程序，否則會再產生，而是停止其運作。
 kill -STOP 

查找进程位置
ll /proc/????/exe 
```