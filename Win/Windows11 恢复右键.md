[已经使用了1年多 Windows11 系统](https://cloud.tencent.com/developer/article/2187050)，秉承着接受新事物的态度，一直未曾对 Windows 11 进行过太多的"降级"设置。最近由于需要编辑 PPT，来回复制、解压一些文件，终于还是无法忍受其右键菜单需要点击`显示更多选项`才能展开的骚操作了。

看了网上那些一步步操作注册表的教程，差点劝退我这个 CLI 党。来个简单到不是教程的教程吧：

- 右击左下角的徽标，在弹出菜单中选择 **Windows 终端（管理员）**
- 粘贴如下命令，回车即可完成设置。此操作将强制重启资源管理器！

```powershell
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f
taskkill /F /IM explorer.exe
explorer.exe
```