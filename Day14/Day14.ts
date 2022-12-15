import { readFileSync } from 'fs';

let input: string = readFileSync("./Day14/input.txt", 'utf-8');

function generateInputGrid(): string[][] {
    let highestX = 0;
    let highestY = 0;
    const segments: number[][][] = [];
    input.split("\n").forEach(line => {
        const corners: number[][] = [];
        line.split(" -> ").forEach(cornerString => {
            const corner = [parseInt(cornerString.split(",")[0]), parseInt(cornerString.split(",")[1])];
            if (corner[0] > highestX) {highestX = corner[0] + 1;}
            if (corner[1] > highestY) {highestY = corner[1] + 2;}
            corners.push(corner);
        });
        segments.push(corners);
    });
    highestX += 2* highestY;
    const grid: string[][] = [];

    for (let i = 0; i <= highestY; i++) {
        const row: string[] = []
        for (let j = 0; j <= highestX; j++) {
            row.push(".");
        }
        grid.push(row);
    }

    segments.forEach(segment => {
        for (let i = 0; i < segment.length - 1; i++) {
            const corner1 = segment[i];
            const corner2 = segment[i + 1];

            if (corner1[1] == corner2[1]) {
                for (let j = Math.min(corner1[0], corner2[0]); j <= Math.max(corner1[0], corner2[0]); j++) {
                    grid[corner1[1]][j] = '#';
                }
            }
            else {
                for (let j = Math.min(corner1[1], corner2[1]); j <= Math.max(corner1[1], corner2[1]); j++) {
                    grid[j][corner1[0]] = '#'
                }
            }
        }
    });
    return grid;
}

const part1 = () => {
    const grid = generateInputGrid();
    let sandUnits = 0;
    const maxY = grid.length - 1;
    const maxX = grid[0].length - 1;

    while (true) {
        let x = 500;
        let y = 0;

        while (true) {
            if (y == maxY) {return sandUnits;}

            if (grid[y+1][x] == '.') {
                y++;
            }
            else if (x == 0) {return sandUnits;}
            else if (grid[y+1][x-1] == '.') {
                y++;
                x--;
            }
            else if (x == maxX) {return sandUnits;}
            else if (grid[y+1][x+1] == '.') {
                y++;
                x++;
            }
            else {
                grid[y][x] = '#';
                sandUnits++;
                break;
            }
        }
    }
}

const part2 = () => {
    const grid = generateInputGrid();
    let sandUnits = 0;
    const maxY = grid.length - 1;
    const maxX = grid[0].length - 1;

    for (let x = 0; x <= maxX; x++) {grid[maxY][x] = '#'}

    while (true) {
        let x = 500;
        let y = 0;

        while (true) {
            if (grid[y+1][x] == '.') {
                y++;
            }
            else if (grid[y+1][x-1] == '.') {
                y++;
                x--;
            }
            else if (grid[y+1][x+1] == '.') {
                y++;
                x++;
            }
            else {
                grid[y][x] = '#';
                sandUnits++;
                if (y == 0 && x == 500) {return sandUnits;}
                break;
            }
        }
    }
}

console.log(part1());
console.log(part2());
