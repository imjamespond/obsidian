
- pnpm
```bash
# 强制更新
pnpm update --lates 
# npm 查看依赖
pnpm list --depth 3
```

- 清除缓存
```shell
yarn cache dir
yarn cache list
yarn cache clean
yarn config set cache-folder <path>

npm cache add <package-spec>
npm cache clean --force [<key>]
npm cache ls [<name>@<version>]
npm cache verify
npm config list --json # 查看所有配置

pnpm store status
pnpm store prune # 全局清除
pnpm prune # 项目中清除无效依赖包
```

--- 

- taobao源
```
npm config set registry https://registry.npmmirror.com
npm config set registry https://registry.npmjs.org
npm config get registry
```

- electron
修改~/.npmrc 文件
registry=https://registry.npmmirror.com
electron_mirror="https://cdn.npmmirror.com/binaries/electron/"

--- 
- ### 安装特定版本alias
`"d3v3": "npm:d3@^3.5.17",`

- ### npm pack
package.json中加入
```
"dependencies": {"pdfkit": "^0.12.1"},
"bundledDependencies": ["pdfkit"]
...
npm install guhelloproject-1.0.0.tgz
node index.js
```

也可直接解压tar xzvf xxx.tgz 再npm install

--- 
# issues
- MSBUILD : error MSB4132: 无法识别工具版本“2.0”。可用的工具版本为 "4.0"。
https://github.com/chjj/pty.js/issues/60
open up a new cmd as administrator and run this command:
npm install --global --production windows-build-tools
then
npm config set msvs_version 2015 --global
close all instances of shell/cmd, reopen a cmd (regular this time, non-administrator) return to your directory where you are trying to run npm install and run it again

cnpm i --save-dev node-sass
目测是不能装到全局

- pnpm missing peer dependency
.npmrc 中加
`auto-install-peers=true`

# npm
- overrides
```json
  "overrides": {
    "amis": {
      "react-cropper": "2.1.5"
    }
  }
```
**注意：**==deleting package-lock and node_modules==

--- 

| 作用 | npm | yarn | pnpm |
| --------- | ----------------------- | -------------------- | -------------------- |
| 安装 | npm install | yarn install | pnpm install |
| 安装的简写 | npm i | yarn add | pnpm add |
| 强制安装 | | | pnpm install --force |
| 卸载 | npm unintall | yarn remove | pnpm remove |
| 卸载简写 | npm rm | yarn rm | pnpm rm |
| 全局安装 | npm i xxx --global/-g | yarn global add xxx | pnpm add -g xxx |
| 安装包(生产模式) | npm i xxx --save/-S | yarn add xxx | pnpm add xxx |
| 开发模式安装包 | npm i xxx --save-dev/-D | yarn add xxx -dev/-D | pnpm add -D xxx |
| 检查更新 | npm outdated | | |
| 更新 | npm update | yarn upgrade | pnpm update |
| 全局更新 | npm update -g | yarn global upgrade | pnpm update -g |
| 运行 | npm run xxx | yarn run | pnpm run xxx |
| 清除缓存 | ==npm cache clean== | ==yarn cache clean== | |
| 动态包执行 | npx xxx | yarn dlx xxx | pnpm dlx xxx |
| 查看全局安装的包 | npm list -g --depth 0 | yarn global list | pnpm list -g |