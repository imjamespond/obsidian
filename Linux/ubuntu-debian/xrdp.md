https://developer.aliyun.com/article/1490946
```
apt install xrdp

systemctl enable --now xrdp
systemctl status xrdp --no-pager -l

# 否则白屏
/sbin/adduser xrdp ssl-cert

systemctl restart xrdp
```

如果没开3389可通过tunnel连进去，输入root、pwd登录