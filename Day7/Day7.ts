import { readFileSync } from 'fs';

let input: string = readFileSync("./Day7/input.txt", 'utf-8');

class FileSystem {
    root: FileSystemNode;
    current: FileSystemNode;
    constructor(root?:FileSystemNode) {
        this.root = root || new FileSystemNode(undefined, undefined);
        this.current = this.root;
    }

    cd(name:string) {
        if (name == "..") {
            this.current = this.current.parent!;
            return;
        }

        if (name == "/") {
            this.current = this.root;
        }

        this.current!.children.forEach(element => {
            if (element.name === name) {
                this.current = element;
                return;
            }
        });
    }
}

class FileSystemNode {
    name: string | undefined;
    size: number;
    parent: FileSystemNode | undefined;
    children: Array<FileSystemNode>;

    constructor(name: string | undefined, parent:FileSystemNode | undefined, size?: number) {
        this.name = name;
        this.size = size || 0;
        this.parent = parent;
        this.children = new Array();
    }

    addChild(child: FileSystemNode) {
        this.children.push(child);
        this.size += child.size;
        let current = this.parent;
        while (current) {
            current.size += child.size;
            current = current.parent;
        }
    }
}

let fileSystem = new FileSystem();

input.split("\n").forEach(line => {
    if (line.split(" ")[1] == "cd") {
        fileSystem.cd(line.split(" ")[2]);
        return;
    }

    if (line.split(" ")[1] == "ls") {
        return;
    }

    let fileName = line.split(" ")[1];

    if (line.split(" ")[0] == "dir") {
        fileSystem.current.addChild(new FileSystemNode(fileName, fileSystem.current));
        return;
    }

    let fileSize = parseInt(line.split(" ")[0]);

    fileSystem.current.addChild(new FileSystemNode(fileName, fileSystem.current, fileSize));
});

const part1 = () => {
    const getDirectoryTotal = (root: FileSystemNode) => {
        if (root.children.length == 0) {
            return 0;
        }
        let total = 0;
        root.children.forEach(child => {
            total += getDirectoryTotal(child);
        });
        if (root.size > 100000) {
            return total;
        }
        return total + root.size;
    }
    return getDirectoryTotal(fileSystem.root);
}

const part2 = () => {
    let requiredSpace = 30000000 - (70000000 - fileSystem.root.size);
    let smallestPossibleDirectorySize = 70000000;

    const findSmallestPossibleDirectorySize = (root: FileSystemNode) => {
        if (root.children.length == 0) {
            return;
        }
        if (root.size < smallestPossibleDirectorySize && root.size >= requiredSpace) {
            smallestPossibleDirectorySize = root.size;
        }
        root.children.forEach(child => {
            findSmallestPossibleDirectorySize(child);
        });
    }
    findSmallestPossibleDirectorySize(fileSystem.root);
    return smallestPossibleDirectorySize;
}

console.log(part1());
console.log(part2());