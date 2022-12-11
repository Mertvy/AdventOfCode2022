import { readFileSync } from 'fs';

let input: string = readFileSync("./Day8/input.txt", 'utf-8');
let inputLines = input.split("\n");

class Tree {
    height: number;
    constructor(height: number) {
        this.height = height;
    }
    checkVisibility(row: number, column: number, grid: Array<Array<Tree>>) {
        if (row == 0 || column == 0 || row == grid.length - 1 || column == grid[row].length) {
            return true;
        }
        const checkRow = () => {
            let left = true;
            let right = true;

            for (let c = column - 1; c >= 0; c--) {
                if (grid[row][c].height >= this.height) {
                    left = false;
                    break;
                }
            }
            if (left) {
                return true;
            }
            for (let c = column + 1; c < grid[row].length; c++) {
                if (grid[row][c].height >= this.height) {
                    right = false;
                    break
                }
            }
            return right
        }

        const checkColumn = () => {
            let up = true;
            let down = true;

            for (let r = row - 1; r >= 0; r--) {
                if (grid[r][column].height >= this.height) {
                    up = false;
                    break;
                }
            }
            if (up) {
                return true;
            }
            for (let r = row + 1; r < grid.length; r++) {
                if (grid[r][column].height >= this.height) {
                    down = false;
                    break;
                }
            }
            return down;
        }

        return checkRow() || checkColumn();
    }

    scenicScore(row: number, column: number, grid: Array<Array<Tree>>): number {
        if (row == 0 || column == 0 || row == grid.length - 1 || column == grid[row].length) {
            return 0;
        }
        let left = 0;
        let right = 0;
        let up = 0;
        let down = 0;

        for (let c = column - 1; c >= 0; c--) {
            left++;
            if (grid[row][c].height >= this.height) {
                break;
            }
        }
        for (let c = column + 1; c < grid[row].length; c++) {
            right++;
            if (grid[row][c].height >= this.height) {
                break
            }
        }
        for (let r = row - 1; r >= 0; r--) {
            up++;
            if (grid[r][column].height >= this.height) {
                break;
            }
        }
        for (let r = row + 1; r < grid.length; r++) {
            down++;
            if (grid[r][column].height >= this.height) {
                break;
            }
        }
    

        return left * right * up * down
    }
}

const treeGrid: Array<Array<Tree>> = [];

inputLines.forEach(line => {
    let treeRow: Array<Tree> = [];
    line.split("").forEach(char => {
        treeRow.push(new Tree(parseInt(char)))
    });
    treeGrid.push(treeRow);
});

const part1 = () => {
    let total = 0;
    for (let i = 0; i < treeGrid.length; i++) {
        for (let j = 0; j < treeGrid[i].length; j++) {
            if (treeGrid[i][j].checkVisibility(i, j, treeGrid)) {
                total++;
            }
        }
    }
    return total;
}

const part2 = () => {
    let highestScore = 0;
    for (let i = 0; i < treeGrid.length; i++) {
        for (let j = 0; j < treeGrid[i].length; j++) {
            let score = treeGrid[i][j].scenicScore(i, j, treeGrid);
            if (score > highestScore) {
                highestScore = score;
            }
        }
    }
    return highestScore;
}

console.log(part1());
console.log(part2());