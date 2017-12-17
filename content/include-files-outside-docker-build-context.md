---
title: "Include Files Outside Docker Build Context"
date: 2017-10-26T17:33:25-04:00
tools: [ "Docker" ]
languages: [ "Dockerfile" ]
draft: false
---
# "Forbidden path outside the build context"

I was recently attempting to Dockerize a Node project, so I added a `docker` folder to the project and created a simple `Dockerfile` to get started:

```dockerfile
FROM  node:alpine
WORKDIR /app
COPY ../ ./
RUN npm install
EXPOSE 80
ENTRYPOINT [ "npm", "start" ]
```

However, when I tried to build the image, I got the following output:

```bash
$ docker build -t nodeapp .
Sending build context to Docker daemon  53.76kB
Step 1/6 : FROM node:alpine
 ---> 04a3ba95f191
Step 2/6 : WORKDIR /app
 ---> 85fff9a66b84
Removing intermediate container e2c838595c90
Step 3/6 : COPY ../ ./
COPY failed: Forbidden path outside the build context: ../ ()
```

Note the error: **COPY failed: Forbidden path outside the build context: ../ ()**

According Docker's [`COPY` documentation](https://docs.docker.com/engine/reference/builder/#copy):

> `COPY` obeys the following rules:
>
> * The `<src>` path must be inside the context of the build; you cannot `COPY ../something /something`, because the first step of a `docker build` is to send the context directory (and subdirectories) to the docker daemon.

It turns out that **you cannot include files outside Docker's build context**. However, you *can* copy files from the Dockerfile's parent directlry.

## How to `COPY` Files from the Dockerfile Parent Directory

I tried several combinations of command line arguments to include the parent directory in the context, and finally landed on the solution: start from the parent directlry, and pass the Dockerfile as an argument.

To do this, first update the `COPY` command to use the current (`./`) directory:

```dockerfile
FROM  node:alpine
WORKDIR /app
COPY ./ ./
RUN npm install
EXPOSE 80
ENTRYPOINT [ "npm", "start" ]
```

Next, `cd ..` into the parent directory and run `docker build`:

```bash
~/Code/node-app/docker
$ cd ..

~/Code/node-app
$ docker build -t nodeapp -f docker/Dockerfile .
Sending build context to Docker daemon  263.7MB
...
Successfully built d296bf765369
Successfully tagged nodeapp:latest
```
Success!