
https://segmentfault.com/a/1190000021138000

```js
{
  module: {
    rules: [
       {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  }
}
```

--- 
#node-sass
https://juejin.cn/post/6946530710324772878
### 一、网络不稳定

首先要知道的是，安装 `node-sass` 时在 `node scripts/install.js` 这个阶段会从 github.com 上下载一个 `.node` 文件，大部分安装不成功的原因都源自这里，因为 GitHub Releases 里的文件都托管在 `s3.amazonaws.com` 上面，而这个网址在国内总是"网络不稳定"，所以我们需要通过第三方服务器下载这个文件。

#### 解决办法

##### 1. 使用淘宝镜像

shell

复制代码

`npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass`

然后重新执行 `npm i node-sass` 即可完成安装。

##### 2. 使用梯子

假设你的梯子在你本地机器上开启了一个第三方服务器 `127.0.0.1:1080`，那么只需按照下面的方法配置一下就能正常安装 `node-sass` 了（如果你开启的是 PAC 模式而不是全局模式，那还需要将 `s3.amazonaws.com` 加入 PAC 列表）：

shell

复制代码

```
npm config set proxy http://127.0.0.1:1080 npm i node-sass # 下载完成后删除 http 代理 npm config delete proxy
```

##### 3. 本地指定.node文件

比如我们在安装 `node-sass` 的时候可以发现它需要下载具体版本对应的 `.node` 文件:

shell

复制代码

```
$ npm install --save-dev node-sass > node-sass@5.0.0 install D:\WorkSpace\node-sass-test\node_modules\gulp-sass\node_modules\node-sass > node scripts/install.js Downloading binary from http://npm.taobao.org/mirrors/node-sass/v5.0.0/win32-x64-72_binding.node
```

如果你的办公环境不能访问外网，那么可以从有网络的电脑上将`.node`文件（下载对应 `node-sass` 版本以及对应操作系统的）下载过来，再传到离线的电脑上指定 `binary` 路径来安装，执行以下命令完成安装：

shell

复制代码

`npm i -D node-sass@5.0.0 --sass_binary_path=D:\files\win32-x64-72_binding.node`

  

作者：乐潇游  
链接：https://juejin.cn/post/6946530710324772878  
来源：稀土掘金  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。