class Grass extends LivingCreature {

	mul() {
		this.multiply++;
		let emptyCells = super.chooseCell(0)
                let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


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
