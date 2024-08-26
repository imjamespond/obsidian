https://rustwiki.org/zh-CN/rust-by-example/error/option_unwrap.html
在标准库（`std`）中有个叫做 `Option<T>`（option 中文意思是 “选项”）的枚举类型，用于有 “不存在” 的可能性的情况。它表现为以下两个 “option”（选项）中的一个：

- `Some(T)`：找到一个属于 `T` 类型的元素
- `None`：找不到相应元素

这些选项可以通过 `match` 显式地处理，或使用 `unwrap` 隐式地处理。隐式处理要么返回 `Some` 内部的元素，要么就 `panic`。

请注意，手动使用 [expect](https://rustwiki.org/zh-CN/std/option/enum.Option.html#method.expect) 方法自定义 `panic` 信息是可能的，但相比显式处理，`unwrap` 的输出仍显得不太有意义。在下面例子中，显式处理将举出更受控制的结果，同时如果需要的话，仍然可以使程序 `panic`。
```rust
match gift {
    Some("snake") => println!("Yuck! I'm throwing that snake in a fire."),
    Some(inner)   => println!("{}? How nice.", inner),
    None          => println!("No gift? Oh well."),
}
```