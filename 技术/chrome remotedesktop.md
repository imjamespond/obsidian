每次到 https://remotedesktop.google.com/headless 刷新一下key
```bash
 DISPLAY= /opt/google/chrome-remote-desktop/start-host --code="..............." --redirect-url="https://remotedesktop.google.com/_/oauthredirect" --name=$(hostname) --user-name=chrome
```
username 为新创建一个非root用户
加sudoer
```bash
/usr/sbin/useradd -m chrome
/usr/sbin/usermod -aG sudo chrome
```

启动参数
```bash
chrome --window-size=800,600 --window-position=0,0
```
 