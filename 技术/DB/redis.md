文章目录
Redis[5] key的过期时间删除策略、持久化配置
**Redis6的key过期时间删除策略**
Redis服务器实际使用的是惰性删除和定期删除两种策略：通过配合使用这两种删除策略，服务器可以很好地在合理使用CPU时间和避免浪费内存空间之间取得平衡。
设计缓存中间件：可以参考redis的key过期淘汰方式和内存不足淘汰方式
**内存不足时-Redis的Key内存淘汰策略**
策略
**volatile-lru(least recently used)**（最常用）
volatile-lfu(least frequently used)
volatile-ttl （删除即将过期的）
volatile-random （随机删除即将过期的）
allkeys-lru
allkeys-lfu
allkeys-random
noeviction
基于java实现lru算法
**Redis持久化配置RDB操作实战**
**Redis6.x持久化配置AOF介绍和配置实战**
**Redis6.x持久化配置AOF和RDB的选择问题**
Redis[5] key的过期时间删除策略、持久化配置
本文整理自小d课堂笔记和java进阶仓库，如有雷同，大部分是人家写的

java进阶仓库：https://doocs.github.io/advanced-java/#/

Redis6的key过期时间删除策略
背景

redis的key配置了过期时间，这个是怎么被删除的
redis数据明明过期了，怎么还占用着内存？
Redis 就只能用 10G，你要是往里面写了 20G 的数据，会发生什么？淘汰哪些数据
redis key过期策略

定期删除+惰性删除。
Redis如何淘汰过期的keys： set name xx 3600

定期删除：

隔一段时间，就随机抽取一些设置了过期时间的 key，检查其是否过期，如果过期就删除，
定期删除可能会导致很多过期 key 到了时间并没有被删除掉，那咋整呢，所以就是惰性删除
惰性删除 ：

概念：当一些客户端尝试访问它时，key会被发现并主动的过期
放任键过期不管，但是每次从键空间中获取键时，都检查取得的键是否过期，如果过期的话，就删除该键
Redis服务器实际使用的是惰性删除和定期删除两种策略：通过配合使用这两种删除策略，服务器可以很好地在合理使用CPU时间和避免浪费内存空间之间取得平衡。
问题

如果定期删除漏掉了很多过期 key，然后你也没及时去查，也就没走惰性删除，此时会怎么样？

 如果大量过期 key 堆积在内存里，导致 redis 内存块耗尽了，就需要走内存淘汰机制

设计缓存中间件：可以参考redis的key过期淘汰方式和内存不足淘汰方式
内存不足时-Redis的Key内存淘汰策略
背景

redis在占用的内存超过指定的maxmemory之后，
通过配置文件的maxmemory_policy来确定redis是否释放内存以及如何释放内存
提供多种策略
策略
volatile-lru(least recently used)（最常用）
最近最少使用算法，从设置了过期时间的键中选择空转时间最长的键值对清除掉；
volatile-lfu(least frequently used)
最近最不经常使用算法，从设置了过期时间的键中选择某段时间之内使用频次最小的键值对清除掉；
volatile-ttl （删除即将过期的）
从设置了过期时间的键中选择过期时间最早的键值对清除 (删除即将过期的）
volatile-random （随机删除即将过期的）
从设置了过期时间的键中，随机选择键进行清除；
allkeys-lru
最近最少使用算法，从所有的键中选择空转时间最长的键值对清除；
allkeys-lfu
最近最不经常使用算法，从所有的键中选择某段时间之内使用频次最少的键值对清除；
allkeys-random
所有的键中，随机选择键进行删除；
noeviction
不做任何的清理工作，在redis的内存超过限制之后，所有的写入操作都会返回错误；但是读操作都能正常的进行;
config配置的时候 下划线_的key需要用中横线-

127.0.0.1:6379> config set maxmemory_policy volatile-lru
(error) ERR Unsupported CONFIG parameter: maxmemory_policy

127.0.0.1:6379> config set maxmemory-policy volatile-lru
OK
1
2
3
4
5
基于java实现lru算法
public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private int capacity;

    /**
     * 传递进来最多能缓存多少数据
     *
     * @param capacity 缓存大小
     */
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    /**
     * 如果map中的数据量大于设定的最大容量，返回true，再新加入对象时删除最老的数据
     *
     * @param eldest 最老的数据项
     * @return true则移除最老的数据
     */
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        // 当 map中的数据量大于指定的缓存个数的时候，自动移除最老的数据
        return size() > capacity;
    }
}


Redis持久化配置RDB操作实战
Redis6.x持久化配置介绍和RDB讲解

Redis持久化介绍
Redis是一个内存数据库，如果没有配置持久化，redis重启后数据就全丢失
因此开启redis的持久化功能，将数据保存到磁盘上，当redis重启后，可以从磁盘中恢复数据。
两种持久化方式
RDB (Redis DataBase)
AOF (append only file）
RDB持久化介绍
在指定的时间间隔内将内存中的数据集快照写入磁盘
默认的文件名为dump.rdb
产生快照的情况
save
会阻塞当前Redis服务器，执行save命令期间，Redis不能处理其他命令，直到RDB过程完成为止
bgsave
fork创建子进程，RDB持久化过程由子进程负责，会在后台异步进行快照操作，快照同时还可以响应客户端请求
自动化
配置文件来完成，配置触发 Redis的 RDB 持久化条件
比如 “save m n”。表示m秒内数据集存在n次修改时，自动触发bgsave
主从架构
从服务器同步数据的时候，会发送sync执行同步操作，master主服务器就会执行bgsave
优点
RDB文件紧凑，全量备份，适合用于进行备份和灾难恢复
在恢复大数据集时的速度比 AOF 的恢复速度要快
生成的是一个紧凑压缩的二进制文件
缺点
每次快照是一次全量备份，fork子进程进行后台操作，子进程存在开销
在快照持久化期间修改的数据不会被保存，可能丢失数据
rdb 在redis重启时会重新加载dump.rdb来恢复数据

Redis6.x持久化配置AOF介绍和配置实战
AOF持久化介绍

append only file，追加文件的方式，文件容易被人读懂
以独立日志的方式记录每次写命令， 重启时再重新执行AOF文件中的命令达到恢复数据的目的
写入过程宕机，也不影响之前的数据，可以通过 redis-check-aof检查修复问题
配置实战

appendonly yes，默认不开启
AOF文件名 通过 appendfilename 配置设置，默认文件名是appendonly.aof
存储路径同 RDB持久化方式一致，使用dir配置
核心原理

Redis每次写入命令会追加到aof_buf（缓冲区）
AOF缓冲区根据对应的策略向硬盘做同步操作
高频AOF会带来影响，特别是每次刷盘
提供了3种同步方式，在性能和安全性方面做出平衡

appendfsync always
每次有数据修改发生时都会写入AOF文件，消耗性能多
appendfsync everysec
每秒钟同步一次，该策略为AOF的缺省策略。
appendfsync no
不主从同步，由操作系统自动调度刷磁盘，性能是最好的，但是最不安全
redis 重启时加载appendonly.aof

Redis6.x持久化配置AOF和RDB的选择问题
Redis提供了不同的持久性选项：

RDB持久化以指定的时间间隔执行数据集的时间点快照。
AOF持久化记录服务器接收的每个写入操作，将在服务器启动时再次读取，重建原始数据集。使用与Redis协议本身相同的格式以仅追加方式记录命令，当文件太大时，Redis能够重写
补充之前的配置

auto-aof-rewrite-min-size
AOF文件最小重写大小，只有当AOF文件大小大于该值时候才可能重写,6.x默认配置64mb。

auto-aof-rewrite-percentage
当前AOF文件大小和最后一次重写后的大小之间的比率等于或者等于指定的增长百分比，如100代表当前AOF文件是上次重写的两倍时候才重写。　

RDB的优缺点

优点：
RDB最大限度地提高了Redis的性能，父进程不需要参与磁盘I/O
RDB文件紧凑，全量备份，适合用于进行备份和灾难恢复
在恢复大数据集时的速度比 AOF 的恢复速度要快
生成的是一个紧凑压缩的二进制文件
缺点：
如果您需要在Redis停止工作时（例如断电后）将数据丢失的可能性降至最低，则RDB并不好
RDB经常需要fork才能使用子进程持久存储在磁盘上。如果数据集很大，Fork可能会非常耗时
AOF的优缺点

优点：
数据更加安全
当Redis AOF文件太大时，Redis能够在后台自动重写AOF
AOF以易于理解和解析的格式，一个接一个地包含所有操作的日志
缺点：
AOF文件通常比同一数据集的等效RDB文件大
根据确切的fsync策略，恢复的时候AOF可能比RDB慢
在线上我们到底该怎么做？

RDB持久化与AOF持久化一起使用
如果Redis中的数据并不是特别敏感或者可以通过其它方式重写生成数据
集群中可以关闭AOF持久化，靠集群的备份方式保证可用性
自己制定策略定期检查Redis的情况，然后可以手动触发备份、重写数据；
采用集群和主从同步
Redis4.0后开始的rewrite支持混合模式

就是rdb和aof一起用
直接将rdb持久化的方式来操作将二进制内容覆盖到aof文件中,rdb是二进制，所以很小
有写入的话还是继续append追加到文件原始命令，等下次文件过大的时候再次rewrite
默认是开启状态
好处
混合持久化结合了RDB持久化 和 AOF 持久化的优点,采取了rdb的文件小易于灾难恢复
同时结合AOF，增量的数据以AOF方式保存了，数据更少的丢失
坏处
前部分是RDB格式，是二进制，所以阅读性较差
数据恢复
先看是否存在aof文件，若存在则先按照aof文件恢复，aof比rdb全，且aof文件也rewrite成rdb二进制格式
若aof不存在，则才会查找rdb是否存在
————————————————
版权声明：本文为CSDN博主「尔等同学」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_41852212/article/details/121295824