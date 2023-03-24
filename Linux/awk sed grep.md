```
time="12:34:56"
out=`echo $time | awk '{split($0,a,":");print a[1],a[2],a[3]}'`
echo $out

netstat -plant|grep CLOSE_WAIT|awk '{ split($7,cols,"/"); print cols[1]}'| xargs kill -9
```
