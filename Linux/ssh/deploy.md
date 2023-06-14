```shell
Host=root@192.168.0.27
ssh $Host 'cd /tmp; rm -rf ./center-home;' 
scp -r ./center-home ${Host}:/tmp
ssh $Host 'now=$(date +"%F-%H-%M"); \
cd /var/www; \
mv ./center-home ./center-home-$now; \
mv /tmp/center-home .; \
ls -l ./
'
```