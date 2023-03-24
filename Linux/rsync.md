```
rsync -aE --delete --progress ../sdnsmeta/src/pages/quality/jobs .
```

rsync --help
-a, --archive archive mode; same as -rlptgoD (no -H)
-E, --extended-attributes copy extended attributes
--delete delete extraneous files from destination dirs
--progress show progress during transfer

```
rsync -aE --delete --progress --exclude=node_modules --exclude=.git --exclude=dist ../../data-atlas .
```
 --exclude=PATTERN
 
---

```
ssh target
scp some_file target:/home/user
rsync -avP * target:/home/user/some_dir
```
