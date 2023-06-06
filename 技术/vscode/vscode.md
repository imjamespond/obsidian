
- ### snippets 
`~/Library/Application Support/Code/User/snippets/typescriptreact.json`
```json
{
	// Place your snippets for typescriptreact here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
	"FC": {
		"prefix": "fc",
		"body": [
			"import React from 'react';",
			"",
			"function FC() {",
			"  return (",
			"    <React.Fragment>fc${0}</React.Fragment>",
			"  )",
			"}",
			"",
			"export default FC"
		]
	},
	"swr": {
		"prefix": "swr",
		"body": [
			"import useSWR from 'swr';"
		]
	}
}
```

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