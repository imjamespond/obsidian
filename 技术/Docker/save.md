Saving docker images that can easily be transferred to other computers is quite easy. I use LZMA2 / XZ compression, as it’s the best (and slowest by far) compression algorithm. XZ is about 5 times slower than Gzip when it comes to compression, however its decompression speed is only two times slower than Gzip. I also use the parallel version of XZ, called PXZ. If you prefer parallel Gzip compression you can use PIGZ. Both are available as packages in Ubuntu
To save an image to a compressed file you type the following:
sudo docker save my_image | pxz > my_image.tar.xz
And to load the compressed file back in to your local Docker image repository:
```
pxz -cd my_image.tar.xz | sudo docker load
docker save centos | gzip > centos7.tar.gz
gzip -dc centos7.tar.gz | docker dockeload
zcat ubuntu-latest.gz | docker import - ubuntu:latest


docker save -o hello.tar hello-world:latest 

docker load -i hello.tar 

```
