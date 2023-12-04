#ansible

https://www.cnblogs.com/keerya/p/7987886.html

- 使用 pip（python的包管理模块）安装
　　首先，我们需要安装一个python-pip包，安装完成以后，则直接使用pip命令来安装我们的包，具体操作过程如下：
```

	yum install python-pip
	pip install ansible
```

- 使用 yum 安装
　　yum 安装是我们很熟悉的安装方式了。我们需要先安装一个epel-release包，然后再安装我们的 ansible 即可。
```
	yum install epel-release -y
	yum install ansible –y
```


```
vim /etc/ansible/hosts
	[web]
	192.168.37.122
	192.168.37.133 ansible_ssh_port=22 ansible_ssh_user=root ansible_ssh_pass='jack' ansible_su_pass='root_password'
```

`ansible web -m command -a 'hostname'`

--- 
参数	解释
ansible_ssh_host	用于指定被管理的主机的真实IP
ansible_ssh_port	用于指定连接到被管理主机的ssh端口号，默认是22
ansible_ssh_user	ssh连接时默认使用的用户名
ansible_ssh_pass	ssh连接时的密码
ansible_sudo_pass	使用sudo连接用户时的密码
ansible_sudo_exec	如果sudo命令不在默认路径，需要指定sudo命令路径
ansible_ssh_private_key_file	秘钥文件路径，秘钥文件如果不想使用ssh-agent管理时可以使用此选项
ansible_shell_type	目标系统的shell的类型，默认sh
ansible_connection	SSH 连接的类型： local , ssh , paramiko，在 ansible 1.2 之前默认是 paramiko ，后来智能选择，优先使用基于 ControlPersist 的 ssh （支持的前提）
ansible_python_interpreter	用来指定python解释器的路径，默认为/usr/bin/python 同样可以指定ruby 、perl 的路径
ansible_*_interpreter	其他解释器路径，用法与ansible_python_interpreter类似，这里"*"可以是ruby或才perl等其他语言 