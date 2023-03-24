### 查看电量
ioreg -rn AppleSmartBattery

---
file  可以查看是否是x86可执行程序

---

```
diskutil <verb> with no options will provide help on that verb

mount

u[n]mount 
diskutil umount force ~/workspace/cpp/test

list
```

---
pac
```
function FindProxyForURL(url, host) {

  if (
    shExpMatch(url, "*trueviewar.com*") ||
    shExpMatch(url, "*google.com*") ||
    shExpMatch(url, "*wikipedia.org*")
  ) {
    return "PROXY 127.0.0.1:8123";
  }

  return "DIRECT";
}
使用http proxy

networksetup -setautoproxystate Wi-Fi off 
networksetup -setautoproxystate Wi-Fi on 
```

---
caffeinate -i will cancel idle sleeping
caffeinate -m will stop the disk from going idle
caffeinate -s will keep your Mac awake while it’s plugged in
caffeinate will prevent your Mac from going to sleep while Terminal is running or until you press Control + C
caffeinate -t 1800 (or any number) will make sure your Mac is awake for the number of seconds you specified

---
smbutil lookup host-name

---
```
ab -k -c 4 -n 100000 -H "Authorization: Basic MDAwMDAwOjk5OTk5OQ==" "http://localhost:8001/authorize?client_id=000000&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth2%2FgetToken&response_type=code&state=222"
```

-k keepalive  mac的端口释放有延时10秒左右, 一次测试16000就会卡住, 这时应该用keepalive只创建 -c的连接数


```
echo "username=hello&password=itsme" | ab -k -c 4 -n 10000 -T "application/x-www-form-urlencoded" -p /dev/stdin "http://localhost:8080/login"
```

---
https://kyle.ai/blog/6068.html
```
sudo pkill -INFO dd   # mac系统

sudo killall -USR1 dd # linux系统

```

后来再找资料，发现跟mac系统本身有关系。把 /dev/disk2 修改成 /dev/rdisk2 就会快了。

---
pmset 电源管理
vm_stat 内存使用
ls -l /var/vm
sudo heap --showSizes [pid] 查看Pid堆内存
sudo vmmap -w [pid] 查看虚拟内存
 sudo zprint 内核使用
vm_stat 1 每秒虚拟内存
 sudo launchctl list / sudo launchctl list 
sudo footprint -p 237 内存使用历史

lsof -nP |grep 5432 查看端口pid, netstat -plant
The -n flag is for displaying IP addresses instead of host names. This makes the command execute much faster, because DNS lookups to get the host names can be slow (several seconds or a minute for many hosts).
The -P flag is for displaying raw port numbers instead of resolved names like http, ftp or more esoteric service names like dpserve, socalia.

----
system_profiler
 -listDataTypes
 -usage

取得电池信息
 system_profiler SPPowerDataType
