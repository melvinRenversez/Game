class Cell {
    constructor(ctx, name, position, cellSize) {
        this.ctx = ctx
        this.name = name;
        this.position = position;
        this.size = cellSize;

        this.content = null;
        console.log(this.size)
    }

    setNewContent(content) {
        this.content = content;
    }

    draw(midPosition) {

        // console.log("draw cell", this.name);
        if (this.position.x === midPosition.x && this.position.y === midPosition.y) {
            this.ctx.fillStyle = '#413932';
        } else if ((this.position.x + this.position.y) % 2 === 0) {
            this.ctx.fillStyle = '#6d543d';
        } else {
            this.ctx.fillStyle = '#492f1a';
        }

        this.ctx.fillRect(this.position.x * this.size, this.position.y * this.size, this.size, this.size);
        this.drawName(midPosition);

        if (this.content) {
            this.content.draw(this.position, this.ctx, this.size);
            return;
        }
    }

    drawName(midPosition) {
        // console.log("draw name", this.name);
        if (this.position.x === midPosition.x && this.position.y === midPosition.y) {
            this.ctx.fillStyle = 'white';
        } else {
            this.ctx.fillStyle = 'black';
        }
        this.ctx.font = "18px Arial";
        this.ctx.fillText(this.name, this.position.x * this.size + 2, this.position.y * this.size + 18);
    }

    clickOnCell(board) {
        if (!this.content) { return }
        // console.log("test function isSelected:", this.content.isSelected());
        if (!this.content.isSelected()) {
            // console.log("selecting cell:", this.name);
            this.content.select();
            this.content.setPossibleMovements(board, this.position);
            this.content.drawPossibleMovements(this.ctx, this.size);

            this.content.setPossibleAttacks(board, this.position);
            this.content.drawPossibleAttacks(this.ctx, this.size);
        } else {

        }
    }

    cellContentIsSelected() {
        if (this.content == null) {
            return false
        }
        return this.content.isSelected();
    }
    clearContent() {
        this.content = null
    }

    getContentTeam() {
        if (this.content == null) {
            return null
        }
        return this.content.getTeam();
    }
}