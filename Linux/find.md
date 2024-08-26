
`find . -type f -size +4096c  `
to find files bigger than 4096 bytes.

And :

`find . -type f -size -4096c  `
to find files smaller than 4096 bytes.

Notice the + and - difference after the size switch.

The -size switch explained:

-size n[cwbkMG]

```
File uses n units of space. The following suffixes can be used:

`b'    for 512-byte blocks (this is the default if no suffix  is
                            used)

`c'    for bytes

`w'    for two-byte words

`k'    for Kilobytes       (units of 1024 bytes)

`M'    for Megabytes    (units of 1048576 bytes)

`G'    for Gigabytes (units of 1073741824 bytes)

The size does not count indirect blocks, but it does count
blocks in sparse files that are not actually allocated. Bear in
mind that the `%k' and `%b' format specifiers of -printf handle
sparse files differently. The `b' suffix always denotes
512-byte blocks and never 1 Kilobyte blocks, which is different
to the behaviour of -ls.
```