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

#### Univocal Predicate
$\forall u,\forall v, p\{u\} \cap p\{v\}\implies u=v$
#### Functional Predicate
There exists one and only one such that p{x}

(a,b) = {{a}, {a,b}}

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
- What is a univocal predicate?
- What is a functional predicate?
- What is extensionality?
- What is the property of an empty set?
- What is a correspondance?

## Worksheet
![](public/assets/Pasted%20image%2020250226123221.png)
### Question 1
$$\begin{align} \text{Consider }\neg(p\wedge \neg p): \\ \neg(p\wedge \neg p) \\ =\neg p\vee \neg \neg p \\ =\neg p \vee p \\ \text{Let p = True} \\ \therefore False \vee True \\\therefore \text{False OR True}\\ \to True \\ \\ \text{Let p = False} \\ \therefore True\vee False\\\to True \\ \\ \text{Therefore both propositions are tautologies} \\ \text{(as both statements are 1. equal and 2. True)}\end{align}$$

### Question 2
Associative Property: The parentheses do not effect the expression in terms of changing the result

| p   | q   | r   | $p\wedge q$ | $q\wedge r$ | $(p\wedge q)\wedge r$ | $p\wedge(q\wedge r)$ |
| --- | --- | --- | ----------- | ----------- | --------------------- | -------------------- |
| T   | T   | T   | T           | T           | T                     | T                    |
| T   | T   | F   | T           | F           | F                     | F                    |
| T   | F   | F   | F           | T           | F                     | F                    |
| T   | F   | T   | F           | F           | F                     | F                    |
| F   | F   | F   | T           | T           | T                     | T                    |
| F   | T   | F   | F           | F           | F                     | F                    |
| F   | T   | T   | F           | T           | F                     | F                    |
| F   | F   | T   | T           | F           | F                     | F                    |

Since the truth values for $(p\wedge q)\wedge r$ and $p\wedge (q\wedge r)$ are identical for all possible truth assignments of p, q, and r, the two expressions are logically equivalent, demonstrating the associative property.

### Question 3

| p   | q   | $(p\vee q)$ | $(q\vee p)$ |
| --- | --- | ----------- | ----------- |
| T   | T   | T           | T           |
| T   | F   | T           | T           |
| F   | T   | T           | T           |
| F   | F   | F           | F           |
Since the truth values for $p\vee q$ and $q\vee p$ are identical for all possible truth assignments for p and q, the two expressions are logically equivalent demonstrating the commutative property.

### Question 4

| p   | q   | r   | $p\vee q$ | $q\vee r$ | $(p\vee q)\vee r$ | $p\vee(q\vee r)$ |
| --- | --- | --- | --------- | --------- | ----------------- | ---------------- |
| T   | T   | T   | T         | T         | T                 | T                |
| T   | T   | F   | T         | T         | T                 | T                |
| T   | F   | F   | T         | F         | T                 | T                |
| T   | F   | T   | T         | T         | T                 | T                |
| F   | F   | F   | F         | F         | F                 | F                |
| F   | T   | F   | T         | T         | T                 | T                |
| F   | T   | T   | T         | T         | T                 | T                |
| F   | F   | T   | F         | T         | T                 | T                |

Since the truth values for $(p\vee q)\vee r$ and $p\vee(q\vee r)$ are identical for all possible truth assignments for p, q, and r, the two expressions are logically equivalent, demonstrating the associative property.

### Question 5
| p   | q   | r   | $q\vee r$ | $p\wedge q$ | $p\wedge r$ | $p\wedge(q\vee r)$ | $(p\wedge q)\vee(p\wedge r)$ |
| --- | --- | --- | --------- | ----------- | ----------- | ------------------ | ---------------------------- |
| T   | T   | T   | T         | T           | T           | T                  | T                            |
| T   | T   | F   | T         | T           | F           | T                  | T                            |
| T   | F   | F   | F         | F           | F           | F                  | F                            |
| T   | F   | T   | T         | F           | T           | T                  | T                            |
| F   | F   | F   | F         | F           | F           | F                  | F                            |
| F   | T   | F   | T         | F           | F           | F                  | F                            |
| F   | T   | T   | T         | F           | F           | F                  | F                            |
| F   | F   | T   | T         | F           | F           | F                  | F                            |
### Question 6 

| p   | p   | $p\wedge p$ | $p\vee p$ |
| --- | --- | ----------- | --------- |
| T   | T   | T           | T         |
| F   | F   | F           | F         |
p = p = $p\wedge p=p\vee p$ for all possible truth assignments. therefore all expressions are logically equivalent, demonstrating the idempotent laws.

### Question 7

| p   | q   | $p\Leftrightarrow q$ | $q\Leftrightarrow p$ | $(p\Leftrightarrow q) \Leftrightarrow (q\Leftrightarrow p)$ |
| --- | --- | -------------------- | -------------------- | ----------------------------------------------------------- |
| T   | F   | F                    | F                    | T                                                           |
| F   | T   | F                    | F                    | T                                                           |
| T   | T   | T                    | T                    | T                                                           |
| F   | F   | T                    | T                    | T                                                           |
True for all truth assignments therefore its true showing that $(p\Leftrightarrow q) \Leftrightarrow (q\Leftrightarrow p)$ is a tautology

### Question 8
| p   | q   | r   | $p\Leftrightarrow q$ | $q \Leftrightarrow r$ | $(p\Leftrightarrow q) \wedge (q \Leftrightarrow r)$ | $p \Leftrightarrow r$ | $(p\Leftrightarrow q) \wedge (q \Leftrightarrow r) \to (p \Leftrightarrow r)$ |
| --- | --- | --- | -------------------- | --------------------- | --------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| T   | T   | T   | T                    | T                     | T                                                   | T                     | T                                                                             |
| T   | T   | F   | T                    | F                     | F                                                   | F                     | T                                                                             |
| T   | F   | F   | F                    | F                     | F                                                   | F                     | T                                                                             |
| T   | F   | T   | F                    | F                     | F                                                   | T                     | T                                                                             |
| F   | F   | F   | F                    | F                     | F                                                   | F                     | T                                                                             |
| F   | T   | F   | F                    | F                     | F                                                   | F                     | T                                                                             |
| F   | T   | T   | F                    | T                     | F                                                   | F                     | T                                                                             |
| F   | F   | T   | F                    | F                     | F                                                   | F                     | T                                                                             |
|     |     |     |                      |                       |                                                     |                       |                                                                               |

As $(p\Leftrightarrow q) \wedge (q \Leftrightarrow r) \to (p \Leftrightarrow r)$ is true for all truth assignments the statement is true and the biconditional is transitive.

### Question 9

| p   | q   | r   | $p \implies q$ | $q \implies r$ | $(p\implies q) \wedge (q \implies r)$ | $p \implies r$ | $(p\implies q) \wedge (q \ \implies r) \to (p \implies r)$ |
| --- | --- | --- | -------------- | -------------- | ------------------------------------- | -------------- | ---------------------------------------------------------- |
| T   | T   | T   | T              | T              | T                                     | T              | T                                                          |
| T   | T   | F   | T              | F              | F                                     | F              | T                                                          |
| T   | F   | F   | F              | T              | F                                     | F              | T                                                          |
| T   | F   | T   | F              | T              | F                                     | T              | T                                                          |
| F   | F   | F   | T              | T              | T                                     | T              | T                                                          |
| F   | T   | F   | T              | F              | F                                     | T              | T                                                          |
| F   | T   | T   | T              | T              | T                                     | T              | T                                                          |
| F   | F   | T   | T              | T              | T                                     | T              | T                                                          |
|     |     |     |                |                |                                       |                |                                                            |
As $(p\implies q) \wedge (q \ \implies r) \to (p \implies r)$ is true for all truth assignments, the statement is true and the implication is also transitive.

