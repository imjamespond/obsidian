```
yum install -y nfs-utils 
systemctl enable --now nfs-server  

vi /etc/exports
/opt 192.168.1.0/24(sync,wdelay,hide,crossmnt,no_subtree_check,fsid=0,sec=sys,rw,insecure,no_root_squash)
/data *(sync,no_subtree_check,rw,all_squash,insecure,anonuid=0,anongid=0)


指定user
On the server, I used the following options:
rw,sync,no_acl,all_squash,anonuid=1000,anongid=1000
On the client, I used the following options:
-o rw,sync,vers=3,hard,intr,nolock,tcp,noac
```

==**fsid=0定义了 NFS 根目录/srv/nfs.来自192.168.33.0/24**==网络的所有客户端被允许访问 NFS 卷。==crossmnt选项是必要的==，用来分享被导出目录的子目录。
no_root_squash， 当NFS客户端以root管理员访问时，映射为NFS服务器的root管理员
root_squash， 当NFS客户端以root管理员访问时，映射为NFS服务器匿名用户
insecure, no permissions的问题
匿名使用root

导出分享
```
exportfs -ra
exportfs -v
```

Mac端
```
showmount -e somesvr
showmount -a somesvr
sudo mount -t nfs test:/data /private/nfs 
```
