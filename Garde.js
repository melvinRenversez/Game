class Garde {

    // 1 = garde position 
    // 2 = movimiento posible

    constructor(team, id) {
        this.posibleMovement = [
            [2, 2, 2,],
            [2, 1, 2,],
            [2, 2, 2,],
        ];
        this.posibleAttack = [
            [0, 0, 2, 0, 0],
            [0, 0, 2, 0, 0],
            [2, 2, 1, 2, 2],
            [0, 0, 2, 0, 0],
            [0, 0, 2, 0, 0]
        ]

        this.posibleMovementPositionsInBoard = [];
        this.posibleAttackPositionsInBoard = [];

        this.team = team;
        this.id = id
        this.selected = false;
        this.color = 'blue';
        
        this.typeAttack = "melee"; //  melee / range

        this.type = "garde";

        this.image = new Image();

        this.image.src = this.team == "WHITE" ? "img/WG.png" : "img/BG.png";

    }


    async draw(position, ctx, cellSize) {
        
        
        if (!this.imageLoaded) {
            await new Promise((resolve) => {
                this.image.onload = () => {
                    this.imageLoaded = true; // pour ne pas réattendre à chaque draw
                    resolve();
                };
            });
        }
        
        // ctx.fillStyle = this.color;
        // ctx.fillRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
        
        ctx.drawImage(this.image, position.x * cellSize, position.y * cellSize, cellSize, cellSize);

        // ctx.fillStyle = 'black';
        // ctx.fillText(this.team, position.x * cellSize + 2, position.y * cellSize + 18);
        // ctx.fillText(this.id, position.x * cellSize + 2, position.y * cellSize + 38);
        // ctx.fillText(this.type, position.x * cellSize + 2, position.y * cellSize + 58);
    }

    select() {
            this.selected = !this.selected;
    }
    isSelected() {
        return this.selected;
    }

    getTeam() {
        return this.team;
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
        if (!this.selected) return;
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        this.posibleMovementPositionsInBoard.forEach(pos => {
            ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
        });
    }



    setPossibleAttacks(board, position) {
        // init la liste des attack possible 
        this.posibleAttackPositionsInBoard = [];
        // recupere les offsets de la graille dattaq
        let offsetRow = Math.round(this.posibleAttack[0].length / 2) - 1;
        let offsetCol = Math.round(this.posibleAttack.length / 2) - 1;

        // parcourir la graille dattaq
        for (let row = -Math.round(offsetRow); row <= Math.round(offsetRow); row++) {
            for (let col = -Math.round(offsetCol); col <= Math.round(offsetCol); col++) {
                // recupere la position sur la board
                let x = position.x + col;
                let y = position.y + row;

                // verifier not out of board
                if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {

                    // recupere la cellule actuelle de la possition
                    let actualCell = board[y][x];

                    // verifier si la cellule actuel nes pas la mienne ou vide ou quelle ne sois aps de la meme team 
                    if (actualCell.content != this && actualCell.content != null && actualCell.content.getTeam() != this.team) {

                        // verify is a possible movement
                        if (this.posibleAttack[row + offsetRow][col + offsetCol] === 2) {
                            this.posibleAttackPositionsInBoard.push({ x:position.x + col, y: position.y + row });
                        }
                    }

                }
            }
        }
    }


    drawPossibleAttacks(ctx, cellSize) {
        if (!this.selected) return;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.posibleAttackPositionsInBoard.forEach(pos => {
            ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
        });
    }

    resetData() {
        this.posibleMovementPositionsInBoard = [];
        this.selected = false;
    }

    canAttack(target, myCell) {

        // si je suis un melle alros je vais sur la case ou jattacj
        if (this.typeAttack == "melee") {
            // je me deplace sur le cell que j'attaque
            target.setNewContent(myCell.content);
            // je clear mon encienne cellule
            myCell.clearContent();
            // je me reset
            this.resetData();
        }else {
            // je suis un range donc je detruit la case que jattacj mais je vasi aps dessus 

            // je detruit ma target
            target.clearContent();
            // je me reset 
            this.resetData();

        }


    }
}