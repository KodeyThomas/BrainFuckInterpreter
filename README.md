# BrainFuck Interpreter

I Love esoteric languages, they're super cool. So I decided to create an Interpreter for [BrainFuck](https://en.wikipedia.org/wiki/Brainfuck)

This is about as simple as it gets to create a simple interpreter for a esoteric language.

### BrainFuck Commands

The Implementors guide can be found [Here](http://brainfuck.org/epistle.html)

- `>` Moves the pointer to the right
- `<` Moves the pointer to the left
- `+` Increments the value at the pointer
- `-` Decrements the value at the pointer
- `[` If the value at the pointer is zero, jump to the matching `]`
- `]` If the value at the pointer is not zero, jump to the matching `[`
- `.` Prints the value at the pointer
- `,` Reads a character from the input and stores it at the pointer

As you can see it's super basic, but it is [Turing Complete](https://en.wikipedia.org/wiki/Turing_complete)

### Why?

Well, I eventually want to create my own compiler for BF, so I decided to create an interpreter for BF as it's going to be a good starting block.
In the future I do want to write my own language and use LLVM as the backend but for now I'm just going to create a BF interpreter.

### How?

It's going to be written in JavaScript because I'm a web developer who doesn't know better. In all seriousness JavaScript is super simple and for my first project like this, why not?

### Development

```bash
node interpreter.js
```

The current program loaded in the `program` string is a BrainFuck interpreter written in BrainFuck which using the input runs a BrainFuck program...