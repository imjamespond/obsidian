- 常用
```shell
# 拷贝区间 -to 00:02:00
./ffmpeg -user_agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36" -ss 01:40:23 -i  "https://upos-sz-mirrorali.bilivideo.com/upgcxcode/30/01/1098840130/1098840130-1-16.mp4"  -c copy new.mp4
```

--- 
Merging video and audio, with audio re-encoding

See this example, taken from this blog entry but updated for newer syntax. It should be something to the effect of:
```
ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac output.mp4

```
Here, we assume that the video file does not contain any audio stream yet, and that you want to have the same output format (here, MP4) as the input format.
The above command transcodes the audio, since MP4s cannot carry PCM audio streams. You can use any other desired audio codec if you want. See the FFmpeg Wiki: AAC Encoding Guide for more info.
If your audio or video stream is longer, you can add the -shortest option so that ffmpeg will stop encoding once one file ends.

Copying the audio without re-encoding

If your output container can handle (almost) any codec – like MKV – then you can simply copy both audio and video streams:
```
ffmpeg -i video.mp4 -i audio.wav -c copy output.mkv

```

Replacing audio stream

If your input video already contains audio, and you want to replace it, you need to tell ffmpeg which audio stream to take:
```
ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4

```
The -map option makes ffmpeg only use the first video stream from the first input and the first audio stream from the second input for the output file.

---

```bash
 ~/ffmpeg-5.1.1-amd64-static/ffmpeg -y -progress pipe:1 -i ${1}.mp4 -r 3 -vf scale=-1:72 -preset ultrafast -b:v 30k -b:a 40k ${1}-1.mp4 
-progress pipe:1 输出至stdout
~/ffmpeg-5.1.1-amd64-static/ffmpeg -ss 01:01:23 -i 1.mp4 -r 3 -vf scale=-1:72 -preset ultrafast -b:v 30k -b:a 40k 11.mp4
高度最小72?

使用crf=18非常高质量的 H.264/AVC 编码对其进行编码
ffmpeg -i input.mp4 -vf scale=-1:72 -preset fast -crf 18 output.mp4

-crf（constant rate factor恒定速率因子模式）
-b（bitrate固定目标码率模式）
【-qp 0】设置码率控制模式采用恒定量化器模式，并且画质为无损的画质
ffmpeg -i input.mkv -vcodec libx264 -preset ultrafast -qp 0 output.mkv

【-b:v】主要是控制平均码率
ffmpeg -i input.mp4 -b:v 2000k output.mp4

起止时间
ffmpeg -ss 00:01:23 -i video.mp4 -to 00:02:00 -c copy -copy tscut.mp4

帧率
1、用 -r 参数设置帧率
	ffmpeg –i input –r 25 output
2、用fps的filter设置帧率
	ffmpeg -i 1.mp4 -vf fps=fps=25 11.mp4
例如设置帧率为29.97fps，下面三种方式具有相同的结果：
	ffmpeg -i input.avi -r 29.97 output.mp4
	ffmpeg -i input.avi -r 30000/1001 output.mp4
	ffmpeg -i input.avi -r netsc output.mp4
```

Update 2020: This answer was written in 2009. Since 2013 a video format much better than H.264 is widely available, namely H.265 (better in that it compresses more for the same quality, or gives higher quality for the same size). To use it, ==replace the libx264 codec with libx265,== and push the compression lever further by increasing the CRF value — add, say, 4 or 6, since a reasonable range for H.265 may be 24 to 30. Note that lower CRF values correspond to higher bitrates, and hence produce higher quality videos.
```
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
```

not to re-encode audio at all, i.e. write -c:a copy


---
m3u8
```
ffmpeg -i filename.mp4 -codec: copy -bsf:v h264_mp4toannexb -start_number 0 -hls_time 10 -hls_list_size 0 -f hls filename.m3u8

ffmpeg -i filename.mp4 -profile:v baseline -strict -2 -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls filename.m3u8

Above both commands will convert MP4 VOD files to HLS segment m3u8 / ts files.
```

```
操作简单，但是转换效率很低
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -strict -2 -f hls -hls_list_size 2 -hls_time 15 output.m3u8

效率优化版,共需两步，效率大大提升
-- 视频整体转码ts
ffmpeg -y -i music.mp4  -vcodec copy -acodec copy -vbsf h264_mp4toannexb out\music.ts
-- ts 文件切片
ffmpeg -i music.ts -c copy -map 0 -f segment -segment_list out\music.m3u8 -segment_time 15 out\15s_%3d.ts

```
-hls_time n: 设置每片的长度，默认值为2。单位为秒
-hls_list_size n:设置播放列表保存的最多条目，设置为0会保存有所片信息，默认值为5
-hls_wrap n:设置多少片之后开始覆盖，如果设置为0则不会覆盖，默认值为0.这个选项能够避免在磁盘上存储过多的片，而且能够限制写入磁盘的最多的片的数量
-hls_start_number n:设置播放列表中sequence number的值为number，默认值为0

```
ffmpeg -i foo.mp4 -codec copy -vbsf h264_mp4toannexb -map 0 -f segment -segment_list out.m3u8 -segment_time 10 out%03d.ts
```
为什么要加上参数-vbsf h264_mp4toannexb
官方文档说Convert an H.264 bitstream from length prefixed mode to start code prefixed mode (as defined in the Annex B of the ITU-T H.264 specification).copy h264时用到







--- 

export http_proxy=http://127.0.0.1:8123
export https_proxy=http://127.0.0.1:8123
/d/Programs/ffmpeg-4.3.1-2020-10-01-full_build/bin/ffmpeg -http_proxy http://127.0.0.1:8123 -i ${1} -c copy ${2}.mp4



```
ffmpeg -http_proxy http://127.0.0.1:1086 -i ${1} -c copy ${2}.mp4
```
