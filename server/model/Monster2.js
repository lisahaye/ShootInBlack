import Entity from './Entity.js';

export default class Monster2 extends Entity {
	VERTICAL_SPEED = 5;
	dirxMonster = true;
	diryMonster = true;

	FACTION = 'monster';
	IMAGE_SOURCE = '/images/Ship.png';

	constructor(x) {
		super();
		this.position.X = x;
		this.position.Y = 1;
		this.IMAGE_WIDTH = 50;
		this.IMAGE_HEIGHT = 50;
		this.hp = 5;
	}

	move(canva) {
		this.position.Y += this.VERTICAL_SPEED;
	}
}
