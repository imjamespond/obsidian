1. vc runtime 140.dll error

```
[target.x86_64-pc-windows-msvc]
rustflags = ["-Ctarget-feature=+crt-static", "-Zunstable-options"]
```
to your .cargo/config. As pointed out in this Stack Overflow answer.

---
