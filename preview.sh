netstat -aon | gawk ' $2~/:1313/ { print $5 } ' | xargs -n 1 kill -s SIGSTOP
start http://localhost:1313
hugo serve --buildDrafts
