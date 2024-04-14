import Entity from './Entity.js';

export default class Projectile extends Entity {
	IMAGE_WIDTH = 5;
	IMAGE_HEIGHT = 20;
	DEFAULT_HP = -1;
	DAMAGE = 1;
	IMAGE_SOURCE = '/images/projectile.png';
	DEFAULT_SPEED = 15;
	FACTION = 'ally';
	TYPE = 'projectile';

	constructor() {
		super();
		this.hp = -1;
		this.position = {
			X: 1280 / 2 - this.IMAGE_HEIGHT,
			Y: 720 - 100,
		};
	}

	move() {
		if (this.position.Y < 0 - this.IMAGE_HEIGHT) {
			this.hp = 0;
		} else {
			this.position.Y -= this.DEFAULT_SPEED;
		}
	}
}
