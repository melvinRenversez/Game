class Cell {
    constructor(ctx, name, position, cellSize) {
        this.ctx = ctx
        this.name = name;
        this.position = position;
        this.size = cellSize;

        this.centent = null;
        console.log(this.size)
    }

    setNewContent(content) {
        this.centent = content;
    }

    draw() {

        if (this.centent) {
            this.centent.draw(this.position, this.ctx, this.size);
            return;
        }

        // console.log("draw cell", this.name);
        if ((this.position.x + this.position.y) % 2 === 0) {
            this.ctx.fillStyle = 'lightgray';
        } else {
            this.ctx.fillStyle = 'darkgray';
        }

        this.ctx.fillRect(this.position.x * this.size, this.position.y * this.size, this.size, this.size);
        this.drawName();
    }

    drawName() {
        // console.log("draw name", this.name);
        this.ctx.font = "18px Arial";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.name, this.position.x * this.size+2, this.position.y * this.size+18);
    }

    clickOnCell(board) {
        if (!this.centent) {return}
        console.log("test function isSelected:", this.centent.isSelected());
        if (!this.centent.isSelected()){
            console.log("selecting cell:", this.name);
            this.centent.select();
            this.centent.setPossibleMovements(board, this.position);
            this.centent.drawPossibleMovements(this.ctx, this.size);
        } else {
            
        }
    }

    cellContentIsSelected() {
        if (!this.content) {return false}
        return this.content.isSelected();
    }
}