---
title: Logic and Set Theory
date: 2025-02-21
tags:
  - learning
---
## Notes
- There is no suggested reading list because the audience of the lectures are broad, and there is no specific best book for every pathway.
### Truth Table
#### Negation

| P   | $\neg$ P |
| --- | -------- |
| T   | F        |
| F   | T        |
#### Conjunction

| p   | q   | $p \wedge q$ |     |
| --- | --- | ------------ | --- |
| T   | T   | T            |     |
| T   | F   | F            |     |
| F   | T   | F            |     |
| F   | F   | F            |     |

#### Disjunction

| p   | q   | $p \vee q$ |     |
| --- | --- | ---------- | --- |
| T   | T   | T          |     |
| T   | F   | T          |     |
| F   | T   | T          |     |
| F   | F   | F          |     |

#### Material Implication

| p   | q   | $p \implies q$ |     |     |
| --- | --- | -------------- | --- | --- |
| T   | T   | T              |     |     |
| T   | F   | F              |     |     |
| F   | T   | T              |     |     |
| F   | F   | T              |     |     |
#### Biconditional
![300](public/assets/Pasted%20image%2020250226084749.png)
## Mathematical Logic
- What is syllogism?
- What is the problem/core limitation with syllogism?
- What is a proposition vs What is a statement?
- What is a negation?
- Why is negation a **unary** logical connective?
- What is a conjunction (in simple terms for statements p, q)?
- When is a conjunction true?
- What is a disjunction (in simple terms for statements p, q)?
- When is a disjunction true?
- What is a Material implication?
- What is an antecedent and consequent?
- What is a vacuously true statement?
- What is modus tollens?
- What is a logical equivalence?
- What is required for the logical equivalence to be true? And consequently, what is required for it to be false?
- What is De Morgan's Laws?
- What is a Predicate?
- What is First-Order Logic?
- What is Second-Order Logic?
- What is a universal quantifier?
- What does $\exists$ and $\forall$ represent?
- Let p{x} def = "x is a person" AND Let q{x} def = "x is a mortal"
	- What does $\forall x, p\{x\}\implies q\{x\}$ represent?
	- What is the negation of the statement in words?
- What is De Morgan's laws for quantifiers?
- What does $\forall x,y \;\;\;(x=y) \Leftrightarrow (p\{x\} \Leftrightarrow p\{y\})$ mean?

## Worksheet
![](public/assets/Pasted%20image%2020250226123221.png)
### Question 1
$$\begin{align} \text{Consider }\neg(p\wedge \neg p): \\ \neg(p\wedge \neg p) \\ =\neg p\vee \neg \neg p \\ =\neg p \vee p \\ \text{Let p = True} \\ \therefore False \vee True \\\therefore \text{False OR True}\\ \to True \\ \\ \text{Let p = False} \\ \therefore True\vee False\\\to True \\ \\ \text{Therefore both propositions are tautologies} \\ \text{(as both statements are 1. equal and 2. True)}\end{align}$$

### Question 2
Associative Property: The parentheses do not effect the expression in terms of changing the result