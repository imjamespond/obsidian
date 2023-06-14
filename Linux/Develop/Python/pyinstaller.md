
```
 -F参数表示覆盖打包
Pyinstaller -F setup.py 打包exe

Pyinstaller -F -w setup.py 不带控制台的打包

Pyinstaller -F -i xx.ico setup.py 打包指定exe图标打包
```

---
pyinstaller --name=mysite mysite/manage.py
or
pyi-makespec --paths=./mysite ./mysite/manage.py
pyinstaller ./mysite.spec

---
Django
mysite/settings.py
from polls import apps

mysite/urls.py
from polls import urls

./dist/mysite/mysite runserver 8888