https://www.v2ex.com/t/999755#reply9
如果，如何自动伸缩后，保持每个 node 上都有这个 deployment 的 pod
有没有运维大佬指点一下

容器编排的控制器改为 DaemonSet

1. Deployment -> DaemonSet
2. hpa 最小为 node 数量，并开启 pod 节点反亲和

2 楼的#2 是多余的吧

@kevin123456 不多余。如果应用不适用于 DaemonSet ，比如我现有 5 个 Pod 跑在 3 个 node 上，当我的 node scaling 到 20 个的时候我希望 pod 能扩编到 12 个、且均匀分布在所有节点上时，HPA 的 autoscaling + podAntiAffinity 才是正确且优雅的解法，忽视场景粗暴使用 DaemonSet 会造成 Pod 数量过少，或者资源浪费。
