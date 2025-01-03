---
title: setup
date: 2025-01-02
tags:
  - general
---
## preface
okay im going to make it as simple as possible for you so you can have your own markdown website without setting much up.


here is what you would need:
- [a github account](https://github.com/login)
- [git](https://git-scm.com/) 
- [nodejs](https://nodejs.org/en)

## commands
> !! please do your own research and know what you are doing when you run the commands

## setup
cloning my project and making your own
```bash
git clone https://github.com/NotTacoz/tacoz.me.git && cd tacoz.me/
npm i
```

## run locally
```bash
npm run dev
```

## building (optional)
```bash
npm run build
```

## putting it in your own repo
make sure youre in the tacoz.me repo
```bash
git init <directory>
git add .
git commit -am "Inital Commit"
git push
```

thats basically it. if you need any help chatgpt it.


idk this isnt that well documented but its pretty simple.

## hosting
OH YEAH if you want to host it on your own neat little website -> you need to setup github pages


it would be found https://github.com/YOUR-USERNAME/YOUR-REPO/settings/pages and select source -> github actions