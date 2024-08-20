## 概述

DoT 全称是 DNS over TLS，它使用 TLS 协议来传输 DNS 协议。TLS 协议是目前互联网最常用的安全加密协议之一，我们访问 HTTPS 的安全基础就是基于 TLS 协议的。相比于之前使用无连接无加密的 UDP 模式， TLS 本身已经实现了保密性与完整性。

DoH 全称是 DNS over HTTPS，它使用 HTTPS 来传输 DNS 协议。DoH 的安全原理与 DoT 一样，他们之间的区别只在于：DoH 有了 HTTPS 格式封装，更加通用。

DoT 在专用端口上通过 TLS 连接 DNS 服务器，而 DoH 是基于使用 HTTPS 应用层协议，将查询发送到 HTTPS 端口上的特定 HTTP 端点，这里造成的外界感知就是端口号的不同，DoT 的端口号是 853，DoH 端口号 443。

## 使用指南

目前已经DoT/DoH方案已经正式开放公测：为 DNSPod 用户的信息和隐私安全保驾护航。

### 专业版

登录 [DNSPod 公共解析管理控制台](https://console.dnspod.cn/publicdns) 即可查看您的专属 DOT/DOH 专属地址。如下图所示：

![](https://main.qcloudimg.com/raw/e8688ddb62ee1e44effa2833166c3cb1.png)

### 基础免费服务

- DoH 地址：[https://doh.pub/dns-query](https://doh.pub/dns-query)
- DoH(IP)：[https://1.12.12.12/dns-query](https://1.12.12.12/dns-query) 、 [https://120.53.53.53/dns-query](https://120.53.53.53/dns-query)
- DoH（国密 SM2 ）地址：[https://sm2.doh.pub/dns-query](https://sm2.doh.pub/dns-query) 基于[腾讯云政企国密解决方案](https://cloud.tencent.com/product/ssl/sm2)，可获得完整的域名解析国密链路。
- DoT 地址：dot.pub
- DoT(IP)：1.12.12.12、120.53.53.53

> 说明：
> 
> - 公共解析Public DNS免费版单个域名解析调用频率限制为20QPS。
> - 公共解析Public DNS免费版不承诺服务可用性SLA。

最近更新于 2024-05-30 17:28


--- 
# Chrome 浏览器接入公共解析 Public DNS

## 操作场景

本文档指导您如何在 Chrome 浏览器中接入 Public DNS 。

## 操作步骤

### 获取配置信息

1. 登录 [DNSPod 管理控制台](https://console.dnspod.cn/publicdns/settings/install)，单击侧边栏【公共解析】>【我的配置】。
2. 在配置项页签中，即可获取您的配置信息。如下图所示：

![](https://main.qcloudimg.com/raw/42adfa8aa28af5ce6166c4e83d944302.png)

### 配置公共解析 Public DNS

1. 在 chrome 浏览器地址栏中，单击 ![](https://main.qcloudimg.com/raw/cbc0bfb8a9775bb113189ccc1c9443b3.png) 图标。
2. 在展开的选项中，单击【设置】。
3. 在 chrome 浏览器设置页，单击选择【隐私设置和安全性】。
4. 在隐私设置和安全性选项中，单击选择【安全】。  
    ![](https://main.qcloudimg.com/raw/bf371621f64af6d4ef576b8b578b177f.png)
5. 在安全设置页【高级】处，开启【使用安全 DNS】并输入在 DNSPod 管理控制台获取到的【DNS over HTTPS】信息。

> 说明：若您使用公共解析 Public DNS 基础服务请输入 `https://doh.pub/dns-query`。

![](https://main.qcloudimg.com/raw/d256e7a427c342410a5c341af699bcc1.png)

6. 完成设置后，即可完成 Chrome 浏览器中接入 Public DNS 操作。

最近更新于 2022-01-24 15:32