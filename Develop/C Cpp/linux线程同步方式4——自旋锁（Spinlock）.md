```
自旋锁（Spinlock）
自旋锁
1、背景和定义
2、自旋锁适用情况
3、自旋锁有几个重要的特性
4、自旋锁死锁情况举例
5、spin lock相关的API函数
1、初始化
2、加锁
3、解锁
4、销毁
6、自旋锁和互斥锁对比
7、自旋锁和互斥锁运行实验对比
参考
自旋锁
1、背景和定义
自旋锁它是为为实现保护共享资源而提出一种锁机制。其实，自旋锁与互斥锁比较类似，它们都是为了解决对某项资源的互斥使用。无论是互斥锁，还是自旋锁，在任何时刻，最多只能有一个保持者，也就说，在任何时刻最多只能有一个执行单元获得锁。
两者在调度机制上略有不同。对于互斥锁，如果资源已经被占用，资源申请者只能进入睡眠状态。但是自旋锁不会引起调用者睡眠，如果自旋锁已经被别的执行单元保持，调用者就一直循环在那里看是否该自旋锁的保持者已经释放了锁（忙循环）
2、自旋锁适用情况
自旋锁比较适用于锁使用者保持锁时间比较短的情况。
正是由于自旋锁使用者一般保持锁时间非常短，自旋锁的效率远高于互斥锁。
信号量和读写信号量适合于保持时间较长的情况，它们会导致调用者睡眠，因此只能在进程上下文使用，而自旋锁适合于保持时间非常短的情况，它可以在任何上下文使用。如果被保护的共享资源只在进程上下文访问，使用信号量保护该共享资源非常合适，如果对共享资源的访问时间非常短，自旋锁也可以。
自旋锁保持期间是抢占失效的，而信号量和读写信号量保持期间是可以被抢占的。
单CPU非抢占内核下：自旋锁会在编译时被忽略（因为单CPU且非抢占模式情况下，不可能发生进程切换，时钟只有一个进程处于临界区（自旋锁实际没什么用了）
单CPU抢占内核下：自选锁仅仅当作一个设置抢占的开关（因为单CPU不可能有并发访问临界区的情况，禁止抢占就可以保证临街区唯一被拥有）
多CPU下：此时才能完全发挥自旋锁的作用，自旋锁在内核中主要用来防止多处理器中并发访问临界区，防止内核抢占造成的竞争。
操作是原子的，因为当多个线程在给定时间自旋，也只有一个线程可以获得该锁。
3、自旋锁有几个重要的特性
1、被自旋锁保护的临界区代码执行时不能进入休眠。
2、被自旋锁保护的临界区代码执行时是不能被被其他中断中断。
3、被自旋锁保护的临界区代码执行时，内核不能被抢占。
4、在自旋锁忙等期间，因为并没有进入临界区，所以内核抢占还是有效的，因此，等待自旋锁释放的进程有可能被更高优先级的所取代
5、存在两个问题：死锁和过多占用cpu资源。
从这几个特性可以归纳出一个共性：被自旋锁保护的临界区代码执行时，它不能因为任何原因放弃处理器。
4、自旋锁死锁情况举例
内核代码请求到一个自旋锁并且在它的临界区里做它的事情，在中间某处，你的代码失去了处理器。或许它已调用了一个函数（copy_from_user，假设）使进程进入睡眠。也或许，内核抢占发威，一个更高优先级的进程将你的代码推到了一边。此时，正好某个别的线程想获 取同一个锁，如果这个线程运行在和你的内核代码不同的处理器上（幸运的情况），那么它可能要自旋等待一段时间（可能很长），当你的代码从休眠中唤醒或者重新得到处理器并释放锁，它就能得到锁。而最坏的情况是，那个想获取锁得线程刚好和你的代码运行在同一个处理器上，这时它将一直持有CPU进行自旋操作，而你的代码是永远不可能有任何机会来获得CPU释放这个锁了，这就是悲催的死锁。
假设我们的驱动程序正在运行，并且已经获取了一个自旋锁，这个锁控制着对设备的访问。在拥有这个锁得时候，设备产生了一个中断，它导致中断处理例程被调用，而中断处理例程在访问设备之前，也要获得这个锁。当中断处理例程和我们的驱动程序代码在同一个处理器上运行时，由于中断处理例程持有CPU不断自旋，我们的代码将得不到机会释放锁，这也将导致死锁。
5、spin lock相关的API函数
#include <pthread.h>
1
1、初始化
1、函数原型
初始化spin lock， 当线程使用该函数初始化一个未初始化或者被destroy过的spin lock有效。该函数会为spin lock申请资源并且初始化spin lock为unlocked状态
int pthread_spin_init(pthread_spinlock_t *lock, int pshared)；
1
若成功，返回0；否则，返回错误编号

pthread_spinlock_t ：初始化自旋锁
pshared取值：
PTHREAD_PROCESS_SHARED：该自旋锁可以在多个进程中的线程之间共享。（可以被其他进程中的线程看到）
PTHREAD_PROCESS_PRIVATE:仅初始化本自旋锁的线程所在的进程内的线程才能够使用该自旋锁。
2、加锁
1、函数原型
用来获取（锁定）指定的自旋锁. 如果该自旋锁当前没有被其它线程所持有，则调用该函数的线程获得该自旋锁.否则该函数在获得自旋锁之前不会返回。
  int pthread_spin_lock(pthread_spinlock_t *lock);
1
若成功，返回0；否则，返回错误编号
注意：
EBUSY A thread currently holds the lock.These functions shall not return an error code of [EINTR].如果调用该函数的线程在调用该函数时已经持有了该自旋锁，则结果是不确定的。

3、解锁
1、函数原型
int pthread_spin_unlock(pthread_spinlock_t *lock);
1
若成功，返回0；否则，返回错误编号

4、销毁
1、函数原型
用来销毁指定的自旋锁并释放所有相关联的资源（所谓的所有指的是由pthread_spin_init自动申请的资源）
int pthread_spin_destroy(pthread_spinlock_t *lock);
1
若成功，返回0；否则，返回错误编号

在调用该函数之后如果没有调用pthread_spin_init重新初始化自旋锁，则任何尝试使用该锁的调用的结果都是未定义的。
如果调用该函数时自旋锁正在被使用或者自旋锁未被初始化则结果是未定义的。
6、自旋锁和互斥锁对比
Mutex（互斥锁）：
sleep-waiting类型的锁
与自旋锁相比它需要消耗大量的系统资源来建立锁；随后当线程被阻塞时，线程的调度状态被修改，并且线程被加入等待线程队列；最后当锁可用时，在获取锁之前，线程会被从等待队列取出并更改其调度状态；但是在线程被阻塞期间，它不消耗CPU资源。
互斥锁适用于那些可能会阻塞很长时间的场景。
1、 临界区有IO操作
2 、临界区代码复杂或者循环量大
3 、临界区竞争非常激烈
4、 单核处理器
Spin lock（自旋锁）
busy-waiting类型的锁
对于自旋锁来说，它只需要消耗很少的资源来建立锁；随后当线程被阻塞时，它就会一直重复检查看锁是否可用了，也就是说当自旋锁处于等待状态时它会一直消耗CPU时间。
自旋锁适用于那些仅需要阻塞很短时间的场景
7、自旋锁和互斥锁运行实验对比
互斥锁运行实验
#include <iostream>
#include <thread>
 
#include <pthread.h>
#include <sys/time.h>
#include <unistd.h>
 
int num = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
 
int64_t get_current_timestamp()
{   
    struct timeval now = {0, 0}; //定义时间结构体，前面参数是秒，后面是微妙
    gettimeofday(&now, NULL);//获取当前时间
    return now.tv_sec * 1000 * 1000 + now.tv_usec;
}
 
void thread_proc()
{
    for(int i=0; i<1000000; ++i){
        pthread_mutex_lock(&mutex);
        ++num;
        pthread_mutex_unlock(&mutex);
    }   
}
 
int main()
{
    int64_t start = get_current_timestamp();
   std::thread t1(thread_proc), t2(thread_proc);//C++11定义线程
    t1.join();
    t2.join();
    std::cout<<"num:"<<num<<std::endl;
    int64_t end = get_current_timestamp();
    std::cout<<"cost:"<<end-start<< " us" << std::endl;
 
    pthread_mutex_destroy(&mutex);    //maybe you always foget this
 
    return 0;
}

//timeval 结构定义为：
struct timeval{
    long tv_sec;  //秒
    long tv_usec;  //微秒
};
//gettimeofday()会把目前的时间用tv 结构体返回，当地时区的信息则放到tz所指的结构中
int gettimeofday(struct  timeval*tv,struct  timezoone *tz);

运行指令

g++ mutex.cpp -o mutex -lpthread
./mutex

自旋锁运行实验
#include <iostream>
#include <thread>
 
#include <pthread.h>
#include <sys/time.h>
#include <unistd.h>
 
int num = 0;
pthread_spinlock_t spin_lock;
 
int64_t get_current_timestamp()
{
    struct timeval now = {0, 0};//定义时间结构体，前面参数是秒，后面是微妙
    gettimeofday(&now, NULL);//获取当前时间
    return now.tv_sec * 1000 * 1000 + now.tv_usec;
}
 
void thread_proc()
{
    for(int i=0; i<100000000; ++i){
        pthread_spin_lock(&spin_lock);
        ++num;
        pthread_spin_unlock(&spin_lock);
    }   
}
 
int main()
{
    pthread_spin_init(&spin_lock, PTHREAD_PROCESS_PRIVATE);//maybe PHREAD_PROCESS_PRIVATE or PTHREAD_PROCESS_SHARED
 
    int64_t start = get_current_timestamp();
 
    std::thread t1(thread_proc), t2(thread_proc);
    t1.join();
    t2.join();
 
    std::cout<<"num:"<<num<<std::endl;
    int64_t end = get_current_timestamp();
    std::cout<<"cost:"<<end-start<< " us" <<std::endl;
 
    pthread_spin_destroy(&spin_lock);
 
    return 0;
}

运行指令

g++ spinlock.cpp -o spin -lpthread
./spin


自旋锁运行效率快一些

修改了两个程序中临界区的代码，改为：

 for(int i=0; i<100000000; ++i){
        pthread_spin_lock(&spin_lock);
        ++num;
        for(int i=0; i<100; ++i){
            //do nothing
        }   
        pthread_spin_unlock(&spin_lock);
    }   


自旋锁运行效率慢一些,spin lock虽然mutex的性能更好（花费很少的CPU指令），但是它只适应于临界区运行时间很短的场景。
```


> [!NOTE] 参考
> 
1、https://www.cnblogs.com/biyeymyhjob/archive/2012/07/21/2602015.html
2、http://www.360doc.com/content/12/0607/15/9400799_216632261.shtml
3、https://blog.csdn.net/freeelinux/article/details/53695111
————————————————
版权声明：本文为CSDN博主「JMW1407」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/JMW1407/article/details/106793862
