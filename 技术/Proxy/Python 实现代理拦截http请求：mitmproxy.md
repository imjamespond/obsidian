
mitmproxy 官网：https://mitmproxy.org
mitmproxy 官网文档：https://docs.mitmproxy.org/stable
​github地址：https://github.com/mitmproxy/mitmproxy
github示例：https://github.com/mitmproxy/mitmproxy/tree/main/examples


安装 证书
安装证书：https://docs.mitmproxy.org/stable/concepts-certificates
如果想要截获 HTTPS 请求，就得安装 mitmproxy的CA证书。
首先启动 mitmproxy，然后浏览器访问 http://mitm.it 选择对应平台的图标下载并安装证书。
将证书设置为 "受信任的根证书颁发机构"。

![[Pasted image 20240611105911.png]]

把 charles，Fiddler 证书安装到安卓根目录，解决安卓微信 7.0 版本以后安装证书也无法抓包问题，需要 root：https://blog.csdn.net/freeking101/article/details/118914275

https://docs.mitmproxy.org/stable/concepts-certificates/
### Installing the mitmproxy CA certificate manually

Sometimes using the [quick install app](https://docs.mitmproxy.org/stable/concepts-certificates/#quick-setup) is not an option and you need to install the CA manually. Below is a list of pointers to manual certificate installation documentation for some common platforms. The mitmproxy CA cert is located in `~/.mitmproxy` after it has been generated at the first start of mitmproxy.

- curl on the command line:  
    `curl --proxy 127.0.0.1:8080 --cacert ~/.mitmproxy/mitmproxy-ca-cert.pem https://example.com/`
- wget on the command line:  
    `wget -e https_proxy=127.0.0.1:8080 --ca-certificate ~/.mitmproxy/mitmproxy-ca-cert.pem https://example.com/`
- [macOS](https://support.apple.com/guide/keychain-access/add-certificates-to-a-keychain-kyca2431/mac)
- [macOS (automated)](https://www.dssw.co.uk/reference/security.html): `sudo security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain ~/.mitmproxy/mitmproxy-ca-cert.pem`
- [Ubuntu/Debian](https://askubuntu.com/questions/73287/how-do-i-install-a-root-certificate/94861#94861)
- [Fedora](https://docs.fedoraproject.org/en-US/quick-docs/using-shared-system-certificates/#proc_adding-new-certificates)
- [Mozilla Firefox](https://wiki.mozilla.org/MozillaRootCertificate#Mozilla_Firefox)
- [Chrome on Linux](https://stackoverflow.com/a/15076602/198996)
- [iOS](http://jasdev.me/intercepting-ios-traffic)  
    On recent iOS versions you also need to enable full trust for the mitmproxy root certificate:
    1. Go to Settings > General > About > Certificate Trust Settings.
    2. Under “Enable full trust for root certificates”, turn on trust for the mitmproxy certificate.
- [iOS Simulator](https://github.com/ADVTOOLS/ADVTrustStore#how-to-use-advtruststore)
- [Java](https://docs.oracle.com/cd/E19906-01/820-4916/geygn/index.html):  
    `sudo keytool -importcert -alias mitmproxy -storepass changeit -keystore $JAVA_HOME/lib/security/cacerts -trustcacerts -file ~/.mitmproxy/mitmproxy-ca-cert.pem`
- [Android/Android Simulator](http://wiki.cacert.org/FAQ/ImportRootCert#Android_Phones_.26_Tablets)
- [Windows](https://web.archive.org/web/20160612045445/http://windows.microsoft.com/en-ca/windows/import-export-certificates-private-keys#1TC=windows-7)
- [Windows (automated)](https://technet.microsoft.com/en-us/library/cc732443.aspx):  
    `certutil -addstore root mitmproxy-ca-cert.cer`