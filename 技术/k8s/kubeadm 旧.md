kubeadm
安装：(mem2g; mac,product_uuid; bridged traffic; Swap disabled; kubelet每隔几秒会启动,等待kubeadm初始control-plane后正常)
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
创建集群:
Objectives
Install a single control-plane Kubernetes cluster or high-availability cluster
Install a Pod network on the cluster so that your Pods can talk to each other
初始control-plane node,包括 etcd (the cluster database) and the API Server(kubectl 与其通信)
```
1，--control-plane-endpoint高可用设置为dns或负载均衡ip
2，Installing a Pod network add-on. pod相互通信
master https://docs.projectcalico.org/getting-started/kubernetes/quickstart
3，kubeadm init (journalctl -eu docker.service 可以看到docker没用代理, kubeadm环境变量中不能有proxy)
sudo kubeadm init --pod-network-cidr=192.168.0.0/16 
```

https://docs.docker.com/config/daemon/systemd/#httphttps-proxy
配置cali,启动时间较长（相关信息journalctl -fu kubelet, watch kubectl get pods --all-namespaces）

运行stateless应用:(kubectl get events, master: kubeadm token list, worker: 
kubeadm join --discovery-token <TOKEN> --discovery-token-unsafe-skip-ca-verification 192.168.137.200:6443, hostname要改)
https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/

暴露Deployment
https://kubernetes.io/docs/tutorials/stateless-application/expose-external-ip-address/
https://kubernetes.io/docs/tutorials/kubernetes-basics/expose/expose-intro/
https://kubernetes.io/docs/concepts/services-networking/service/
NodePort: Exposes the Service on each Node's IP at a static port (the NodePort). A ClusterIP Service, to which the NodePort Service routes, is automatically created. You'll be able to contact the NodePort Service, from outside the cluster, by requesting <NodeIP>:<NodePort>.
https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/
```
kubectl expose deployment hello-world --name=my-service
kubectl describe services my-service
kubectl get pods --output=wide
kubectl get services my-service
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80




apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
spec:
  ports:
  - port: 80
    protocol: TCP
  type: NodePort
  selector:
    run: my-nginx
```

这样就可以将nodePort bind任意地址
kubectl get service
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP        45h
my-nginx     NodePort    10.100.243.146   <none>        80:32140/TCP   12s

ss -tln
...
LISTEN      0      128                                                         *:32140

kubectl proxy --help
应用级别代理到api server, 这样外网可访问
kubectl proxy --address='0.0.0.0' --accept-hosts='^*$' 

使用管理：
https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/

