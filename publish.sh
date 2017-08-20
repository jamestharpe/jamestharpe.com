hugo
pushd public
git add --all
git commit -m "Publishing to gh-pages as of $(date)"
git push
popd