1. husky
```
.git/config
...
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
        hooksPath = .husky
```

**to enable husky, 有两种方法**
- 一. 直接run `npx husky install`
- 二. 通过`npm install`
运行后, npm install 便会执行husky install
```shell
npm pkg set scripts.prepare="husky install"
```
package.json中有：
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```