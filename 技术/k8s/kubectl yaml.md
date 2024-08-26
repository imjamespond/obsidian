
```
alias ks="kubectl -n kube-system"
alias kc="kubectl"

kubectl get pods -A
kubectl get cs
kubectl get all -n ingress-nginx
```

```
kubectl get DaemonSet -A
kubectl delete DaemonSet kube-flannel-ds -n kube-system 

kc delete -f yaml
```

```
kubectl get configmap -n kube-system
kubectl describe configmap kubelet-config-1.22 -n kube-system
```


```
 kubectl get nodes
kubectl get node -o yaml
```

```
* Drain the node using 
kubectl drain <node-name> --ignore-daemonsets
```


