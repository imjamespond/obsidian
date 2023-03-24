
```
journalctl --disk-usage

journalctl --vacuum-time=1d
journalctl --vacuum-size=100M
```

查看service日志
```
systemctl status docker.service
journalctl -u docker.service -b
```
