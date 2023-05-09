
## main与master

git init后的分支为master，而github中新建项目的分支为main，两者不匹配。

在本地init后，可以：
```shell
git checkout -b main
git push --set-upstream origin main
git pull
git push
```