## welcome aboard
- this chapter covers the intent and the contents of this book.
- the book has a high focus on **fundamentals** of CS
- it wants to break down the field into very simple parts and make sure you understand each individual part of a **computer**
- i skimmed 1.2 but it overviews the flow of content from chapter to chapter
### 1.3 two recurring themes
there are two themes that are very important
#### the notion of abstraction
- aka generalising concept or idea by taking away specific details
- example: when you tell the taxi driver, "go down this street ten blocks, make a left turn" is abstracted into -> "take me to the airport"
- *abstraction is a technique to simplify a system by removing details unnecessary for the person to interact effectively with the system.*
- abstraction allows us to deal with X at a higher level, focusing on the essential aspects.
- but it is important to *un*-abstract (deconstruct) -> the ability to go from abstraction to its component parts
- for example in programming we start off thinking in binaries - 0s and 1s, then we make higher level coding languages and stop thinking i 0s and 1s altogether (the book uses a different example but i dont understand logic gates nor transistors so i have not included them)
>abstraction of the concept:
-abstractions allow us to be efficient. we can understand less for effective output since the components abstracted are working fine
#### hardware vs software
- common pitfall: people think it is alright to be an expert in Software OR Hardware and be clueless about the other. 
- they pretend there is a barrier between understanding hardware as a software engineer and vice versa. 
- abstraction allows us to **operate at a level we do not think about underlying layers (webdev,software)**, but it is not appropriate to be clueless about underlying layers. (hardware)
- its important to understand both concepts (of hardware and software) such you can account the capabilities and limitations of both.
	- my example: a game dev making a game on unity: operates at a high level of abstraction creating enemies, textures, complex game architecture. **however:** they do not understand underlying concepts like gpu architecture to optimize shaders without sacrificing visual quality.
	- book example: Intel, AMD, ARM realised that video on email is important, so they optimize their hardware to process these video clips at a faster rate.
		- so they made MMX in 1997 to enhance multimedia performance on PC
	- book example (SE): designer who understands hardware, what it can do and its limits can create a program that operates very efficiently
>abstraction of the concept of hardware vs software
>an understanding in both hardware and software is extremely important. 
>a person making hardware needs to have a good understanding on the software which will operate on it
>a person making software needs to have a good understanding of using most effectively the hardware provided

end of page 36