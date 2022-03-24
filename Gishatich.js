class Gishatich extends LivingCreature{
	constructor(x, y) {
		super(x, y);
		this.energy = 10;
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
			matrix[newY][newX] = 3;
			matrix[newCell[1]][newCell[0]] = 3;
			gishatichArr.push(new Gishatich(newX, newY));
			this.energy = 10;
		}
	}

	move() {
		
		let emptyCells = super.chooseCell(0)
                let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.energy >= 0) {
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
		let emptyCells = super.chooseCell(2)
                let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			this.energy++;
			let newX = newCell[0];
			let newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY;

			for (let i in grassEatArr) {
				if (newX == grassEatArr[i].x && newY == grassEatArr[i].y) {
					grassEatArr.splice(i, 1);
					break
				}

			}
			if (this.energy >= 12) {
				this.mul();
			}
		} else {
			this.move();
		}
	}



	die() {
		matrix[this.y][this.x] = 0;
		for (let i in gishatichArr) {
			if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
				gishatichArr.splice(i, 1);
				break;


			}

		}
	}
}

