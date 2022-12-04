import * as fs from 'fs';

let input: string = fs.readFileSync("./Day4/input.txt", 'utf-8');

function isFullyContained(assignments: Array<string>): boolean {
    let e1 = assignments[0];
    let e2 = assignments[1];

    let e1First = parseInt(e1.split("-")[0]);
    let e1Last = parseInt(e1.split("-")[1]);

    let e2First = parseInt(e2.split("-")[0]);
    let e2Last = parseInt(e2.split("-")[1]);

    return ((e1First <= e2First && e1Last >= e2Last) || (e2First <= e1First && e2Last >= e1Last));
}

function hasOverlap(assignments: Array<string>):boolean {
    let e1 = assignments[0];
    let e2 = assignments[1];

    let e1First = parseInt(e1.split("-")[0]);
    let e1Last = parseInt(e1.split("-")[1]);

    let e2First = parseInt(e2.split("-")[0]);
    let e2Last = parseInt(e2.split("-")[1]);

    return ((e1First <= e2First && e1Last >= e2First) || (e2First <= e1First && e2Last >= e1First))
}

const part1 = () => {
    let total = 0;
    input.split("\n").forEach(line => {
        let assignments = line.split(",");
        if (isFullyContained(assignments)) {
            total++;
        }
    });
    return total;
}

const part2 = () => {
    let total = 0;
    input.split("\n").forEach(line => {
        let assignments = line.split(",");
        if (hasOverlap(assignments)) {
            total++;
        }
    });
    return total;
}

console.log(part1());
console.log(part2());