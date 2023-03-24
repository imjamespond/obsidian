1, main.rs 必须引用foo.rs才rust-analyzer才会分析
2, block删除~/.cargo/package-cache文件
3, git config --global --list删除代理不可用时

---
 
cargo build -r
release版性能比debug高20倍!

---
vscode 出现rust-analyzer failed to load workspace: "cargo" "--version" failed
```
搜配置 
rust-analyzer.server.extraEnv 加入{
"CARGO":"cargo"
}
```
完全重启vscode

---
https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb
安装插件debug

---
VSCode: Acquiring CodeLLDB platform package 速度慢
https://github.com/vadimcn/vscode-lldb/releases
下载后在vscode安装
menu ->install from vsix

---

cargo install wasm-pack
添加依赖到Cargo.toml
cargo add wasm_bindgen



