- ## tools
https://it-tools.tech/
https://www.transition.style/
https://github.com/JamesBrill/react-speech-recognition 💬Speech recognition for your React app
- ascii 画图
https://asciiflow.com/
https://github.com/lewish/asciiflow

- algorithms
https://github.com/trekhleb/javascript-algorithms

## UI 框架

- ui-grid （angular）
https://github.com/angular-ui/ui-grid
- ag-grid （table）
https://github.com/ag-grid/ag-grid
- solidjs
https://github.com/one-aalam/awesome-solid-js#ui-components
- css
https://jdan.github.io/98.css/#intro
- gradio
https://www.gradio.app/guides/quickstart


--- 
## office
- word
https://volodymyrbaydalka.github.io/docxjs/ word预览
- ### Excel
- univer
  https://www.univer.ai/zh-CN/guides/sheet/introduction
- Luckysheet
https://dream-num.github.io/LuckysheetDocs/
- sheetjs
https://sheetjs.com/ 导入导出
https://xlsx.nodejs.cn/docs/
https://github.com/TonyGermaneri/canvas-datagrid  渲染
- [x-spreadsheet](https://github.com/myliang/x-spreadsheet)
  这是一个基于 Web(es6) canvas 构建的轻量级 Excel 开发库
  https://hondrytravis.com/x-spreadsheet-doc/guide/


--- 
###  node
https://github.com/redis/ioredis redis

--- 

https://github.com/sindresorhus/string-width#readme Unicode字符长度
https://github.com/chalk/wrap-ansi wrap定长换行

https://github.com/mattdesl/svg-mesh-3d svg转3d

https://github.com/davidar/pandiff 文本差异


- swr, use-query 自动请求参数
- rxjs debounce相关
- ahooks clickaway/toggle相关
- DOMPurify 清除dom?
- immer 深拷贝对象数组

- 模板
https://github.com/twitter/hogan.js/

- editor
https://github.com/ianstormtaylor/slate

- 高亮
https://prismjs.com/
https://highlightjs.org/

- 拖拽
1，React-Grid-Layout
多size移动，但不能同时水平和垂直对比
2，muuri
多size移动，但不是react库
3，react-beatiful-dnd
单列移动
4，dnd-kit
不能多size移动
- pragmatic-drag-and-drop
https://github.com/atlassian/pragmatic-drag-and-drop

- grid layout
1，[isotope](https://github.com/metafizzy/isotope) 元素周期表
2，

- react-cropper

--- 
- ### Table
  - [alibaba / ali-react-table](https://github.com/alibaba/ali-react-table)
https://ali-react-table.js.org/examples/others/cross-table-customization/

  

--- 
- # 表单设计器

https://jakhuang.github.io/form-generator/#/

https://github.com/alibaba/x-render
https://xrender.fun/
可视化编排
https://xrender.fun/schema-builder#%E7%AE%80%E4%BB%8B

---
# [聊一聊 Node 技术栈](https://www.jitao.tech/posts/node-tech-stack)

本文讨论的技术栈，只局限于后端开发语言和框架，不涉及数据库，运行基础设施，CICD 等话题。
最近观察到了一个技术栈的趋势，这里整理一下。这个趋势就是，使用 Javascript / Node 全栈的项目越来越多。
关注的一些新类型的应用，包括 Headless CMS，flow base programming，低代码，BaaS 等，发现新一代应用很多用的都是 Javascript / Node 全栈。
举几个 🌰：

|项目|分类|前端|后端|Github Stars|
|---|---|---|---|---|
|Medusa|电商|React/Radix|Express|20.7k|
|Node-RED|FBP|/|Express|17.7k|
|n8n|FBP|Vue/element-plus|Express|35.4k|
|Budibase|低代码|Svelte|Koa|19.5k|
|ToolJet|低代码|React|NestJS|25.2k|
|Strapi|CMS|React/Radix|Koa|57.5k|
|Ghost|CMS|Ember|Express|44.5k|
|Directus|CMS|Vue|Express|23.9k|
|Supabase|BaaS|React/Radix|Fastify/Next.js|60k|

发现基于他们二次开发的话，就要熟悉 Node 技术栈了