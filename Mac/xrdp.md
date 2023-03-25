To compile xrdp from the packaged sources, you need basic build tools - a compiler (gcc or clang) and the make program. Additionally, you would need ==**openssl-devel, pam-devel, libX11-devel, libXfixes-devel, libXrandr-devel**==. More additional software would be needed depending on your configuration.

To compile xrdp from a checked out git repository, you would additionally need autoconf, automake, libtool and pkg-config.

http://mirrors.syringanetworks.net/gnu/autoconf-archive/
```
./configure --prefix=/usr/local
export PATH=$PATH:$HOME/tools/autoconf/bin
```

https://www.gnu.org/software/automake/#downloading
`./configure --prefix=/usr/local`
you may need to install the Automake::Config module) (@INC contains: /usr/local/share/automake-1.16


https://pkg-config.freedesktop.org/releases/?C=M;O=A](pkg-config
`./configure --with-internal-glib`

https://www.gnu.org/software/libtool/

https://www.openssl.org/source/
`./config --prefix=/usr/local`