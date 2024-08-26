给你个 systemd 模板
把那几个空白处填上，改名 xxx.service，扔到 /etc/systemd/system 里，然后 systemctl start xxx 启动服务，systemctl enable xxx 开启自动启动


```
[Unit]
Description=
Wants=network-online.target
After=network-online.target


[Service]
ExecStart=
User=
WorkingDirectory=
Restart=on-failure
RestartSec=3
StartLimitBurst=10


[Install]
WantedBy=multi-user.target
```