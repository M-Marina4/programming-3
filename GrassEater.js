
let LivingCreature = require('./LivingCreature')

module.exports = class GrassEater extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.energy = 8
	}


	move() {
		var emptyCells = this.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}


	}
	eat() {
		let emptyCells  = this.chooseCell(1);
		let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			for (var i in grassArr) {
				if (grassArr[i].x == newX && grassArr[i].y == newY) {
					grassArr.splice(i, 1)
				}
			}

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 12) {
				this.mul();
			}

		}
		else {
			this.move();
		}
	}

	mul() {
		var emptyCells = this.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.multiply>=6) {
			grassEatNumber++;
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = 2
			grassEatArr.push(new GrassEater(newX, newY, 2))
			this.energy = 6;
		}

		if (weath == "winter") {
			this.energy -= 4;
			this.multiply -= 4;
		}
		if (weath == "summer") {
			this.energy += 2;
			this.multiply += 2;
		}
	}

	die() {
		matrix[this.y][this.x] = 0;
		for (var i in grassEatArr) {
			if (grassEatArr[i].x == this.x && grassEatArr[i].y == this.y) {
				grassEatArr.splice(i, 1)
				break;
			}
		}
	}



}
