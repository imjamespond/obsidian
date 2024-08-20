使用 ? 解开 Option
你可以使用 match 语句来解开 Option，但使用 ? 运算符通常会更容易。如果 x 是 Option，那么若 x 是 Some ，对x?表达式求值将返回底层值，否则无论函数是否正在执行都将终止且返回 None。

```rust
fn next_birthday(current_age: Option<u8>) -> Option<String> {
    // 如果 `current_age` 是 `None`，这将返回 `None`。
    // 如果 `current_age` 是 `Some`，内部的 `u8` 将赋值给 `next_age`。
    let next_age: u8 = current_age?;
    Some(format!("Next year I will be {}", next_age))
}
```


你可以将多个 ? 链接在一起，以使代码更具可读性。