# Create branch

git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initializing gh-pages branch"
git push upstream gh-pages
git checkout master

# Add worktree
rm -rf public
git worktree add -B gh-pages public origin/gh-pages