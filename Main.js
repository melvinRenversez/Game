class Main {
    constructor(canvas) {
        this.board = [];
        this.boardSize = { rows: 9, cols: 9 };

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = canvas.clientWidth;
        this.canvas.height = canvas.clientHeight;

        console.log(this.canvas.width, this.canvas.height);

        this.cellSize = this.canvas.width / this.boardSize.cols;

        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        this.init();
        this.initEvents();
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
            cell.draw();
        });
    }

    initBoard() {

        let cells = this.getAllCells();
        cells.forEach(cell => {
            if (cell.name == "F6") {
                cell.setNewContent(new Garde());
            }
        });
        this.drawBoard();

    }

    clickOn(position) {
        let cells = this.getAllCells();

        cells.forEach(cell => {
            console.log("cell select:", cell.isSelected);
        });

        console.log("cells :", cells);

        // let cellSelected = cells.find(cell => cell.cellContentIsSelected());
        let cellSelected;

        for (let cell of cells) {
            console.log("cell for select" ,cell.cellContentIsSelected());
            console.log("for cell:", cell);
            if (cell.cellContentIsSelected()) {
                cellSelected = cell;
                break;
            }
        }

        console.log("cellSelected :", cellSelected);

        cells.forEach(cell => {
            if (cell.position.x === position.x && cell.position.y === position.y) {
                cell.clickOnCell(this.board);
            }
        });
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