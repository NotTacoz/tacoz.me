---
title: "operating systems: 3 easy pieces"
date: 2025-01-16
tags:
  - notes
  - cs
  - operating-systems
---
## intro: main 3 themes
- virtualisation, concurrency & persistance
- no idea what that means
- hopefully ill find out
- abstraction presented at the start
- they will use real code
- also homework >:(
- all projects are in C

## dialogue between professor and student
- based off richard feynmans 6 pieces
- things learnt are:
	- how OS (operating systems) works
	- how it decides what program to run next on CPU
	- memory overload handling in virtual memory system
	- VM (virtual machine) monitors work
	- information management on disks.
- if you have no idea what all of this means - you are in the right class.
- best way to learn the information: different for everyone but generally
	1. show up
	2. listen
	3. revise
	4. revise
	5. revise

## intro to OS
- what happens when you run a program?
	- millions-billions instructions of instructions are every second
		1. fetched
		2. decoded
		3. executed
		4. moves onto next instruction
- read more on von neumanns model of computing if interested
- there is a body of software which makes running programs easier (or harder) - sometimes giving the ability to run multiple programs, share memory, 
>**the problem: how do we virtualise resources?**
> we don't need to know the why - it makes it easier to use
> we focus on HOW -> what mechanisms and policies are used to attain virtualisation

- what is virtualisation?
	- OS takes a physical resource (cpu,disk,memory) and transforms it into a easy to use virtual form.
	- an operating system is basically a virtual machien.
- how does the user allow user interaction?
	- by providing interfaces (APIs) that you can call.
	- exporting hundreds of system calls -calls to run programs, access memory and devices etc, we call this a standard library to applications.
- virtualisation allows many programs to run (sharing cpu), allow these programs to read and access their own data (sharing memory), access devices (sharking disk) etc, OS is sometimes known as a **resource manager**.
- cpu, memory, disk is a resource of the system - it is the OS role to effectively manage these resources. being efficiet or fair with many goals in mind.

### virtualising the CPU
1. The following is a code excerpt from the book
![](../../../assets/Pasted%20image%2020250116125102.png)
note: running ./cpu "A" outputs A forever until cancelled
- what happens when you run multiple ?
- ![](../../../assets/Pasted%20image%2020250116125218.png)
- despite having 1 cpu, you are able to run multiple programs at once - how magical
- its actually an illusion - so it seems like the system is running on large number of virtual cpus.
- turning single cpu (or multiple) -> seemingly infinite of cpus and allow many programs to run is called **virtualising the CPU** which is first part of the book.

> [!definition] 
> APIs = Interfaces
> They are a major way in which most users interact through OS

- how does the OS know which program it should run?
	- OS policy - used in many different places within an OS to answer these questions, so they will be studied.

### virtualising memory
![](public/assets/Pasted%20image%2020250116125657.png)
- what is memory?
	- physical memory in modern machines is simple - it is an array of bytes
- how do you read memory?
	- specify an address to access the data stored there
- how do you write (or update) memory?
	- specify the data to be written to a given address
- memory is accessed all the time
	- what does a program keep in its memory?
		- all of its data structures.
- when accessing memory, program accesses its data structures through explicit instructions such as loads and stores.
- code breakdown (i need to learn C)
	- malloc() allocates some memory
	- a1: allocates memory
	- a2: prints out address of new memory
	- a3: puts number zero into the first slot of the memory
	- loops delay for a second and incrementing the value stored in the address held by p
	- with each print, it prints the process identifier (PID) which is **unique per running process**
	  
continue off start of pdf page 43, real book page 7