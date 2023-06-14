TensorRT
https://developer.download.nvidia.com/compute/machine-learning/tensorrt/secure/5.0/GA_5.0.2.6/tars/TensorRT-5.0.2.6.Ubuntu-18.04.1.x86_64-gnu.cuda-10.0.cudnn7.3.tar.gz?DCo4vCLBrWTYgOqga5SX6vTSWeg6KOrPcbf-ah2guN_xeLR-ppu0RuutYLF09MVxGL7HuX6bYU8fkDVWpEAx_QfkabzE9wcPryDeoVvNHRyMjOMjk8H7TtUh6b9Hx6rRDrFC3CvZVjotd08EYfT5LV6PX8qqCGPjna9wJpWAUuUL9ilU6tZe6m-eYowtaqM02JpS_27UDXi_gLZYzVYhHYPLp1NXOpNDxEIhcfSfCVHofAauYQKnOmdmvRcqo0Y7

https://docs.nvidia.com/deeplearning/sdk/tensorrt-install-guide/index.html
4.3. Tar File Installation
 export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:<eg:TensorRT-5.1.x.x/lib>
cd TensorRT-5.1.x.x/python
sudo pip3 install tensorrt-5.1.x.x-cp3x-none-linux_x86_64.whl
cd TensorRT-5.1.x.x/uff
sudo pip3 install uff-0.6.3-py2.py3-none-any.whl
which convert-to-uff
cd TensorRT-5.1.x.x/graphsurgeon
sudo pip3 install graphsurgeon-0.4.1-py2.py3-none-any.whl
 
Deepstream sdk
https://developer.nvidia.com/embedded/deepstream-on-jetson-downloads
https://developer.download.nvidia.cn/compute/machine-learning/deepstream/secure/3.0/DeepStreamSDK-Jetson-3.0_EA_beta5.0.tbz2?c3UFF2R9UFgU6_Q1F0XMiHjGL7EylqtXCsODuI9pxJpaUznki5MzbN2Aeij0rVZNqjthzAumtTZICZ6mVGMNh2La0Wlb6VcFvSVZ5rsmeQno5ZgvWhWAzJWMMLBh3VnT2eCZqA22nEpxHUMjim-wCM4HcAEtw6dPS_4LnKelwqzCsKPU_x6m6OZCVBeYNJQ-7ecIlMbe
先装必要的dependencies
解压编译好的库到系统目录,目前不会自行编译
sudo tar -xvf binaries.tbz2 -C /
sudo ldconfig
kafka不是必须的
, 
Deepstream reference 
https://github.com/NVIDIA-AI-IOT/deepstream_reference_apps/tree/master/yolo
看readme中, 先装prebuild.sh
注意先编译yolo的plugin并安装,不然报one element not found
… cd plugins/gst-yoloplugin-tegra
… cmake -D DS_SDK_ROOT=<DS SDK Root> -D CMAKE_BUILD_TYPE=Release ..
sdk root不包括source
后面相似
cd apps/deepstream-yolo
… cmake

When every thing is done:
deepstream-yolo-app Tegra ~/projects/deepstream_sdk_on_jetson/samples/streams/sample_720p.h264 ./config/yolov2.txt 
(maybe need GUI be disabled)
