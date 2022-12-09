import * as fs from 'fs';

let input: string = fs.readFileSync("./Day9/input.txt", 'utf-8');

type Hashable = { hashCode(): number }

class HashSet<T extends Hashable> {
    #map: Map<number, T> = new Map();

    add(item: T): void {
        if (!this.has(item)) {
            this.#map.set(item.hashCode(), item);
        }
    }

    has(item: T): boolean {
        return this.#map.has(item.hashCode());
    }

    delete(item: T): void {
        this.#map.delete(item.hashCode());
    }

    get size(): number {
        return this.#map.size;
    }
}

class Coord {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    hashCode(): number {
        return 2**this.x * 3**this.y;
    }
}

class Knot {
    next: Knot | undefined;
    prev: Knot | undefined;
    x: number;
    y: number;

    constructor(next?: Knot, prev?: Knot, x?: number, y?: number) {
        this.next = next || undefined;
        this.prev = prev || undefined;
        this.x = x || 0;
        this.y = y || 0;
    }

    move() {
        let next = this.next!;

        if (Math.abs(next.x - this.x) <= 1 && Math.abs(next.y - this.y) <= 1) {
            return;
        }

        if (Math.abs(next.x - this.x) > 1 && Math.abs(next.y - this.y) > 1) {
            if (next.x > this.x) {
                this.x = next.x - 1;
            }
            else {
                this.x = next.x + 1;
            }

            if (next.y > this.y) {
                this.y = next.y - 1;
            }
            else {
                this.y = next.y + 1;
            }
        }

        if (Math.abs(next.x - this.x) > 1) {
            this.y = next.y;
            if (next.x > this.x) {
                this.x = next.x - 1;
            }
            else {
                this.x = next.x + 1;
            }
        }
        if (Math.abs(next.y - this.y) > 1) {
            this.x = next.x;
            if (next.y > this.y) {
                this.y = next.y - 1;
            }
            else {
                this.y = next.y + 1;
            }
        }
        if (this.prev) {
            this.prev.move();
        }
    }
}

class Rope {
    head: Knot;
    tail: Knot;
    
    constructor(length: number) {
        this.head = new Knot();
        let cur = this.head;

        for (let i = 1; i < length; i++) {
            let knot = new Knot();
            knot.next = cur;
            cur.prev = knot;
            cur = knot;
        }

        this.tail = cur;
    }

    moveRope(direction: string) {
        let head = this.head;
        switch (direction) {
            case "U":
                head.y++;
                break;
            case "R":
                head.x++;
                break;
            case "D":
                head.y--;
                break;
            case "L":
                head.x--;
                break;
        }
        head.prev!.move();
    }
}

const part1 = () => {
    let visited: HashSet<Coord> = new HashSet();


    let rope = new Rope(2);

    input.split("\n").forEach(line => {
        let direction = line.split(" ")[0];
        let distance = parseInt(line.split(" ")[1])
        for (let i = 0; i < distance; i++) {
            rope.moveRope(direction);
            visited.add(new Coord(rope.tail.x, rope.tail.y))
        }
    });

    return  visited.size;
}

const part2 = () => {
    let visited: HashSet<Coord> = new HashSet();

    let rope = new Rope(10);

    input.split("\n").forEach(line => {
        let direction = line.split(" ")[0];
        let distance = parseInt(line.split(" ")[1])
        for (let i = 0; i < distance; i++) {
            rope.moveRope(direction);
            visited.add(new Coord(rope.tail.x, rope.tail.y))
        }
    });

    return  visited.size;
}

console.log(part1());
console.log(part2());