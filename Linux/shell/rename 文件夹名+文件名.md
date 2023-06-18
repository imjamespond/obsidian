当前目录下遍历每个目录，将其所有文件名加上目录名
```bash
for dir in *; do
    if [ -d "$dir" ]; then
        echo "./$dir/"
        cd "./$dir/"
        # for file in ./"$dir"/*; do
        for file in *; do
            if [ -f "$file" ]; then
                echo $file
                mv $file "$dir - $file"
            fi
        done
        cd ..
    fi
done
```