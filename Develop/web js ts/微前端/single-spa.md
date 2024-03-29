
https://single-spa.js.org/docs/create-single-spa/
```bash
npx create-single-spa
# react ts...
pnpm i
npm start
```
**坑！！ create-single-spa没导出react，因此下面要用systemjs导入**

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

也可以直接通过url，systemjs-importmap中删除`@kmapp/test-single-spa`，指定name `mountRootParcel({...App, name: 'kmapp-test-single-spa' }`
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

```ts
import 'systemjs'
console.debug(System)
...
System.import("http://localhost:8080/..."
```

- for react 
```tsx
import Parcel from 'single-spa-react/parcel';
<Parcel
  config={new Promise((rsov) => {
    System.import('@mf/kmapp').then((parcelConfig: any) => {
      rsov(parcelConfig)
    })
  })}
  wrapWith="div"
  handleError={err => console.error(err)}
  customProp1="customPropValue2"
  customProp2="customPropValue2"
/>
```

---
### Dynamically add Import Maps
```js
System.addImportMap({
  "imports": {
    "@mf/kmapp":"http://localhost:4001/app.js", 
  }
})
System.addImportMap({
  "imports": {
    "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js"
  }
})
```

---
自动将public path转化为systemjs请求js的url
```jsx
import { setPublicPath } from 'systemjs-webpack-interop';

const config = require('../config');
setPublicPath('@mf/' + config.projectName);

...
import icon from './logo192.png'
<img src={icon} />
...
<img src="http://localhost:4001/64b6abdbeb9a1690d34c.png">
```
https://github.com/joeldenning/systemjs-webpack-interop
```js
/* set-public-path.js */
import { setPublicPath } from "systemjs-webpack-interop";

/* Make sure your import map has the name of your module in it. Example:
{
  "imports": {
    "@org-name/my-module": "https://example.com/dist/js/main.js"
  }
}
 */

// __webpack_public_path__ will be set to https://example.com/dist/js/
setPublicPath("foo");
```

---
