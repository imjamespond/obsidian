[shader 位置](https://datav.aliyuncs.com/share/dc6827ffadd2bb7a9322c7b7724c0904?spm=5176.15036128.0.0.61f)
![[Pasted image 20240705103034.png]]
  

  

![[Pasted image 20240705103053.png]]

这里用了，CylinderGeometry, 的6边形，通过检测地图每个坐标，步进padding, 增加attritube一个对应

变换矩阵
![[Pasted image 20240705103117.png]]
  

然后自定了
![[Pasted image 20240705103130.png]]
设置divisor
![[Pasted image 20240705103229.png]]
  

参考一次绘制多个四边形

[https://www.cnblogs.com/flyfox1982/p/10070578.html](https://www.cnblogs.com/flyfox1982/p/10070578.html)通过gl.vertexAttribDivisor方法指定缓冲区中的每一个值，用于多少个对象，比如divisor = 1，表示每一个值用于一个对象；如果divisor=2，表示一个值用于两个对象。 index表示的attribute变量的地址。

[3万个小球模拟 webgl 实例化测试 drawElementsInstanced](https://www.jianshu.com/p/f3adb9552d74?u_atoken=97272120-9387-4921-bc74-018136da92f8&u_asession=01wdwSWF4gPjBsXaqA9TGOlz4fZzoQCKHizc64PivX87g_M1oNZqAKih0--dGHa1xnX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K9XEtcx8uEVq8EYYleBYJ2Mh4gB_rorF7cG9vr14abfLGBkFo3NEHBv0PZUm6pbxQU&u_asig=05p2mTR4B0vOLS-FNTmkmvtEt5_OWeeNLEP_HxS-2nMuMjOsTfNY3FP-epRYpq-zsiP8qfsz_NUOQmmIdm1pKzRZhjoqdC50sEXqcSVfUeaf09fCM_Ick_5JN84fMLMto3N2q-d33z4sx68tK7gkZhpM3dnfB82vxrIu1MVJWxPFv9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzfwCxj5fTGITMbPI7d6N88LYGPjlCrilzwP9NMPfBh3-U-X92pnuaZyu-ch7KXFYKu3h9VXwMyh6PgyDIVSG1W_hYXFyhpf33YRv-TDeEAIMW9p7hkxq5Nnkc59BnFNJ_JRzlG3ZS2RSH4BWmENENZg3aAPq7NBsatxB6eL_UJ_hmWspDxyAEEo4kbsryBKb9Q&u_aref=UzvzhMKfYaAy7lx02wUizGHXgnQ%3D)

[InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)