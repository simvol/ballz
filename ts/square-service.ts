class SquareService {

    public static makeNewLine(maxNumber, grid, numberOfSquares): Square[] {

      //Depending on current level and line size
      //we create new squares and push it to the previous ones (unshift)
      //then we update previous ones moving their Y + squaresPerLine
        let newLine: Square[] = [];

        for (let i = 0; i < squaresPerLine; i++) {
            let newNumber = MT.getRandomIntInclusive(level/2, level);

            // debugger
            let newX = grid.grid[i].x;
            let newY = grid.grid[i].y;

            let newSquareIs = new Square({ number: newNumber, size: squareSize, x: newX, y: newY })

            let newSquare = MT.getRandomIntInclusive(0, 1) ? newSquareIs : null; 

            newLine.unshift(newSquare);
        }
        return newLine;
    }

    // public static drawSquares(squares): void {
    //     squares.forEach(s => {
    //         painter.drawSquare();
    //     })
    // }

}