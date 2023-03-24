touchbar如何执行applesciprt
打开自动操作,新建工作流程,左侧选择applescript,右侧编辑,试运行,(在安全与隐私中打开权限),最后保存为foobar, 在touchbar的快捷键中就可以运行这个foobar了

---

```
tell application "System Events"
     set listOfProcesses to (name of every process where background only is false)
     if the result is not false then
         repeat with processName in listOfProcesses
             tell application "System Events" to tell process processName
                 set position of windows to {1, 1}
             end tell
         end repeat
     end if
end tell
```

```
tell application "System Events" to tell process "FileZilla"
     set position of windows to {100, 100}
end tell
```
