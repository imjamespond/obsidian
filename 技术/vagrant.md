init 初始一个环境
status 查看该环境的结点状态
destroy 删除结点
upload /e/tools/kube1.14.1.tar.gz kube1.14.1.tar.gz master1

box list查看系统
---
VAGRANT_HOME E:\vbox\.vagrant.d 这个是vagrant box的位置
设置vbox全局默认vm位置，可以将vm移至其它位置
---
vagrant box add name abs-path
https://vagrantcloud.com/ubuntu/boxes/xenial64/versions/20200605.0.0/providers/virtualbox.box
https://mirrors.ustc.edu.cn/centos-cloud/centos/7/vagrant/x86_64/images/
{"name": "centos/7", # 添加后的box名称   "versions": [{
 "version": "2004.01", # 版本号   "providers": [{"name": "virtualbox","url": "file://D:/work/CentOS-7-x86_64-Vagrant-2004_01.VirtualBox.box" # 下载到本地的box}] }] }
vagrant box add metadata.json

https://www.jianshu.com/p/7652f94c9d12
https://linoxide.com/linux-how-to/setup-centos-7-vagrant-base-box-virtualbox/
3 yum install -y openssh-clients nano wget ntp curl
 4 chkconfig ntpd on
 5 systemctl stop ntpd
 6 ntpdate time.nist.gov
 7 systemctl start ntpd
 8 chkconfig sshd on
 9 chkconfig iptables off
 10 systemctl disable firewalld
11 useradd vagrant
 12 mkdir -m 0700 -p /home/vagrant/.ssh
 13 curl https://raw.githubusercontent.com/mitchellh/vagrant/master/keys/vagrant.pub >> /home/vagrant/.ssh/authorized_keys
 14 chmod 600 /home/vagrant/.ssh/authorized_keys
 15 chown -R vagrant:vagrant /home/vagrant/.ssh
 16 sed -i 's/^\(Defaults.*requiretty\)/#\1/' /etc/sudoers
 17 echo "vagrant ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
history -c
未装vbox插件要加上 config.vm.synced_folder ".", "/vagrant", type: "rsync"

用Packer法
https://www.packer.io/downloads.html
https://github.com/hashicorp/packer
https://github.com/boxcutter/centos/blob/master/centos7.json
packer build -only=virtualbox-iso -var-file=centos7.json centos.json

---

Package
up后在当前目录下直接package，注意要扩展box，一定要加以下一行，否则子box up后无法ssh
config.ssh.insert_key = false
config.vm.synced_folder ".", "/vagrant", disabled: true

---
Disk Size
https://askubuntu.com/questions/317338/how-can-i-increase-disk-size-on-a-vagrant-vm
Install this plugin: vagrant plugin install vagrant-disksize --debug
Vagrant.configure('2') do |config| ...
 config.vm.box = 'ubuntu/xenial64'
 config.disksize.size = '50GB'
 ... end
SSH to vagrant box
Run sudo cfdisk /dev/sda
Use arrows to select your disk probably sdaX. Mine was sda3.
Then select resize using arrow keys. Accept the suggested disk size.
Then select write. And answer yes.
You can select quit now.
Run sudo resize2fs -p -F /dev/sdaX You should see something like: "Filesystem at /dev/sda3 is mounted on /; on-line resizing required old_desc_blocks = 4, new_desc_blocks = 6 The filesystem on /dev/sda3 is now 11933952 (4k) blocks long. "
Run df and see that your disk size has increased.
---
配置
https://www.jianshu.com/p/614381434c24
config.vm.network "public_network", ip: "192.168.137.150", bridge: "Microsoft Hosted Network Virtual Adapter"
config.vm.provider :virtualbox do |v|
v.memory = 1024 v.cpus = 2 v.gui = true end
config.vm.provision :shell, privileged: true, inline: $install_common_tools
$install_common_tools = <<-SCRIPT
# bridged traffic to iptables is enabled for kube-router.
```
cat >> /etc/ufw/sysctl.conf <<EOF
net/bridge/bridge-nf-call-ip6tables = 1
net/bridge/bridge-nf-call-iptables = 1
net/bridge/bridge-nf-call-arptables = 1
EOF

# disable swap
swapoff -a
sed -i '/swap/d' /etc/fstab
SCRIPT
config.vm.provision "shell", inline: "echo hello", run: "always"
```

