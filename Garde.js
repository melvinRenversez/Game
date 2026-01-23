class Garde {

    // 1 = garde position 
    // 2 = movimiento posible

    constructor() {
        this.posibleMovement = [
            [0, 0, 2, 0, 0],
            [0, 2, 0, 2, 0],
            [2, 0, 1, 0, 2],
            [0, 2, 0, 2, 0],
            [0, 0, 2, 0, 0]
        ];
        this.posibleMovementPositionsInBoard = [];
        this.selected = false;
        this.color = 'blue';
    }


    draw(position, ctx, cellSize) {
        ctx.fillStyle = this.color;

        ctx.fillRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
    }

    select() {
        console.log("selecting garde");
            this.selected = !this.selected;
            console.log("Garde selected state:", this.selected);
    }
    isSelected() {
        return this.selected;
    }

    setPossibleMovements(board, position) {
        this.posibleMovementPositionsInBoard = [];
        let offsetRow = Math.round(this.posibleMovement[0].length / 2) - 1;
        let offsetCol = Math.round(this.posibleMovement.length / 2) - 1;

        // console.log(offsetRow, offsetCol);
        for (let row = -Math.round(offsetRow); row <= Math.round(offsetRow); row++) {
            for (let col = -Math.round(offsetCol); col <= Math.round(offsetCol); col++) {
                // console.log(row, col);
                let x = position.x + col;
                let y = position.y + row;

                // verify no out of board 
                if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
                    // verify is a possible movement
                    if (this.posibleMovement[row + offsetRow][col + offsetCol] === 2) {
                        this.posibleMovementPositionsInBoard.push({ x:position.x + col, y: position.y + row });
                    }
                }
            }
        }
    }

    drawPossibleMovements(ctx, cellSize) {
        console.log(this.posibleMovementPositionsInBoard);
        console.log(this.selected);
        if (!this.selected) return;
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        
        this.posibleMovementPositionsInBoard.forEach(pos => {
            ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
        });
    }


    tryToMoveTo(position) {
        if (!this.selected) return false;
        const canMove = this.posibleMovementPositionsInBoard.some(pos => pos.x === position.x && pos.y === position.y);

        if (canMove) {
            this.position = position;
            this.posibleMovementPositionsInBoard = [];
            this.selected = false;
            return true;
        }

        return false;
    }
}