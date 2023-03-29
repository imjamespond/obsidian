- 常用
```shell
*/3 * * * * netstat -plant|grep CLOSE_WAIT|awk '{ split($7,cols,"/"); print cols[1]}'| xargs kill -9
0 3 * * * find /run/docker/libcontainerd/ -regex ".*-std\(out\|err\|in\)"|xargs -n 9 rm -rf

@reboot su test -c 'screen -dm ~/shell/tunnel-remote.sh git@git 2222 22'
```
--- 

- 从nano切至vi
`EDITOR=vim.tiny crontab -e`

--- 
crontab -e
保存即可。

```
string             meaning
------           -----------
@reboot       Run once, at startup.
@yearly       Run once a year, "0 0 1 1 *".
@annually     (same as @yearly)
@monthly      Run once a month, "0 0 1 * *".
@weekly       Run once a week, "0 0 * * 0".
@daily        Run once a day, "0 0 * * *".
@midnight     (same as @daily)
@hourly       Run once an hour, "0 * * * *".
```

配置完成后，会在开机后进行启动，如果需要延时启动，可以参考：  
`@reboot sleep 300 && /home/start.sh`  
<font size="1">如果是系统自带命令任务，@reboot不一定会执行，由于系统开机初始化，很有可能系统自带命令运行环境并不满足，但crontab已经开始执行@reboot，从而造成命令运行失败。</font>

---
秒级控制
```
*/1 * * * * /bin/date >>/tmp/date.txt
*/1 * * * * sleep 5  ; /bin/date >>/tmp/date.txt
*/1 * * * * sleep 10 ; /bin/date >>/tmp/date.txt
...
```