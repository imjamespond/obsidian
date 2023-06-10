使用root登录
```
sealos init --passwd vagrant \
    --master 192.168.0.245  --master 192.168.0... \
    --node 192.168.0.248 \
    --pkg-url /home/vagrant/kube1.18.0.tar.gz \
    --version v1.18.0
    --vip 192.168.0.245 \ 这么改虽然能注册 但就不走lpvs了
sealos clean  -all
--master 192.168.0.245 \
--node 192.168.0.248 
```

--- 
复制key
```
./plink.exe root@"$p" -pw 8989 "
  mkdir -p ~/.ssh
  echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCrbXC49CoMAxaL1sOuFOPC4RM/7C0vJ5aGnltNbOH7bW0bC1VYmH2ZCxOBC2ux7A1JUvTJPAFq+1JYvyzULjyAMkM1qkl/ohPc5dY42QkYsEgD46dAip2OPyBopwPxPyT+9nY4ZAkGcmzymMw7fM2e8N7nntIb77jB0IMww67fOYkkYrsVgEXxMtCEUlG2A0YKP16FVOLzc00mH3MKL2E4ORsBFOTlKs6bZ9rlEUIvgRd4JvsMpVH3rWRZBiaB6NdePQ+/fBrAmnPHjIZUP7AIZaS86sFDO6QK2l/zcmAnhhppH/J3yQJlEdURQPKv0pZbcodwJP8vZZo1hNw+4F+5 test@localhost.localdomain > ~/.ssh/authorized_keys
  chmod 600 ~/.ssh/authorized_keys
  chown -R root:root ~/.ssh"
```

```
#!/bin/bash
for ip in `cat /home/list_of_servers`; do
    ssh-copy-id -i ~/.ssh/id_rsa.pub root@$ip
done
```
所有结点
```
#!/bin/bash
ii=0
for i in $(cat ${1}); do
  ii=`expr $ii + 1`
  echo "${i} ${ii}"
  ssh -n root@$i "

# echo root:8989 | chpasswd
# hostnamectl set-hostname worker${ii}
  "
  # scp /e/tools/kube1.18.0.tar.gz root@$i:/root
  # scp /d/iso/mongo.tar root@$i:/root
  ssh -n root@$i "
  #docker load -i mongo.tar
  yum install -y nfs-utils nfs-utils-lib 

#sed -i ':a;N;\$!ba;s/\"insecure-registries\":.*\\n*.*,/\"insecure-registries\":[\"127.0.0.1\",\"192.168.0.254:5000\", \"192.168.0.193:8081\"],/g' /etc/docker/daemon.json
#systemctl restart docker
docker pull 192.168.0.254:5000/mavendemo
  "
done
```

All(保存为unix格式)
192.168.0.248
192.168.0.249

--- 
https://github.com/fanux/sealos/blob/master/README_zh.md
--vip string              virtual ip (default "10.103.97.2") # 代理master的虚拟IP，只要与你地址不冲突请不要改
这个vip会写到node的hosts? 否则node无法访问api?


最好不要用vagrant centos镜像,node 的 lpvs起不来？
join时先 vi $HOME/.sealos/config.yaml
kubeadm join时出错  [ERROR DirAvailable--etc-kubernetes-manifests]: /etc/kubernetes/manifests is not empty可试试加 --ignore-preflight-errors=All

--- 
could not obtain a bind address for the API Server: no default routes found
貌似要设置网关
```
Vagrant
Vagrant.configure("2") do |config|
  config.vm.box = "cs7"

  config.vm.provider :virtualbox do |v|
    v.memory = 1024
    v.cpus = 2
  end


  %w{worker1 worker2}.each_with_index do |name, i|
    config.vm.define name do |worker|
      worker.vm.hostname = name
      worker.vm.network :"public_network", ip: "192.168.0.#{i + 248}", bridge: "Realtek PCIe FE Family Controller"
      worker.vm.provision "file", source: "E:/tools/kube1.18.0.tar.gz", destination: "/tmp/kube1.18.0.tar.gz"
      worker.vm.provision :shell, privileged: true, inline: <<-SHELL
        mv /tmp/kube1.18.0.tar.gz /root
      SHELL
    end
  end

  config.vm.provision :shell, privileged: true, inline: $provision_all
  config.vm.synced_folder ".", "/vagrant", type: "rsync"
end

$provision_master_node = <<-SHELL
  mv /vagrant/sealos /usr/bin && chmod +x /usr/bin/sealos
SHELL

$provision_all = <<-SHELL
  echo root:8989 | chpasswd
  sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
  systemctl restart sshd
SHELL
```