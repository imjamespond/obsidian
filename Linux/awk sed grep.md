# awk
```
time="12:34:56"
out=`echo $time | awk '{split($0,a,":");print a[1],a[2],a[3]}'`
echo $out

netstat -plant|grep CLOSE_WAIT|awk '{ split($7,cols,"/"); print cols[1]}'| xargs kill -9
```

---

# sed  
[GNU](https://www.gnu.org/software/sed/manual/sed.html) [RegularExpression](https://www.gnu.org/software/sed/manual/html_node/Regular-Expressions.html)

- 3.2 sed commands summary
d *Delete the pattern space; immediately start next cycle.*
g *Replace the contents of the pattern space with the contents of the hold space.*

- 多行
`sed ':a;N;$!ba;s/"insecure-registries":.*\n*.*,/"insecure-registries":["192.168.0.245", "192.168.0.193:8081"],/g' file`
1. :a create a label 'a'
2. N append the next line to the pattern space
3. $! if not the last line, ba branch (go to) label 'a'
4. s substitute, /\n/ regex for new line, / / by a space, ==/g global match (as many times as it can)==

- './service' -> './service-ng'
`sed s#\'\./service\'#\'\./service-ng\'#g src/jobs/service/index.ts.tpl`

---
### mac版本
-i  直接操作文件并不需要备份文件,如果需要备分则使用 -i "backup"
-n 打印第一到三行。`sed -n "1,3p" test.txt`
`s` 代表 `substitue` 即替换，s#foo#bar#
c change line
d 删除line
i 插入line, `i\`
a 追加line, `a\`

- 增加新行
foobar;
foo;
bar;
`sed -i '' '/foo;/a\hello;' test`

- 例1 