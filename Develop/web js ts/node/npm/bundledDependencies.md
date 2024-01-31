https://nodejs.cn/npm/cli/v7/configuring-npm/package-json/~/bundleddependencies/
这定义了在发布包时将捆绑的包名称数组。

This defines an array of package names that will be bundled when publishing the package.

如果您需要在本地保存 npm 包或通过单个文件下载使它们可用，您可以通过在 `bundledDependencies` 数组中指定包名称并执行 `npm pack` 来将包捆绑在一个 tarball 文件中。

In cases where you need to preserve npm packages locally or have them available through a single file download, you can bundle the packages in a tarball file by specifying the package names in the `bundledDependencies` array and executing `npm pack`.

例如：

For example:

如果我们像这样定义一个 package.json：

If we define a package.json like this:

```json
{
  "name": "awesome-web-framework",
  "version": "1.0.0",
  "bundledDependencies": [
    "renderized",
    "super-streams"
  ]
}
```

我们可以通过运行 `npm pack` 来获取 `awesome-web-framework-1.0.0.tgz` 文件。此文件包含依赖项 `renderized` 和 `super-streams`，==可以通过执行  `npm install awesome-web-framework-1.0.0.tgz`  将其安装到新项目中==。请注意，包名称不包括任何版本，因为该信息在 `dependencies`.1 中指定。

we can obtain `awesome-web-framework-1.0.0.tgz` file by running `npm pack`. This file contains the dependencies `renderized` and `super-streams` which can be installed in a new project by executing `npm install awesome-web-framework-1.0.0.tgz`. Note that the package names do not include any versions, as that information is specified in `dependencies`.

如果这拼写为 `"bundleDependencies"`，那么也很荣幸。

If this is spelled `"bundleDependencies"`, then that is also honored.