显示隐藏【⇧+⌘+。】

---
右键vscode打开
```
3、点击自动操作, 点服务(齿轮图标)

6、在左侧面板选择“实用工具”；然后找到”运行Shell脚本“，把它拽到右侧面板里；
在右侧“服务”收到选定选择文件夹，位置Finder（访达）；“运行Shell脚本”的面板里，选择Shell”/bin/bash“，传递输入“作为自变量”，然后修改Shell脚本，如图：
复制以下内容：
for f in "$@"
do
    open -a "Visual Studio Code" "$f"
done

7、之后，保存cmd+s，保存为Open With VSCode，如图：
```

--- 
