## list cpp files
```shell
function_listcpp()
{
    for f in $1/*; do
        if [ -f $f ]&&[ `echo $f | grep -c ".cpp" ` -gt 0 ]; then
            echo `pwd`/$f
        elif [[ -d $f ]]; then
            echo "dir: " $f
            function_listcpp $f
        fi
    done
}

function_listcpp "."
```
