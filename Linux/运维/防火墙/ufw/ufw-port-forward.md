```
*nat
:PREROUTING ACCEPT [0:0]
-A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 2443
COMMIT
```
 [Bad argument \`\*nat'](https://stackoverflow.com/questions/76259054/error-problem-running-ufw-init-bad-argument-nat)

--- 
## 1. Introduction[](https://www.baeldung.com/linux/ufw-port-forward#introduction)

While we can enable various [UFW](https://www.baeldung.com/linux/uncomplicated-firewall) firewall rules using commands, things are a bit different when setting up port forwarding. Nevertheless, the steps are straightforward.

In this tutorial, we’ll go over the steps to activate packet forwarding and set up a port forward using UFW.

## 2. Enabling Packet Forwarding[](https://www.baeldung.com/linux/ufw-port-forward#enabling-packet-forwarding)

Before we configure UFW to allow port forwarding, we must enable packet forwarding. We can do this through any of:

- the UFW network variables file: _==/etc/ufw/sysctl.conf==_
- the system variables file: _==/etc/sysctl.conf==_

In this tutorial, **we’ll use the UFW network variables file since [UFW prioritizes it over the system variables file](https://manpages.ubuntu.com/manpages/xenial/man8/ufw-framework.8.html)**.

### To enable packet forwarding, let’s open ==_/etc/ufw/sysctl.conf_==:

```bash
$ sudo nano /etc/ufw/sysctl.conf
```

After that, let’s uncomment _`net/ipv4/ip_forward=1`_.

If we have access to the root user, we can enable packet forwarding on _/etc/ufw/sysctl.conf_ by running:

```bash
# echo 'net/ipv4/ip_forward=1' >> /etc/ufw/sysctl.conf
```

This command basically appends the uncommented packet forwarding string to the _/etc/ufw/sysctl.conf_ file.

## 3. Configuring Port Forwarding on UFW[](https://www.baeldung.com/linux/ufw-port-forward#configuring-port-forwarding-on-ufw)

We can configure UFW to forward traffic from an external port to an internal port. If we have to, we can also set it up to forward traffic from an external port to a server listening on a specific internal port.

### 3.1. Port Forwarding From an External Port to an Internal Port[](https://www.baeldung.com/linux/ufw-port-forward#1-port-forwarding-from-an-external-port-to-an-internal-port)

To set up a port forward on UFW, we must edit the _/etc/ufw/before.rules_ file:

```bash
$ sudo nano /etc/ufw/before.rules 
```

In the _before.rules_ file, let’s add a NAT table after the filter table (the table that starts with _*filter_ and ends with _COMMIT_):

```plaintext
*nat
:PREROUTING ACCEPT [0:0]
-A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 500
COMMIT
```

**This NAT table will redirect incoming traffic from the external port (80) to the internal port (500).** Of course, we can adjust the table to forward traffic from any other external port to any other internal port.

Now that we’ve saved the NAT table to the _before.rules_ file, let’s allow traffic through the internal port since we didn’t do that before:

```bash
$ sudo ufw allow 500/tcp
Rule added
Rule added (v6)
```

Lastly, let’s restart UFW:

```bash
$ sudo systemctl restart ufw
```

### 3.2. Port Forwarding From an External Port to a Server Listening on a Specific Internal Port[](https://www.baeldung.com/linux/ufw-port-forward#2-port-forwarding-from-an-external-port-to-a-server-listening-on-a-specific-internal-port)

We can forward incoming traffic from an external port to a server listening on a specific internal port using the same steps as above. However, we’ll use a different NAT table for this purpose:

[![freestar|30](https://a.pub.network/core/imgs/fslogo-green.svg)](https://ads.freestar.com/?utm_campaign=branding&utm_medium=lazyLoad&utm_source=baeldung.com&utm_content=baeldung_leaderboard_mid_3)

```bash
*nat :PREROUTING ACCEPT [0:0]
-A PREROUTING -p tcp -i eth0 --dport 443 -j DNAT \ --to-destination 192.168.56.9:600
COMMIT
```

Unlike the other table, **this redirects incoming traffic from port 443 (external port) to 192.168.56.9 (the server) listening on port 600 (internal port)**. As we did before, we’ll ensure that we allow traffic through the internal port.

## 4. Conclusion[](https://www.baeldung.com/linux/ufw-port-forward#conclusion)

In this article, we discussed how to enable port forwarding on UFW. We covered port forwarding from an external port to an internal port. Afterward, we went over the NAT table for port forwarding to a server listening on a specific internal port.

While we used the UFW network variables file to enable packet forwarding, we could’ve also worked with the system variable file. To do that, we would’ve modified the value of the _IP_SYSCTL_ variable in the _/etc/default/ufw_ file, changing it from its default value to _/etc/sysctl.conf_.