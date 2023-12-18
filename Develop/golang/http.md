
```go
func getData(urlApi string) (body []byte,err error) {
    apiUrl :=urlApi
    u,err := url.ParseRequestURI(apiUrl)
    if err !=nil{
        fmt.Println("request url failed err:",err)
        return nil,err
    }
    //u.RawQuery = data.Encode()
    fmt.Println(u.String())
    resp,err := http.Get(u.String())
    if err !=nil{
        fmt.Println("get url failed err :",err)
        return nil,err
    }
    defer resp.Body.Close()
    body,err = ioutil.ReadAll(resp.Body)
    if err !=nil{
        fmt.Println("read body failed err :",err)
        return nil,err
    }
    return body,nil
}
```