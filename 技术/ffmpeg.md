export http_proxy=http://127.0.0.1:8123
export https_proxy=http://127.0.0.1:8123
/d/Programs/ffmpeg-4.3.1-2020-10-01-full_build/bin/ffmpeg -http_proxy http://127.0.0.1:8123 -i ${1} -c copy ${2}.mp4



```
ffmpeg -http_proxy http://127.0.0.1:1086 -i ${1} -c copy ${2}.mp4
```
