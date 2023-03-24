./caddy_windows_amd64.exe run --adapter caddyfile --config ./tv2.conf 

---
route 和 handle
route is used to keep the order of the directives.保持有序
Evaluates a group of directives mutually exclusively from other handle blocks at the same level of nesting...the first matching handle block will be evaluated. 同级排他, 第一个匹配 被评估,

---
header Access-Control-Allow-Origin .* *
正则替换写法

---
cors

./caddy_darwin_amd64 run -adapter caddyfile -config test-cors.conf

https://localhost:1111 { 

  header Access-Control-Allow-Headers *
  header Access-Control-Allow-Credentials true
  header Access-Control-Allow-Origin {http.request.header.origin}
  header Set-Cookie "user=foobar; SameSite=None; Secure"

  respond "hello"
} 


---

```
http://:8080 {

handle /data-quality/* {
    uri strip_prefix /data-quality
file_server {
    root /Users/james/Documents/projects/webapp/data-quality/dist
}
    try_files {path} /index.html
}


handle /center-home/* {
    reverse_proxy 192.168.0.100:8089
}
handle /api/* {
    reverse_proxy 192.168.0.100:8089
}
}
```

---

```
http://trueviewar.com {
  redir https://{host}{uri}
}


https://trueviewar.com  {
    tls D:\tools\caddy_v1.0.4_windows_amd64\tls\STAR_trueviewar_com.crt D:\tools\caddy_v1.0.4_windows_amd64\tls\trueviewar.key
    
    @opt {
        # preflight request for CORS
        method OPTIONS
    }
    
    
    @gz {
        path *.js *.css *.html *.hdr
    } 
    encode @gz {
        gzip
    }
    
    handle /api/* {
        header Access-Control-Allow-Headers *
        header Access-Control-Allow-Credentials true
        header Access-Control-Allow-Origin {http.request.header.origin}
        header Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, DELETE"
       respond @opt ""
        reverse_proxy localhost:8086 localhost:8086 {
            #header_down Access-Control-Allow-Origin * 
            #header_down Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, DELETE"
        }
    }
    handle /uac/* {
        reverse_proxy localhost:8081
    }
    handle /envato/canna/* {
        reverse_proxy http://deothemes.com
    }
    
    handle /Web3D/* {
        uri strip_prefix /Web3D
        file_server {
            root F:\web\Web3D_new
        }
    }
    handle /files/* {
        uri strip_prefix /files
        file_server {
            root F:\projects\trueviewar
        }
    }
    handle * {
        root f:/projects/frontend/build
        file_server
        try_files {path} /index.html
    }


}


http://trueview.realshops.com {
  redir https://{host}{uri}
}
https://trueview.realshops.com {
    tls "C:\Program Files\Apache Software Foundation\Apache24\conf\ssl\trueview_realshops_com.crt" "C:\Program Files\Apache Software Foundation\Apache24\conf\ssl\trueview_realshops_com.key" 
    
   @opt {
        # preflight request for CORS
        method OPTIONS
    }
handle /fileStore/* {
        header  Access-Control-Allow-Headers *
        header  Access-Control-Allow-Origin *
        header  Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, DELETE" 

uri strip_prefix /fileStore
file_server {
root f:/fileStore
}
}

handle { 
header @opt Access-Control-Allow-Headers *
header @opt Access-Control-Allow-Origin *
header @opt Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, DELETE" 
respond @opt ""
reverse_proxy http://localhost:8080
}
    
}
```

---
{
    auto_https disable_redirects
    auto_https off
}
:20201 {
  @ua {
    method GET
    header_regexp @ua User-Agent (foo|foobar|googlebot|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|facebookexternalhit|twitterbot|developers\.google\.com)
  }
  #respond @us "Hello, world!"
  reverse_proxy @ua {
    to http://localhost:8080
  }
}