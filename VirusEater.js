class VirusEater extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.energy = 10;
		this.directions = [];
	}


	getNewCoordinates() {
		this.directions = [
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
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

		if (newCell) {
			let newX = newCell[0];
			let newY = newCell[1];
			matrix[newY][newX] = 5;
			matrix[newCell[1]][newCell[0]] = 5;
			virusEatArr.push(new VirusEater(newX, newY));
			this.energy = 10;
		}

	}

	move() {
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);
		// console.log(newCell);

		if (newCell) {

			let newX = newCell[0];
			let newY = newCell[1];
			matrix[newY][newX] = 5;
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
		let emptyCells = this.chooseCell(4);
		let newCell = random(emptyCells);
		if (newCell) {

			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;

			this.energy++;

			for (let i in virusArr) {
				if (newX == virusArr[i].x && newY == virusArr[i].y) {
					virusArr.splice(i, 1);
					break;
				}

			}
			if (this.energy >= 15) {
				this.mul();
			}
		} else {
			this.move();
		}
	}


	die() {
		matrix[this.y][this.x] = 0;
		for (let i in virusEatArr) {
			if (this.x == virusEatArr[i].x && this.y == virusEatArr[i].y) {
				virusEatArr.splice(i, 1);
				break;
			}
		}
	}
}

