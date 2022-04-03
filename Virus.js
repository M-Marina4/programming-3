let LivingCreature = require('./LivingCreature')
module.exports = class Virus extends LivingCreature {
	constructor(x, y) {
		super(x, y);
		this.energy = 7;
		this.directions = [];
	}

	mul() {
		this.multiply++;
		let emptyCells = this.chooseCell(0);
		let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			let newX = newCell[0];
			let newY = newCell[1];
			matrix[newY][newX] = 4;
			matrix[newCell[1]][newCell[0]] = 4;
			virusArr.push(new Virus(newX, newY));
			this.energy = 7;
		}
		if (weath == "winter") {
			this.multiply--;
		}
		if (weath == "summer") {
			this.multiply++;
		}
	}

	move() {

		let emptyCells = this.chooseCell(0);
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

		let grassCells = this.chooseCell(1);
		let gishatichCells = this.chooseCell(2);
		let grassReal = this.chooseCell(3);
		let all = grassCells.concat(gishatichCells, grassReal);
		let newCell = all[Math.floor(Math.random() * all.length)];

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


