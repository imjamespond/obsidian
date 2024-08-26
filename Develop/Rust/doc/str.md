str

---

String slices.

_See also the `std::str` module._

The `str` type, also called a 'string slice', is the most primitive string type. It is usually seen in its borrowed form, `&str`. It is also the type of string literals, `&'static str`.

# Basic Usage

String literals are string slices:

`let hello_world = "Hello, World!";`

Here we have declared a string slice initialized with a string literal. String literals have a ==static lifetime==, which means the string `hello_world` is guaranteed to be valid for the duration of the entire program. We can ==explicitly specify== `hello_world`'s lifetime as well:

`let hello_world: &'static str = "Hello, world!";`

# Representation

==A `&str` is made up of ***two*** components==: a pointer to some bytes, and a length. You can look at these with the [`as_ptr`] and [`len`] methods:
```rust
use std::slice;  
use std::str;  
  
let story = "Once upon a time...";  
  
let ptr = story.as_ptr();  
let len = story.len();  
  
// story has nineteen bytes  
assert_eq!(19, len);  
  
// We can re-build a str out of ptr and len. This is all unsafe because  
// we are responsible for making sure the two components are valid:  
let s = unsafe {  
// First, we build a &[u8]...  
let slice = slice::from_raw_parts(ptr, len);  
  
// ... and then convert that slice into a string slice  
str::from_utf8(slice)  
};  
  
assert_eq!(s, Ok(story));
```
Note: This example shows the internals of `&str`. `unsafe` should not be used to get a string slice under normal circumstances. Use `as_str` instead.

# Invariant

Rust libraries may assume that string slices are always valid UTF-8.

Constructing a non-UTF-8 string slice is not immediate undefined behavior, but any function called on a string slice may assume that it is valid UTF-8, which means that a non-UTF-8 string slice can lead to undefined behavior down the road.