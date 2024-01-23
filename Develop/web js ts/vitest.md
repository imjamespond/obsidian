- Debug
VS Code[​](https://vitest.dev/guide/debugging#vs-code)
终端添加一个`JavaScript Debug Terminal`
Quick way to debug tests in VS Code is via `JavaScript Debug Terminal`. ==Open a new `JavaScript Debug Terminal`== and ==run `npm run test` or `vitest` directly==. _this works with any code ran in Node, so will work with most JS testing frameworks_

![image|600](https://user-images.githubusercontent.com/5594348/212169143-72bf39ce-f763-48f5-822a-0c8b2e6a8484.png)
然后直接断点即可

- 过滤 Test Filtering[​](https://vitest.dev/guide/filtering.html#test-filtering)
Filtering, timeouts, concurrent for suite and tests
```
$ vitest basic
```
Will only execute test files that contain `basic`, e.g.
```
basic.test.ts
basic-foo.test.ts
basic/foo.test.ts
```
You can also use the `-t, --testNamePattern <pattern>` option to filter tests by full name. This can be helpful when you want to filter by the name defined within a file rather than the filename itself.
如何传参 `npm run test -- basic`