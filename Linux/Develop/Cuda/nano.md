https://docs.nvidia.com/jetson/archives/l4t-archived/l4t-282/index.html#page/Tegra%2520Linux%2520Driver%2520Package%2520Development%2520Guide%2Fjetson_tx1_camera_soft_archi.html%23wwpID0E0UB0HA
https://stackoverflow.com/questions/46219454/how-to-open-a-gstreamer-pipeline-from-opencv-with-videowriter
https://developer.ridgerun.com/wiki/index.php?title=Gstreamer_pipelines_for_Jetson_TX1
https://devtalk.nvidia.com/
---

 gst-launch-1.0 nvarguscamerasrc ! 'video/x-raw(memory:NVMM),width=3820, height=2464, framerate=21/1, format=NV12' ! nvvidconv flip-method=0 ! 'video/x-raw,width=960, height=616' ! nvvidconv ! nvegltransform ! nveglglessink -e

const char* gst = "nvarguscamerasrc wbmode=0 awblock=true gainrange=\"1 1\" ispdigitalgainrange=\"2 2\" exposuretimerange=\"50000000 50000000\" aelock=true ! video/x-raw(memory:NVMM), format=(string)NV12, width=(int)640, height=(int)480, framerate=(fraction)120/1 ! \
      nvvidconv ! video/x-raw, format=(string)BGRx ! \
      videoconvert ! video/x-raw, format=(string)BGR ! \
      appsink”;

nvarguscamerasrc wbmode=0 awblock=true gainrange="1 1" ispdigitalgainrange="2 2" exposuretimerange="50000000 50000000" aelock=true ! video/x-raw(memory:NVMM), format=(string)NV12, width=(int)640, height=(int)480, framerate=(fraction)120/1 ! nvvidconv ! video/x-raw, format=(string)BGRx ! videoconvert ! video/x-raw, format=(string)BGR ! appsink 

nvarguscamerasrc ! video/x-raw(memory:NVMM), width=(int)1280, height=(int)720, format=(string)NV12, framerate=(fraction)60/1 ! nvvidconv flip-method=0 ! video/x-raw, width=(int)1280, height=(int)720, format=(string)BGRx ! videoconvert ! video/x-raw, format=(string)BGR ! appsink

这个不错! opencv帧数会迁就gst最高帧数限制
gst-launch-1.0 nvarguscamerasrc ! 'video/x-raw(memory:NVMM),width=3820, height=2464, framerate=21/1, format=NV12' ! nvvidconv flip-method=0 ! 'video/x-raw,format=(string)YUY2' ! jpegenc ! rtpjpegpay ! udpsink host=127.0.0.1 port=5000
cv::VideoCapture cap("udpsrc port=5000 ! application/x-rtp,media=video,payload=26,clock-rate=90000,encoding-name=JPEG,framerate=30/1 ! rtpjpegdepay ! jpegdec ! videoconvert ! appsink", cv::CAP_GSTREAMER);
test:
gst-launch-1.0 nvarguscamerasrc ! 'video/x-raw(memory:NVMM), width=(int)1280, height=(int)720, format=(string)NV12, framerate=(fraction)2/1' ! nvvidconv flip-method=0 ! 'video/x-raw,width=960, height=616' ! nvvidconv ! nvegltransform ! nveglglessink -e

---
@reboot screen -S gstream -dm /home/apollo/run-gstr
@reboot screen -S traffic -dm bash -c /home/apollo/run-traffic

gst-launch-1.0 nvarguscamerasrc ! 'video/x-raw(memory:NVMM),width=(int)640, height=(int)360, framerate=12/1, format=NV12'! nvvidconv ! 'video/x-raw,format=(string)YUY2' ! jpegenc ! rtpjpegpay ! udpsink host=127.0.0.1 port=5000

cd /home/apollo/traffic
source ./venv/bin/activate
CCTVLIB=/opt/traffic/libs python ./mysite/manage.py runserver 0.0.0.0:8000

在~/.profile中加入 screen -S traffic -dm bash -c ~/run-traffic 这样可以在桌面下启动窗口

---
https://robo.fish/wiki/index.php?title=Nvidia_Jetson



---
  gst-launch-1.0 udpsrc port=5000 ! application/x-rtp,media=video,payload=26,clock-rate=90000,encoding-name=JPEG,framerate=30/1 ! rtpjpegdepay ! jpegdec ! videoconvert ! autovideosink
  gst-launch-1.0 nvarguscamerasrc ! 'video/x-raw(memory:NVMM),width=(int)640, height=(int)360, framerate=12/1, format=NV12'! nvvidconv ! 'video/x-raw,format=(string)YUY2' ! jpegenc ! rtpjpegpay ! udpsink host=127.0.0.1 port=5000

  gst-launch-1.0 filesrc location=~/deepstream_sdk_v4.0_jetson/samples/streams/sample_720p.h264 ! h264parse ! avdec_h264 ! xvimagesink

http://www.itdaan.com/blog/2015/11/04/9247960bb8aba830f2aa886364f1276b.html

---
import cv2

cap = cv2.VideoCapture("udpsrc host=192.168.0.249 port=5000 ! application/x-rtp, media=video, payload=26, clock-rate=90000, encoding-name=JPEG, framerate=30/1 ! rtpjpegdepay ! jpegdec ! videoconvert ! appsink",
  cv2.CAP_GSTREAMER)

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    if ret == True:
      frame = cv2.resize(frame, (640, 360),
                        interpolation=cv2.INTER_CUBIC)
      # Display the resulting frame
      cv2.imshow('frame', frame)

      cv2.waitKey(1)

cv2.destroyAllWindows()
cap.release()
python2 xx.py