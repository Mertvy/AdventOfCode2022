import { readFileSync } from 'fs';

let input: string = readFileSync("./Day13/input.txt", 'utf-8');

function checkLists(left: any, right: any): number {
    if (left === undefined) {return 1;}
    if (right === undefined) {return -1;}

    if (typeof(left) == "number" && typeof(right) == "number") {return right - left}
    if (typeof(left) == "number") {return checkLists([left], right);}
    if (typeof(right) == "number") {return checkLists(left, [right])}

    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        let result = checkLists(left[i], right[i]);
        if (result != 0) {return result};
    }
    
    return right.length - left.length;
}

function splitCommasNotInBrackets(s: String) {
    let bracketCount = 0;
    const segments: string[] = []
    let curSegment = "";

    for (let i = 0; i < s.length; i++) {
        if (s[i] == "[") {
            curSegment += s[i];
            bracketCount++;
        }
        else if (s[i] == "]") {
            curSegment += s[i];
            bracketCount--;
        }
        else if (s[i] == "," && bracketCount == 0) {
            if (curSegment.length > 0) {segments.push(curSegment);}
            curSegment = "";
        }
        else {
            curSegment += s[i];
        }
    }
    segments.push(curSegment)
    return segments;
}

function generateListFromString(s: string) {
    if (s == "[]") {
        return [];
    }
    let contentsString = s.substring(1, s.length - 1);
    const list: any[] = [];

    splitCommasNotInBrackets(contentsString).forEach(string => {
        if (string[0] == "[") {
            list.push(generateListFromString(string));
        }
        else {
            list.push(parseInt(string));
        }
    });
    
    return list;
}

const part1 = () => {
    let inputPairs = input.split("\n\n");
    const pairs: any[][][] = [];
    let total = 0;

    inputPairs.forEach(inputPair => {
        let pair: any[][] = [];
        const [leftInput, rightInput] = inputPair.split("\n");
        pair.push(generateListFromString(leftInput));
        pair.push(generateListFromString(rightInput));
        pairs.push(pair);
    });

    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];
        if (checkLists(pair[0], pair[1]) >= 0) {
            total += i + 1;
        }
    }
    return total;
}

const part2 = () => {
    const packets: any[] = [[[2]], [[6]]];
    input.split("\n").forEach(line => {
        if (line != "") {packets.push(generateListFromString(line));}
    });
    const swap = (list: any[], i1: number, i2: number) => {
        let tmp = list[i1];
        list[i1] = list[i2];
        list[i2] = tmp;
    }
    let result = 1;
    for (let i = 1; i < packets.length; i++) {
        let j = i;
        while (j > 0 && checkLists(packets[j - 1], packets[j]) < 0) {
            swap(packets, j, j-1);
            j--;
        }
    }
    for (let i = 0; i < packets.length; i++) {
        if (checkLists(packets[i], [[2]]) == 0 || checkLists(packets[i], [[6]]) == 0) {result *= i+1}
    }
    return result;
}

console.log(part1());
console.log(part2());