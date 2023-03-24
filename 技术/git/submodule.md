https://www.activestate.com/blog/getting-git-submodule-track-branch/
git submodule add -b master https://github.com/Komodo/trackchanges.git src/modules/trackchanges
git submodule update --init

---
Git submodule inside of a submodule (nested submodules)
https://stackoverflow.com/questions/1535524/git-submodule-inside-of-a-submodule-nested-submodules
git submodule update --init --recursive

---
git clone https://github.com/torch/distro.git ~/torch --recursive --branch <branchname> <remote-repo> --single-branch
Clone with --recursive or run git submodule init && git submodule update after checking out.
--single-branch可以fetch指定分支数据, 
---
https://stackoverflow.com/questions/1535524/git-submodule-inside-of-a-submodule-nested-submodules
---
git submodule add -b commons git@git:/srv/git/commons.git ./commons  # [-b <branch>]  [<path>]
git status
On branch data-platform-szrcb-1906
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   .gitmodules
        new file:   commons
git add 
git commit -am"add submodule”
git push km

commons中commit 后 git push origin HEAD:commons, 注意submodule默认是没有branch的，所以是从HEAD提交
返回父级目录再次commit 并 git push --recurse-submodules=on-demand
其他人在父级git pull km data-platform-szrcb-1906并git submodule update --recursive

git remote add km git@git:/srv/git/frontend.git
git fetch km data-platform-szrcb-1906
git checkout FETCH_HEAD
git checkout -b data-platform-szrcb-1906
克隆一个带子模块的项目
git submodule init
git submodule update
commons目录存在了，但是是空的。你必须运行两个命令：git submodule init来初始化你的本地配置文件，git submodule update来从那个项目拉取所有数据并检出你上层项目里所列的合适的提交：

---
https://stackoverflow.com/questions/1260748/how-do-i-remove-a-submodule/36593218#36593218
# Remove the submodule entry from .git/config
git submodule deinit -f path/to/submodule (git submodule init / update)之前初始错误的git地址
# Remove the submodule directory from the superproject's .git/modules directory
rm -rf .git/modules/path/to/submodule
# Remove the entry in .gitmodules and remove the submodule directory located at path/to/submodule
git rm -f path/to/submodule

---

$ ls -R . 
./foobar/foo:

git <command> --recurse-submodules
git pull  --recurse-submodules
The git submodule update command actually tells Git that you want your submodules to each check out the commit already specified in the index of the superproject. If you want to update your submodules to the latest commit available from their remote, you will need to do this directly in the submodules.
So in summary:
# get the submodule initially git submodule add ssh://bla submodule_dirgit submodule init # time passes, submodule upstream is updated # and you now want to update # change to the submodule directory cd submodule_dir # checkout desired branch git checkout master # update git pull # get back to your project root cd .. # now the submodules are in the state you want, sogit commit -am "Pulled down update to submodule_dir" 
Or, if you're a busy person:
git submodule foreach git pull origin master

Easy way to pull latest of all git submodules
For git 1.8.2 or above the option --remote was added to support updating to latest tips of remote branches: 
git submodule update --recursive --remote
This has the added benefit of respecting any "non default" branches specified in the .gitmodulesor .git/config files (if you happen to have any, default is origin/master, in which case some of the other answers here would work as well).
For git 1.7.3 or above you can use (but the below gotchas around what update does still apply):
git submodule update --recursive
or:
git pull --recurse-submodules
if you want to pull your submodules to latest commits intead of what the repo points to.
Note: If that's the first time you checkout a repo you need to use --init first:
git submodule update --init --recursive
For older, git 1.6.1 or above you can use something similar to (modified to suit):
git submodule foreach git pull origin master
See git-submodule(1) for details

Git submodule push
A submodule is nothing but a clone of a git repo within another repo with some extra meta data (gitlink tree entry, .gitmodules file )
$ cd your_submodule$ git checkout master<hack,edit> $ git commit -a -m "commit in submodule" $ git push$ cd .. $ git add your_submodule$ git commit -m "Updated submodule" 
Note that since git1.7.11 ([ANNOUNCE] Git 1.7.11.rc1 and release note, June 2012) mentions:
"git push --recurse-submodules" learned to optionally look into the histories of submodules bound to the superproject and push them out.
Probably done after this patch and the --on-demand option:
recurse-submodules=<check|on-demand>::
Make sure all submodule commits used by the revisions to be pushed are available on a remote tracking branch.
- If check is used, it will be checked that all submodule commits that changed in the revisions to be pushed are available on a remote.
Otherwise the push will be aborted and exit with non-zero status.
- If on-demand is used, all submodules that changed in the revisions to be pushed will be pushed.
If on-demand was not able to push all necessary revisions it will also be aborted and exit with non-zero status.
So you could push everything in one go with (from the parent repo) a:
git push --recurse-submodules=on-demand
This option only works for one level of nesting. Changes to the submodule inside of another submodule will not be pushed.
With git 2.7 (January 2016), a simple git push will be enough to push the parent repo... and all its submodules.
See commit d34141c, commit f5c7cd9 (03 Dec 2015), commit f5c7cd9 (03 Dec 2015), and commit b33a15b (17 Nov 2015) by Mike Crowe (mikecrowe).
(Merged by Junio C Hamano -- gitster -- in commit 5d35d72, 21 Dec 2015)
push: add recurseSubmodules config option
The --recurse-submodules command line parameter has existed for some time but it has no config file equivalent.
Following the style of the corresponding parameter for git fetch, let's invent push.recurseSubmodules to provide a default for this parameter.
This also requires the addition of --recurse-submodules=no to allow the configuration to be overridden on the command line when required.
The most straightforward way to implement this appears to be to make push use code in submodule-config in a similar way to fetch.
The git config doc now include:
push.recurseSubmodules:
Make sure all submodule commits used by the revisions to be pushed are available on a remote-tracking branch.
- If the value is 'check', then Git will verify that all submodule commits that changed in the revisions to be pushed are available on at least one remote of the submodule. If any commits are missing, the push will be aborted and exit with non-zero status.
- If the value is 'on-demand' then all submodules that changed in the revisions to be pushed will be pushed. If on-demand was not able to push all necessary revisions it will also be aborted and exit with non-zero status. -
- If the value is 'no' then default behavior of ignoring submodules when pushing is retained.
You may override this configuration at time of push by specifying '--recurse-submodules=check|on-demand|no'.
So:
git config push.recurseSubmodules on-demand git push
Git 2.12 (Q1 2017)
git push --dry-run --recurse-submodules=on-demand will actually work.
See commit 0301c82, commit 1aa7365 (17 Nov 2016) by Brandon Williams (mbrandonw).
(Merged by Junio C Hamano -- gitster -- in commit 12cf113, 16 Dec 2016)
push run with --dry-run doesn't actually (Git 2.11 Dec. 2016 and lower/before) perform a dry-run when push is configured to push submodules on-demand.
Instead all submodules which need to be pushed are actually pushed to their remotes while any updates for the superproject are performed as a dry-run.
This is a bug and not the intended behaviour of a dry-run.
Teach push to respect the --dry-run option when configured to recursively push submodules 'on-demand'.
This is done by passing the --dry-run flag to the child process which performs a push for a submodules when performing a dry-run.
And still in Git 2.12, you now havea "--recurse-submodules=only" option to push submodules out without pushing the top-level superproject.
See commit 225e8bf, commit 6c656c3, commit 14c01bd (19 Dec 2016) by Brandon Williams (mbrandonw).
(Merged by Junio C Hamano -- gitster -- in commit 792e22e, 31 Jan 2017)