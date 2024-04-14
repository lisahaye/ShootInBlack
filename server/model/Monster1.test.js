import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Monster1 from './Monster1.js';

describe('Monster1', () => {
	const monster = new Monster1(2);
	const canvas = { clientWidth: 800 };

	it('should initialize with correct properties', () => {
		assert.strictEqual(monster.position.X, 2);
		assert.strictEqual(monster.position.Y, 1);
		assert.strictEqual(monster.IMAGE_WIDTH, 50);
		assert.strictEqual(monster.dirxMonster, true);
		assert.strictEqual(monster.diryMonster, true);
		assert.strictEqual(monster.hp, 6);
	});

	it('should move the monster correctly', () => {
		monster.move(canvas);
		assert.strictEqual(monster.position.X, 4.5);
		assert.strictEqual(monster.position.Y, 3.5);
	});

	it('should change direction when reaching canvas boundaries', () => {
		monster.position.X = canvas.clientWidth - 100;
		monster.move(canvas);
		assert.strictEqual(monster.dirxMonster, true);
		monster.position.X = 0;
		monster.move(canvas);
		assert.strictEqual(monster.dirxMonster, true);
	});
});
