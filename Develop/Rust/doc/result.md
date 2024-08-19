```rust
if len.is_ok() {
    println!("send {}", len.unwrap())
} else {
    println!("error {}", len.unwrap_err())
}
```