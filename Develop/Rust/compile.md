- cross platform
  https://stackoverflow.com/questions/67061283/compile-a-rust-program-to-an-exe-using-an-m1-mac
  Solution 1:

You can install/add the targets using these commands :

```rust
rustup target add x86_64-pc-windows-gnu
rustup toolchain install stable-x86_64-pc-windows-gnu
```

then you can target windows from your mac:

```rust
cargo build --release --target=x86_64-pc-windows-gnu
```

Solution 2: Simply use docker!

```rust
FROM mcr.microsoft.com/windows/servercore:ltsc2019
// install rust
COPY project c:/project
RUN cd c:/project && cargo build --release
```

Solution 3: there is also Cross. you can use this for cross-compilation: [https://github.com/rust-embedded/cross](https://github.com/rust-embedded/cross)