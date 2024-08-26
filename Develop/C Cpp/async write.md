  | --- write buffer--- |
writeAsync(Buffer)->
Buffer: \[cursor, length, data, callback\]
write buffer: Buffer--link-->Buffer--link-->Buffer...通过移动cursor标记已写入位置，当一个Buffer写完后调用Buffer的callback


