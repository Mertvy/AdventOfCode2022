import { readFileSync } from 'fs';

let input: string[] = readFileSync("./Day12/input.txt", 'utf-8').split("\n");

class Node<T> {
    value: T;
    next: Node<T> | undefined;
    constructor(value: T, next?: Node<T> | undefined) {
        this.value = value;
        this.next = next;
    }
}

class Queue<T> {
    head: Node<T> | undefined;
    tail: Node<T> | undefined;
    size: number;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }

    enqueue(element: T): void {
        let node = new Node(element);
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

    dequeue(): T {
        if (this.size <= 0) {
            throw new Error("can not dequeue from empty queue")
        }
        this.size--;
        let oldHead = this.head;
        this.head = this.head!.next;
        if (this.head == undefined) {this.tail = undefined;}
        return oldHead!.value;
    }

    isEmpty(): boolean {
        return this.size == 0;
    }
}

class HeightNode {
    value: number;
    letter: string;
    reachableNodes: HeightNode[];
    distance: number;
    visited: boolean;
    coord: number[];

    constructor(letter: string) {
        this.letter = letter;
        if (letter == "S") {this.value = 97;}
        else if (letter == "E") {this.value = 122;}
        else {this.value = letter.charCodeAt(0);}
        this.reachableNodes = [];
        this.distance = 0;
        this.visited = false;
        this.coord = [];
    }
}

function generateNodesFromInput() {
    const nodeGrid: HeightNode[][] = [];
    let source: HeightNode;
    let possibleSources: HeightNode[] = [];
    let end: HeightNode;
    
    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        let row: HeightNode[] = [];
        for (let j = 0; j < line.length; j++) {
            let node = new HeightNode(line[j]);
            node.coord = [j, i]
            if (node.letter == "S") {
                source = node;
                possibleSources.push(node);
            }
            else if (node.letter == "E") {end = node;}
            row.push(node);
            if (node.letter == 'a') {
                possibleSources.push(node);
            }
        }
        nodeGrid.push(row);
    }

    for (let i = 0; i < nodeGrid.length; i++) {
        for (let j = 0; j < nodeGrid[i].length; j++) {
            let curNode = nodeGrid[i][j];
            if (i > 0 && nodeGrid[i - 1][j].value <= curNode.value + 1) {
                curNode.reachableNodes.push(nodeGrid[i - 1][j]);
            }
            if (i < nodeGrid.length - 1 && nodeGrid[i + 1][j].value <= curNode.value + 1) {
                curNode.reachableNodes.push(nodeGrid[i + 1][j]);
            }
            if (j > 0 && nodeGrid[i][j - 1].value <= curNode.value + 1) {
                curNode.reachableNodes.push(nodeGrid[i][j - 1]);
            }
            if (j < nodeGrid[i].length - 1 && nodeGrid[i][j + 1].value <= curNode.value + 1) {
                curNode.reachableNodes.push(nodeGrid[i][j + 1]);
            }
        }
    }
    return [source!, possibleSources, nodeGrid];
}

function BFS(source: HeightNode) {
    const queue: Queue<HeightNode> = new Queue();

    source.visited = true;
    queue.enqueue(source);

    while (!queue.isEmpty()) {
        const node = queue.dequeue();
        if (node.letter == "E") {
            return node.distance;
        }
        node.reachableNodes.forEach(reachableNode => {
            if (!reachableNode.visited) {
                reachableNode.visited = true;
                reachableNode.distance = node.distance + 1;
                queue.enqueue(reachableNode);
            }
        });
    }
}

const part1 = () => {
    return BFS(generateNodesFromInput()[0] as HeightNode);
}

const part2 = () => {
    const [junk, possibleSources, nodeGrid] = generateNodesFromInput();
    let shortestPath = Number.MAX_VALUE;
    (possibleSources as HeightNode[]).forEach(source => {
        let path = BFS(source)!;
        if (path < shortestPath) {
            shortestPath = path;
        }
        (nodeGrid as HeightNode[][]).forEach(row => {
            row.forEach(node => {
                node.distance = 0;
                node.visited = false;
            });
        });
    });
    return shortestPath;
}

console.log(part1());
console.log(part2());