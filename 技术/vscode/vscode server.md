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

---

```
> curl: (56) Recv failure: Connection reset by peer
> curl download failed
> 200
> printenv:
>     SHELL=/bin/zsh
>     TMPDIR=/var/folders/sx/6f_z2mfj2s19rgj65rsctt_40000gp/T/
>     SSH_CLIENT=192.168.31.2 11509 22
>     USER=james
>     VSCODE_AGENT_FOLDER=/Users/james/.vscode-server
>     PATH=/usr/bin:/bin:/usr/sbin:/sbin
>     PWD=/Users/james/.vscode-server/bin/0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2
>     SHLVL=1
>     HOME=/Users/james
>     LOGNAME=james
>     SSH_CONNECTION=192.168.31.2 11509 192.168.31.8 22
>     _=/usr/bin/printenv
>     OLDPWD=/Users/james
> Trigger local server download
> bc0cd720103a:trigger_server_download
> artifact==server-darwin-arm64==
> destFolder==/Users/james/.vscode-server/bin/==
> destFolder2==/0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2/vscode-server.tar.gz==   
> bc0cd720103a:trigger_server_download_end
> Waiting for client to transfer server archive...
> Waiting for /Users/james/.vscode-server/bin/0ee08df0cf4527e40edc9aa28f4b5bd38bbf
> f2b2/vscode-server.tar.gz.done and vscode-server.tar.gz to exist
> 
[23:11:56.555] Got request to download on client for {"artifact":"server-darwin-arm64","destPath":"/Users/james/.vscode-server/bin//0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2/vscode-server.tar.gz"}
[23:11:56.555] Downloading VS Code server locally...
[23:13:38.540] Resolver error: Error: XHR failed
    at k.onerror (vscode-file://vscode-app/c:/Program%20Files/Microsoft%20VS%20Code/resources/app/out/vs/workbench/workbench.desktop.main.js:95:2027)
[23:13:38.546] ------
```

{"artifact":"server-darwin-arm64","destPath":"/Users/james/.vscode-server/bin//==0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2==/vscode-server.tar.gz"}

`https://update.code.visualstudio.com/commit:0ee08df0cf4527e40edc9aa28f4b5bd38bbff2b2/server-darwin-arm64/stable`

下载的是zip上传至`/Users/james/.vscode-server/bin/`，并将`vscode-server-darwin-arm64 `rename 为commitID