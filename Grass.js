
let LivingCreature = require('./LivingCreature');

module.exports = class Grass extends LivingCreature {

	mul() {
		
		this.multiply++;
		let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
		
		
		if (newCell && this.multiply >= 8) {
			console.log('grasss ml');
			let newX = newCell[0];
			let newY = newCell[1];
			matrix[newY][newX] = 1;
			grassArr.push(new Grass(newX, newY));
			matrix[newCell[1]][newCell[0]] = 1;
			this.multiply = 0;

		}
		if (weath == "winter") {
			this.energy -= 2;
			this.multiply -= 2;
		}
		if (weath == "spring") {
			this.energy += 5;
			this.multiply += 5;
		}
		if (weath == "summer") {
			this.energy += 3;
			this.multiply += 3;
		}
		if (weath == "autumn") {
			this.energy--;
			this.multiply--;
	}
	}
}
