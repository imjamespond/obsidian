
docker run -itd -v /docker/registry:/var/lib/registry -p 5000:5000 ==--restart=always== --name my-registry registry:latest
当 Docker 重启时，容器自动启动

docker run -p 8080:8080 ==--rm== --name zeppelin apache/zeppelin:0.9.0

==-v local_path:container_path==

Run an interactive container

$ docker run -t -i ubuntu /bin/bash

root@af8bae53bdd3:/#

$ docker run -t -i openjdk /bin/bash

root@d7dd002b0927:/# java -version

openjdk version "1.8.0_102"
OpenJDK Runtime Environment (build 1.8.0_102-8u102-b14.1-1~bpo8+1-b14)
OpenJDK 64-Bit Server VM (build 25.102-b14, mixed mode)
Now, you can play around inside this container. When completed, run the exit command or enter Ctrl-D to exit the interactive shell.

DB2 : registry.cn-hangzhou.aliyuncs.com/denverdino/db2express-cregistry.cn-hangzhou.aliyuncs.com/denverdino/db2express-c

docker run -it -p 50000:50000 --name my-db2 -e DB2INST1_PASSWORD=db2inst1 -e LICENSE=accept 42e2 bash

The name of the container will be db2inst1.
Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]


Run a command in a new container


Options:

      --add-host value              Add a custom host-to-IP mapping (host:ip) (default [])

  -a, --attach value                Attach to STDIN, STDOUT or STDERR (default [])

      --blkio-weight value          Block IO (relative weight), between 10 and 1000

      --blkio-weight-device value   Block IO weight (relative device weight) (default [])

      --cap-add value               Add Linux capabilities (default [])

      --cap-drop value              Drop Linux capabilities (default [])

      --cgroup-parent string        Optional parent cgroup for the container

      --cidfile string              Write the container ID to the file docker run --cidfile cid -it my-centos:0.1 /bin/bash

      --cpu-percent int             CPU percent (Windows only)

      --cpu-period int              Limit CPU CFS (Completely Fair Scheduler) period

      --cpu-quota int               Limit CPU CFS (Completely Fair Scheduler) quota

  -c, --cpu-shares int              CPU shares (relative weight)

      --cpuset-cpus string          CPUs in which to allow execution (0-3, 0,1)

      --cpuset-mems string          MEMs in which to allow execution (0-3, 0,1)

  -d, --detach                      Run container in background and print container ID

      --detach-keys string          Override the key sequence for detaching a container

      --device value                Add a host device to the container (default [])

      --device-read-bps value       Limit read rate (bytes per second) from a device (default [])

      --device-read-iops value      Limit read rate (IO per second) from a device (default [])

      --device-write-bps value      Limit write rate (bytes per second) to a device (default [])

      --device-write-iops value     Limit write rate (IO per second) to a device (default [])

      --disable-content-trust       Skip image verification (default true)

      --dns value                   Set custom DNS servers (default [])

      --dns-opt value               Set DNS options (default [])

      --dns-search value            Set custom DNS search domains (default [])

      --entrypoint string           Overwrite the default ENTRYPOINT of the image

  -e, --env value                   Set environment variables (default [])
      --env-file value              Read in a file of environment variables (default [])

      --expose value                Expose a port or a range of ports (default [])

      --group-add value             Add additional groups to join (default [])

      --health-cmd string           Command to run to check health

      --health-interval duration    Time between running the check

      --health-retries int          Consecutive failures needed to report unhealthy

      --health-timeout duration     Maximum time to allow one check to run

      --help                        Print usage

  -h, --hostname string             Container host name

  -i, --interactive                 Keep STDIN open even if not attached

      --io-maxbandwidth string      Maximum IO bandwidth limit for the system drive (Windows only)

      --io-maxiops uint             Maximum IOps limit for the system drive (Windows only)

      --ip string                   Container IPv4 address (e.g. 172.30.100.104)

      --ip6 string                  Container IPv6 address (e.g. 2001:db8::33)

      --ipc string                  IPC namespace to use

      --isolation string            Container isolation technology

      --kernel-memory string        Kernel memory limit

  -l, --label value                 Set meta data on a container (default [])

      --label-file value            Read in a line delimited file of labels (default [])

      --link value                  Add link to another container (default [])

      --link-local-ip value         Container IPv4/IPv6 link-local addresses (default [])

      --log-driver string           Logging driver for the container

      --log-opt value               Log driver options (default [])

      --mac-address string          Container MAC address (e.g. 92:d0:c6:0a:29:33)

  -m, --memory string               Memory limit

      --memory-reservation string   Memory soft limit

      --memory-swap string          Swap limit equal to memory plus swap: '-1' to enable unlimited swap

      --memory-swappiness int       Tune container memory swappiness (0 to 100) (default -1)

      --name string                 Assign a name to the container

      --network string              Connect a container to a network (default "default")

      --network-alias value         Add network-scoped alias for the container (default [])

      --no-healthcheck              Disable any container-specified HEALTHCHECK

      --oom-kill-disable            Disable OOM Killer

      --oom-score-adj int           Tune host's OOM preferences (-1000 to 1000)

      --pid string                  PID namespace to use

      --pids-limit int              Tune container pids limit (set -1 for unlimited)

      --privileged                  Give extended privileges to this container

  -p, --publish value               Publish a container's port(s) to the host (default [])

  -P, --publish-all                 Publish all exposed ports to random ports

      --read-only                   Mount the container's root filesystem as read only

      --restart string              Restart policy to apply when a container exits (default "no")

      --rm                          Automatically remove the container when it exits

      --runtime string              Runtime to use for this container

      --security-opt value          Security Options (default [])

      --shm-size string             Size of /dev/shm, default value is 64MB

      --sig-proxy                   Proxy received signals to the process (default true)

      --stop-signal string          Signal to stop a container, 15 by default (default "15")

      --storage-opt value           Storage driver options for the container (default [])

      --sysctl value                Sysctl options (default map[])

      --tmpfs value                 Mount a tmpfs directory (default [])

  -t, --tty                         Allocate a pseudo-TTY

      --ulimit value                Ulimit options (default [])

  -u, --user string                 Username or UID (format: <name|uid>[:<group|gid>])

      --userns string               User namespace to use

      --uts string                  UTS namespace to use

  -v, --volume value                Bind mount a volume (default []) local path:docker path

If you are using Docker Machine on Mac or Windows, your Docker Engine daemon has only limited access to your OS X or Windows filesystem. Docker Machine tries to auto-share your /Users (OS X) or C:\Users(Windows) directory. So, you can mount files or directories on OS X using.
      --volume-driver string        Optional volume driver for the container

      --volumes-from value          Mount volumes from the specified container(s) (default [])

  -w, --workdir string              Working directory inside the container
