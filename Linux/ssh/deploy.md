```bash
Host=root@192.168.0.111
Dir=data-atlas
Target=/var/www
Now=$(date +"%F-%H-%M");
ssh $Host "cd /tmp; rm -rf ./${Dir};"
scp -r ./dist/${Dir} ${Host}:/tmp
ssh $Host "\
cd ${Target}; \
[ \"$1\" != "nobak" ] && mv ./${Dir} ./${Dir}-$Now; \
[ \"$1\" == "nobak" ] && rm -rf ./${Dir}; \
mv /tmp/${Dir} .; \
ls -l ./
"
```
