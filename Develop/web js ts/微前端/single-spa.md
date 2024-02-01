
https://single-spa.js.org/docs/create-single-spa/
```bash
npx create-single-spa
# react ts...
pnpm i
npm start
```
create-single-spa没导出react，因此下面要用systemjs导入

---
[基座, 普通webpack项目](https://juejin.cn/post/7202812701440098361)
#### 1. 添加依赖

`npm i single-spa`

引入systemjs（用于加载依赖及子应用js）

```html
<!-- index.html -->
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.js"></script>
  <script type="systemjs-importmap">
        {
          "imports": {
               "@kmapp/test-single-spa": "http://localhost:8080/kmapp-test-single-spa.js", 
                "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
                "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
          }
        }
  </script>
```

#### 2. 注册子应用（react）
- 主应用配置
采用全局注册，路由匹配形式
```js
// index.js
import {
	registerApplication,
	start
} from 'single-spa'

console.debug('registerApplication')

registerApplication(
	'react-app',
	// eslint-disable-next-line no-undef
	() => System.import("@kmapp/test-single-spa"),
	location => {
      return location.pathname === '/test-aurum/'
    },
	{
		domElementGetter: function () {
			// 此处用于异步返回挂在街节点，如果不返回默认在body下新增节点挂载
			return document.getElementById('app')
		}
	}
)
start({ urlRerouteOnly: true, })
```

--- 
parcel形式

globals.d.ts
```ts
declare var System: any
```

```tsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from "react-dom"

import { mountRootParcel } from 'single-spa'

function FC({ }: any) {

  const elem = useRef<HTMLDivElement>(null)

  useEffect(() => {
    System.import("@kmapp/test-single-spa").then((App: any) => {
      mountRootParcel(App, { domElement: elem.current! })
    })
  }, [])

  return (
    <React.Fragment>
      <div ref={elem}></div>
    </React.Fragment>
  )
}

export default function () {
  ReactDOM.render(<FC />, document.getElementById('app'),);
}
```

也可以直接通过url，systemjs-importmap中删除name，指定name `mountRootParcel({...App, name: 'kmapp-test-single-spa' }`
```ts
useEffect(() => {
  System.import("http://localhost:8080/kmapp-test-single-spa.js").then((App: any) => {
    mountRootParcel(App, { domElement: elem.current! })
  })
}, [])

{
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
  }
}
```