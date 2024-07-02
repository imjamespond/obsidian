【字符串截取导致的BUG【渡一教育】】 https://www.bilibili.com/video/BV1kY3yeEEVN/?share_source=copy_web&vd_source=65d7c54e9b8b7363bc20d2b5b5809ffb

一个utf16码元占两个字节
codePointAt（i 为utf16码元索引非码点索引）返回当前==utf16码元==的数值，若超过65535则说明这是特殊字符（码点）使用两个utf16码元4个字节32位空间，即下个utf16码元和当前码元表示相同特殊字符