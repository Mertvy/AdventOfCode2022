import { readFileSync } from 'fs';

let input: string = readFileSync("./Day10/input.txt", 'utf-8');

const part1 = () => {
    let total = 0;
    let clockCycle = 0;
    let xRegister = 1;

    input.split("\n").forEach(instruction => {
        clockCycle++;
        if ((clockCycle - 20) % 40 == 0 && clockCycle <= 220) {
            total += clockCycle * xRegister;
        }
        if (instruction != "noop") {
            clockCycle++;
            if ((clockCycle - 20) % 40 == 0 && clockCycle <= 220) {
                total += clockCycle * xRegister;
            }
            xRegister += parseInt(instruction.split(" ")[1]);
        }
    });
    return total;
}

const part2 = () => {
    let clockCycle = 0;
    let xRegister = 1;
    let image: Array<string> = [];

    const runCycle = () => {
        let row = Math.floor(clockCycle/40);
        if (!image[row]) {
            image[row] = "";
        }
        let pixel = clockCycle % 40;
        clockCycle++;

        if (Math.abs(pixel - xRegister) <= 1) {
            image[row] += "█";
        }
        else {
            image[row] += " ";
        }
    }

    input.split("\n").forEach(instruction => {
        runCycle();
        if (instruction != "noop") {
            runCycle();
            xRegister += parseInt(instruction.split(" ")[1]);
        }
    });
    
    let renderedImage = "";
    image.forEach(line => {
        renderedImage += line + "\n";
    });
    return renderedImage;
}

console.log(part1());
console.log(part2());
