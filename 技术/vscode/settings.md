
- ### live server
.vscode/settings.json
```json
{
  "liveServer.settings.root": "/dist",
  "liveServer.settings.ChromeDebuggingAttachment": false,
  "liveServer.settings.ignoreFiles": [
    "**/**",
  ],
  "liveServer.settings.https": {
    "enable": false,
    "cert": "/Users/james/workspace/live-server/server.pem", // 证书
    "key": "/Users/james/workspace/live-server/privkey.pem", // 私钥
    "passphrase": ""
  },
  "liveServer.settings.proxy": {
    "enable": true,
    "baseUri": "/web-apps",
    "proxyUri": "http://test2:8000/web-apps" //测试
  },
  "liveServer.settings.host": "0.0.0.0",
}
```

- ### bash
```json
"terminal.integrated.profiles.osx": {
    "bash": {
      "path": "bash",
      "args": ["-l"]
    }
  }
```

- ### disable 选中file后，cmd + f 搜索目录explorer而非editor
 在keyboard shortcuts里将`list.find`的快捷键改为cmd + shift + f

- ### default directory
`terminal.integrated.cwd": "/path/to/workspace"`