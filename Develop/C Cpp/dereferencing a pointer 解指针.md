

> [!NOTE] [Is the copy constructor called when you dereferencing a pointer when passing by reference to a function?](https://stackoverflow.com/questions/11347409/is-the-copy-constructor-called-when-you-dereferencing-a-pointer-when-passing-by)
> No, the copy constructor is not called.
> 
The dereference operator creates an lvalue referring to the existing object. The reference parameter is bound to this existing object.

