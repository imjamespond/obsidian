1.  ERROR from element uri-decode-bin: Invalid URI
路径要用形如：file:///home/user/Downloads/file.avi


2. 运行DeepStream pipline出现:“NvDsBatchMeta not found for input buffer”错误
解决方案:Gst-nvstreammux插件还没有发布。从Deepstream4.0开始Gst-nvstreammux是一个必需的插件。
这是一个管道的例子:
Gst-nvv4l2decoder→Gst-nvstreammux→Gst-nvinfer→Gst-nvtracker→
Gst-nvmultistreamtiler→Gst-nvvideoconvert→Gst-nvosd→Gst-nveglglessink

https://bbs.gpuworld.cn/index.php?action=profile;area=showposts;u=1
