
[vue-next-admin](https://gitee.com/lyt-top/vue-next-admin)
http://vuenextadmin.ccfast.cc/#/home
特点：可保存状态多个tab

---

```
npm init vue@latest
pnpm i
pnpm install element-plus --save
npm run dev
```

完全引用elem
```ts
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
```

```html
<script setup lang="ts">
const foo = 1
</script>
```

