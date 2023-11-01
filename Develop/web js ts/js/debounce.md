- maxWait
https://lodash.com/docs#debounce
#### Arguments
1.  `func` _(Function)_: The function to debounce.
2.  `[wait=0]` _(number)_: The number of milliseconds to delay.
3.  `[options={}]` _(Object)_: The options object.
4.  `[options.leading=false]` _(boolean)_: Specify invoking on the leading edge of the timeout.
5.  `[options.maxWait]` _(number)_: ==The maximum time `func` is allowed to be delayed before it's invoked==.
6.  `[options.trailing=true]` _(boolean)_: Specify invoking on the trailing edge of the timeout.
#### Returns
_(Function)_: Returns the new debounced function.
