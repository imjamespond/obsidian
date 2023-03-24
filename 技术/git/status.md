```
alias gst="git_status_size"
git_status_size(){
    git status --porcelain -u | awk '{print $2}' | xargs ls -hl | sort -r -h | awk '{print $5 "\t" $9}'
}
```
--porcelain 机器可读的输出
-u 显示untracked files，无层级
xargs 按行传参
sort -r 逆向降序 -t separator -h 以数字为主