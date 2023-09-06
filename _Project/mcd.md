npm i -verbose

```
执行npm install 或 npx 安装项目工程前需配置对应源地址：
npm config set @mmm:registry https://nexus.mmm.com.cn/repository/mmm-admin-portal-npm-group/    (脚手架及API方法库 boss-common在该源下)
npm config set @aurum:registry https://nexus.mmm.com.cn/repository/mmm-bff-npm/    (Aurum/pfe-ui 组件库在该源下)
npm login --registry=https://nexus.mmm.com.cn/repository/mmm-admin-portal-npm-group/ 
输入
user：portal-user
pwd：portal-user@mmm2020
mail：portal-user@cn.mmm.com
```


- issues
1,  无权限
```
npm http fetch GET 401 https://nexus.mmm.com.cn/repository/mmm-bff-npm/@aurum%2fpfe-ui 308ms (cache skip)
npm http fetch GET 200 https://nexus.mmm.com.cn/repository/mmm-admin-portal-npm-group/@mmm%2fboss-common 159ms (cache miss)
npm http fetch GET 200 https://nexus.mmm.com.cn/repository/mmm-admin-portal-npm-group/@mmm%2fboss-route 84ms (cache miss)
...
npm verb statusCode 401
npm verb pkgid @aurum/pfe-ui@^0.3.2
...
npm ERR! code E401
npm ERR! Unable to authenticate, need: BASIC realm="Sonatype Nexus Repository Manager"
```
文档只login了一个地址==mmm-admin-portal-npm-group==, 没login ==mmm-bff-npm==
```
npm login --registry=https://nexus.mmm.com.cn/repository/mmm-bff-npm/ 
```