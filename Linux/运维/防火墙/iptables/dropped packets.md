For dropped packets I would simply use iptables and the [statistic module](http://ipset.netfilter.org/iptables-extensions.man.html#lbCD).

```
iptables -A INPUT -m statistic --mode random --probability 0.01 -j DROP
```

Above will drop an incoming packet with a 1% probability. Be careful, anything above about 0.14 and most of you tcp connections will most likely stall completely.

Take a look at man iptables and search for "statistic" for more information