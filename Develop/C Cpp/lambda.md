https://zhuanlan.zhihu.com/p/258738667

> [!NOTE] C++11中的Lambda表达式捕获外部变量主要有以下形式：
> 
> []：默认不捕获任何变量；
> [=]：默认以值捕获所有变量；
> [&]：默认以引用捕获所有变量；
> [x]：仅以值捕获x，其它变量不捕获；
> [&x]：仅以引用捕获x，其它变量不捕获；
> [=, &x]：默认以值捕获所有变量，但是x是例外，通过引用捕获；
> [&, x]：默认以引用捕获所有变量，但是x是例外，通过值捕获；
> [this]：通过引用捕获当前对象（其实是复制指针）；
> [*this]：通过传值方式捕获当前对象；​​​​​​​

在上面的捕获方式中，注意最好不要使用\[=]和\[&]默认捕获所有变量。首先说默认引用捕获所有变量，你有很大可能会出现悬挂引用（Dangling references），因为引用捕获不会延长引用的变量的声明周期，例如一个形参传进来我们进行捕获并作为一个返回值执行。因为函数传参进来之后，本函数不会保存该变量，函数执行完就会自动释放，那么这个时候返回值就可能产生一个没有意义的结果。
```cpp
auto evt_set_status_x = [&](EventType x){
   status[x] = true;/*通过引用捕获的变量 我们可以进行修改变量的数据*/
}; 
```

