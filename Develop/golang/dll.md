https://github.com/golang/go/wiki/WindowsDLLs
convert string 
```
func MessageBox(caption, text string, style uintptr) (result int) {
    var nargs uintptr = 4
    ret, _, callErr := syscall.Syscall9(uintptr(messageBox),
        nargs,
        0,
        uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr(text))),
        uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr(caption))),
        style,
        0,
        0,
        0,
        0,
        0)

```

https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messageboxw
```
int MessageBoxW( HWND hWnd, LPCWSTR lpText, LPCWSTR lpCaption, UINT uType );
```

