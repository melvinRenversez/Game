class Garde {

    // 1 = garde position 
    // 2 = movimiento posible

    constructor() {
        this.posibleMovement = [
            [2, 2, 2, 2, 2],
            [2, 0, 0, 0, 2],
            [2, 0, 1, 0, 2],
            [2, 0, 0, 0, 2],
            [2, 2, 2, 2, 2]
        ];
        this.posibleMovementPositionsInBoard = [];

        this.posibleAttack = [
            [0, 0, 2, 0, 0],
            [0, 0, 2, 0, 0],
            [2, 2, 1, 2, 2],
            [0, 0, 2, 0, 0],
            [0, 0, 2, 0, 0]
        ]
        this.posibleAttackPositionsInBoard = [];

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
        for (let row = -Math.round(offsetRow); row <= Math.round(offsetRow); row++) {
            for (let col = -Math.round(offsetCol); col <= Math.round(offsetCol); col++) {
                let x = position.x + col;
                let y = position.y + row;
                // verify no out of board 
                if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
                    // verify is a possible movement
                    if (this.posibleMovement[row + offsetRow][col + offsetCol] === 2) {
                        // verify is a empty cell
                        if (board[y][x].content) {
                            continue;
                        }
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



    setPossibleAttacks(board, position) {
        this.posibleAttackPositionsInBoard = [];
        let offsetRow = Math.round(this.posibleAttack[0].length / 2) - 1;
        let offsetCol = Math.round(this.posibleAttack.length / 2) - 1;

        for (let row = -Math.round(offsetRow); row <= Math.round(offsetRow); row++) {
            for (let col = -Math.round(offsetCol); col <= Math.round(offsetCol); col++) {
                let x = position.x + col;
                let y = position.y + row;

                // verify no out of board 
                if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {

                    // console.log("possible attack cell:  ", board[y][x]);

                    let actualCell = board[y][x];

                    if (actualCell.content != this && actualCell.content != null) {
                        console.log("Enemy detected at: ", actualCell.name);
                        // verify is a possible movement
                        if (this.posibleAttack[row + offsetRow][col + offsetCol] === 2) {
                            this.posibleAttackPositionsInBoard.push({ x:position.x + col, y: position.y + row });
                        }
                    }

                }
            }
        }
        console.log("possible attacks: ", this.posibleAttackPositionsInBoard);  
    }


    drawPossibleAttacks(ctx, cellSize) {
        if (!this.selected) return;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.posibleAttackPositionsInBoard.forEach(pos => {
            ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
        });
    }

    resetData() {
        console.log("resetting garde data");
        this.posibleMovementPositionsInBoard = [];
        this.selected = false;
    }
}