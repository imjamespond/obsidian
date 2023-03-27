https://blog.csdn.net/witton/article/details/107085155
Prerequisites:
```
yum remove podman
swapoff -a
sed -i 's/.*swap.*/#&/' /etc/fstab
setenforce 0
sudo sed -i "s/^SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
```

https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd
```
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter
```

# Setup required sysctl params, these persist across reboots.
```
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF
```

# Apply sysctl params without reboot
`sudo sysctl --system`

# (Install containerd)
## Set up the repository
### Install required packages
```
dir=/opt/containerd
yum install --downloadonly --downloaddir $dir yum-utils device-mapper-persistent-data lvm2 

...
yum update -y && sudo yum install -y containerd.io --downloadonly --downloaddir $dir
yum install ./*.rpm
```

https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
....
The kubelet is now restarting every few seconds, as it waits in a crashloop for kubeadm to tell it what to do.不停重启走到kubeadmin正常工作
kubeletsglf

runc使用systemd
`vi /etc/containerd/config.toml`
查找runc.options
`SystemdCgroup = true`

下载镜像
```
kubeadm config  images list 
proxy
mkdir -p /etc/systemd/system/containerd.service.d
cat <<EOF >/etc/systemd/system/containerd.service.d/http-proxy.conf    
[Service]    
Environment="HTTP_PROXY=${HTTP_PROXY:-}"    
Environment="HTTPS_PROXY=${HTTPS_PROXY:-}"    
Environment="NO_PROXY=${NO_PROXY:-localhost},${LOCAL_NETWORK}"    
EOF
systemctl daemon-reload
systemctl restart containerd
kubeadm config images pull -v5
```

导出
https://blog.scottlowe.org/2020/01/25/manually-loading-container-images-with-containerd/
```
alias ccc="crictl -r unix:///run/containerd/containerd.sock"
alias k8s-ctr="ctr -n=k8s.io" #-n=all
ccc images
k8s-ctr images ls | awk '{print $1}' | grep -v sha256 | sed 1,1d > k8s-images.txt

#!/bin/bash
while read -r name; do
  img=`echo ${name} |awk -F/ '{print $2}' |awk -F: '{printf("%s-%s",$1,$2)}'`
  echo "$img"
  ctr -n=k8s.io image export ${img}.tar $name
done < $1

ctr image pull docker.io/calico/node:v3.11.2 

find ./ -name "*.tar"| xargs -n1 ctr -n=k8s.io image import
```



You must deploy a Container Network Interface (CNI) based Pod network add-on so that your Pods can communicate with each other. Cluster DNS (CoreDNS) will not start up before a network is installed.
DNS必须先装network才能运行
....
加上cgroupDriver: systemd
`kubeadm --config=KubeletConfiguration.yaml init --pod-network-cidr=192.168.0.0/16 -v5`

https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/kubelet-integration/#configure-kubelets-using-kubeadm
启动详情
https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/
打印默认配置
`kubeadm config print init-defaults --component-configs KubeletConfiguration > KubeletConfiguration.yaml #注意输出image的版本`
https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/
```
kubelet --cgroup-driver=systemd #deprecated
kubeadm reset --force
kubeadm init --config=./KubeletConfiguration.yaml --cri-socket="unix:///run/containerd/containerd.sock" -v5
自动写入/var/lib/kubelet/kubeadm-flags.env
journalctl -fu kubelet 查看错误, 修改配置
1, cgroupDriver: systemd #cgroup出错
2, #配置默认是1234
advertiseAddress: 0.0.0.0
3,  --pod-network-cidr, 这里卡住...
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
networking:
  podSubnet: "192.168.0.0/16" # --pod-network-cidr
```


