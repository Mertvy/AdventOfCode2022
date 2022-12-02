import * as fs from 'fs';

let input = fs.readFileSync("./Day2/input.txt", 'utf-8');

const pointValues = new Map<string, number>();
pointValues.set("rock", 1);
pointValues.set("paper", 2);
pointValues.set("scissors", 3);

const letterToAction = new Map<string, string>();
letterToAction.set("A", "rock");
letterToAction.set("B", "paper");
letterToAction.set("C", "scissors");

letterToAction.set("X", "rock");
letterToAction.set("Y", "paper");
letterToAction.set("Z", "scissors");

const winningMove = new Map<string, string>();
winningMove.set("rock", "paper");
winningMove.set("paper", "scissors");
winningMove.set("scissors", "rock");


const part1 = () => {
    let total = 0;
    input.split("\n").forEach(round => {
        let opponentMove = letterToAction.get(round.split(" ")[0]);
        let yourMove = letterToAction.get(round.split(" ")[1]);
        let roundTotal: number;
        
        roundTotal = pointValues.get(yourMove!)!;

        if (yourMove == opponentMove) {
                roundTotal += 3;
        }
        else if (yourMove == winningMove.get(opponentMove!)) {        
            roundTotal += 6;
        }      
        total += roundTotal
    });
    return total;
}

const part2 = () => {
    let total = 0;
    input.split("\n").forEach(round => {
        let opponentMove = letterToAction.get(round.split(" ")[0]);
        let action = round.split(" ")[1];
        let roundTotal;

        if (action == "Z") {
            roundTotal = 6 + pointValues.get(winningMove.get(opponentMove!)!)!;
        }
        else if (action == "Y") {
            roundTotal = 3 + pointValues.get(opponentMove!)!;
        }
        else {
            roundTotal = 6 - pointValues.get(winningMove.get(opponentMove!)!)! - pointValues.get(opponentMove!)!;
        }
        total += roundTotal;
    });
    return total;
}

console.log(part1());
console.log(part2());