import { readFileSync } from 'fs';

let input: string = readFileSync("./Day1/input.txt", 'utf-8');

const part1 = (input:string):number => {
    let maxCalories: number = 0

    input.split("\n\n").forEach(elf => {
        let totalCalories: number = 0;
        elf.split("\n").forEach(calories => {
            totalCalories += parseInt(calories);
        })
    
        if (totalCalories > maxCalories) {
            maxCalories = totalCalories;
        }

    });

    return maxCalories;
}

const part2 = (input:string):number => {
    let first: number = 0;
    let second: number = 0;
    let third: number = 0;

    input.split("\n\n").forEach(elf => {
        let totalCalories:number = 0;
        elf.split("\n").forEach(calories => { 
            totalCalories += parseInt(calories)
        });

        if (totalCalories > first) {
            third = second;
            second = first;
            first = totalCalories;
        }
        else if (totalCalories > second) {
            third = second;
            second = totalCalories;
        }
        else if (totalCalories > third) {
            third = totalCalories;
        }

    });

    return first + second + third;
}

console.log(part1(input))
console.log(part2(input))
