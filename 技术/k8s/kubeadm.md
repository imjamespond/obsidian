https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/
---
Before begin
```
sudo sed -i '/swap/d' /etc/fstab
sudo swapoff -a
sudo yum install ipvsadm tc
sudo systemctl disable firewalld && systemctl stop firewalld
yum install -y /opt/docker/*.rpm
yum install -y /opt/k8s/*.rpm
```

---
Installing kubeadm, kubelet and kubectl 
```
# Set SELinux in permissive mode (effectively disabling it)
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
...
sudo systemctl enable --now kubelet
```

---
Configuring a cgroup driver
https://kubernetes.io/docs/setup/production-environment/container-runtimes/
```
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF


sudo modprobe overlay
sudo modprobe br_netfilter


# Setup required sysctl params, these persist across reboots.
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF


# Apply sysctl params without reboot
sudo sysctl --system
```
Install containerd: 参照docker
```
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  ...
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true

systemctl restart containerd
systemctl enable containerd

[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
    endpoint = ["https://<your_registry>"]
```

https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/
```
# kubeadm-config.yaml
kind: ClusterConfiguration
apiVersion: kubeadm.k8s.io/v1beta3
kubernetesVersion: v1.22.1
---
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
cgroupDriver: systemd
```

https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#config-file
https://kubernetes.io/docs/reference/config-api/kubeadm-config.v1beta2/
https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-config/
```
kubeadm init --config kubeadm-config.yaml --v=10 --pod-network-cidr 10.244.0.0/16
kubeadm config print init-defaults 
kubeadm config images list --v=5 --image-repository registry.aliyuncs.com/google_containers 
```
proxy
```
vi /usr/lib/systemd/system/containerd.service =>[Service] Environment="HTTP_PROXY=host:port"
systemctl daemon-reload && systemctl restart containerd
kubeadm config images pull --kubernetes-version=v1.22.1
```
k8s ctr, awk
```
alias contnd="crictl -r unix:///run/containerd/containerd.sock"
contnd logs CONTAINERID
contnd images list 
contnd images |grep 'registry.aliyuncs.com' | awk '{print $3}'
 ctr -n k8s.io images ls
contnd images list| grep k8s.gcr.io| awk -F "/" '{print $0 "\t" $NF }'| awk '{print "echo .; ctr -n k8s.io i export" $5".tar " $1":"$2 }'| xargs -0 sh -c
ls .| xargs -n1 ctr -n k8s.io i import
```

---
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
Initializing your control-plane node
control-plane node is etcd (the cluster database) and the API Server (which the kubectl command line tool communicates with).
```
export KUBECONFIG=/etc/kubernetes/admin.conf
kubectl 才能连上
```
1,specify the --control-plane-endpoint to set the shared endpoint for all control-plane nodes. 
2,Choose a Pod network add-on, ...
You must deploy a Container Network Interface (CNI) based Pod network add-on so that your Pods can communicate with each other....
https://www.kubernetes.org.cn/6908.html
```
https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
kubectl apply -f <add-on.yaml>
```
3,(Optional) specify the --cri-socket argument to kubeadm init
Installing a Pod network add-on
Control plane node isolation, master可以运行pod
```
kubectl taint nodes --all node-role.kubernetes.io/master-
```

---

```
 kubeadm reset -f
rm -rf /etc/kubernetes /var/lib/etcd /var/lib/kubelet /var/lib/dockershim /var/run/kubernetes /var/lib/cni /etc/cni/net.d
ipvsadm --clear
kubeadm join 192.168.1.51:6443 --token 70p4e2.l0rv2fa222vi1k8x \
    --discovery-token-ca-cert-hash sha256:c140b01cdf3236d4487448bdc5da2983a6d178b04818baefd0840b776110c7cc
```


---
Issues
1, kubeadm无法启动pod, journalctl -fu kubelet, 发现kubelete在请求另外版本的pause,于是导入之即可
```
contnd pull k8s.gcr.io/pause:3.2
 ctr -n k8s.io i export pause-3.2.tar k8s.gcr.io/pause:3.2
contnd pull quay.io/coreos/flannel:v0.14.0
 ctr -n k8s.io i export flannel.tar quay.io/coreos/flannel:v0.14.0
```

2, node not ready, ip route 问题， 不能乱，重装后正常？
```
ip route
default via 192.168.1.1 dev enp0s3 proto static metric 100 
10.244.0.0/24 dev cni0 proto kernel scope link src 10.244.0.1 
192.168.1.0/24 dev enp0s3 proto kernel scope link src 192.168.1.51 metric 100 
```

3. flannel, Error registering network: failed to acquire lease: node "k8s2" pod cidr not assigned
```
安装Kubeadm Init的时候，没有增加 --pod-network-cidr 10.244.0.0/16参数
# master run
sudo cat /etc/kubernetes/manifests/kube-controller-manager.yaml | grep -i cluster-cidr
kubectl patch node k8s2 -p '{"spec":{"podCIDR":"10.244.0.0/24"}}'
or
kind: ClusterConfiguration
networking:
  podSubnet: "10.100.0.1/24" # --pod-network-cidr
```

---
https://blog.csdn.net/wo18237095579/article/details/119956018

生成新的证书 

```
kubeadm alpha certs -h
kubeadm alpha certs renew all
如果你运行了一个 HA 集群，这个命令需要在所有控制面板节点上执行。
```








