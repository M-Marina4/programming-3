class GrassEater extends LivingCreature {
    constructor(x, y){
        super(x, y);
        this.energy = 12;
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
			matrix[newY][newX] = 2;
			matrix[newCell[1]][newCell[0]] = 2;
			grassEatArr.push(new GrassEater(newX, newY));
			this.energy = 12;
		}

	}

	move() {
		
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

		if (newCell ) {

			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;
			this.energy--;
			if (this.energy <= 0) {
				this.die();
			}
		} 

	}

	eat() {
		let emptyCells = this.chooseCell(1);
		let newCell = random(emptyCells);

		if (newCell) {

			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;

			this.energy++;

			for (let i in grassArr) {
				if (newX == grassArr[i].x && newY == grassArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}

			}

			if (this.energy >= 16) {
				this.mul();
			}
		} else {
			this.move();
		}
	}


	die() {
		matrix[this.y][this.x] = 0;
		for (let i in grassEatArr) {
			if (this.x == grassEatArr[i].x && this.y == grassEatArr[i].y) {
				grassEatArr.splice(i, 1);
				break;
			}
		}
	}
}