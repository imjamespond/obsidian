The rpm cache directory location can be found in /etc/yum.conf
cachedir=/var/cache/yum/$basearch/$releasever
You should change the $basearch and $releasever, values based on your red hat release version.
If you want to keep the rpm cache after installation the keep cache value should be set 1 in:
/etc/yum.conf
set
keepcache=1
---

```
yum list installed

yum history
yum history info 3
yum history undo 3
```