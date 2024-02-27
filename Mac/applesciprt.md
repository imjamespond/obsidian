https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/ManipulateListsofItems.html

touchbar如何执行applesciprt
打开自动操作,新建工作流程,左侧选择applescript,右侧编辑,试运行,(在安全与隐私中打开权限),最后保存为foobar, 在touchbar的快捷键中就可以运行这个foobar了

---


--- 
- 重置窗口位置
  reset all
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
reset one
```
tell application "System Events" to tell process "FileZilla"
     set position of windows to {100, 100}
end tell
```

--- 
- 设置窗口位置
```
(*
tell application "Finder"
	set box to bounds of window of desktop --> weird but that's Applescript for you
end tell



set {width, height, scale} to words of (do shell script "system_profiler SPDisplaysDataType | awk '/Built-In: Yes/{found=1} /Resolution/{width=$2; height=$4} /Retina/{scale=($2 == \"Yes\" ? 2 : 1)} /^ {8}[^ ]+/{if(found) {exit}; scale=1} END{printf \"%d %d %d\\n\", width, height, scale}'")


tell application "Python"
	activate
	set _theWindows to every window
	repeat with i from 1 to number of items in _theWindows
		set this_item to item i of _theWindows 
		-- set the bounds of this_item to {(109 + (20 * i)), (10 + (10 * i)), (1164 + (20 * i)), (786 + (10 * i))}
	end repeat
end tell
*)

set resolutions to {}
repeat with p in paragraphs of ¬
	(do shell script "system_profiler SPDisplaysDataType | awk '/Resolution:/{ printf \"%s %s %s\\n\", $2, $4, ($5 == \"Retina\" ? 2 : 1) }'")
	set resolutions to resolutions & {{word 1 of p as number, word 2 of p as number, word 3 of p as number}}
end repeat

set {w,h} to {item 1 of item 1 of resolutions, item 2 of item 1 of resolutions}

```