class Grass {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.multiply = 0;
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
		let found = [];
		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;

	}

	mul() {
		this.multiply++;
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);


		if (newCell && this.multiply >= 8) {
			let newX = newCell[0];
			let newY = newCell[1];
			matrix[newY][newX] = 1;
			grassArr.push(new Grass(newX, newY));
			matrix[newCell[1]][newCell[0]] = 1;
			this.multiply = 0;

		}

	}
}


class GrassEater {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 12;
		this.multiply = 0;
		this.directions = [];
	}


	chooseCell(character) {
		this.getNewCoordinates();
		let found = [];
		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];

			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}

			}
		}
		return found;
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


class Gishatich {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 10;
		this.multiply = 0;
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
		let found = [];
		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];

			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}

			}
		}
		return found;
	}

	mul() {
		this.multiply++;
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

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
		
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

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
		let emptyCells = this.chooseCell(2);
		let newCell = random(emptyCells);

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



class Virus {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 7;
		this.multiply = 0;
		this.directions = [];

	}

	chooseCell(character) {
		this.getNewCoordinates();
		let found = [];
		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];

			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}

			}
		}
		return found;
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


	mul() {
		this.multiply++;
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

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
		
		let emptyCells = this.chooseCell(0);
		let newCell = random(emptyCells);

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




class VirusEater {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 10;
		this.multiply = 0;
		this.directions = [];
	}


	chooseCell(character) {
		this.getNewCoordinates();
		let found = [];
		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];

			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == character) {
					found.push(this.directions[i]);
				}

			}
		}
		return found;
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


