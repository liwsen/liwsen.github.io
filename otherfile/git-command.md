# git使用命令

创建分支： $ git branch mybranch

切换分支： $ git checkout mybranch

创建并切换分支： $ git checkout -b mybranch

更新master主线上的东西到该分支上：$git rebase master

切换到master分支：$git checkout master

更新mybranch分支上的东西到master上：$git rebase mybranch

提交：git commit -a

对最近一次commit的进行修改：git commit -a –amend

commit之后，如果想撤销最近一次提交(即退回到上一次版本)并本地保留代码：git reset HEAD^

合并分支：(merge from) $ git checkout master

	$ git merge mybranch (merge from mybranch)

删除分支： $ git branch -d mybranch

强制删除分支： $ git branch -D mybranch

列出所有分支： $ git branch

查看各个分支最后一次提交： $ git branch -v

查看哪些分支合并入当前分支： $ git branch –merged

查看哪些分支未合并入当前分支： $ git branch –no-merged

更新远程库到本地： $ git fetch origin

推送分支： $ git push origin mybranch

取远程分支合并到本地： $ git merge origin/mybranch

取远程分支并分化一个新分支： $ git checkout -b mybranch origin/mybranch

删除远程分支：$ git push origin :mybranch

---

__rebase:__

	$ git checkout mybranch

	$ git rebase master (rebase from master)

---

__举例：__

	$ git checkout server
	$ git rebase –onto master server client
	$ git checkout master
	$ git merge client (fostforward)
	$ git rebase master server (checkout sever)
	$ git merge server
	$ git branch -d client
	$ git branch -d server