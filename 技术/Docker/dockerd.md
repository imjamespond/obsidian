dockerd --iptables=true --registry-mirror=https://aeronr0f.mirror.aliyuncs.com -g /data/docker
--iptables=true 使用系统iptables作端口转发,==需要开启 systemctl start firewalld==, false使用docker自带的proxy进程
参考:
https://docs.docker.com/engine/userguide/networking/default_network/container-communication/#container-communication-between-hosts
 Since 1.7.0 (2015-06-16) the userland proxy can be disabled in favor of hairpin NAT using the daemon’s --userland-proxy=false flag
 
---
https://docs.docker.com/config/daemon/systemd/

 
---
https://docs.docker.com/engine/reference/commandline/dockerd/

 
---
代理
sudo nvidia-docker run -it --rm ==-v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY== -w /root --env HTTP_PROXY="http://192.168.0.118:8123" --env HTTPS_PROXY="http://192.168.0.118:8123" nvcr.io/nvidia/deepstream:4.0-19.07 