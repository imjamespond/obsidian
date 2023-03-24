Issues:

systemctl stop firewalld
systemctl restart smb
确保setlinux关闭，可以用setenforce 0命令执行(否则共享目录无内容，关闭后刷新就有了)。 默认的，SELinux禁止网络上对Samba服务器上的共享目录进行写操作，即使你在smb.conf中允许了这项操作。(此问题很可能引起登录后也无法进入用户文件夹)

---
如何扩展 link
```
[global]
follow symlinks = yes
unix extensions = no
wide links = yes

[share]
follow symlinks = yes
wide links = yes
```

---

```
[homes]
 comment = Home Directories
 valid users = %S, %D%w%S
 browseable = Yes
 read only = No
 inherit acls = Yes

[dev]
 comment = Dev Directories 
 browseable = Yes
 read only = No
 inherit acls = Yes
```

---
3. 连接时用户名密码错误
网上都说WIN7出现这个问题是需要 输入secpol.msc，打开“本地安全策略”巴拉巴拉。测试发现就是因为设了这个才出现的用户名密码错误。 解决办法就是在注册表上删掉这个字段，让他恢复成未设置。注册表地址如下：
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa下的LmCompatibilityLevel。
直接删掉。再重连就好了。
作者：johnhill
原文：https://blog.csdn.net/johnhill_/article/details/81280508 

---

Installing Samba


1.    Use yum to install the Samba package:

        yum -y install samba

Creating Samba Test Directory and Files

For this part of the procedure, you'll use the su - (switch user) command to work as root. Although it’s not best practice to do this regularly, there are times where it's much more practical to work directly as root instead of trying to use sudo to do everything. This is one of those times.

You're going to create a new directory containing three empty files which you'll share using Samba.

2.    While logged on as root, create the new directory /smbdemo with the following command:

       mkdir /smbdemo

3.    Change the permissions on the new directory to 770 with the following command:

       chmod 770 /smbdemo

4.    Navigate to the new directory with the following command:

       cd /smbdemo

5.    Add three empty files to the directory with the following command:

        touch file1 file2 file3



Figure 1: Using touch to create files for the Samba exercise.

Adding the Samba User

You must add users to the Samba database in order for them to have access to their home directory and other Samba shares.

6.    Use the following command to add a new Samba user (the new Samba user must be an existing Linux user or the command will fail):

       smbpasswd -a <username>

        For example, to add the user don, use the command smbpasswd -a don.

Creating the Samba Group

7.    Perform the following steps to create a smbusers group, change ownership of the /smbdemo directory, and add a user to the smbusers group:

        groupadd smbusers
        chown :smbusers /smbdemo
        usermod -G smbusers don


Figure 2: Adding the smbusers group, changing ownership on /smbdemo, and adding a user to the smbusers group.

Configuring Samba

Note: In several of the steps in this exercise, I mention specific line numbers. The line numbers I mention are based on CentOS version 6.5. If you’re running any other version, your line numbers may be different. In that case, just search for the relevant text string.

Samba configuration is done in the file /etc/samba/smb.conf. There are two parts to /etc/samba/smb.conf:

- Global Settings: This is where you configure the server. You’ll find things like authentication method, listening ports, interfaces, workgroup names, server names, log file settings, and similar parameters.
- Share Definitions: This is where you configure each of the shares for the users. By default, there’s a printer share already configured.

Configuring smb.conf

8.    In the Global Settings section, at line 74, change the workgroup name to your workgroup name. I’m going to use soundtraining as a means of shamelessly promoting my company during your quest for knowledge. I’m sure you understand.

soundthinking point: Enable Line Numbering in vim

You can enable line numbering in vim with the command :set nu. If you want to turn it off, use :set nu!.



Figure 3: Changing the workgroup in the Samba configuration file.

9.    Now, confirm that the authentication type is set to user by going to the authentication section, still in Global Settings, and line 101. Make sure there is no hash mark at the beginning of the line to enable user security.



Figure 4: Confirming user authentication in the Samba configuration file.

This change allows users on your Red Hat/CentOS server to log in to shares on the Samba server.

10.    Next, add a section for /smbdemo, which you created earlier. You can just add it to the very bottom of /etc/samba/smb.conf with the following lines:

![[Pasted image 20230324173217.png]]

Figure 5: Configuring Samba share definitions.

11.    Be sure to save your changes with a :wq. 

You can use the command testparm to test the configuration. In order for the server to re-read the configuration file and make the changes, you must restart the Samba service with the commands service smb restart and service nmb restart.

When properly configured, you should be able to connect from a computer running the Windows operating system and see both the general share and the user’s home directory:



Figure 6: Viewing Samba shares from a Windows computer.

You can test it by opening the user’s home directory in Windows, adding a file, and then viewing that file on the Linux server.


Troubleshooting Samba


In addition to checking for spelling and typographical errors, check to ensure the Linux firewall is permitting Samba traffic. Similarly, if you're using SELinux on your system, you must explicitly permit Samba traffic, and finally you must enable Network Discovery on the Windows client machine.



---

---

---
