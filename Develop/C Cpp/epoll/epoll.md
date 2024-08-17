- [epoll_wait on several Threads faster?](https://stackoverflow.com/questions/12481245/epoll-wait-on-several-threads-faster)
  You can even ==call epoll_wait concurrently on multiple threads for the same epoll_fd ==as long as you use **==edge-triggered==** (EPOLLET) mode (and be careful about synchronisation). Using that approach you can ***get real performance benefits on multi-core machines*** compared to a single-threaded epoll event loop.

