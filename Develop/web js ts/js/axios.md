### 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'.
```
原因: 在请求时没有配置返回类型responseType='blob'

1.直接设置
axios.get(url, data, {responseType:'blob', 'emulateJSON': true});

2.在配置文件中设置
axios.interceptors.request.use((config) => {
   if (config.url === '/user/vertifyCode') {
      config.responseType='blob';
      confit.emulateJSON=true;
   }
   return config;
})
```

