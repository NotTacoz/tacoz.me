---
title: Making a Text Editor from Scratch in C
date: 2025-02-18
tags:
  - blog
  - cs
  - C
---
https://viewsourcecode.org/snaptoken/kilo/index.html

Setting up I am deciding to code EVERYTHING by scratch. NO LLMs. NO COPY PASTING. 

Vim, C, Ghostty is my current stack. Because I want to get better at these things:
- Flying on the keyboard without using my mouse.
- Learn commands (ls, touch, mkdir etcetc)
- Learn a low level language like C

## Compiling
To compile a file called kilo.c,  we use

```
cc kilo.c -o kilo
```

This produces an executable called *kilo*.
-o: output

However, recompiling every time is a hassle.

We use a Makefile to automatically compile kilo for us.

Makefile:
```
kilo: kilo.c
	$(CC) kilo.c -o kilo -Wall -Wextra -pedantic -std=c99
```

This is an explanation of how it works (to my understanding):

```
(kilo: what we want to compile to): (requirement to build)
	[$(CC): makefile for cc]  [kilo.c -o kilo same as building manually] [-Wall: ALL warnings] [-Wextra -pedantic: Extra warnings] [-std=c99: version of C we are using (C99)]
```

we run Makefile with make

it can output ```make: `kilo' is up to date.``` which basically is it telling us there is no difference between our build and compiled thingy.
## Debugging
Getting exit status:
```
echo $?
```

## going raw
