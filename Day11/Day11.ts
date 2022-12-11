import { readFileSync } from 'fs';

let input: string = readFileSync("./Day11/input.txt", 'utf-8');

class Node {
    value: number;
    next: Node | undefined;
    constructor(value: number, next?: Node | undefined) {
        this.value = value;
        this.next = next;
    }
}

class Queue {
    head: Node | undefined;
    tail: Node | undefined;
    size: number;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }

    enqueue(n: number): void {
        let node = new Node(n);
        if (this.size == 0) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail!.next = node;
            this.tail = node;
        }
        this.size++;
    }

    dequeue(): number {
        if (this.size <= 0) {
            throw new Error("can not dequeue from empty queue")
        }
        this.size--;
        let oldHead = this.head;
        this.head = this.head!.next;
        if (this.head == undefined) {this.tail = undefined;}
        return oldHead!.value;
    }
}

class Monkey {
    items: Queue;
    operation: Function;
    test: Function;
    testNum: number;
    trueMonkeyIndex: number;
    falseMonkeyIndex: number;
    inspectionCount: number;

    constructor(items: number[], operation: string, test: string, trueMonkeyIndex: number, falseMonkeyIndex: number) {
        this.items = new Queue();
        for (let i = 0; i < items.length; i++) {this.items.enqueue(items[i]);}

        if (operation.split("old ")[1][0] == "+") {
            if (operation.split("+ ")[1] == "old") {
                this.operation = (n: number) => {return n + n}
            }
            else {
                this.operation = (n: number) => {return n + parseInt(operation.split("+ ")[1])}
            }
        }
        else if (operation.split("old ")[1][0] == "*") {
            if (operation.split("* ")[1] == "old") {
                this.operation = (n: number) => {return n * n}
            }
            else {
                this.operation = (n: number) => {return n * parseInt(operation.split("* ")[1])}
            }
        }
        else {throw new Error("The input is more complicated lol")};

        this.testNum = parseInt(test.split("by ")[1]);
        this.test = (n: number) => {return (n % this.testNum) == 0}

        this.trueMonkeyIndex = trueMonkeyIndex;
        this.falseMonkeyIndex = falseMonkeyIndex;

        this.inspectionCount = 0;
    }
}



const generateMonkeys = () => {
    let monkeys: Monkey[] = [];

    input.split("\n\n").forEach(note => {
        let noteDetails = note.split("\n");
        let items: number[] = [];
        noteDetails[1].split(": ")[1].split(", ").forEach(item => {
            items.push(parseInt(item));
        });
        let trueMonkeyIndex = parseInt(noteDetails[4][noteDetails[4].length - 1]);
        let falseMonkeyIndex = parseInt(noteDetails[5][noteDetails[5].length - 1]);
        monkeys.push(new Monkey(items, noteDetails[2], noteDetails[3], trueMonkeyIndex, falseMonkeyIndex));
    });
    
    return monkeys;
}

const part1 = () => {
    let monkeys: Monkey[] = generateMonkeys();
    for (let i = 0; i < 20; i++) {
        monkeys.forEach(monkey => {
            while (monkey.items.size != 0) {
                monkey.inspectionCount++;
                let worryLevel: number = monkey.items.dequeue();
                worryLevel = Math.floor(monkey.operation(worryLevel)/3);

                if (monkey.test(worryLevel)) {
                    monkeys[monkey.trueMonkeyIndex].items.enqueue(worryLevel);
                }
                else {
                    monkeys[monkey.falseMonkeyIndex].items.enqueue(worryLevel);
                }
            }
        });
    }

    let topInspections: number[] = [0, 0]
    

    monkeys.forEach(monkey => {
        if (monkey.inspectionCount > topInspections[0]) {
            topInspections[1] = topInspections[0];
            topInspections[0] = monkey.inspectionCount;
        }
        else if (monkey.inspectionCount > topInspections[1]) {
            topInspections[1] = monkey.inspectionCount;
        }
    });

    return "The level of monkey business is " + topInspections[0] * topInspections[1]
}

const part2 = () => {
    let monkeys: Monkey[] = generateMonkeys();
    let reduction = monkeys[0].testNum;

    monkeys.forEach(monkey => {
        if (reduction % monkey.testNum != 0) {
            reduction *= monkey.testNum;
        }
    });

    for (let i = 1; i <= 10000; i++) {
        monkeys.forEach(monkey => {
            while (monkey.items.size != 0) {
                monkey.inspectionCount++;
                let worryLevel: number = monkey.items.dequeue();
                worryLevel = monkey.operation(worryLevel);
                if (worryLevel > reduction) {
                    worryLevel = worryLevel % reduction;
                }

                if (monkey.test(worryLevel)) {
                    monkeys[monkey.trueMonkeyIndex].items.enqueue(worryLevel);
                }
                else {
                    monkeys[monkey.falseMonkeyIndex].items.enqueue(worryLevel);
                }
            }
        });

        if (i == 1 || i == 20 || i % 1000 == 0) {
            console.log(`== After round ${i} ==`)
            for (let j = 0; j < monkeys.length; j++) {
                console.log(`Monkey ${j} inspected items ${monkeys[j].inspectionCount} times.`)
            }
        }
    }

    let topInspections: number[] = [0, 0]
    

    monkeys.forEach(monkey => {
        if (monkey.inspectionCount > topInspections[0]) {
            topInspections[1] = topInspections[0];
            topInspections[0] = monkey.inspectionCount;
        }
        else if (monkey.inspectionCount > topInspections[1]) {
            topInspections[1] = monkey.inspectionCount;
        }
    });

    return "The level of monkey business is " + topInspections[0] * topInspections[1]
}

console.log(part1());
console.log(part2());