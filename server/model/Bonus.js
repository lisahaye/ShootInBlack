import Entity from './Entity.js';

export default class Bonus extends Entity {
	DEFAULT_HP = -1;
	FACTION = 'ally';
	TYPE = 'item';
	CANVASIZE = { clientWidth: '1280', clientHeight: '720' };
	IMAGE_WIDTH = 50;
	IMAGE_HEIGHT = 50;

	constructor() {
		super();
	}

	setPosition() {
		let x = Math.random() * this.CANVASIZE.clientWidth;
		let y = Math.random() * this.CANVASIZE.clientHeight;
		super.setPosition(x, y);
	}
}
