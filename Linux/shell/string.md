- `[ "$1" = "bak" ] && echo "$1";`
- 
```bash
#字符串不相等
if [ "$A" != "$B" ];then
echo "[ != ]"
fi

#字符串不相等
if [[ "$A" != "$B" ]];then
echo "[[ != ]]"
fi

#字符串不为空，长度不为0
if [ -n "$A" ];then
echo "[ -n ]"
fi

#字符串为空.就是长度为0.
if [ -z "$A" ];then
echo "[ -z ]"
fi

```