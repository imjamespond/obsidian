```
pub fn copy_within<R>(&mut self, src: R, dest: usize)
where
    R: RangeBounds<usize>,
    T: Copy,
```
Copies elements from one part of the slice to another part of itself, using a ==memmove==.
从自身一部分copy到另一部分

`src` is the range within `self` to copy from. `dest` is the starting index of the range within `self` to copy to, which will have the same length as `src`. The two ranges may overlap. The ends of the two ranges must be less than or equal to `self.len()`.

##### Panics

This function will panic if either range exceeds the end of the slice, or if the end of `src` is before the start.

##### Examples

Copying four bytes within a slice:

```
let mut bytes = *b"Hello, World!";

bytes.copy_within(1..5, 8);

assert_eq!(&bytes, b"Hello, Wello!");
```

--- 
[将后面的往前copy](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021)
```rust
#![allow(unused)]
fn main() {
    let mut bytes:[u8;10] = [1,2,3,4,5,6,7,8,9,0]; // [0;10]
    bytes.copy_within(3.., 0);
    println!("{:?}",&bytes);
}
```

```
[4, 5, 6, 7, 8, 9, 0, 8, 9, 0]
```