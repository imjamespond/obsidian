# 无头浏览器Chrome 入门

Posted on [2020年12月28日](http://mrdede.com/?p=4219 "17:41")

Chrome 59[附带了无头Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md)。这是在无头环境中运行Chrome浏览器的一种方式。本质上，没有Chrome即可运行Chrome！它将Chromium和Blink渲染引擎提供的**所有现代Web平台功能**引入命令行。

为什么这样有用？

无头浏览器是自动化测试和不需要可见UI外壳的服务器环境的绝佳工具。例如，您可能想对真实的网页运行一些测试，为其创建PDF，或者仅检查浏览器如何呈现URL。

**注意：**从**Chrome 59**开始，无头模式已在Mac和Linux上可用。 [Windows支持](https://bugs.chromium.org/p/chromium/issues/detail?id=686608) 来自Chrome 60。

## 启动无头（CLI）

无头模式入门的最简单方法是从命令行打开Chrome二进制文件。如果您已安装Chrome 59+，请使用以下`--headless`标志启动Chrome ：

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5|chrome \<br><br>  --headless \                   # Runs Chrome in headless mode.<br><br>  --disable-gpu \                # Temporarily needed if running on Windows.<br><br>  --remote-debugging-port=9222 \<br><br>  https://www.chromestatus.com   # URL to open. Defaults to about:blank.|

**注意：**现在，`--disable-gpu`如果您在Windows上运行，则还希望包含该标志。参见[crbug.com/737678](https://bugs.chromium.org/p/chromium/issues/detail?id=737678)。

`chrome`应该指向您安装的Chrome。确切位置因平台而异。由于使用的是Mac，因此我为已安装的每个版本的Chrome创建了方便的别名。

如果您使用的是Chrome稳定版，但无法获得Beta版，建议您使用`chrome-canary`：

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3|alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"<br><br>alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"<br><br>alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"|

[在此处](https://www.google.com/chrome/browser/canary.html)下载Chrome Canary 。

## 命令行功能

在某些情况下，您可能不需要以[编程方式编写](https://developers.google.com/web/updates/2017/04/headless-chrome#node)Headless Chrome[脚本](https://developers.google.com/web/updates/2017/04/headless-chrome#node)。有一些[有用的命令行标志](https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc) 可以执行常见任务。

### 打印DOM

该`--dump-dom`标志打印`document.body.innerHTML`到标准输出：

|   |   |
|---|---|
|0<br><br>1|chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/|

### 创建PDF

该`--print-to-pdf`标志创建页面的PDF：

|   |   |
|---|---|
|0<br><br>1|chrome --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/|

### 截屏

要捕获页面的屏幕截图，请使用`--screenshot`标志：

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7|chrome --headless --disable-gpu --screenshot https://www.chromestatus.com/<br><br># Size of a standard letterhead.<br><br>chrome --headless --disable-gpu --screenshot --window-size=1280,1696 https://www.chromestatus.com/<br><br># Nexus 5x<br><br>chrome --headless --disable-gpu --screenshot --window-size=412,732 https://www.chromestatus.com/|

运行`--screenshot`将`screenshot.png`在当前工作目录中生成一个名为的文件。如果您要查找整页的屏幕截图，则可能会涉及更多内容。David Schnurr撰写了一篇很棒的博客文章，内容涵盖了您。检出 [使用无头Chrome作为自动截图工具](https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a) 。

### REPL模式（读评估打印循环）

该`--repl`标志以无头模式运行，您可以在浏览器中直接从命令行评估JS表达式：

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6|$ chrome --headless --disable-gpu --repl --crash-dumps-dir=./tmp https://www.chromestatus.com/<br><br>[0608/112805.245285:INFO:headless_shell.cc(278)] Type a Javascript expression to evaluate or "quit" to exit.<br><br>>>> location.href<br><br>{"result":{"type":"string","value":"https://www.chromestatus.com/features"}}<br><br>>>> quit<br><br>$|

**注意：**在使用repl模式时，添加了–crash-dumps-dir标志。

## 在没有浏览器用户界面的情况下调试Chrome？

当您使用运行Chrome时`--remote-debugging-port=9222`，它将启动启用了[DevTools协议](https://chromedevtools.github.io/devtools-protocol/)的实例。该协议用于与Chrome通信并驱动无头浏览器实例。这也是Sublime，VS Code和Node等工具用于远程调试应用程序的工具。＃协同作用

由于您没有浏览器用户界面来查看该页面，因此请`http://localhost:9222` 在另一个浏览器中导航至，以检查一切是否正常。您将看到可检查页面的列表，您可以在其中单击并查看Headless呈现的内容：

[![remote-debugging-ui](http://mrdede.com/wp-content/uploads/2020/12/remote-debugging-ui-600x316.jpg)](http://mrdede.com/wp-content/uploads/2020/12/remote-debugging-ui.jpg)

DevTools远程调试UI

在这里，您可以像往常一样使用熟悉的DevTools功能来检查，调试和调整页面。如果您以编程方式使用Headless，则此页面还是一个功能强大的调试工具，可用于查看通过导线传输的所有原始DevTools协议命令，并与浏览器进行通信。

## 以编程方式使用（节点）

### 木偶戏

[Puppeteer](https://developers.google.com/web/tools/puppeteer)是Chrome小组开发的Node库。它提供了高级API来控制无头（或完整）Chrome。它与其他自动测试库（如Phantom和NightmareJS）相似，但仅适用于最新版本的Chrome。

除其他外，Puppeteer可用于轻松获取屏幕截图，创建PDF，浏览页面以及获取有关这些页面的信息。如果您想快速自动化浏览器测试，则建议使用该库。它隐藏了DevTools协议的复杂性，并处理了诸如启动Chrome的调试实例之类的多余任务。

安装它：

|   |   |
|---|---|
|0<br><br>1|npm i --save puppeteer|

**示例**-打印用户代理

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7|const puppeteer = require('puppeteer');<br><br>(async() => {<br><br>  const browser = await puppeteer.launch();<br><br>  console.log(await browser.version());<br><br>  await browser.close();<br><br>})();|

**示例**-截取页面截图

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10|const puppeteer = require('puppeteer');<br><br>(async() => {<br><br>const browser = await puppeteer.launch();<br><br>const page = await browser.newPage();<br><br>await page.goto('https://www.chromestatus.com', {waitUntil: 'networkidle2'});<br><br>await page.pdf({path: 'page.pdf', format: 'A4'});<br><br>await browser.close();<br><br>})();|

查看[Puppeteer的文档](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) 以了解有关完整API的更多信息。

### CRI库

[chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) 是比Puppeteer的API更底层的库。如果您想靠近金属并直接使用[DevTools协议](https://chromedevtools.github.io/devtools-protocol/)，则建议使用它。

#### 启动Chrome

chrome-remote-interface不会为您启动Chrome，因此您必须自己照顾一下。

在CLI部分，我们使用 [手动启动了Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome#cli)`--headless --remote-debugging-port=9222`。但是，要完全自动化测试，您可能需要_从_应用程序中生成Chrome 。

一种方法是使用`child_process`：

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11|const execFile = require('child_process').execFile;<br><br>function launchHeadlessChrome(url, callback) {<br><br>  // Assuming MacOSx.<br><br>  const CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';<br><br>  execFile(CHROME, ['--headless', '--disable-gpu', '--remote-debugging-port=9222', url], callback);<br><br>}<br><br>launchHeadlessChrome('https://www.chromestatus.com', (err, stdout, stderr) => {<br><br>  ...<br><br>});|

但是，如果您想要一个可在多个平台上运行的便携式解决方案，事情就会变得棘手。只需看一下Chrome的硬编码路径即可：(

##### 使用ChromeLauncher

[Lighthouse](https://developers.google.com/web/tools/lighthouse)是测试网络应用程序质量的绝佳工具。在Lighthouse中开发了一个强大的Chrome浏览器启动模块，现已将其提取以供独立使用。在[`chrome-launcher`NPM模块](https://www.npmjs.com/package/chrome-launcher) 会发现其中Chrome的安装，设置一个调试实例，启动浏览器，并杀死它，当你的程序就完成了。最好的部分是，借助Node，它可以跨平台工作！

默认情况下，**`chrome-launcher`它将尝试启动Chrome Canary**（如果已安装），但是您可以更改它以手动选择要使用的Chrome。要使用它，请首先从npm安装：

|   |   |
|---|---|
|0<br><br>1|npm i --save chrome-launcher|

**示例**-`chrome-launcher`用于启动Headless

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24<br><br>25<br><br>26<br><br>27<br><br>28<br><br>29|const chromeLauncher = require('chrome-launcher');<br><br>// Optional: set logging level of launcher to see its output.<br><br>// Install it using: npm i --save lighthouse-logger<br><br>// const log = require('lighthouse-logger');<br><br>// log.setLevel('info');<br><br>/**<br><br>* Launches a debugging instance of Chrome.<br><br>* @param {boolean=} headless True (default) launches Chrome in headless mode.<br><br>*     False launches a full version of Chrome.<br><br>* @return {Promise<ChromeLauncher>}<br><br>*/<br><br>function launchChrome(headless=true) {<br><br>  return chromeLauncher.launch({<br><br>    // port: 9222, // Uncomment to force a specific port of your choice.<br><br>    chromeFlags: [<br><br>      '--window-size=412,732',<br><br>      '--disable-gpu',<br><br>      headless ? '--headless' : ''<br><br>    ]<br><br>  });<br><br>}<br><br>launchChrome().then(chrome => {<br><br>  console.log(`Chrome debuggable on port: ${chrome.port}`);<br><br>  ...<br><br>  // chrome.kill();<br><br>});|

运行此脚本并没有多大作用，但是您应该在加载的任务管理器中看到Chrome实例启动`about:blank`。请记住，不会有任何浏览器用户界面。我们无头。

要控制浏览器，我们需要DevTools协议！

#### 检索有关页面的信息

**警告：**DevTools协议可以做很多有趣的事情，但是起初可能有些令人生畏。我建议先花一些时间浏览 [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/)。然后，转到 `chrome-remote-interface`API文档以查看其如何包装原始协议。

让我们安装库：

|   |   |
|---|---|
|0<br><br>1|npm i --save chrome-remote-interface|

##### 例子

**示例**-打印用户代理

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8|const CDP = require('chrome-remote-interface');<br><br>...<br><br>launchChrome().then(async chrome => {<br><br>  const version = await CDP.Version({port: chrome.port});<br><br>  console.log(version['User-Agent']);<br><br>});|

结果如下： `HeadlessChrome/60.0.3082.0`

**示例**-检查网站是否具有[Web应用程序清单](https://developers.google.com/web/fundamentals/web-app-manifest)

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24<br><br>25<br><br>26<br><br>27<br><br>28<br><br>29<br><br>30<br><br>31<br><br>32|const CDP = require('chrome-remote-interface');<br><br>...<br><br>(async function() {<br><br>const chrome = await launchChrome();<br><br>const protocol = await CDP({port: chrome.port});<br><br>// Extract the DevTools protocol domains we need and enable them.<br><br>// See API docs: https://chromedevtools.github.io/devtools-protocol/<br><br>const {Page} = protocol;<br><br>await Page.enable();<br><br>Page.navigate({url: 'https://www.chromestatus.com/'});<br><br>// Wait for window.onload before doing stuff.<br><br>Page.loadEventFired(async () => {<br><br>  const manifest = await Page.getAppManifest();<br><br>  if (manifest.url) {<br><br>    console.log('Manifest: ' + manifest.url);<br><br>    console.log(manifest.data);<br><br>  } else {<br><br>    console.log('Site has no app manifest');<br><br>  }<br><br>  protocol.close();<br><br>  chrome.kill(); // Kill Chrome.<br><br>});<br><br>})();|

**示例**-`<title>`使用DOM API提取页面的。

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24<br><br>25<br><br>26<br><br>27<br><br>28<br><br>29|const CDP = require('chrome-remote-interface');<br><br>...<br><br>(async function() {<br><br>const chrome = await launchChrome();<br><br>const protocol = await CDP({port: chrome.port});<br><br>// Extract the DevTools protocol domains we need and enable them.<br><br>// See API docs: https://chromedevtools.github.io/devtools-protocol/<br><br>const {Page, Runtime} = protocol;<br><br>await Promise.all([Page.enable(), Runtime.enable()]);<br><br>Page.navigate({url: 'https://www.chromestatus.com/'});<br><br>// Wait for window.onload before doing stuff.<br><br>Page.loadEventFired(async () => {<br><br>  const js = "document.querySelector('title').textContent";<br><br>  // Evaluate the JS expression in the page.<br><br>  const result = await Runtime.evaluate({expression: js});<br><br>  console.log('Title of page: ' + result.result.value);<br><br>  protocol.close();<br><br>  chrome.kill(); // Kill Chrome.<br><br>});<br><br>})();|

## 使用Selenium，W​​ebDriver和ChromeDriver

现在，Selenium打开了完整的Chrome实例。换句话说，这是一个自动化的解决方案，但并非完全没有意义。但是，只需完成一些工作，即可将Selenium配置为运行无头Chrome。 如果您想要有关如何[自行](https://intoli.com/blog/running-selenium-with-headless-chrome/)设置的完整说明，我建议 [使用Headless Chrome运行Selenium](https://intoli.com/blog/running-selenium-with-headless-chrome/)，但是我在下面的一些示例中为您入门。

#### 使用ChromeDriver

[ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/) 2.32使用Chrome 61，并与无头Chrome兼容。

安装：

|   |   |
|---|---|
|0<br><br>1|npm i --save-dev selenium-webdriver chromedriver|

例：

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24|const fs = require('fs');<br><br>const webdriver = require('selenium-webdriver');<br><br>const chromedriver = require('chromedriver');<br><br>const chromeCapabilities = webdriver.Capabilities.chrome();<br><br>chromeCapabilities.set('chromeOptions', {args: ['--headless']});<br><br>const driver = new webdriver.Builder()<br><br>  .forBrowser('chrome')<br><br>  .withCapabilities(chromeCapabilities)<br><br>  .build();<br><br>// Navigate to google.com, enter a search.<br><br>driver.get('https://www.google.com/');<br><br>driver.findElement({name: 'q'}).sendKeys('webdriver');<br><br>driver.findElement({name: 'btnG'}).click();<br><br>driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);<br><br>// Take screenshot of results page. Save to disk.<br><br>driver.takeScreenshot().then(base64png => {<br><br>  fs.writeFileSync('screenshot.png', new Buffer(base64png, 'base64'));<br><br>});<br><br>driver.quit();|

#### 使用WebDriverIO

[WebDriverIO](http://webdriver.io/)是Selenium WebDriver之上的更高级别的API。

安装：

|   |   |
|---|---|
|0<br><br>1|npm i --save-dev webdriverio chromedriver|

示例：在chromestatus.com上过滤CSS功能

|   |   |
|---|---|
|0<br><br>1<br><br>2<br><br>3<br><br>4<br><br>5<br><br>6<br><br>7<br><br>8<br><br>9<br><br>10<br><br>11<br><br>12<br><br>13<br><br>14<br><br>15<br><br>16<br><br>17<br><br>18<br><br>19<br><br>20<br><br>21<br><br>22<br><br>23<br><br>24<br><br>25<br><br>26<br><br>27<br><br>28<br><br>29<br><br>30<br><br>31<br><br>32<br><br>33<br><br>34<br><br>35<br><br>36<br><br>37<br><br>38<br><br>39<br><br>40<br><br>41<br><br>42<br><br>43<br><br>44<br><br>45<br><br>46|const webdriverio = require('webdriverio');<br><br>const chromedriver = require('chromedriver');<br><br>const PORT = 9515;<br><br>chromedriver.start([<br><br>  '--url-base=wd/hub',<br><br>  `--port=${PORT}`,<br><br>  '--verbose'<br><br>]);<br><br>(async () => {<br><br>const opts = {<br><br>  port: PORT,<br><br>  desiredCapabilities: {<br><br>    browserName: 'chrome',<br><br>    chromeOptions: {args: ['--headless']}<br><br>  }<br><br>};<br><br>const browser = webdriverio.remote(opts).init();<br><br>await browser.url('https://www.chromestatus.com/features');<br><br>const title = await browser.getTitle();<br><br>console.log(`Title: ${title}`);<br><br>await browser.waitForText('.num-features', 3000);<br><br>let numFeatures = await browser.getText('.num-features');<br><br>console.log(`Chrome has ${numFeatures} total features`);<br><br>await browser.setValue('input[type="search"]', 'CSS');<br><br>console.log('Filtering features...');<br><br>await browser.pause(1000);<br><br>numFeatures = await browser.getText('.num-features');<br><br>console.log(`Chrome has ${numFeatures} CSS features`);<br><br>const buffer = await browser.saveScreenshot('screenshot.png');<br><br>console.log('Saved screenshot...');<br><br>chromedriver.stop();<br><br>browser.end();<br><br>})();|

## 更多资源

以下是一些帮助您入门的有用资源：

文件

- [DevTools协议查看器](https://chromedevtools.github.io/devtools-protocol/)-API参考文档

工具类

- [chrome-remote-interface-](https://www.npmjs.com/package/chrome-remote-interface)包装DevTools协议的节点模块
- [Lighthouse-](https://github.com/GoogleChrome/lighthouse)用于测试Web应用程序质量的自动化工具；大量使用该协议
- [chrome-launcher-](https://github.com/GoogleChrome/lighthouse/tree/master/chrome-launcher)用于启动Chrome的节点模块，准备进行自动化

演示版

- “ [The Headless Web](https://paul.kinlan.me/the-headless-web/) ”-保罗·金兰（Paul Kinlan）在api.ai上使用Headless的精彩博客文章。

## 常问问题

**我需要`--disable-gpu`旗帜吗？**

仅在Windows上。其他平台不再需要它。该`--disable-gpu`标志是一些错误的临时解决方法。在以后的Chrome版本中，您将不需要此标志。有关 更多信息，请参见[crbug.com/737678](https://bugs.chromium.org/p/chromium/issues/detail?id=737678)。

**所以我仍然需要Xvfb吗？**

不会。无头Chrome不会使用窗口，因此不再需要Xvfb之类的显示服务器。没有它，您可以愉快地运行自动化测试。

什么是Xvfb？Xvfb是用于类似Unix的系统的内存显示服务器，使您无需附加物理显示就可以运行图形应用程序（例如Chrome）。许多人使用Xvfb运行早期版本的Chrome进行“无头”测试。

**如何创建运行Headless Chrome的Docker容器？**

看看[lighthouse-ci](https://github.com/ebidel/lighthouse-ci)。它的 [例子Dockerfile](https://github.com/ebidel/lighthouse-ci/blob/master/builder/Dockerfile) 使用`node:8-slim`作为基础图像，安装+ [运行灯塔](https://github.com/ebidel/lighthouse-ci/blob/master/builder/entrypoint.sh) 上应用程序引擎的Flex。

**注意：**如果您 在容器中[正确设置了用户](https://github.com/ebidel/lighthouse-ci/blob/master/builder/Dockerfile#L35-L40)，则不需要 。 `--no-sandbox`

**我可以将其与Selenium / WebDriver / ChromeDriver一起使用**吗？

是。请参阅[使用Selenium，W​​ebDrive或ChromeDriver](https://developers.google.com/web/updates/2017/04/headless-chrome#drivers)。

**这和PhantomJS有什么关系？**

无头Chrome类似于[PhantomJS之](http://phantomjs.org/)类的工具。两者均可用于无头环境中的自动化测试。两者之间的主要区别是Phantom使用旧版本的WebKit作为其渲染引擎，而Headless Chrome使用最新版本的Blink。

目前，Phantom还提供了比[DevTools协议](https://chromedevtools.github.io/devtools-protocol/)更高级别的API 。

**我在哪里报告错误？**

有关无头Chrome的错误，请将其归档在[crbug.com上](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink&blocking=705916&cc=skyostil%40chromium.org&Proj=Headless)。

对于DevTools协议中的错误，请将其归档在[github.com/ChromeDevTools/devtools-protocol上](https://github.com/ChromeDevTools/devtools-protocol/issues/new)。

原文：https://developers.google.com/web/updates/2017/04/headless-chrome