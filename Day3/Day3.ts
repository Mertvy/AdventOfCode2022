import * as fs from 'fs';

let input: string = fs.readFileSync("./Day3/input.txt", 'utf-8');

function letterPriority(a:string) {
    let code = a.charCodeAt(0);
    if (code > 64 && code < 91) {
        return code - 38;
    }
    else {
        return code - 96;
    }
}

const part1 = () => {
    let total = 0;
    input.split("\n").forEach(line => {
        let charSet: Set<string> = new Set();

        for (let i = 0; i < line.length/2; i++) {
            charSet.add(line.charAt(i));
        }

        for (let i = line.length/2; i < line.length; i++) {
            if (charSet.has(line.charAt(i))) {
                total += letterPriority(line.charAt(i));
                break;
            }
        }
    });
    return total;
}

const part2 = () => {
    let inputArr = input.split("\n");
    let total = 0;

    for (let i = 0; i < inputArr.length; i += 3) {
        let sets: Array<Set<string>> = [];

        for (let j = 0; j < 3; j++) {
            let line = inputArr[i + j];
            let charSet: Set<string> = new Set();

            for (let k = 0; k < line.length; k++) {
                charSet.add(line.charAt(k));
            }

            sets[j] = charSet;
        }

        sets[0].forEach(char => {
            if (sets[1].has(char) && sets[2].has(char)) {
                total += letterPriority(char);
            }
        });
    }
    return total;
}

console.log(part1())
console.log(part2())