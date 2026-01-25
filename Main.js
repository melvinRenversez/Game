class Main {
    constructor(canvas) {
        this.board = [];
        this.boardSize = { rows: 11, cols: 11 };

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;

        this.Teams = {
            WHITE: "WHITE",
            BLACK: "BLACK"
        }

        console.log(this.canvas.width, this.canvas.height);

        this.cellSize = this.canvas.width / this.boardSize.cols;

        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        this.init();
        this.initEvents();

        this.colorTurn = this.Teams.WHITE;
    }

    init() {
        // Initialize board with cell
        for (let r = 0; r < this.boardSize.rows; r++) {
            this.board[r] = [];
            for (let c = 0; c < this.boardSize.cols; c++) {
                this.board[r][c] = new Cell(this.ctx, `${this.alphabet[r]}${c + 1}`, { x: c, y: r }, this.cellSize);
            }
        }

        console.log(this.board);
        this.initBoard();
    }

    getAllCells() {
        let cells = [];
        for (let r = 0; r < this.boardSize.rows; r++) {
            for (let c = 0; c < this.boardSize.cols; c++) {
                cells.push(this.board[r][c]);
            }
        }
        return cells;
    }

    drawBoard() {
        let cells = this.getAllCells();
        cells.forEach(cell => {
            // Draw cell background
            cell.draw({ x: Math.floor(this.boardSize.cols / 2), y: Math.floor(this.boardSize.rows / 2) });
        });
    }

    initBoard() {

        let cells = this.getAllCells();
        cells.forEach(cell => {


            if (cell.position.y == 0) {
                cell.setNewContent(new Garde(this.Teams.BLACK, this.createId()));

            } else if (cell.position.y == 1) {
                cell.setNewContent(new Archer(this.Teams.BLACK, this.createId()));
            } else if (cell.position.y == 9) {
                cell.setNewContent(new Archer(this.Teams.WHITE, this.createId()));
            } else if (cell.position.y == 10) {
                cell.setNewContent(new Garde(this.Teams.WHITE, this.createId()));
            }


            // if ( cell.name == "D6" ) {
            //     cell.setNewContent(new Garde("this.Teams.BLACK", this.createId()));
            // }else if (cell.name == "D8" || cell.name == "D4" || cell.name == "D10"){
            //     cell.setNewContent(new Garde("this.Teams.WHITE", this.createId()));
            // }else if (cell.name == "F5" || cell.name == "H9"){
            //     cell.setNewContent(new Archer("this.Teams.BLACK", this.createId()));
            // }else if (cell.name == "I3" || cell.name == "J7"){
            //     cell.setNewContent(new Archer("this.Teams.WHITE", this.createId()));
            // }
        });
        this.drawBoard();

    }

    createId(depth = 3) {
        let id = "";
        for (let i = 0; i < depth; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    clickOn(position) {
        let cells = this.getAllCells();
        // Parcourir tt les cells
        for (let cell of cells) {
            // verifier que le contenue dans la cell est selectionner
            if (cell.cellContentIsSelected()) {
                // recupere les movement possible et verifie si le click corespond avec un movement possible
                let possibleMove = cell.content.posibleMovementPositionsInBoard;
                let canMove = possibleMove.find(pos => pos.x === position.x && pos.y === position.y);
                // verifier si le movement est possible 
                if (canMove) {
                    // pacourir tt les cells pour trouver la cell cible
                    for (let targetCell of cells) {
                        // verifier si la cell cible est la cell cible
                        if (targetCell.position.x === position.x && targetCell.position.y === position.y) {
                            // sauvegar la piece a deplacer
                            let moveContent = cell.content;
                            // reset les donne de la place 
                            moveContent.resetData();
                            targetCell.setNewContent(moveContent);
                            cell.clearContent();
                            this.colorTurn = this.colorTurn == this.Teams.WHITE ? this.Teams.BLACK : this.Teams.WHITE;
                        }
                    }
                    // redraw board
                    this.drawBoard();
                    break;
                } else {
                    // si on ne pas pas se depalce on verifi qu on ne peut pas attaquer
                    let possibleAttack = cell.content.posibleAttackPositionsInBoard;
                    let canAttack = possibleAttack.find(pos => pos.x === position.x && pos.y === position.y);
                    // on verrifi que l on peut attacker 
                    if (canAttack) {
                        // pacourir tt les cells pour trouver la cell cible
                        for (let targetCell of cells) {
                            // verifier si la cell cible est la cell cible
                            if (targetCell.position.x === position.x && targetCell.position.y === position.y) {
                                // targetCell.yourAttacked(cell);
                                cell.content.canAttack(targetCell, cell);
                                this.colorTurn = this.colorTurn == this.Teams.WHITE ? this.Teams.BLACK : this.Teams.WHITE;
                            }
                        }
                        // redraw board
                        this.drawBoard();
                        break;
                    }
                    // si il peut pas bouger on deselctionne la piece
                    cell.content.select();
                    this.drawBoard();
                }
            } else {
                cells.forEach(cell => {
                    if (cell.position.x === position.x && cell.position.y === position.y && cell.getContentTeam() == this.colorTurn) {
                        cell.clickOnCell(this.board);
                    }
                });
            }
        }

    }


    initEvents() {

        this.canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);

            console.log(`Clicked on row: ${row}, col: ${col}`);
            this.clickOn({ x: col, y: row });
        });
    }

}