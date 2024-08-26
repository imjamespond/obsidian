
 if {>User-Agent} match (googlebot|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|facebookexternalhit|twitterbot|developers\.google\.com) 
to http://localhost:10001/{path} /   \#  转向

---
NGINX like try files...
*:3000

gzip {
 ext .js .css
}

root D:/www/build

proxy /api localhost:8086
proxy /uac localhost:8081

rewrite / {
 if {path} not_match ^/(api|uac)
 to {path} /
}

---
跨域
proxy /api localhost:8086 {
        header_downstream Access-Control-Allow-Origin * 
        header_downstream Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, DELETE"
    }

---
域名一定要用{}包括在其中,分别配置
trueviewar.com:3000 {
tls off

 gzip {
 ext .js .css
 }

 root f:/projects/frontend/build

 proxy /api localhost:8086
 proxy /uac localhost:8081

 rewrite / {  \#  匹配地址
 if {path} not_match ^/(api|uac)  \#  匹配包含字符
 to {path} /   \#  转向
 }
}

http://trueview.realshops.com:3000 {
 tls off
 proxy / https://trueview.realshops.com
} 
---

http://trueview.realshops.com:3000 {
 tls off
 proxy / http://localhost:8080
}
http://trueview.realshops.com:3000/fileStore {
 root f:/fileStore
}
\#  特定url是静态资源,其它的走代理
---
Redirect all HTTP requests to HTTPS with a 301
Caddy does this by default with Automatic HTTPS. You can just leave your site scheme-agnostic, e.g.:
example.com {
  ...
}

And Caddy will run a 301 Redirect listening on HTTP and serve the actual site on HTTPS.

---

To manually redirect, you’ll need to specify a definition for the HTTP version of your site, one way or another:



To manually redirect, you’ll need to specify a definition for the HTTP version of your site, one way or another:

\#  Blanket redir for entire HTTP version of site
http://example.com {
 redir https://{host}{uri}
}
https://example.com {
  ...
}
\#  Combination, check for HTTP scheme and redirect
http://example.com, https://example.com {
  redir {
    if {scheme} is http
    / https://{host}{uri}
  }
  ...
}

---
EXAMPLE
http://trueviewar.com {
 redir https://{host}{uri}
}
https://trueviewar.com {
 tls D:\tools\caddy_v1.0.4_windows_amd64\tls\STAR_trueviewar_com.crt D:\tools\caddy_v1.0.4_windows_amd64\tls\trueviewar.key
 \# tls test@trueviewar.com

 gzip {
 ext .js .css
 }

 root f:/projects/frontend/build

 proxy /api localhost:8086
 proxy /uac localhost:8081

 rewrite / {
 if {path} not_match ^/(api|uac)
 to {path} /
 }
}

http://trueview.realshops.com {
 redir https://{host}{uri}
}
https://trueview.realshops.com {
 \# tls test@realshops.com
 tls "C:\Program Files\Apache Software Foundation\Apache24\conf\ssl\trueview_realshops_com.crt" "C:\Program Files\Apache Software Foundation\Apache24\conf\ssl\trueview_realshops_com.key" 
 \# proxy / https://trueview.realshops.com
 proxy / http://localhost:8080
}
https://trueview.realshops.com/fileStore {
 \# tls test@realshops.com
 tls "C:\Program Files\Apache Software Foundation\Apache24\conf\ssl\trueview_realshops_com.crt" "C:\Program Files\Apache Software Foundation\Apache24\conf\ssl\trueview_realshops_com.key" 
 root f:/fileStore
}