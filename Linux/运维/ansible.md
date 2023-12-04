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

