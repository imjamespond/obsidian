https://hub.docker.com/r/prom/prometheus
https://cloud.tencent.com/developer/article/1678621
监控服务器 需要安装4个服务
* Prometheus Server(普罗米修斯监控主服务器 )
* Node Exporter (收集Host硬件和操作系统信息)
* cAdvisor (负责收集Host上运行的容器信息)
* Grafana (展示普罗米修斯监控界面）


```
docker run --name prom -d -p 9090:9090 prom/prometheus
docker cp prom:/etc/prometheus/prometheus.yml ./
docker rm -f prom
vi prometheus.yml 
 docker run -d -p 9090:9090 \
-v /opt/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
--name prom prom/prometheus

docker run -d -p 59100:9100 \
-v "/proc:/host/proc" \
-v "/sys:/host/sys" \
-v "/:/rootfs" \
-v "/etc/localtime:/etc/localtime" \
--name=node-exporter \
prom/node-exporter

docker run -d \
--volume=/:/rootfs:ro \
--volume=/var/run:/var/run:rw \
--volume=/sys:/sys:ro \
--volume=/var/lib/docker/:/var/lib/docker:ro \
--publish=58080:8080 \
--detach=true \
--name=cadvisor \
-v "/etc/localtime:/etc/localtime" \
google/cadvisor:latest

mkdir grafana-storage
chmod 777 -R grafana-storage/
docker run -d -p 3000:3000 --name grafana -v /root/grafana-storage:/var/lib/grafana \
-e "GF_SECURITY_ADMIN_PASSWORD=123123" grafana/grafana
# 添加Data Source再import Dashboard展示
# node-exporter-quickstart-and-dashboard 默认读job=node的数据源，prom里面要加一个job_name为node才有数据！

```

```
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
...
    static_configs:
    #监听的地址
    - targets: ['localhost:59090','localhost:59100']

  - job_name: 'dev-base1'
    static_configs:
    - targets: ['xxx.xxx.xxx.xxx:58080','xxx.xxx.xxx.xxx:59100']
```



---

```
mkdir 777 data
docker build -t jms/prom .
docker run -it -p 9090:9090 --rm \
-v /opt/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
-v /opt/prometheus/data:/data \
--name prom jms/prom

FROM prom/prometheus
ENTRYPOINT [ "/bin/prometheus" ]
CMD        [ "--config.file=/etc/prometheus/prometheus.yml", \
             "--storage.tsdb.path=/data", \
             "--web.console.libraries=/usr/share/prometheus/console_libraries", \
             "--web.console.templates=/usr/share/prometheus/consoles" ]
```

---
Issues
Prometheus 与 Grafana进行组合，但是不显示数据与图像
经过百度，发现是服务器与浏览器时间不同步的原因，因为在prometheus的web界面报警了，报警内容如下：
```
yum -y install ntp #既可做服务端也可做客户端
yum install -y ntpdate 
ntpdate ntp1.aliyun.com

CentOS 8/ Rocky Linux
chronyc add server 192.168.1.53
chronyc delete 192.168.1.53
chronyc sourcestats -v
chronyc sources -v
chronyc activity
```












