import { readFileSync } from 'fs';

let input: string = readFileSync("./Day6/input.txt", 'utf-8');

function getStartOfMessage(markerLength:number):number {

    let letterFrequency: Array<number> = []
    let uniqueLetters = 0;
    
    for (let i = 0; i < 26; i++) {
        letterFrequency.push(0);
    }

    for (let i = 0; i < markerLength - 1; i++) {
        let letterIndex = input.charCodeAt(i) - 97;
        if (letterFrequency[letterIndex] == 0) {
            uniqueLetters++;
        }
        letterFrequency[letterIndex]++;
    }

    for (let i = markerLength - 1; i < input.length; i++) {
        let letterIndex = input.charCodeAt(i) - 97;
        if (letterFrequency[letterIndex] == 0) {
            uniqueLetters++;
        }
        letterFrequency[letterIndex]++;
        if (uniqueLetters == markerLength) {
            return i + 1;
        }
        let removeLetterIndex = input.charCodeAt(i-(markerLength - 1)) - 97;

        letterFrequency[removeLetterIndex]--;
        if (letterFrequency[removeLetterIndex] == 0) {
            uniqueLetters--;
        }
    }
    return -1;
}

const part1 = () => {
    return getStartOfMessage(4);
}

const part2 = () => {
    return getStartOfMessage(14);
}

console.log(part1());
console.log(part2());
