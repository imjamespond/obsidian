
剪藏来源: 关于video标签blob地址 - 知乎


#

https://www.zhihu.com/?utm_source=wechat_session&utm_campaign=guest_feed&utm_content=guide&utm_medium=social&utm_id=0


https://www.zhihu.com/signin?next=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F166014722%3Futm_source%3Dwechat_session%26utm_medium%3Dsocial%26s_r%3D0%26utm_id%3D0


关于blob

2 年前

https://www.zhihu.com/people/yu-fei-12-33
Skyfish
互联网，金融，旅游，自由，简单
自从HTML5提供了video标签，在网页中播放视频已经变成一个非常简单的事，只要一个video标签，src属性设置为视频的地址就完事了。由于src指向真实的视频网络地址，在早期一般网站资源文件不怎么通过referer设置防盗链，当我们拿到视频的地址后可以随意的下载或使用（每次放假回家，就会有亲戚找我帮忙从一些视频网站上下东西）。

	目前的云存储服务商大部分都支持referer防盗链。其原理就是在访问资源时，请求头会带上发起请求的页面地址，判断其不存在（表示直接访问图片地址）或不在白名单内，即为盗链。

可是从某个时间开始我们打开调试工具去看各大视频网站的视频src会发现，它们统统变成了这样的形式。







拿b站的一个视频来看，红框中的视频地址，这个blob是个什么东西？。

其实这个Blob URL也不是什么新技术，国内外出来都有一阵子了，但是网上的相关的文章不多也不是很详细，今天就和大家一起分享学习一下。


Blob和ArrayBuffer


最早是数据库直接用Blob来存储二进制数据对象，这样就不用关注存储数据的格式了。在web领域，Blob对象表示一个只读原始数据的类文件对象，虽然是二进制原始数据但是类似文件的对象，因此可以像操作文件对象一样操作Blob对象。

ArrayBuffer对象用来表示通用的、固定长度的原始二进制数据缓冲区。我们可以通过new ArrayBuffer(length)来获得一片连续的内存空间，它不能直接读写，但可根据需要将其传递到TypedArray视图或 DataView 对象来解释原始缓冲区。实际上视图只是给你提供了一个某种类型的读写接口，让你可以操作ArrayBuffer里的数据。TypedArray需指定一个数组类型来保证数组成员都是同一个数据类型，而DataView数组成员可以是不同的数据类型。

TypedArray视图的类型数组对象有以下几个:

- •  
  Int8Array：8位有符号整数，长度1个字节。
- •  
  Uint8Array：8位无符号整数，长度1个字节。
- •  
  Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
- •  
  Int16Array：16位有符号整数，长度2个字节。
- •  
  Uint16Array：16位无符号整数，长度2个字节。
- •  
  Int32Array：32位有符号整数，长度4个字节。
- •  
  Uint32Array：32位无符号整数，长度4个字节。
- •  
  Float32Array：32位浮点数，长度4个字节。
- •  
  Float64Array：64位浮点数，长度8个字节。

Blob与ArrayBuffer的区别是，除了原始字节以外它还提供了mime type作为元数据，Blob和ArrayBuffer之间可以进行转换。

	File对象其实继承自Blob对象，并提供了提供了name ， lastModifiedDate， size ，type 等基础元数据。

创建Blob对象并转换成ArrayBuffer：

```
//创建一个以二进制数据存储的html文件
const text = "<div>hello world</div>";
const blob = new Blob([text], { type: "text/html" }); // Blob {size: 22, type: "text/html"}
//以文本读取
const textReader = new FileReader();
textReader.readAsText(blob);
textReader.onload = function() {
  console.log(textReader.result); // <div>hello world</div>
};
//以ArrayBuffer形式读取
const bufReader = new FileReader();
bufReader.readAsArrayBuffer(blob);
bufReader.onload = function() {
  console.log(new Uint8Array(bufReader.result)); // Uint8Array(22) [60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62]
};
复制代码
```

创建一个相同数据的ArrayBuffer，并转换成Blob：

```
//我们直接创建一个Uint8Array并填入上面的数据
const u8Buf = new Uint8Array([60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62]);
const u8Blob = new Blob([u8Buf], { type: "text/html" }); // Blob {size: 22, type: "text/html"}
const textReader = new FileReader();


textReader.readAsText(u8Blob);
textReader.onload = function() {
  console.log(textReader.result); // 同样得到div>hello world</div>
};
复制代码
```

更多Blob和ArrayBuffer的相关内容可以参看下面的资料：

- •  
  MDN Blob
- •  
  MDN ArrayBuffer
- •  
  阮一峰js标准参考教程二进制数组

URL.createObjectURL


video标签，audio标签还是img标签的src属性，不管是相对路径，绝对路径，或者一个网络地址，归根结底都是指向一个文件资源的地址。既然我们知道了Blob其实是一个可以当作文件用的二进制数据，那么只要我们可以生成一个指向Blob的地址，是不是就可以用在这些标签的src属性上，答案肯定是可以的，这里我们要用到的就是URL.createObjectURL()。

```
const objectURL = URL.createObjectURL(object); //blob:http://localhost:1234/abcedfgh-1234-1234-1234-abcdefghijkl
复制代码
```

这里的object参数是用于创建URL的File对象、Blob 对象或者 MediaSource 对象，生成的链接就是以blob:开头的一段地址，表示指向的是一个二进制数据。

其中localhost:1234是当前网页的主机名称和端口号，也就是location.host，而且这个Blob URL是可以直接访问的。需要注意的是，即使是同样的二进制数据，每调用一次URL.createObjectURL方法，就会得到一个不一样的Blob URL。这个URL的存在时间，等同于网页的存在时间，一旦网页刷新或卸载，这个Blob URL就失效。

通过URL.revokeObjectURL(objectURL) 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了,允许平台在合适的时机进行垃圾收集。

	如果是以文件协议打开的html文件（即url为file://开头），则地址中http://localhost:1234会变成null，而且此时这个Blob URL是无法直接访问的。


实战一：上传图片预览


有时我们通过input上传图片文件之前，会希望可以预览一下图片，这个时候就可以通过前面所学到的东西实现，而且非常简单。

html

```
<input id="upload" type="file" />
<img id="preview" src="" alt="预览"/>
复制代码
```

javascript

```
const upload = document.querySelector("#upload");
const preview = document.querySelector("#preview");


upload.onchange = function() {
  const file = upload.files[0]; //File对象
  const src = URL.createObjectURL(file); 
  preview.src = src;
};
复制代码
```

这样一个图片上传预览就实现了，同样这个方法也适用于上传视频的预览。


实战二：以Blob URL加载网络视频


现在我们有一个网络视频的地址，怎么能将这个视频地址变成Blob URL是形式呢，思路肯定是先要拿到存储这个视频原始数据的Blob对象，但是不同于input上传可以直接拿到File对象，我们只有一个网络地址。

我们知道平时请求接口我们可以使用xhr（jquery里的ajax和axios就是封装的这个）或fetch，请求一个服务端地址可以返回我们相应的数据，那如果我们用xhr或者fetch去请求一个图片或视频地址会返回什么呢？当然是返回图片和视频的数据，只不过要设置正确responseType才能拿到我们想要的格式数据。

```
function ajax(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.responseType = "blob"; // ""|"text"-字符串 "blob"-Blob对象 "arraybuffer"-ArrayBuffer对象
  xhr.onload = function() {
    cb(xhr.response);
  };
  xhr.send();
}
复制代码
```

	注意XMLHttpRequest和Fetch API请求会有跨域问题，可以通过跨域资源共享(CORS)解决。

看到responseType可以设置blob和arraybuffer我们应该就有谱了，请求返回一个Blob对象，或者返回ArrayBuffer对象转换成Blob对象，然后通过createObjectURL生成地址赋值给视频的src属性就可以了,这里我们直接请求一个Blob对象。

```
ajax('video.mp4', function(res){
    const src = URL.createObjectURL(res); 
    video.src = src;
})
复制代码
```

用调试工具查看视频标签的src属性已经变成一个Blob URL，表面上看起来是不是和各大视频网站形式一致了，但是考虑一个问题，这种形式要等到请求完全部视频数据才能播放，小视频还好说，要是视频资源大一点岂不爆炸，显然各大视频网站不可能这么干。

解决这个问题的方法就是流媒体，其带给我们最直观体验就是使媒体文件可以边下边播（像我这样的90后男性最早体会到流媒体好处的应该是源于那款快子头的播放器），web端如果要使用流媒体，有多个流媒体协议可以供我们选择。


HLS和MPEG DASH


HLS （HTTP Live Streaming）, 是由 Apple 公司实现的基于 HTTP 的媒体流传输协议。HLS以ts为传输格式，m3u8为索引文件（文件中包含了所要用到的ts文件名称，时长等信息，可以用播放器播放，也可以用vscode之类的编辑器打开查看），在移动端大部分浏览器都支持，也就是说你可以用video标签直接加载一个m3u8文件播放视频或者直播，但是在pc端，除了苹果的Safari，需要引入库来支持。

用到此方案的视频网站比如优酷，可以在视频播放时通过调试查看Network里的xhr请求，会发现一个m3u8文件，和每隔一段时间请求几个ts文件。













但是除了HLS，还有Adobe的HDS，微软的MSS，方案一多就要有个标准点的东西，于是就有了MPEG DASH。

DASH（Dynamic Adaptive Streaming over HTTP） ，是一种在互联网上传送动态码率的Video Streaming技术，类似于苹果的HLS，DASH会通过media presentation description (MPD)将视频内容切片成一个很短的文件片段，每个切片都有多个不同的码率，DASH Client可以根据网络的情况选择一个码率进行播放，支持在不同码率之间无缝切换。

Youtube，B站都是用的这个方案。这个方案索引文件通常是mpd文件（类似HLS的m3u8文件功能），传输格式推荐的是fmp4（Fragmented MP4）,文件扩展名通常为.m4s或直接用.mp4。所以用调试查看b站视频播放时的网络请求，会发现每隔一段时间有几个m4s文件请求。







不管是HLS还是DASH们，都有对应的库甚至是高级的播放器方便我们使用，但我们其实是想要学习一点实现。其实抛开掉索引文件的解析拿到实际媒体文件的传输地址，摆在我们面前的只有一个如何将多个视频数据合并让video标签可以无缝播放。

	与之相关的一篇B站文章推荐给感兴趣的朋友：我们为什么使用DASH


MediaSource


==video标签src指向一个视频地址，视频播完了再将src修改为下一段的视频地址然后播放==，这显然不符合我们无缝播放的要求。其实有了我们前面Blob URL的学习，我们可能就会想到一个思路，用Blob URL指向一个视频二进制数据，==然后不断将下一段视频的二进制数据添加拼接进去。==这样就可以在不影响播放的情况下，不断的更新视频内容并播放下去，想想是不是有点流的意思出来了。

要实现这个功能我们要通过MediaSource来实现，MediaSource接口功能也很纯粹，作为一个媒体数据容器可以和HTMLMediaElement进行绑定。基本流程就是通过URL.createObjectURL创建容器的BLob URL，设置到video标签的src上，在播放过程中，我们仍然可以通过MediaSource.appendBuffer方法往容器里添加数据，达到更新视频内容的目的。

实现代码如下：

```
const video = document.querySelector('video');
//视频资源存放路径，假设下面有5个分段视频 video1.mp4 ~ video5.mp4，第一个段为初始化视频init.mp4
const assetURL = "http://www.demo.com";
//视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'; 
if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource); //将video与MediaSource绑定，此处生成一个Blob URL
  mediaSource.addEventListener('sourceopen', sourceOpen); //可以理解为容器打开
} else {
  //浏览器不支持该视频格式
  console.error('Unsupported MIME type or codec: ', mimeCodec);
}


function sourceOpen () {
  const mediaSource = this;
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  function getNextVideo(url) {
    //ajax代码实现翻看上文，数据请求类型为arraybuffer
    ajax(url, function(buf) {
      //往容器中添加请求到的数据，不会影响当下的视频播放。
      sourceBuffer.appendBuffer(buf);
    });
  }
  //每次appendBuffer数据更新完之后就会触发
  sourceBuffer.addEventListener("updateend", function() {
    if (i === 1) {
      //第一个初始化视频加载完就开始播放
      video.play();
    }
    if (i < 6) {
      //一段视频加载完成后，请求下一段视频
      getNextVideo(`${assetURL}/video${i}.mp4`);
    }
    if (i === 6) {
      //全部视频片段加载完关闭容器
      mediaSource.endOfStream();
      URL.revokeObjectURL(video.src); //Blob URL已经使用并加载，不需要再次使用的话可以释放掉。
    }
    i++;
  });
  //加载初始视频
  getNextVideo(`${assetURL}/init.mp4`);
};


复制代码
```

这段代码修改自MDN的MediaSource词条中的示例代码，原例子中只有加载一段视频，我修改为了多段视频，代码里面很多地方还可以优化精简，这里没做就当是为了方便我们看逻辑。

此时我们已经基本实现了一个简易的流媒体播放功能，如果愿意可以再加入m3u8或mpd文件的解析，设计一下UI界面，就可以实现一个流媒体播放器了。

最后提一下一个坑，很多人跑了MDN的MediaSource示例代码，可能会发现使用官方提供的视频是没问题的，但是用了自己的mp4视频就会报错，这是因为fmp4文件扩展名通常为.m4s或直接用.mp4，但却是特殊的mp4文件。


Fragmented MP4


通常我们使用的mp4文件是嵌套结构的，客户端必须要从头加载一个 MP4 文件，才能够完整播放，不能从中间一段开始播放。而Fragmented MP4（简称fmp4），就如它的名字碎片mp4，是由一系列的片段组成，如果服务器支持 byte-range 请求，那么，这些片段可以独立的进行请求到客户端进行播放，而不需要加载整个文件。

我们可以通过这个网站判断一个mp4文件是否为Fragmented MP4，网站地址。

我们通过FFmpeg或Bento4的mp4fragment来将普通mp4转换为Fragmented MP4，两个工具都是命令行工具，按照各自系统下载下来对应的压缩包，解压后设置环境变量指向文件夹中的bin目录，就可以使用相关命令了。

Bento4的mp4fragment，没有太多参数，命令如下:

```
mp4fragment video.mp4 video-fragmented.mp4
复制代码
```

FFmpeg会需要设置一些参数，命令如下：

```
ffmpeg -i video.mp4 -movflags empty_moov+default_base_moof+frag_keyframe video-fragmented.mp4
复制代码
```

	Tips：网上大部分的资料中转换时是不带default_base_moof这个参数的，虽然可以转换成功，但是经测试如果不添加此参数网页中MediaSource处理视频时会报错。

视频的切割分段可以使用Bento4的mp4slipt，命令如下：

```
mp4split video.mp4 --media-segment video-%llu.mp4 --pattern-parameters N
复制代码
```

最后


之所以写这篇文章其实是之前公司有个需求要了解一下Blob URL，稍微看了一下，后来不了了之。这次忙里偷闲重拾起来把它搞清楚，一边学习一边记录，这篇文章中的很多点展开了其实有很多内容，希望大家看了这篇文章能够有所启发或引起兴趣，我的目的也就达到了，另外视频这方面的东西真的是有点深的，文章中如果有错误和疏漏也欢迎大家指出，我将及时修正。

作者：wangzy2019


原文链接


https://juejin.im/post/5d1ea7a8e51d454fd8057bea...
发布于 2020-08-01 22:09

有没有文笔绝佳高质量的言情小说?

小尘
再次见到周逸时，我拿过他手机，熟练地输入我的微信号。周逸薄唇慢慢地吐出几个字，「你在做什么？」我将手机还给他，「一会儿我给你发微信，你记得回。」旁边的学姐惊讶地看着我，「现在学妹追人都那么生猛的吗？」我懒得解释，信步走了。1.我叫徐园，一个苦逼的准大学生。爹不疼娘不爱的我在假期找了份鬼屋 NPC 的工作。我是里面业绩最好的死鬼。没有一个活人能逃过我的手掌心。我一直都是我们店里的楷模。所以即使今天我肚子疼得要死，我还是坚持上班。可今天我碰上了硬茬。我穿着我飘飘荡荡的工作服，白眼熟练一翻，正打算伸舌头，眼前的男人一脚踹飞了我。痛感在我身上迅速蔓延，本就强撑着的我终于……晕倒了。再睁眼时，眼前是一片刺目的白，身体轻飘飘的，甚至感觉有些空虚。一摸我的腹部，果不其然有个伤口。那一瞬，我眼前闪过了许多的电影片段。难道……我 TM 被黑贩子割肾了？不会是白嫖吧？我便宜卖也行啊。我捂着伤口，眼眶里不由得糊满了泪水。身边传来一声轻咳，一个穿着白色运动套装的男人就站在我身边，黑硬的寸发，鼻峰高挺，黑眸里尽是冷漠，嫣红的薄唇倒是添了几分柔和。「醒了？」声音清清冷冷。呜呜呜，果然是黑贩子的长相。我挣扎着掉下了几颗泪水。他按住我，大手捂住我的额头，探了探温度，自言自语道：「没发烧。」我啪一下打开他的手，「你你你你你你你。」他略带歉疚地看了我一眼。完蛋，这黑贩子居然还会感到抱歉。「不好意思啊，踢了你那一脚，我有危险时就容易有条件反射。」哈？之前的画面涌入了我的脑海。哦，原来是那个胆小还劲儿大的。我指着我的伤口，「那这个……」「哦，我把你抱过来之后，顺便把你的阑尾割了。」凎！我就说怎么觉得身体像是缺了一块似的。「不过你为什么要割我阑尾？」他一言难尽地看着我，「首先，医生割的，还有，你都急性阑尾炎了为什么还去扮 NPC?」「我以为只是普通的姨妈疼。」我还以为提前了。他挑挑眉，「既然你没事，医药费我也付过了，踢你那一脚没什么特别大的问题。」他躬下身，修长的手指捻起我衣服一角，便打算掀开我的病号服。我慌忙捂住，「你干什么？」臭流氓！他舔了下嘴唇，「医生让我看看你伤口出血没。」顿了下，「还有你肚子上的淤青散了没有。」说到肚子上的淤青，我就忍不住吐槽，「你胆子那么小怎么还去鬼屋啊！」他好看的脸上终于浮现出一丝尴尬，「我朋友带我去的，而且……」他郑重申明，「我胆子不小。」我正打算继续怼他，门口便出现了一个身影。是我妈。我顿时噤声，只见她径直走向我面前的……肇事者。「小伙子，谢谢你啦！」我妈脸笑得跟朵花似的。他应付了几句，转向我，「对了，我叫周逸。」给了我一张纸条，「这是我的电话号码，如果你还有什么问题，随时打给我就行，我现在还有事，就先走了。」我随意地点点头，看起来我也不是被他踢晕的。没必要缠着人家。等他走后，我妈才终于正眼看了我一眼，不疼不痒地关心了我几句，然后笑得十分骄傲，「小园啊，他这一脚就让我们家赚了二十万！」看她那样子，似乎还想让周逸再给我来几脚。我妈还在那儿滔滔不绝，神采奕奕的样子像是找到了新财路似的。我听得迷糊，但总算抓到了一个重点。这一脚，让我妈讹了周逸二十万。啥？！我强忍着疼痛便要下床。我要去找他。还没走几步就看到他还在拐角处，戴着蓝牙耳机打电话。「没什么大事儿，就是被讹了点钱而已。」声音慵懒，满不在乎。我额头冒着虚汗，想冲出去解释，却被护士姐姐一把拦下，只能眼睁睁看着他的身影越来越远。不是啊，姐姐，我要去找他。他在诽谤我啊，诽谤我啊！2.你相信命运吗？尽管我以前是个「我命由我不由天」的中二少女，但在大学看到周逸的时候我石化了。这就是孽缘吗？此时他靠在新生接待处的椅背上看着我。而我需要恭恭敬敬地叫一声「学长好」。明明两个月以前他还割过我的阑尾。世界好奇妙。周逸的头发长长了些，闲散地搭在额前，没有了以前「肾贩子」时候的凌厉。倒是有几分清秀学长的模样。「徐园是吧？」他修长的手指接过我的录取通知书。我生无可恋地应了句。他将手续弄完之后就往我身后喊了下一位。正眼都没有多看我一眼。也是，我是讹了他二十万的人，不过现在银行卡还在行李箱里，还没法还给他。于是我并不打算走，而是指着他的手机。「周逸，这是你手机对吧？」他浓眉一挑，并不回答。现在手机并没有锁屏。我眼疾手快地拿过来打开微信，熟练地输入我的微信号。OK。周逸薄唇慢慢地吐出几个字，「你在做什么？」我将手机还给他，「一会儿我给你发微信，你记得回。」他笑了，「你凭什么觉得我会回你？」我信誓旦旦，「你会回的。」旁边的学姐惊讶地看着我，嘀咕了句，「现在学妹追人都那么生猛的吗？」我懒得解释，信步走了。然后一个人扛着行李箱上了三楼。3.等到在寝室安顿好之后，已经快到傍晚了。我立刻给周逸发微信。我：你在哪儿？周逸：你要干什么？我：你别管。周逸：啧。周逸：篮球场。我攥着手里的银行卡走了好一段路才到篮球场。这是从我妈手里偷回来的。想到这里就有些脸红，毕竟她真坑了周逸那么多钱。我看到周逸的时候他刚投了一个三分，并顺手撩起球衣擦了擦汗水。我面目狰狞地比了一个「八」字。这厮居然有八块腹肌。刚刚好周逸看过来，直接走过来。我看到几个在篮球场上围观的女生顺着周逸的脚步看了过来。嘶……「我们还是去一个没人的地方吧。」周逸：「啊？」我在他疑惑的眼神里看到了充分的不信任。但我懒得跟他解释，拽着他的手就走到一个走廊。走了一会儿，周逸停下，尽管有些不耐，但还是好脾气地说：「你到底要做什么？」我将银行卡递给他，「呐，你的二十万。」「你不要？」「我不要，我妈讹了你这件事我刚开始不知道。」他觉得有些好笑，目光落在我手上。「那你把这些钱拿出来你妈知道吗？」我顿住。他笑了一声，抿唇摇头，并不当回事儿，「算了，你自己拿着吧，就当我那一脚的赔偿。」说完他似乎想到了什么，俯下身将手放到了我腰上并掀起了衣服一角。我连忙后退，「啪」地拍掉他的手，大声怼他：「你干什么？」合着你就是为了这个才不要那二十万？他恍然大悟，「不是，医院里看习惯了，我只是想看看淤青好没有。」「什么叫医院里看习惯了？」他解释，「你没醒的时候都是我帮护士给你敷的药。」接着继续说，「你放心，只看了腰。」我一阵无语。然后气急败坏地将银行卡塞在他手里，并且直接上手摸他的腹肌。「你看，我这样摸你你喜欢吗？所以别再来掀我衣服了！」看过了不代表你能一直看，OK？他轻轻勾起嘴角，大手覆在我刚刚摸过的位置上，声音有几分轻佻，「挺喜欢的。」我不可置信地看着他。他看着我的神情，顿时笑得直不起腰。他大手一挥，「行行行，我不看了行吧？」「再见！」最好再也不见！4.可我没想到我的新生生活如此精彩，到校不到两天，就被人挂在了表白墙上。墙上的我是个富婆，包养了我校校草。表白墙发的稿子绘声绘色。【惊天大瓜！】我今天在篮球场走廊那里看到了一个情色交易，照片上的女生将银行卡塞给了周逸！然后周逸就一脸享受地让她摸腹肌！我：地铁老爷爷看手机脸。还附赠了两张图片。一张是我把银行卡给周逸，一张是我摸周逸腹肌。正好抓拍到周逸笑着那一幕。啧，还真像那么回事儿。底下还有些评论：【我就说平时周逸谁都不理，那天在篮球场那个女生一叫他就走了。】【我靠，那个新生我认识，那天她霸道强势地让周逸加了她微信，还跟周逸说：「男人，一会儿记得回我消息。」救命，这就是富婆的底气吗？】然后下面是齐刷刷的评论：【周逸也不想努力了吗？】周逸：风评被害。关我屁事，只恨那个拍照的，把周逸拍得那么好看，怎么到我那儿就十分的狰狞？我嗤笑一声，决定不再管。我校这般八卦，怎么为国家创造 GDP？所以我毅然去做自己的事情。5.上了大学之后第一件事就是找兼职。我去了学校附近看起来环境比较好的网吧面试前台。老板问了我几句话，就直接录用了。「都不用再问一下我时间什么的吗？」老板大手一挥，嘿嘿一笑，「没有过女生来应聘的，你是第一个，肯定收啊，现在就上班可以吗？」「好。」没想到在这儿还能碰到周逸。他们一行人将身份证交给我。周逸看到我的时候还有些诧异，随即又像是想到了我是个穷鬼似的，了然一笑。「以后我多来照顾你生意。」他语气十分熟稔。周围他的兄弟一看他这样，纷纷凑过来看我。「哟，周逸，这是你哪个女朋友啊？」「她啊……」周逸拖着长长的尾音。「包养我那个呗。」听闻这话，我骤然将头抬起来。你 TM 连自己的瓜都吃。还不等我解释，他兄弟就已经在起哄了，纷纷向我敬礼。「嫂子好！」「嫂子好漂亮！」「我作证，逸哥绝对没有出去乱搞过。」周逸手肘顶了一下那个欲盖弥彰的男生。「老子洁身自好得很。」他还颇自豪地说。我终于忍不住开口，「你有病是吧。」周逸弯腰，手靠在前台，欠欠地看着我，「对啊，相思病算吗？金主大人。」我嫌弃地看他一眼。他兄弟看着我们起哄，「嫂子在这儿打工养你啊，逸哥魅力不减当年啊。」我小声嘀咕了一声，「放屁。」然后将身份证给他们，露出我的职业微笑，「一百二十块，谢谢。」他慢悠悠地扫码，还不忘调侃一下我，「不用谢，宝贝儿。」我：***
1.1 万点赞 · 198 评论 · 盐选推荐

评论 2 

写评论

https://www.zhihu.com/people/e421f1b849165651a0b8795d5d307e12
风中的雪糕

讲的很好,去我收藏夹吃灰吧.
2020-08-02


回复
1 

https://www.zhihu.com/people/a614b685b3dbcb41e08ce02119ee8f9b
好好学习
+1
2020-09-03



赞

推荐阅读

探秘Blob与ArrayBuffer
本文主要记录自己在学习js操作二级制数据时的一些探索，补充了Blob Web API和 ArrayBuffer的概念与对应的处理操作。 ArrayBuffer  为什么要引入ArrayBuffer？ 那我们可以先考虑一下为不用我…
sunboy
JavaScript中的Blob你知道多少
李小木

【前端知乎系列】ArrayBuffer 和 Blob 对象
本文首发在我的【个人博客】 更多丰富的前端学习资料，可以查看我的 Github: 《Leo-JavaScript》，内容涵盖数据结构与算法、HTTP、Hybrid、面试题、React、Angular、TypeScript和Webpack等…
王平安 · 发表于CuteJavaScript
GAMIT/GLOBK详细图解
由于全球卫星定位系统的快速发展，在卫星测地学、工程测量、地球动力学、GPS气象学等多种学科中得到了广泛的应用，精密解算GPS观测资料的软件也得到快速发展。其中比较著名的有美国麻省理工…
抄书





