#!/usr/bin/env bash

set -ex

PUBLISH_DIR="public"

# npm install
# npm audit fix
npm run clean
npm run test:links

echo "Deleting old publication from $PUBLISH_DIR"
rm -rf "$PUBLISH_DIR"
git worktree prune
rm -rf ".git/worktrees/$PUBLISH_DIR/"

echo "Checking out gh-pages branch into $PUBLISH_DIR"
git worktree add -B gh-pages "$PUBLISH_DIR" origin/gh-pages

echo "Removing existing files"
pushd "$PUBLISH_DIR"
	find . ! -name '.git' -type f -exec rm -f {} +
popd

echo "Generating website"
npm run build
cp CNAME public
cp public/rss.xml public/index.xml

pushd "$PUBLISH_DIR"
	git add --all
	git commit -m "Publishing to gh-pages as of $(date)"
	git push
popd
