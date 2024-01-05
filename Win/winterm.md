# 通过跳板到内网的server
1, 首先设置一台公网的跳板机
![[Pasted image 20240105234211.png|800]]

2, 配置内网跳板机，这台机已经通过ssh remote forward 将`22`映射到公网的localhost `2222`,
![[Pasted image 20240105234328.png]]

通过刚才外网的机子ssh jump
![[Pasted image 20240105233034.png]]

3, 配置隧道
![[Pasted image 20240105233333.png]]
在本地侦听`12222`, 通过此端口连到目标server 192...111

4, 再建配置一个会话，建立最终连接
![[Pasted image 20240105233550.png]]

