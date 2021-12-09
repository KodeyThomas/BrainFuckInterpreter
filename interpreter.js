// interpreter.js
//
// This file contains an interpreter for BrainFuck.
// Thats it...

// Define the tokens BF will be able to use
const _LT = '<';
const _GT = '>';
const _PLUS = '+';
const _MINUS = '-';
const _LSBracket = '[';
const _RSBracket = ']';
const _DOT = '.';
const _COMMA = ',';
const _EOF = undefined;

class TOKEN {
	static get LT() {
		return _LT;
	}
	static get GT() {
		return _GT;
	}
	static get PLUS() {
		return _PLUS;
	}
	static get MINUS() {
		return _MINUS;
	}
	static get LSBracket() {
		return _LSBracket;
	}
	static get RSBracket() {
		return _RSBracket;
	}
	static get DOT() {
		return _DOT;
	}
	static get COMMA() {
		return _COMMA;
	}
	static get EOF() {
		return _EOF;
	}
}

// Allocate Memory
const memory = new Array(30000).fill(0); // Creates an array of zeros, this will act as our memory (30k is not arbitrary, comes from the Implementors guide)

// Pointers & Stuff
let memory_pointer = 0; // The pointer is the current position in memory
let instruction_pointer = 0; // Points to the current instruction
let stack = []; // Stack is going to be used to store the addresses of '[' so we can handle nested loops.
let program_running = true; // This is used to stop the program when we reach the end of the program
let depth = 0; // Current depth of the loop

// Program Variables, pretty self explanatory
let program = '>>>+[[-]>>[-]++>+>+++++++[<++++>>++<-]++>>+>+>+++++[>++>++++++<<-]+>>>,<++[[>[->>]<[>>]<<-]<[<]<+>>[>]>[<+>-[[<+>-]>]<[[[-]<]++<-[<+++++++++>[<->-]>>]>>]]<<]<]<[[<]>[[>]>>[>>]+[<<]<[<]<+>>-]>[>]+[->>]<<<<[[<<]<[<]+<<[+>+<<-[>-->+<<-[>+<[>>+<<-]]]>[<+>-]<]++>>-->[>]>>[>>]]<<[>>+<[[<]<]>[[<<]<[<]+[-<+>>-[<<+>++>-[<->[<<+>>-]]]<[>+<-]>]>[>]>]>[>>]>>]<<[>>+>>+>>]<<[->>>>>>>>]<<[>.>>>>>>>]<<[>->>>>>]<<[>,>>>]<<[>+>]<<[+<<]<]'; // The program we are going to run
let input = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.!';   // The input we are going to use
let output = '';

// The current program loaded into the program string is a BrainFuck interpreter written in BrainFuck...
// http://brainfuck.org/dbfi.b
// The current input is a program to output 'Hello World!' to the console written in BrainFuck
// I think this is a good example to demonstrate that this language is turing complete...

function processInput() {
	if (input) {
		let ASCII = input.charCodeAt(0); // Gets ASCII character of the current character in the input string
		input = input.substring(1);      // Removes the current character from the input string
		memory[memory_pointer] = ASCII;  // Sets the current memory position to the ASCII value of the current character
		return true;
	}

	return null; // No Input, throw error
}

function processOutput(input) {
	output += String.fromCharCode(memory[memory_pointer]) // Gets the character at the current memory position and converts it to a string
}

function handleLSBracket() {
	if (memory[memory_pointer] != 0) {
		stack.push(instruction_pointer); // If the current value in memory is not zero, push the current instruction pointer to the stack
	} 
	else {
		while (true) {
			instruction_pointer++;
			if (!program[instruction_pointer]) { // If we reach an invalid instruction pointer, throw error and exit.
				console.error('Invalid Instruction Pointer... Something has went terribly wrong');
				process.exit(1); // Exit program with error
			} if (program[instruction_pointer] === TOKEN.LSBracket) {
				depth++; // If we encounter another '[' we increment the current Loop Depth, this allows for recursive loops, however we check for the instruction pointer to be valid to not get stuck in an infinite loop
			} else if (program[instruction_pointer] === TOKEN.RSBracket) {
				if (depth > 0) {
					depth--; // If we are in a recursive loop, decrement the depth until we get to the matching ']'
				} else {
					return; // Carry on with program execution
				}
			}
		}
	}
	return;
}

while(program_running) {
	switch(program[instruction_pointer]) {
		case TOKEN.LT:
			memory_pointer--; // Decrements the memory pointer
			break;
		case TOKEN.GT:
			memory_pointer++; // Increments the memory pointer
			break;
		case TOKEN.PLUS:
			memory[memory_pointer]++; // Increments the current value in memory
			break;
		case TOKEN.MINUS:
			memory[memory_pointer]--; // Decrements the current value in memory
			break;
		case TOKEN.LSBracket:
			handleLSBracket();
			break;
		case TOKEN.RSBracket:
			instruction_pointer = stack.pop() - 1; // Moves the instruction pointer to the last '['
			break;
		case TOKEN.DOT:
			processOutput(); // Processes the output
			break;
		case TOKEN.COMMA:
			if (!processInput()) {
				console.error('No input');
			}
			break;
		case TOKEN.EOF:
			program_running = false; // Program is done
			break;
	}
	instruction_pointer++; // Increments the instruction pointer
}

console.log(output);