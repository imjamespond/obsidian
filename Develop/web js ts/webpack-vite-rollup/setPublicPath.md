```js
import { setPublicPath } from 'systemjs-webpack-interop';
setPublicPath('@mf/' + config.projectName);
```
#single-spa #webpack
![[Pasted image 20231107163905.png]]
或调试
![[Pasted image 20231107172219.png|500]]

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