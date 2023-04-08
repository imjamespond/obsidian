
https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html#install-jetson-sdk-components
```
$ sudo nvpmodel -m 0
$ sudo jetson_clocks
```

./samples/configs/deepstream-app/source8_1080p_dec_infer-resnet_tracker_tiled_display_fp16_nano.txt
```
画面排列
[tiled-display]
enable=1
rows=2
columns=2

视频源，同时处理几个源
[source0]
enable=1
#Type - 1=CameraV4L2 2=URI 3=MultiURI 4=RTSP
type=3
uri=file://../../streams/sample_1080p_h264.mp4
num-sources=1

追踪，画面row,col小时才显示id？🙈
[tracker]
enable=1
# For the case of NvDCF tracker, tracker-width and tracker-height must be a multiple of 32, respectively
tracker-width=640
tracker-height=384
#ll-lib-file=/opt/nvidia/deepstream/deepstream-5.1/lib/libnvds_mot_iou.so
#ll-lib-file=/opt/nvidia/deepstream/deepstream-5.1/lib/libnvds_nvdcf.so
ll-lib-file=/opt/nvidia/deepstream/deepstream-5.1/lib/libnvds_mot_klt.so
#ll-config-file required for DCF/IOU only
#ll-config-file=tracker_config.yml
#ll-config-file=iou_config.txt
gpu-id=0

不要同步帧，否则会drop丢帧..
[sink0]
enable=1
#Type - 1=FakeSink 2=EglSink 3=File
type=5
sync=0
```


--- 
cd deepstream_sdk_v4.0_jetson/sources/apps/sample_apps/deepstream-app
make

- 所有推测器完成后调用

```
static void
all_bbox_generated (AppCtx * appCtx, GstBuffer * buf, NvDsBatchMeta * batch_meta, guint index)
…
g_print("display_text: %s, x: %d, y: %d, w: %d, h: %d \n",
obj->text_params.display_text,
obj->text_params.x_offset, obj->text_params.y_offset,
obj->rect_params.width, obj->rect_params.height);
```



-  配置中的source

```
[source0]
enable=1
#Type - 1=CameraV4L2 2=URI 3=MultiURI 4=RTSP 5=CSI
type=5
camera-width=1280
camera-height=720
camera-fps-n=30
camera-fps-d=1

```



