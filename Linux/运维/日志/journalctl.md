
```
journalctl --disk-usage

journalctl --vacuum-time=1d 清除只剩一天
journalctl --vacuum-size=100M
```

查看service日志
```
systemctl status docker.service
journalctl -u docker.service -b
```

error
```
journalctl -xe
```