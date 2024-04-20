```rust
let handle = |buf: &[u8]| {
  let msg = String::from_utf8_lossy(&buf);
  println!("msg {}", msg);
  // 有外部变量为闭包
  browser
      .add("root\t2888\t0.0\t0.0\t1352\t0\ttty3");
};

fn handle_fn(handle: impl FnMut(&[u8])){ // FnMut 为trait
  return handle;
}
```