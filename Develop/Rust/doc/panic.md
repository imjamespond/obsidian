
--- 
- Ok and ?
Used in `?` to decide whether the operator should produce a value (because this returned [`ControlFlow::Continue`](vscode-file://vscode-app/Applications/tools/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://doc.rust-lang.org/stable/core/ops/control_flow/enum.ControlFlow.html")) or propagate a value back to the caller (because this returned [`ControlFlow::Break`](vscode-file://vscode-app/Applications/tools/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://doc.rust-lang.org/stable/core/ops/control_flow/enum.ControlFlow.html")).
```rust
pub fn broadcast() -> std::io::Result<()> {
  let socket = UdpSocket::bind("0.0.0.0:0")?;
  socket.set_broadcast(true)?;
  let data = [1, 2, 3];
  socket.send_to(&data, "255.255.255.255:12345")?;
  Ok(())
}
```

--- 
- unwrap
```rust
    let x: Result<u32, &str> = Ok(2);
    assert_eq!(x.unwrap(), 2);
    let x: Result<u32, &str> = Err("emergency failure");
    x.unwrap(); // panics with `emergency failure`
```
Returns the contained [`Ok`](vscode-file://vscode-app/Applications/tools/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://doc.rust-lang.org/stable/core/result/enum.Result.html") value, consuming the `self` value.
- expect
```rust
let x: Result<u32, &str> = Err("emergency failure");
x.expect("Testing expect"); 
// panics with `Testing expect: emergency failure`
```
`pub fn expect(self, msg: &str) -> T`
Returns the contained [`Ok`](vscode-file://vscode-app/Applications/tools/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "https://doc.rust-lang.org/stable/core/result/enum.Result.html") value, consuming the `self` value.

与 `unwrap` 相比，`expect` 提供了相同的功能，但允许附加一个自定义的错误消息。这在调试和错误追踪中极为有用，因为它可以提供更多上下文信息。