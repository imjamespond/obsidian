ports: 10086/tcp 10086/udp 443/tcp
  protocols: 
  masquerade: yes

  forward-ports: port=443:proto=tcp:toport=443:toaddr=97.64.17.204


firewall-cmd --permanent  --remove-forward-port=
firewall-cmd --permanent --add-forward-port=port=443:proto=tcp:toport=1443:toaddr=97.64.17.204
firewall-cmd --permanent --add-forward-port=port=4431:proto=tcp:toport=4430:toaddr=127.0.0.1
not working?
firewall-cmd --zone=external --permanent --add-masquerade
firewall-cmd --zone=public --permanent --add-masquerade
firewall-cmd --reload

---
https://www.karltarvas.com/2020/07/02/centos-7-redirect-port-80-to-8080.html
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-port_forwarding

---
 Error: COMMAND_FAILED: Direct: '/usr/sbin/iptables-restore -w -n' failed
```
vi /etc/firewalld/direct.xml #Delete all lines...
```

---
https://superuser.com/questions/1474254/firewall-cmd-add-forward-port-dont-work

https://docs.fedoraproject.org/en-US/Fedora/19/html/Security_Guide/sec-Configure_Port_Forwarding-CLI.html

https://www.linode.com/docs/security/firewalls/introduction-to-firewalld-on-centos/

3.8.13.5.13. Configure Port Forwarding using the CLI


To forward inbound network packets from one port to an alternative port or address, first enable IP address masquerading for a zone, To forward packets to a local port, that is to say to a port on the same system, enter the following command as root:

firewall-cmd --zone=public --permanent --query-masquerade
firewall-cmd --zone=public --permanent --add-masquerade
 firewall-cmd --reload && firewall-cmd  --list-all # make sure masquerade is yes, 不运行上面两句只能本地转发
firewall-cmd --permanent --zone=public --add-forward-port=port=13753-13755:proto=tcp:toport=3753-3755:toaddr=127.0.0.1
firewall-cmd --permanent --zone=public --add-forward-port=port=20443:proto=tcp:toport=443:toaddr=
firewall-cmd --permanent --zone=public --add-forward-port=port=2381:proto=tcp:toport=2380:toaddr=127.0.0.1
阿里云测试可以
firewall-cmd --reload
firewall-cmd --list-all
to remove: replace with --remove-forward-port with the same arguments
```
rm -rf /etc/firewalld/zones
firewall-cmd --reload
```
目测不能在同一机子下测试,  host: nc -l 3753  client: nc 192.168.0.254 13753
目测不能forward到localhost, 要修改 route_localnet, sysctl -a | grep route_localnet
```
echo "net.ipv4.conf.eth0(all).route_localnet=1" >> /etc/sysctl.conf
```

```
iptables -t nat -I PREROUTING -p tcp --dport 2378 -j DNAT --to-destination 127.0.0.1:2379 #本地访问无效
sysctl -w net.ipv4.conf.eth0.route_localnet=1
```

```
echo "net.ipv4.conf.all.route_localnet=1" >> /etc/sysctl.conf
# enable IP forward
 echo 'net.ipv4.ip_forward = 1' >> /etc/sysctl.conf
 sysctl -p
```

firewall-cmd --permanent --zone=testing --add-rich-rule='rule family=ipv4 source address=192.168.1.0/24 forward-port port=22 protocol=tcp to-port=2222 to-addr=10.0.0.10'

本地
firewall-cmd --permanent --direct --add-rule ipv4 nat OUTPUT 0 -p tcp -o lo --dport 80 -j REDIRECT --to-ports 8080
iptables -nvL
equivalent to 本机内端口跳转: iptables -t nat -I PREROUTING -p tcp --dport 2007 -j REDIRECT --to-ports 20007

http://www.cnblogs.com/hanyifeng/p/6723964.html
做个DNAT转发，将访问 192.168.30.177（公网）端口80的请求转发/跳转到 127.0.0.1的8080 端口上。使用下面两条命令就行：
# iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 127.0.0.1:8080
# iptables -I INPUT 5 -p tcp --dport 80 -j ACCEPT


	~]# firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=3753

In this example, the packets intended for port 22 are now forwarded to port 3753. The original destination port is specified with the port option. This option can be a port, or port range, together with a protocol. The protocol, if specified, must be one of either tcp or udp. The new local port, the port or range of ports to which the traffic is being forwarded to, is specified with the toport option. To make this setting permanent, add the --permanent optionand reload the firewall.



To forward packets to another IPv4 address, usually an internal address, without changing the destination port, enter the following command as root:

	~]# firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toaddr=192.0.2.55

In this example, the packets intended for port 22 are now forwarded to the same port at the address given with the toaddr. The original destination port is specified with the port. This option can be a port, or port range, together with a protocol. The protocol, if specified, must be one of either tcp or udp. The new destination port, the port or range of ports to which the traffic is being forwarded to, is specified with the toport. To make this setting permanent, add the --permanent option and reload the firewall.
To forward packets to another port at another IPv4 address, usually an internal address, enter the following command as root:

	~]# firewall-cmd --zone=external --add-forward-port=port=22:proto=tcp:toport=2055:toaddr=192.0.2.55

In this example, the packets intended for port 22 are now forwarded to port 2055 at the address given with the toaddr. The original destination port is specified with the port. This option can be a port, or port range, together with a protocol. The protocol, if specified, must be one of either tcp or udp. The new destination port, the port or range of ports to which the traffic is being forwarded to, is specified with the toport. To make this setting permanent, add the --permanent option and reload the firewall.


--- 
firewall-cmd --permanent --zone=public --add-port=22-59999/tcp

Note2: Type –remove-port=443/tcp to deny the port.

firewall-cmd --reload

# firewall-cmd --staterunning

firewall-cmd --get-zones

firewall-cmd --zone=public --list-all

---

rm -rf /etc/firewalld/zones











---
# redirect port  
CentOS 7 uses firewalld to manage ports, firewall rules and more. To quickly get up and running, firstly list all currently existing rules:

firewall-cmd --list-all
The output will be something similar to this, depending on what services you have running.

public (active)
 target: default
 icmp-block-inversion: no
 interfaces: ens160
 sources:
 services: ssh dhcpv6-client
 ports:
 protocols:
 masquerade: no
 forward-ports:
 source-ports:
 icmp-blocks:
 rich rules:
If you simply want to open a port, use --add-port (and later --remove-port to revert the change if need be).

```
firewall-cmd --add-port=8080/tcp
```
To instead forward port 80 to port 8080:

```
firewall-cmd --add-forward-port=port=44300:proto=tcp:toport=443
```
After you’ve made your changes, be sure to check the state is as expected. The output for a correctly forwarded port looks like this:

public (active)
forward-ports: port=80:proto=tcp:toport=8080:toaddr=
 ...
Once you’re happy with your changes, save them permanently.

firewall-cmd --runtime-to-permanent
You can then reload the rules and check that everything is as you’d expect it to be.

firewall-cmd --reload
firewall-cmd --list-all





---

5.9. PORT FORWARDING

Using firewalld, you can set up ports redirection so that any incoming traffic that reaches a certain port on your system is delivered to another internal port of your choice or to an external port on another machine.

5.9.1. Adding a Port to Redirect

Before you redirect traffic from one port to another port, or another address, you need to know three things: which port the packets arrive at, what protocol is used, and where you want to redirect them.
To redirect a port to another port:
~]# firewall-cmd --add-forward-port=port=port-number:proto=tcp|udp|sctp|dccp:toport=port-number
To redirect a port to another port at a different IP address:
1. Add the port to be forwarded:
   ~]# firewall-cmd --add-forward-port=port=port-number:proto=tcp|udp:toport=port-number:toaddr=IP
2. Enable masquerade:
   ~]# firewall-cmd --add-masquerade

Example 5.1. Redirecting TCP Port 80 to Port 88 on the Same Machine

To redirect the port:
1. Redirect the port 80 to port 88 for TCP traffic:
   ~]# firewall-cmd --add-forward-port=port=80:proto=tcp:toport=88
2. Make the new settings persistent:
   ~]# firewall-cmd --runtime-to-permanent
3. Check that the port is redirected:
   ~]# firewall-cmd --list-all 

5.9.2. Removing a Redirected Port

To remove a redirected port:
~]# firewall-cmd --remove-forward-port=port=port-number:proto=<tcp|udp>:toport=port-number:toaddr=<IP>
To remove a forwarded port redirected to a different address:
1. Remove the forwarded port:
   ~]# firewall-cmd --remove-forward-port=port=port-number:proto=<tcp|udp>:toport=port-number:toaddr=<IP>
2. Disable masquerade:
   ~]# firewall-cmd --remove-masquerade

Note

Redirecting ports using this method only works for IPv4-based traffic. For IPv6 redirecting setup, you need to use rich rules. For more information, see Section 5.15, “Configuring Complex Firewall Rules with the "Rich Language" Syntax”.
To redirect to an external system, it is necessary to enable masquerading. For more information, see Section 5.10, “Configuring IP Address Masquerading”.

Example 5.2. Removing TCP Port 80 forwarded to Port 88 on the Same Machine

To remove the port redirection:
1. List redirected ports:
   ~]# firewall-cmd --list-forward-ports 
   port=80:proto=tcp:toport=88:toaddr=
2. Remove the redirected port from the firewall::
   ~]# firewall-cmd --remove-forward-port=port=80:proto=tcp:toport=88:toaddr=
3. Make the new settings persistent:
   ~]# firewall-cmd --runtime-to-permanent







