
sudo crontab -e
```
@reboot su test -c 'screen -dm ~/shell/tunnel-remote.sh git@git 2222 22'
```

---
https://blog.csdn.net/wonyoungsen/article/details/89560389
先按Ctrl+a键，然后释放，然后再按[键即可进入翻页模式。
切换回之前模式：Ctrl+c

ctrl+a ctrl+d脱离
---
screen -dmS somename $cmd
 启动一个开始就处于断开模式的会话
screen -X -S somename quit

----

