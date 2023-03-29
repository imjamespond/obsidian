- 开启crontabl日志
```shell
# 取消注释
cron.* /var/log/cron.log
#重启日志服务
/etc/init.d/rsyslog restart
#查看日志信息
tail -f /var/log/cron.log
```