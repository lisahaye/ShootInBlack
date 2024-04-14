import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Monster from './Monster3.js';

describe('Monster3', () => {
	const monster = new Monster(2);
	const canvas = { clientWidth: 800 };

	it('should initialize with correct properties', () => {
		assert.strictEqual(monster.position.X, 2);
		assert.strictEqual(monster.position.Y, 1);
		assert.strictEqual(monster.IMAGE_WIDTH, 50);
		assert.strictEqual(monster.dirxMonster, false);
		assert.strictEqual(monster.diryMonster, true);
		assert.strictEqual(monster.hp, 1);
	});
	it('should move the monster correctly', () => {
		monster.move(canvas);
		assert.strictEqual(monster.position.X, 12);
		assert.strictEqual(monster.position.Y, 1);
	});

	it('should change direction when reaching canvas bondaries', () => {
		monster.position.X = canvas.clientWidth - 100;
		monster.move(canvas);
		assert.strictEqual(monster.dirxMonster, false);
		monster.position.X = 0;
		monster.move(canvas);
		assert.strictEqual(monster.dirxMonster, true);
	});
});
