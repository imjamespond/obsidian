
### zeppelin-web
- 服务
http://192.168.0.209:8999/zeppelin/#/helium

- 前端项目
https://github.com/apache/zeppelin/tree/master/zeppelin-web
bower代理，.bowerrc
```
"proxy": "http://127.0.0.1:1080",
"https-proxy": "http://127.0.0.1:1080",
"strict-ssl": false
```
安装
`pnpm i`
运行
`npm run dev:helium`

- 映射服务到localhost 8080
`tunnel.sh root@192.168.0.209 8080 localhost:8999`

- 访问
`http://localhost:9000/zeppelin/#/helium`


- Issues:
Can't resolve 'scrollmonitor==/scrollMonitor.js=='
删除之，因为somehow这个库没有此文件，package.json已经引入另外的路径的index.js

--- 
### deploy
https://zeppelin.apache.org/docs/0.8.0/development/helium/writing_visualization_basic.html
https://community.cloudera.com/t5/Support-Questions/Installing-Helium-modules-in-Zeppelin/m-p/205123
1, [下载hightmap](https://github.com/ZEPL/zeppelin-ultimate-heatmap-chart/tree/master)
2,上传到server的zeppelin home,新建helium中（可以放别的地方，重要的是json元信息要放这）
3,copy其中的 `ultimate-heatmap-chart.json` 到helium, 并将其中的`artifact`指向插件的绝对路径
4,~~`bin/zeppeline-demo.sh restart`,~~ 在zeppeline主界面打开helium, 将插件enable, 等待许久(在`local-repo/helium-bundle`中安装依赖编译)

---
### basic
https://zeppelin.apache.org/docs/0.8.0/development/helium/writing_visualization_basic.html
- 内置的node和yarn
```bash
# .bash_profie
NODE_BIN=$HOME/zeppelin/zeppelin-0.10.1-bin-all/local-repo/helium-bundle/node
YARN_BIN=$NODE_BIN/yarn/dist/bin
PATH=$PATH:$NODE_BIN:$YARN_BIN
```
source之
```bash
yarn config get registry
yarn config set registry https://registry.npmmirror.com/
# or
yarn config set registry https://registry.npm.taobao.org/
```
- package.json npm项目,==必须有,否则enable时不能yarn install==
```json
{
  "name": "hello",
  "description" : "Horizontal Bar chart",
  "version": "1.0.0",
  "main": "hello",
  "author": "",
  "license": "Apache-2.0",
  "dependencies": {
    "zeppelin-tabledata": "*",
    "zeppelin-vis": "*"
  }
}
```
- hello.js 主程序
```js
import Visualization from 'zeppelin-vis'
import PassthroughTransformation from 'zeppelin-tabledata/passthrough'

export default class helloworld extends Visualization {
  constructor(targetEl, config) {
    super(targetEl, config)
    this.passthrough = new PassthroughTransformation(config);
  }

  render(tableData) {
    this.targetEl.html('Hello world!')
    // render(this.targetEl[0], tableData)
  }

  getTransformation() {
    return this.passthrough
  }
}
```

- hello.json helium 描述
```json
{
  "type" : "VISUALIZATION",
  "name" : "zeppelin_horizontalbar",
  "description" : "Horizontal Bar chart (example)",
  "license" : "Apache-2.0",
  "artifact" : "/home/deploy/zeppelin/helium/hello",
  "icon" : "<i class='fa fa-bar-chart rotate90flipX'></i>"
}
```
artifact:
当npm仓库有时`"artifact": "my-visualiztion@1.0.0"`
否则`"artifact": "/path/to/my/visualization"`

