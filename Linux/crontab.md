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