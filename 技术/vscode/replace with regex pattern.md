https://transform.tools/css-to-js
sample: <span style="background:rgba(173, 239, 239, 0.55)">">div:not(<span style="background:rgba(205, 244, 105, 0.55)">:global(.__graph__)</span>)": {</span>
pattern: <span style="background:rgba(205, 244, 105, 0.55)">":global\(<span style="background:rgba(240, 167, 216, 0.55)">([^\)]+)</span>\)</span>
`":global\(([^\)]+)\)`
replace: `"& $1`
只匹配第一个反括号

---

```
kmDebug\(d => d\((.*)\)\)
kmDebug($1)
```

--- 
pattern: `import (\w*) from ('.*')`
replace: `const $1 = () => import($2)`
```ts
import GLTF from '@/view/gltf/hdr'
const GLTF = () => import('@/view/gltf/hdr')
```

--- 
```
10 .interpolate("linear");
11
12//The SVG Container
13var svgContainer = d3.select("body").append("svg")
```
匹配每行前的数字, `\s为space ^\s?\d{1,2}`

--- 
```
...
<!-- Navbar -->
...
regular expression: (<!-- .* -->) //1st Capturing Group 
replace with occurance: {/* $1 */} 
```
将HTML的注释替换为JS注释 

--- 
```
search pattern: font\-family:(.*?);
replace with: /*font-family:$1;*/
注释font-family
The ? is a lazy operator, so the regex grabs as little as possible before matching the ;.
? 会导致最小匹配, 到;停止
```