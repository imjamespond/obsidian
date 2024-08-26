Support for dynamic upstreams that will enable dynamic load balancing per API.

 # sample upstream block:
 ```
upstream backend {
 server 127.0.0.1:12354;
 server 127.0.0.1:12355;
 server 127.0.0.1:12356 backup;
}
```
So we can proxy_pass like:

proxy_pass http://backend;