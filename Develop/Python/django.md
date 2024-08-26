https://stackoverflow.com/questions/24682155/user-registration-with-error-no-such-table-auth-user
```
管理员
python manage.py migrate
python manage.py createsuperuser
新模块
python manage.py startapp app
app中新建urls，path('api/', include('app.urls')),
需重启？
```

issue：
1. post403，setting中关闭csrf
2. post没有params
Starting at Django 1.5, request.POST does not contain non-form data anymore.They are now in request.body
```
def test(req: HttpRequest): 
    body = req.body.decode()
    obj = json.loads(body)
    print(obj)
    return HttpResponse("hello")
```
