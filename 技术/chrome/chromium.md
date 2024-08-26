
https://chromium.woolyss.com/download/en/

- Stable Channel Update for Desktop
https://chromereleases.googleblog.com/search/label/Desktop%20Update
The Stable channel has been updated to 127.0.6533.72/73 for Windows, Mac and 127.0.6533.72 for Linux
7e0b87ec6b8cb5cb2969e1479fc25776e582721d-refs/heads/main@{#1313161}
### https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Mac_Arm/

https://download-chromium.appspot.com/?platform=Mac_Arm&type=snapshots
- source code
https://chromium.googlesource.com/chromium/src/+/refs/tags/126.0.6478.115
- Stable `126.0.6478.128 1300313 @ Jul 17 2024`, 基线版本, 可过滤13003，或127的`1313161`以前
https://chromiumdash.appspot.com/releases?platform=Mac
- ##### 分支,126为例，找到126.0.6478.115稳定版
https://chromiumdash.appspot.com/branches
https://chromium.googlesource.com/chromium/src.git/+log/refs/branch-heads/6478
~~通过commit查到revision~~
```
Performance
Chromium developers: sign in to see more data
Commit
Group report for revision: 1312990(New)
```
https://chromiumdash.appspot.com/commit/0c2b7cc7b63c7ecf0bebd1f232e0c236d153f76d


LTSC
https://support.google.com/chrome/a/answer/12239814

https://www.chromium.org/getting-involved/download-chromium/

- [已损坏](https://github.com/macchrome/macstable/issues/22)
`sudo xattr -rc Chromium.app`

--- 
chrome://net-internals/?#dns