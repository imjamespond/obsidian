# awk
```
time="12:34:56"
out=`echo $time | awk '{split($0,a,":");print a[1],a[2],a[3]}'`
echo $out

netstat -plant|grep CLOSE_WAIT|awk '{ split($7,cols,"/"); print cols[1]}'| xargs kill -9
```

---

# sed  
https://www.gnu.org/software/sed/manual/sed.html

3.2 sed commands summary
d *Delete the pattern space; immediately start next cycle.*
g *Replace the contents of the pattern space with the contents of the hold space.*

---
多行
`sed ':a;N;$!ba;s/"insecure-registries":.*\n*.*,/"insecure-registries":["192.168.0.245", "192.168.0.193:8081"],/g' file`
1. :a create a label 'a'
2. N append the next line to the pattern space
3. $! if not the last line, ba branch (go to) label 'a'
4. s substitute, /\n/ regex for new line, / / by a space, /g global match (as many times as it can)

---
'./service' -> './service-ng'
`sed s#\'\./service\'#\'\./service-ng\'#g src/jobs/service/index.ts.tpl`

---
增加新行,a = after ，i = in front 
foobar;
foo;
bar;
`sed -i '/foo;/a\hello;' test`
