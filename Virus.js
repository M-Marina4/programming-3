class Virus extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.energy = 7;
		this.directions = [];

	}

	

	getNewCoordinates() {
		this.directions = [
			[this.x - 2, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 2, this.y - 2],
			[this.x - 2, this.y],
			[this.x + 2, this.y],
			[this.x - 2, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 2, this.y + 2],
			[this.x, this.y + 2],
			[this.x + 2, this.y],
			[this.x, this.y + 2],
			[this.x + 2, this.y + 2],
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}
    
	chooseCell(character) {
		this.getNewCoordinates();
		return super.chooseCell(character);
	}

	mul() {
		this.multiply++;
		let emptyCells = super.chooseCell(0)
                let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			let newX = newCell[0];
			let newY = newCell[1];
			matrix[newY][newX] = 4;
			matrix[newCell[1]][newCell[0]] = 4;
			virusArr.push(new Virus(newX, newY));
			this.energy = 7;
		}
	}

	move() {
	    let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			// this.energy--;
			if (this.energy <= 0) {
				this.die();
			}
		} 

	}

	eat() {

		let grassCells = super.chooseCell(1);
		let gishatichCells = super.chooseCell(2);
		let grassReal = super.chooseCell(3);
		let all = grassCells.concat(gishatichCells, grassReal);
		let newCell = random(all);

		if (newCell) {
			this.energy++;
			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;

			for (let i in grassArr) {
				if (newX == grassArr[i].x && newY == grassArr[i].y) {
					grassArr.splice(i, 1);
					break
				}

			}


			for (let i in grassEatArr) {
				if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
					grassEatArr.splice(i, 1);
					break
				}

			}

			for (let i in gishatichArr) {
				if (newX == gishatichArr[i].x && newY == gishatichArr[i].y) {
					gishatichArr.splice(i, 1);
					break
				}

			}
			if (this.energy >= 15) {
				this.mul()
			}
		} else {

			this.move()
		}
	}


	die() {
		matrix[this.y][this.x] = 0;
		for (let i in virusArr) {
			if (this.x == virusArr[i].x && this.y == virusArr[i].y) {
				virusArr.splice(i, 1);
				break;
			}


		}

	}
}


