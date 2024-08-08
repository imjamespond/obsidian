#  [Docker 配置网络代理](https://www.cnblogs.com/Chary/p/18096678 "发布于 2024-03-26 14:53")

# [如何优雅的给 Docker 配置网络代理](https://www.cnblogs.com/Chary/p/18096678 "发布于 2024-03-26 14:53")

有时因为网络原因，比如公司 NAT，或其它啥的，需要使用代理。Docker 的代理配置，略显复杂，因为有三种场景。但基本原理都是一致的，都是利用 Linux 的 http_proxy 等环境变量。

## Dockerd 代理

在执行docker pull时，是由守护进程dockerd来执行。因此，代理需要配在dockerd的环境中。而这个环境，则是受systemd所管控，因此实际是systemd的配置。

```text
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
```

在这个proxy.conf文件（可以是任意*.conf的形式）中，添加以下内容：

```text
[Service]
Environment="HTTP_PROXY=http://192.168.8.101:1080/"
Environment="HTTPS_PROXY=http://192.168.8.101:1080/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"
```

其中，[http://proxy.example.com:8080](https://link.zhihu.com/?target=http%3A//proxy.example.com%3A8080) 要换成可用的免密代理。通常使用 cntlm 在本机自建免密代理，去对接公司的代理。可参考《Linux下安装配置Cntlm 代理》。

## Container 代理

在容器运行阶段，如果需要代理上网，则需要配置 ~/.docker/config.json。以下配置，只在Docker 17.07及以上版本生效。

```text
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://proxy.example.com:8080",
     "httpsProxy": "http://proxy.example.com:8080",
     "noProxy": "localhost,127.0.0.1,.example.com"
   }
 }
}
```

这个是用户级的配置，除了 proxies，docker login 等相关信息也会在其中。而且还可以配置信息展示的格式、插件参数等。

此外，容器的网络代理，也可以直接在其运行时通过 -e 注入 http_proxy 等环境变量。这两种方法分别适合不同场景。config.json 非常方便，默认在所有配置修改后启动的容器生效，适合个人开发环境。在CI/CD的自动构建环境、或者实际上线运行的环境中，这种方法就不太合适，用 -e 注入这种显式配置会更好，减轻对构建、部署环境的依赖。当然，在这些环境中，最好用良好的设计避免配置代理上网。

## Docker Build 代理

虽然 docker build 的本质，也是启动一个容器，但是环境会略有不同，用户级配置无效。在构建时，需要注入 http_proxy 等参数。

```text
docker build . \
    --build-arg "HTTP_PROXY=http://proxy.example.com:8080/" \
    --build-arg "HTTPS_PROXY=http://proxy.example.com:8080/" \
    --build-arg "NO_PROXY=localhost,127.0.0.1,.example.com" \
    -t your/image:tag
```

**注意**：无论是 docker run 还是 docker build，默认是网络隔绝的。如果代理使用的是 localhost:3128 这类，则会无效。这类仅限本地的代理，必须加上 --network host 才能正常使用。而一般则需要配置代理的外部IP，而且代理本身要开启 Gateway 模式。

**粉丝福利，** **免费领取C/C++ 开发学习资料包、技术视频/代码，1000道大厂面试题，内容包括（C++基础，网络编程，数据库，中间件，后端开发，音视频开发，Qt开发，游戏开发，Linux内核等进阶学习资料和最佳学习路线）↓↓↓↓有需要的朋友可以进企鹅裙[927239107](https://link.zhihu.com/?target=http%3A//qm.qq.com/cgi-bin/qm/qr%3F_wv%3D1027%26k%3DayOJuWu6s0TLh8c7By8PJpITMBby6Ny-%26authKey%3DbA3QLMA4fDV2wGKKQh1WwcuPqdaDz4wLAl7y%252Bw3uvOtnaQ%252FdFV0FRvCcrv8NI5gX%26noverify%3D0%26group_code%3D927239107)领取哦~↓↓**

## 重启生效

代理配置完成后，reboot 重启当然可以生效，但不重启也行。

docker build 代理是在执行前设置的，所以修改后，下次执行立即生效。Container 代理的修改也是立即生效的，但是只针对以后启动的 Container，对已经启动的 Container 无效。

dockerd 代理的修改比较特殊，它实际上是改 systemd 的配置，因此需要重载 systemd 并重启 dockerd 才能生效。

```text
sudo systemctl daemon-reload
sudo systemctl restart docker
```

[如何配置docker通过代理服务器拉取镜像 - 醉马踏千秋 - 博客园](https://www.cnblogs.com/abc1069/p/17496240.html)

# [如何配置docker通过代理服务器拉取镜像](https://www.cnblogs.com/abc1069/p/17496240.html)

如果 docker 所在的环境是通过代理服务器和互联网连通的，那么需要一番配置才能让 docker 正常从外网正常拉取镜像。然而仅仅通过配置环境变量的方法是不够的。本文结合已有文档，介绍如何配置代理服务器能使docker正常拉取镜像。

本文使用的docker 版本是

```css
docker --version
Docker version 24.0.2, build cb74dfc
```

## 问题现象

如果不配置代理服务器就直接拉镜像，docker 会直接尝试连接镜像仓库，并且连接超时报错。如下所示：

```javascript
$ docker pull busybox
Using default tag: latest
Error response from daemon: Get https://registry-1.docker.io/v2/: net/http: request canceled 
while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## 容易误导的官方文档

有这么一篇关于 docker 配置代理服务器的 [官方文档](https://docs.docker.com/network/proxy/#configure-the-docker-client "官方文档") ，如果病急乱投医，直接按照这篇文章配置，是不能成功拉取镜像的。

我们来理解一下这篇文档，文档关键的原文摘录如下：

```sql
If your container needs to use an HTTP, HTTPS, or FTP proxy server, you can configure it in different ways: Configure the Docker client On the Docker client, create or edit the file ~/.docker/config.json in the home directory of the user that starts containers.

...

When you create or start new containers, the environment variables are set automatically within the container.
```

这篇文档说：如果你的 **容器** 需要使用代理服务器，那么可以以如下方式配置： 在运行容器的用户 home 目录下，配置 `~/.docker/config.json` 文件。重新启动容器后，这些环境变量将自动设置进容器，从而容器内的进程可以使用代理服务。

所以这篇文章是讲如何配置运行 容器 的环境，与如何拉取镜像无关。如果按照这篇文档的指导，如同南辕北辙。

要解决问题，我们首先来看一般情况下命令行如何使用代理。

## 环境变量

常规的命令行程序如果要使用代理，需要设置两个环境变量：`HTTP_PROXY` 和 `HTTPS_PROXY` 。但是仅仅这样设置环境变量，也不能让 docker 成功拉取镜像。

我们仔细观察 上面的报错信息，有一句说明了报错的来源：

> Error response from daemon:

因为镜像的拉取和管理都是 docker daemon 的职责，所以我们要让 docker daemon 知道代理服务器的存在。而 docker daemon 是由 systemd 管理的，所以我们要从 systemd 配置入手。

## 正确的官方文档

关于 systemd 配置代理服务器的 官方文档在这里，原文说：

```mipsasm
The Docker daemon uses the HTTP_PROXY, HTTPS_PROXY, and NO_PROXY environmental variables in its start-up environment to configure HTTP or HTTPS proxy behavior. You cannot configure these environment variables using the daemon.json file.

This example overrides the default docker.service file.

If you are behind an HTTP or HTTPS proxy server, for example in corporate settings, you need to add this configuration in the Docker systemd service file.
```

这段话的意思是，docker daemon 使用 `HTTP_PROXY`, `HTTPS_PROXY`, 和 `NO_PROXY` 三个环境变量配置代理服务器，但是你需要在 systemd 的文件里配置环境变量，而不能配置在 `daemon.json` 里。

## 具体操作

下面是来自 [官方文档](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy "官方文档") 的操作步骤和详细解释：

1、创建 dockerd 相关的 systemd 目录，这个目录下的配置将覆盖 dockerd 的默认配置

`$ sudo mkdir -p /etc/systemd/system/docker.service.d`

新建配置文件 `/etc/systemd/system/docker.service.d/http-proxy.conf`，这个文件中将包含环境变量

```ini
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80"
Environment="HTTPS_PROXY=https://proxy.example.com:443"
```

如果你自己建了私有的镜像仓库，需要 dockerd 绕过代理服务器直连，那么配置 NO_PROXY 变量：

```ini
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80"
Environment="HTTPS_PROXY=https://proxy.example.com:443"
Environment="NO_PROXY=your-registry.com,10.10.10.10,*.example.com"
```

多个 `NO_PROXY` 变量的值用逗号分隔，而且可以使用通配符（*），极端情况下，如果 `NO_PROXY=*`，那么所有请求都将不通过代理服务器。

重新加载配置文件，重启 dockerd

```ruby
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

检查确认环境变量已经正确配置：

`$ sudo systemctl show --property=Environment docker`

从 docker info 的结果中查看配置项。

这样配置后，应该可以正常拉取 docker 镜像。

## 结论

docker 镜像由 docker daemon 管理，所以不能用修改 shell 环境变量的方法使用代理服务，而是从 systemd 角度设置环境变量。

> 参考资料  
> [https://www.lfhacks.com/tech/pull-docker-images-behind-proxy/#correct](https://www.lfhacks.com/tech/pull-docker-images-behind-proxy/#correct)  
> [https://stackoverflow.com/questions/69047394/cant-pull-docker-image-behind-a-proxy](https://stackoverflow.com/questions/69047394/cant-pull-docker-image-behind-a-proxy)  
> [https://mikemylonakis.com/unix/docker-proxy/](https://mikemylonakis.com/unix/docker-proxy/)  
> [https://docs.docker.com/config/daemon/systemd/](https://docs.docker.com/config/daemon/systemd/)
> 
> > 在一些特定环境下，需要在代理环境下使用Docker的某些功能，本文介绍一些场景下 如何配置网络代理
> 
> ### 1. 为Docker Daemon配置代理
> 
> ### 1.1 使用`systemd`配置代理
> 
> 为了使`docker pull`指令使用代理，需要在`/lib/systemd/system/docker.service`中的`[Service]`片段下添加`HTTP_PROXY`和`HTTPS_PROXY`环境变量：
> 
> ```bash
> [Service]
> # 新增环境变量提供代理服务器信息
> Environment="HTTP_PROXY=http://<user>:<password>@<domain>:<port>"
> Environment="HTTPS_PROXY=http://<user>:<password>@<domain>:<port>"
> # 如果使用了国内镜像源可以配置镜像服务器不使用代理
> Environmeng="NO_PROXY=<registry.domain>"
> ExecStart=...
> ...
> ```
> 
> > **注意**：尖括号`<>`中的内容需要替换为自己的代理服务器信息
> 
> 随后刷新配置：
> 
> ```bash
> systemctl daemon-reload
> ```
> 
> 此时可以通过以下指令检查配置是否加载成功：
> 
> ```bash
> systemctl show --property Environment docker
> # 输出
> Environment=HTTP_PROXY=http://<user>:<password>@<domain>:<port> HTTPS_PROXY=http://<user>:<password>@<domain>:<port> NO_PROXY=<registry.domain>
> ```
> 
> 重启Docker服务使配置生效
> 
> ```bash
> systemctl restart docker
> ```
> 
> 重启成功之后通过`docker info`指令查看docker服务中的代理配置
> 
> ```bash
> docker info | grep Proxy
> # 输出
>  HTTP Proxy: http://<user>:<password>@<domain>:<port>
>  HTTPS Proxy: http://<user>:<password>@<domain>:<port>
>  No Proxy: <registry.domain>
> ```
> 
> 此时再使用`docker pull`指令拉取镜像时Docker服务会使用代理服务器拉取镜像。
> 
> 此外，`systemd`也会从`/etc/systemd/system/docker.service.d`和`/lib/systemd/system/docker.service.d`文件夹下读取配置，所以可以再其中一个文件夹中创建一个名为`http-proxy.conf`的文件用来保存代理信息。内容如下：
> 
> ```bash
> [Service]
> Environment="HTTP_PROXY=http://<user>:<password>@<domain>:<port>"
> Environment="HTTPS_PROXY=http://<user>:<password>@<domain>:<port>"
> Environmeng="NO_PROXY=<registry.domain>"
> ```
> 
> ### 1.2 通过`daemon.json`配置代理
> 
> 在`/etc/docker/daemon.json`中增加代理配置：
> 
> ```json
> {
>   "registry-mirrors": ["..."],
>   "proxies": {
>     "http-proxy": "http://<user>:<password>@<domain>:<port>",
>     "https-proxy": "http://<user>:<password>@<domain>:<port>",
>     "no-proxy": "<registry.domain>"
>   }
> }
> ```
> 
> 重启Docker服务：
> 
> ```bash
> systemctl restart docker
> ```
> 
> 检查配置是否生效：
> 
> ```bash
> docker info| grep Proxy
> # 输出
>  HTTP Proxy: http://<user>:<password>@<domain>:<port>
>  HTTPS Proxy: http://<user>:<password>@<domain>:<port>
>  No Proxy: <registry.domain>
> ```
> 
> **注意：**通过`daemon.json`方式配置的优先级会高于通过`systemd`配置。
> 
> ### 2. 在容器中使用代理
> 
> ### 2.1 通过命令行配置代理
> 
> ```bash
> docker run --env HTTP_PROXY="http://<user>:<password>@<domain>:<port>" <some-image>
> ```
> 
> 验证
> 
> ```bash
> docker run \
>     --env HTTP_PROXY="http://<user>:<password>@<domain>:<port>" \
>     --rm alpine sh -c 'env | grep -i  _PROXY'
> # 输出
> HTTP_PROXY=http://<user>:<password>@<domain>:<port>
> ```
> 
> ### 2.2 通过`~/.docker/config.json`配置
> 
> 在`~/.docker/config.json`中增加以下配置：
> 
> ```json
> {
>   "auths": {
>     "..."
>   },
>   "proxies": {
>     # 通用配置，会对当前客户端连接的所有Docker服务生效
>     "default": {
>       "httpProxy": "http://proxy.example.com:3128",
>       "httpsProxy": "https://proxy.example.com:3129",
>       "noProxy": "*.test.example.com,.example.org,127.0.0.0/8"
>     },
>     # 如果只对某个Docker服务时配置代理，则需要通过 docker-host: proxy-settings的方式在下面配置 
>     "tcp://docker-daemon1.example.com": {
>       "noProxy": "*.internal.example.net"
>     }
>   }
> }
> ```
> 
> 验证：
> 
> ```bash
> docker run --rm alpine sh -c 'env | grep -i  _PROXY'
> # 输出
> HTTPS_PROXY=https://proxy.example.com:3129
> no_proxy=*.test.example.com,.example.org,127.0.0.0/8
> NO_PROXY=*.test.example.com,.example.org,127.0.0.0/8
> https_proxy=https://proxy.example.com:3129
> http_proxy=http://proxy.example.com:3128
> HTTP_PROXY=http://proxy.example.com:3128
> ```
> 
> ### 3. 在构建镜像的过程中使用代理
> 
> 通过`~/.docker/config.json`的方式配置代理在构建过程中依然有效。
> 
> 验证：
> 
> ```bash
> docker build \
>   --no-cache \
>   --progress=plain \
>   - <<EOF
> FROM alpine
> RUN env | grep -i _PROXY
> EOF
> # 输出
> # ...
> #5 [2/2] RUN env | grep -i _PROXY
> #5 0.382 HTTPS_PROXY=https://proxy.example.com:3129
> #5 0.382 no_proxy=*.test.example.com,.example.org,127.0.0.0/8
> #5 0.382 NO_PROXY=*.test.example.com,.example.org,127.0.0.0/8
> #5 0.382 https_proxy=https://proxy.example.com:3129
> #5 0.382 http_proxy=http://proxy.example.com:3128
> #5 0.382 HTTP_PROXY=http://proxy.example.com:3128
> #5 DONE 0.6s
> # ...
> ```
> 
> ### 3.1 通过命令行配置代理
> 
> ```bash
> docker build --build-arg HTTP_PROXY="http://proxy.example.com:3128"
> ```
> 
> 验证
> 
> ```bash
> docker build --build-arg HTTP_PROXY="http://another-proxy.example.com:3128" \
>   --no-cache \
>   --progress=plain \
>   - <<EOF
> FROM alpine
> RUN env | grep -i _PROXY
> EOF
> # 输出
> # ...
> #5 [2/2] RUN env | grep -i _PROXY
> #5 0.393 HTTPS_PROXY=https://proxy.example.com:3129
> #5 0.393 no_proxy=*.test.example.com,.example.org,127.0.0.0/8
> #5 0.393 NO_PROXY=*.test.example.com,.example.org,127.0.0.0/8
> #5 0.393 https_proxy=https://proxy.example.com:3129
> #5 0.393 http_proxy=http://another-proxy.example.com:3128
> #5 0.393 HTTP_PROXY=http://another-proxy.example.com:3128
> #5 DONE 0.6s
> # ...
> ```
> 
> ### 3.2 不要在`Dockerfile`中使用`ENV`指令配置构建过程中使用到的代理配置
> 
> 使用环境变量配置构建过程中用到的代理配置会把代理服务器打包进镜像中，如果代理服务器是私有化部署的服务器，通过此镜像创建的容器可能访问不到代理服务器，产生难以理解的错误。
> 
> 同时，由于代理配置中可能包含敏感信息，把代理服务器信息嵌入到镜像中也有可能造成一些安全隐患。
> 
> ### 资料来源
> 
> [Configure the daemon with systemd](https://link.zhihu.com/?target=https%3A//docs.docker.com/config/daemon/systemd/%23httphttps-proxy)
> 
> [Configure Docker to use a proxy](https://link.zhihu.com/?target=https%3A//docs.docker.com/network/proxy/)
> 
> [配置Docker代理 - 知乎](https://zhuanlan.zhihu.com/p/683652583#:~:text=%E9%85%8D%E7%BD%AEDocker%E4%BB%A3%E7%90%86%201%201.%20%E4%B8%BADocker%20Daemon%E9%85%8D%E7%BD%AE%E4%BB%A3%E7%90%86%201.1%20%E4%BD%BF%E7%94%A8%20systemd,7%203.2%20%E4%B8%8D%E8%A6%81%E5%9C%A8%20Dockerfile%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ENV%20%E6%8C%87%E4%BB%A4%E9%85%8D%E7%BD%AE%E6%9E%84%E5%BB%BA%E8%BF%87%E7%A8%8B%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%88%B0%E7%9A%84%E4%BB%A3%E7%90%86%E9%85%8D%E7%BD%AE%20)
> 
> [使用 systemd 配置守护进程 | Docker 文档](https://docs.docker.com/config/daemon/systemd/)
> 
> # 使用 systemd 配置守护进程
> 
> 本页介绍如何在使用 systemd 时自定义守护进程设置。
> 
> ## [自定义 Docker 守护进程选项](https://docs.docker.com/config/daemon/systemd/#custom-docker-daemon-options)
> 
> Docker 守护进程的大多数配置选项都是使用`daemon.json` 配置文件设置的。有关更多信息，请参阅[Docker 守护进程配置概述。](https://docs.docker.com/config/daemon/)
> 
> ## [手动创建 systemd 单元文件](https://docs.docker.com/config/daemon/systemd/#manually-create-the-systemd-unit-files)
> 
> 在没有包管理器的情况下安装二进制文件时，您可能希望将 Docker 与 systemd 集成。为此，请将[GitHub 存储库](https://github.com/moby/moby/tree/master/contrib/init/systemd)`service`中的两个单元文件 (和 `socket`) 安装 到.`/etc/systemd/system`
> 
> ### [配置 Docker 守护进程以使用代理服务器](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy)
> 
> Docker 守护进程在其启动环境中使用以下环境变量来配置 HTTP 或 HTTPS 代理行为：
> 
> - `HTTP_PROXY`
> - `http_proxy`
> - `HTTPS_PROXY`
> - `https_proxy`
> - `NO_PROXY`
> - `no_proxy`
> 
> 在 Docker Engine 23.0 及更高版本中，您还可以在[`daemon.json`文件](https://docs.docker.com/config/daemon/#configure-the-docker-daemon)中为守护进程配置代理行为：
> 
> ```json
> {
>   "proxies": {
>     "http-proxy": "http://proxy.example.com:3128",
>     "https-proxy": "https://proxy.example.com:3129",
>     "no-proxy": "*.test.example.com,.example.org,127.0.0.0/8"
>   }
> }
> ```
> 
> 这些配置会覆盖默认的`docker.service`systemd 文件。
> 
> 如果您位于 HTTP 或 HTTPS 代理服务器后面（例如在公司设置中），则必须在 systemd 服务文件中指定守护程序代理配置，而不是在文件中`daemon.json`或使用环境变量。
> 
> > **无根模式注意事项**
> > 
> > [在无根模式](https://docs.docker.com/engine/security/rootless/)下运行 Docker 时，systemd 配置文件的位置有所不同 。当以无根模式运行时，Docker 作为用户模式 ​​systemd 服务启动，并使用存储在每个用户主目录中的文件 `~/.config/systemd/user/docker.service.d/`。此外，必须在不带标志和带标志的`systemctl`情况下执行。如果您在无根模式下运行 Docker，请选择下面的_“无根模式”选项卡。_`sudo``--user`
> 
> 常规安装 无根模式
> 
> ---
> 
> 1. 为该服务创建一个 systemd 放置目录`docker`：
>     
>     ```console
>     $ sudo mkdir -p /etc/systemd/system/docker.service.d
>     ```
>     
> 2. `/etc/systemd/system/docker.service.d/http-proxy.conf` 创建一个名为添加环境​​变量的文件`HTTP_PROXY`：
>     
>     ```systemd
>     [Service]
>     Environment="HTTP_PROXY=http://proxy.example.com:3128"
>     ```
>     
>     如果您位于 HTTPS 代理服务器后面，请设置`HTTPS_PROXY`环境变量：
>     
>     ```systemd
>     [Service]
>     Environment="HTTPS_PROXY=https://proxy.example.com:3129"
>     ```
>     
>     可设置多个环境变量；设置非 HTTPS 和 HTTPs 代理；
>     
>     ```systemd
>     [Service]
>     Environment="HTTP_PROXY=http://proxy.example.com:3128"
>     Environment="HTTPS_PROXY=https://proxy.example.com:3129"
>     ```
>     
>     > **笔记**
>     > 
>     > 代理值中的特殊字符（例如`#?!()[]{}`）必须使用 进行双重转义`%%`。例如：
>     > 
>     > ```systemd
>     > [Service]
>     > Environment="HTTP_PROXY=http://domain%%5Cuser:complex%%23pass@proxy.example.com:3128/"
>     > ```
>     
> 3. 如果您有需要在不使用代理的情况下联系的内部 Docker 注册表，则可以通过`NO_PROXY`环境变量指定它们。
>     
>     该`NO_PROXY`变量指定一个字符串，其中包含应从代理中排除的主机的逗号分隔值。您可以指定以下选项来排除主机：
>     
>     - IP 地址前缀 ( `1.2.3.4`)
>     - 域名，或特殊的 DNS 标签 ( `*`)
>     - 域名与该名称和所有子域相匹配。以“.”开头的域名仅匹配子域。例如，给定域 `foo.example.com`和`example.com`：
>         - `example.com`匹配`example.com`和`foo.example.com`, 和
>         - `.example.com`仅匹配`foo.example.com`
>     - 单个星号 ( `*`) 表示不应进行代理
>     - `1.2.3.4:80`IP 地址前缀 ( ) 和域名 ( `foo.example.com:80`)接受文字端口号
>     
>     例子：
>     
>     ```systemd
>     [Service]
>     Environment="HTTP_PROXY=http://proxy.example.com:3128"
>     Environment="HTTPS_PROXY=https://proxy.example.com:3129"
>     Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp"
>     ```
>     
> 4. 刷新更改并重新启动 Docker
>     
>     ```console
>     $ sudo systemctl daemon-reload
>     $ sudo systemctl restart docker
>     ```
>     
> 5. 验证配置是否已加载并与您所做的更改相匹配，例如：
>     
>     ```console
>     $ sudo systemctl show --property=Environment docker
>     
>     Environment=HTTP_PROXY=http://proxy.example.com:3128 HTTPS_PROXY=https://proxy.example.com:3129 NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp
>     ```
>