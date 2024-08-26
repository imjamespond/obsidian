- client

```javascript
// fetch
fetch(url, {
    credentials: 'include'
})  
// axios
withCredentials: true
```

- server
`Access-Control-Allow-Credentials: true`  
`Access-Control-Allow-Origin: *`  所有地址

- [nginx](https://stackoverflow.com/questions/14501047/how-to-add-a-response-header-on-nginx-when-using-proxy-pass)
```
# 1. hide the Access-Control-Allow-Origin from the server response
proxy_hide_header Access-Control-Allow-Origin;
# 2. add a new custom header that allows all * origins instead
add_header Access-Control-Allow-Origin *;
```