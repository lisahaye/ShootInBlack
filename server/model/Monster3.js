import Entity from './Entity.js';

export default class Monster3 extends Entity {
	VERTICAL_SPEED = this.IMAGE_HEIGHT * 2;
	HORIZONTAL_SPEED = 10;
	dirxMonster = false;
	diryMonster = true;

	FACTION = 'monster';

	IMAGE_SOURCE = '/images/Eyes.png';
	constructor(x) {
		super();
		this.IMAGE_WIDTH = 50;
		this.IMAGE_HEIGHT = 50;
		this.position.X = x;
		this.position.Y = 1;
		this.hp = 1;
	}

	move(canva) {
		if (this.position.X >= canva.clientWidth - 200) {
			this.dirxMonster = false;
		} else if (this.position.X <= 200) {
			this.dirxMonster = true;
		}
		if (this.position.X == canva.clientWidth - 200) {
			this.position.Y += this.VERTICAL_SPEED;
			this.position.X -= this.HORIZONTAL_SPEED;
		}
		if (this.position.X == 200) {
			this.position.Y += this.VERTICAL_SPEED;
			this.position.X += this.HORIZONTAL_SPEED;
		}
		if (this.dirxMonster) {
			this.position.X += this.HORIZONTAL_SPEED;
		} else {
			this.position.X -= this.HORIZONTAL_SPEED;
		}
	}
}
