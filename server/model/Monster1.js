import Entity from './Entity.js';

export default class Monster1 extends Entity {
	VERTICAL_SPEED = 2.5;
	HORIZONTAL_SPEED = 2.5;
	dirxMonster = true;
	diryMonster = true;
	FACTION = 'monster';
	IMAGE_SOURCE = '/images/Little_Ship.png';

	constructor(x) {
		super();
		this.position.X = x;
		this.position.Y = 1;
		this.IMAGE_WIDTH = 50;
		this.IMAGE_HEIGHT = 50;
		this.hp = 6;
	}

	move(canva) {
		if (this.position.X > canva.clientWidth - this.IMAGE_WIDTH) {
			this.dirxMonster = false;
		} else if (this.position.X < 0) {
			this.dirxMonster = true;
		}
		if (this.dirxMonster) {
			this.position.X += this.HORIZONTAL_SPEED;
			this.position.Y += this.VERTICAL_SPEED;
		} else {
			this.position.X -= this.HORIZONTAL_SPEED;
			this.position.Y += this.VERTICAL_SPEED;
		}
	}
}
