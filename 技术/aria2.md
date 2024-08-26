

```bash
./aria2c.exe -x 10 -s 10 -k 1m 

# 用多连接下载
 -s, --split=N                Download a file using N connections. If more
                              than N URIs are given, first N URIs are used and
                              remaining URLs are used for backup. If less than
                              N URIs are given, those URLs are used more than
                              once so that N connections total are made
                              simultaneously. The number of connections to the
                              same host is restricted by the
                              --max-connection-per-server option. See also the
                              --min-split-size option.

                              Possible Values: 1-*
                              Default: 5
                              Tags: #basic, #http, #ftp

# 每个下载连到某一服务器最大连接数
 -x, --max-connection-per-server=NUM The maximum number of connections to one
                              server for each download.

                              Possible Values: 1-16
                              Default: 1
                              Tags: #basic, #http, #ftp

```

