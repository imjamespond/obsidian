git log ==--== some-dir/some-file
git checkout 8e93e... -- some-dir/some-file

---
==git log --stat==
==--shortstat==
This option displays the same information butwith a diff directly following each entry. This is very helpful for code review or to quickly browse what happened during a series of commits that a collaborator has added. 

---
One of the more helpful options is -p or --patch, which **==shows the difference (the patch output)==** introduced in each commit. You can also limit the number of log entries displayed, such as using ==-2to show only the last two entries.==
==git log -p -2==

==git log --follow -p -- path-to-file==
This will show the ==entire history of the file== (including history beyond renames and with diffs for each change). 
In other words, if the file named bar was once named foo, then git log -p bar (without the --follow option) will only show the file's history up to the point where it was renamed -- it won't show the file's history when it was known as foo. Using git log --follow -p bar will show the file's entire history, including any changes to the file when it was known as foo. The -p option ensures that diffs are included for each change. 

---

git log --pretty=oneline

https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History

git log --pretty=format:"%h %s" --graph
合并等图形化展示








