



- CString (和c交互用)
```rust
use std::{
    ffi::{CStr, CString},
    mem,
    os::raw,
};

pub fn add(&mut self, s: &str, checked: bool) -> i32 {
    let s = CString::safe_new(s);
    unsafe { Fl_Check_Browser_add(self.inner.widget() as _, s.as_ptr(), checked as i32) }
}

extern "C" {
    pub fn Fl_Check_Browser_add(
        self_: *mut Fl_Check_Browser,
        s: *const ::std::os::raw::c_char,
        b: ::std::os::raw::c_int,
    ) -> ::std::os::raw::c_int;
}
```