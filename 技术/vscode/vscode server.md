https://github.com/microsoft/vscode-remote-release/issues/79
- I have found a workaround until this is fixed on the VS Code side if you are behind a proxy.
Launch a normal WSL session
Make sure all of your proxy variables are set
Go to the location of the script to download the VS Code Server. This location is available by looking at the path that VS Code spits out when it errors. It should be something like /mnt/c/Users/yourname/==.vscode-insiders/extensions/ms-vscode-remote.remote-wsl-0.36.0==
Run the bash command exactly as specified in log messages, the part in the quotes after bash -c (my command was ./scripts/wslServer.sh 6964233e81c68f5a5f34e7eb1da0836e1d539f14 insider .vscode-remote  --disable-telemetry)
Allow the script to run, download, and install the VS Code Server
You can exit the server once it starts running
Try opening a WSL window from VS Code

- My solution is ==~.wgetrc== with  
use_proxy=on  
http_proxy=[http://127.0.0.1:3128](http://127.0.0.1:3128/)  
https_proxy=[http://127.0.0.1:3128](http://127.0.0.1:3128/)  
check_certificate = off

- I had the same problem and I think it was caused by the proxy of my company.
1.  I downloaded this file on Windows (can't do it from WSL on my company's devices) : [https://update.code.visualstudio.com/commit:473af338e1bd9ad4d9853933da1cd9d5d9e07dc9/server-linux-x64/insider](https://update.code.visualstudio.com/commit:473af338e1bd9ad4d9853933da1cd9d5d9e07dc9/server-linux-x64/insider)
2.  Then in the folder: `python -m http.server 12345`
3.  I edited _C:\Users\MyLogin\.vscode-insiders\extensions\ms-vscode-remote.remote-wsl-0.32.0\scripts\wslDownload.sh_  
    Changed:
```
DOWNLOAD_URL="https://update.code.visualstudio.com/commit:$COMMIT/server-linux-x64/$QUALITY"
```
By:
```
DOWNLOAD_URL="http://localhost:12345/vscode-server-linux-x64.tar.gz"
```
4.  Then executed this line on WSL : `bash -x /mnt/c/Users/MyLogin/.vscode-insiders/extensions/ms-vscode-remote.remote-wsl-0.32.0/scripts/wslServer.sh 473af338e1bd9ad4d9853933da1cd9d5d9e07dc9 insider .vscode-remote --disable-telemetry`
It now works. 😄

--- 

[国内镜像快速下载vscode server](https://blog.csdn.net/liuck/article/details/121210043)

1. 找到vs code的提交版本号：
打开远端项目时会显示setting up: downloading vs code server 之类的提示，这时在远端执行
`ps aux | grep wget `
可以看到
`wget --tries=0 --connect-timeout=7 --dns-timeout=7 --show-progress -nv -O vscode-server.tar.gz   http://update.code.visualstudio.com/commit:b3318bc0524af3d74034b8bb8a64df0ccf35549a/server-linux-x64/stable `

2. 找到真正的下载地址， 将上面的wget 移除-nv
```
wget --tries=0 --connect-timeout=7 --dns-timeout=7 --show-progress -O vscode-server.tar.gz   http://update.code.visualstudio.com/commit:b3318bc0524af3d74034b8bb8a64df0ccf35549a/server-linux-x64/stable
URL transformed to HTTPS due to an HSTS policy
--2021-11-08 15:57:26--  https://update.code.visualstudio.com/commit:b3318bc0524af3d74034b8bb8a64df0ccf35549a/server-linux-x64/stable
Resolving update.code.visualstudio.com (update.code.visualstudio.com)... 20.43.132.130
Connecting to update.code.visualstudio.com (update.code.visualstudio.com)|20.43.132.130|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://az764295.vo.msecnd.net/stable/b3318bc0524af3d74034b8bb8a64df0ccf35549a/vscode-server-linux-x64.tar.gz [following]
--2021-11-08 15:57:26--  https://az764295.vo.msecnd.net/stable/b3318bc0524af3d74034b8bb8a64df0ccf35549a/vscode-server-linux-x64.tar.gz
Resolving az764295.vo.msecnd.net (az764295.vo.msecnd.net)... 117.18.232.200
Connecting to az764295.vo.msecnd.net (az764295.vo.msecnd.net)|117.18.232.200|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 53650674 (51M) [application/gzip]
Saving to: ‘vscode-server.tar.gz’
```

3. 使用vscode.cdn.azure.cn取代az764295.vo.msecnd.net
`wget --tries=0 --connect-timeout=7 --dns-timeout=7 --show-progress -O vscode-server.tar.gz   https://vscode.cdn.azure.cn/stable/b3318bc0524af3d74034b8bb8a64df0ccf35549a/vscode-server-linux-x64.tar.gz`

替换后的下载速度大概为1.72MB/s, 比原来的2kb/s快了几百倍。

4. 将下载的文件放入~/.vscode-server/bin/==b3318bc0524af3d74034b8bb8a64df0ccf35549a==

5. 解压

tar xf vscode-server.tar.gz

6. 移动一级目录到上层

mv vscode-server-linux-x64/* .