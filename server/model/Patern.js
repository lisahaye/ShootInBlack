import Monster1 from './Monster1.js';
import Monster2 from './Monster2.js';
import Monster3 from './Monster3.js';

const canvaSize = { clientWidth: '1280', clientHeight: '720' };

export function createWallOfMonster1(entitys, hauteur) {
	const withMonster = new Monster1().IMAGE_WIDTH;
	for (let x = 0; x < canvaSize.clientWidth; x += withMonster) {
		for (let y = 0; y < 5; y++) {
			const monster = new Monster1(1);
			monster.position.Y =
				y * monster.IMAGE_HEIGHT - monster.IMAGE_HEIGHT / 2 - hauteur;
			monster.position.X = x;
			entitys.push(monster);
		}
	}
}

export function createWallOfMonster2(entitys, hauteur) {
	const withMonster = new Monster2().IMAGE_WIDTH;
	for (let x = 0; x < canvaSize.clientWidth; x += withMonster) {
		for (let y = 0; y < 5; y++) {
			const monster = new Monster2(1);
			monster.position.Y =
				y * monster.IMAGE_HEIGHT - monster.IMAGE_HEIGHT / 2 - hauteur;
			monster.position.X = x;
			entitys.push(monster);
		}
	}
}

export function createWallOfMonster3(entitys, hauteur) {
	const withMonster = new Monster3().IMAGE_WIDTH;
	for (
		let x = 0;
		x < canvaSize.clientWidth - 4 * withMonster;
		x += withMonster
	) {
		for (let y = 0; y < 5; y++) {
			const monster = new Monster3(1);
			monster.position.Y =
				y * monster.IMAGE_HEIGHT - monster.IMAGE_HEIGHT / 2 - hauteur;
			monster.position.X = x;
			entitys.push(monster);
		}
	}
}
