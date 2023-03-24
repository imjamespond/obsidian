```
echo '123456' | su - frontend -c "whoami; \
cd data-platform-cgn/frontend; \
git pull origin cgn-1903; \
rm -f ./dist.zip; \
zip -r dist.zip ./dist;"
cp /home/frontend/data-platform-cgn/frontend/dist.zip ${WORKSPACE}
```
