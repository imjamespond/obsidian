- ### [How to compare files from two different branches](https://stackoverflow.com/questions/4099742/how-to-compare-files-from-two-different-branches)
- 
  You can do this: `git diff branch1:path/to/file branch2:path/to/file`
  
`git diff` can show you the difference between two commits:
```
git diff mybranch master -- myfile.cs
```
Or, equivalently:
```
git diff mybranch..master -- myfile.cs
```