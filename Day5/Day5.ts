import { readFileSync } from 'fs';

let input: string = readFileSync("./Day5/input.txt", 'utf-8');

class Stack<T> {
    private items: T[] = [];
  
    push(item: T) {
      this.items.push(item);
    }
  
    pop(): T | undefined {
      return this.items.pop();
    }

    isEmpty(): boolean {
      return this.items.length === 0;
    }

    reverse(): void {
        this.items.reverse();
    }
}

function generateStackArray(input: string) {
    let initialState = input.split("\n 1")[0];
    let stackArray: Array<Stack<string>> = [];

    initialState.split("\n").forEach(line => {
        let index = 1;

        for (let i = 0; i < line.length; i += 4) {
            if (stackArray[index] == null) {
                stackArray[index] = new Stack();
            }
            if (line.charAt(i+1) != " ") {
                stackArray[index].push(line.charAt(i+1));
            }
            index++;
        }
    });

    for (let i = 1; i < stackArray.length; i++) {
        stackArray[i].reverse();
    }

    return stackArray;
}

let stackArr: Array<Stack<string>> = generateStackArray(input);

const Part1 = () => {
    let instructions = input.split("\n\n")[1];

    instructions.split("\n").forEach(instruction => {
        let instructionNumbers = instruction.split(" ");
        let quantity =  parseInt(instructionNumbers[1]);
        let origin = parseInt(instructionNumbers[3]);
        let destination = parseInt(instructionNumbers[5]);

        for (let i = 0; i < quantity; i++) {
            stackArr[destination].push(stackArr[origin].pop()!);
        }
    });

    let message = "";
    stackArr.forEach(stack => {
        if (!stack.isEmpty()) {
            message += stack.pop();
        }
    });
    stackArr = generateStackArray(input);
    return message;
}

const Part2 = () => {
    let instructions = input.split("\n\n")[1];

    instructions.split("\n").forEach(instruction => {
        let instructionNumbers = instruction.split(" ");
        let quantity =  parseInt(instructionNumbers[1]);
        let origin = parseInt(instructionNumbers[3]);
        let destination = parseInt(instructionNumbers[5]);
        let tmpStack: Stack<string> = new Stack();

        for (let i = 0; i < quantity; i++) {
            tmpStack.push(stackArr[origin].pop()!);
        }
        while (!tmpStack.isEmpty()) {
            stackArr[destination].push(tmpStack.pop()!);
        }
    });

    let message = "";
    stackArr.forEach(stack => {
        if (!stack.isEmpty()) {
            message += stack.pop();
        }
    });
    stackArr = generateStackArray(input);
    return message;
}

console.log(Part1());
console.log(Part2());