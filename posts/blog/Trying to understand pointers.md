---
title: Trying to understand pointers
date: 2025-03-25
tags:
  - blog
---
A rite of passage for all aspiring swe...

## Pointer Basics
‼️ Understanding:
- Main Memory is divided into **bytes**
- each byte contains **8 bits** of information
	- e.g. 0, 1, 1, 1, 0, 0, 0, 1
- Each byte has a unique address to differentiate from other bytes in memory.
	- For n bytes, the addresses range from 0 to n - 1
- Each variable takes up 1+ byte of memory
	- The address of the first byte is the address of the variable.
- Addresses cannot be simply stored in integers.

>[!important] A pointer is a variable that stores an address.

- pointers must be preceded by astrix: int \*p
- there are no restrictions to the referenced type of a pointer. a pointer may point to another pointer (‼️)
- &: address operator, where &x is the address of the variable x in memory
- \*p represents the object p currently points

- for some reason in C a random arbitrary integer i has a pointer assigned to "-43466672"

- when p points to i, \* is an alias for i, and it has the same value as i. additionally, changing \*p also changes .