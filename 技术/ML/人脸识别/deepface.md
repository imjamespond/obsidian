https://github.com/serengil/deepface

**A Modern Facial Recognition Pipeline** - [`Demo`](https://youtu.be/WnUVYQP4h44)

A modern [**face recognition pipeline**](https://sefiks.com/2020/05/01/a-gentle-introduction-to-face-recognition-in-deep-learning/) consists of 5 common stages: [detect](https://sefiks.com/2020/08/25/deep-face-detection-with-opencv-in-python/), [align](https://sefiks.com/2020/02/23/face-alignment-for-face-recognition-in-python-within-opencv/), [normalize](https://sefiks.com/2020/11/20/facial-landmarks-for-face-recognition-with-dlib/), [represent](https://sefiks.com/2018/08/06/deep-face-recognition-with-keras/) and [verify](https://sefiks.com/2020/05/22/fine-tuning-the-threshold-in-face-recognition/) （检测，对齐，归整，）. While DeepFace handles all these common stages in the background, you don’t need to acquire in-depth knowledge about all the processes behind it. You can just call its verification, find or analysis function with a single line of code.

## **Face Verification** - [`Demo`](https://youtu.be/KRCvkNCOphE)
验证。对比是否同一人
This function verifies face pairs as same person or different persons. It expects exact image paths as inputs. Passing numpy or base64 encoded images is also welcome. Then, it is going to return a dictionary and you should check just its verified key.

```python
result = DeepFace.verify(
  img1_path = "img1.jpg",
  img2_path = "img2.jpg",
)
```

## **Face recognition** - [`Demo`](https://youtu.be/Hrjp-EStM_s)
多次验证。 df有开箱的解决，查找db返回pandas数据列表，
[Face recognition](https://sefiks.com/2020/05/25/large-scale-face-recognition-for-deep-learning/) requires applying face verification many times. Herein, deepface has an out-of-the-box find function to handle this action. It's going to look for the identity of input image in the database path and it will return list of pandas data frame as output. Meanwhile, facial embeddings of the facial database are stored in a pickle file to be searched faster in next time. Result is going to be the size of faces appearing in the source image. Besides, target images in the database can have many faces as well.

```python
dfs = DeepFace.find(
  img_path = "img1.jpg",
  db_path = "C:/workspace/my_db",
)
```

## **Embeddings** - [`Demo`](https://youtu.be/OYialFo7Qo4)
模型以多维矢量代表人像，可直接取得
Face recognition models basically represent facial images as multi-dimensional vectors. Sometimes, you need those embedding vectors directly. DeepFace comes with a dedicated representation function. Represent function returns a list of embeddings. Result is going to be the size of faces appearing in the image path.

```python
embedding_objs = DeepFace.represent(
  img_path = "img.jpg"
)
```


**Face Detection and Alignment** - [`Demo`](https://youtu.be/GZ2p2hj2H5k)

Face detection and alignment are important early stages of a modern face recognition pipeline. [Experiments](https://github.com/serengil/deepface/tree/master/benchmarks) show that detection increases the face recognition accuracy up to 42%, while alignment increases it up to 6%. [`OpenCV`](https://sefiks.com/2020/02/23/face-alignment-for-face-recognition-in-python-within-opencv/), [`Ssd`](https://sefiks.com/2020/08/25/deep-face-detection-with-opencv-in-python/), [`Dlib`](https://sefiks.com/2020/07/11/face-recognition-with-dlib-in-python/), [`MtCnn`](https://sefiks.com/2020/09/09/deep-face-detection-with-mtcnn-in-python/), `Faster MtCnn`, [`RetinaFace`](https://sefiks.com/2021/04/27/deep-face-detection-with-retinaface-in-python/), [`MediaPipe`](https://sefiks.com/2022/01/14/deep-face-detection-with-mediapipe/), `Yolo`, `YuNet` and `CenterFace` ==detectors are **wrapped** in deepface.==

[![|400](https://raw.githubusercontent.com/serengil/deepface/master/icon/detector-portfolio-v6.jpg)](https://raw.githubusercontent.com/serengil/deepface/master/icon/detector-portfolio-v6.jpg)

All deepface functions accept optional detector backend and align input arguments. You can switch among those detectors and alignment modes with these arguments. ==OpenCV is **the default **detector ==and alignment is on by default.

```python
backends = [
  'opencv', 
  'ssd', 
  'dlib', 
  'mtcnn', 
  'fastmtcnn',
  'retinaface', 
  'mediapipe',
  'yolov8',
  'yunet',
  'centerface',
]

alignment_modes = [True, False]

#face verification
obj = DeepFace.verify(
  img1_path = "img1.jpg", 
  img2_path = "img2.jpg", 
  detector_backend = backends[0],
  align = alignment_modes[0],
)

#face recognition
dfs = DeepFace.find(
  img_path = "img.jpg", 
  db_path = "my_db", 
  detector_backend = backends[1],
  align = alignment_modes[0],
)

#embeddings
embedding_objs = DeepFace.represent(
  img_path = "img.jpg", 
  detector_backend = backends[2],
  align = alignment_modes[0],
)

#facial analysis
demographies = DeepFace.analyze(
  img_path = "img4.jpg", 
  detector_backend = backends[3],
  align = alignment_modes[0],
)

#face detection and alignment
face_objs = DeepFace.extract_faces(
  img_path = "img.jpg", 
  detector_backend = backends[4],
  align = alignment_modes[0],
)
```