- change owner of symbol link
`chown -h mj:mj test1`
**-h, --no-dereference** affect each symbolic link instead of any referenced file (useful only on systems that can change the ownership of a symlink)
`sudo chown -hR test:foobar test/`

--- 
默认组
```bash
chgrp --help
Usage: chgrp [OPTION]... GROUP FILE...
  or:  chgrp [OPTION]... --reference=RFILE FILE...
Change the group of each FILE to GROUP. 将文件夹改组？
sudo chgrp foobar ./test
sudo chmod g+s ./test
```
