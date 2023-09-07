```
checking for pkg-config... /Users/james/.bin/pkg-config
checking pkg-config is at least version 0.9.0... yes
checking for gmp >= 6.2... no
configure: error: gmplib 6.2 or greater was not found. You can get it from https://gmplib.org/
```

gmplib 找不到
```
export PKG_CONFIG_PATH=$HOME/Downloads/filezilla/gmp-6.3.0

```