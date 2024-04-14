import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Monster2 from './Monster2.js';

describe('Monster2', () => {
	const monster = new Monster2(2);
	const canvas = { clientWidth: 800 };

	it('should initialize with correct properties', () => {
		assert.strictEqual(monster.position.X, 2);
		assert.strictEqual(monster.position.Y, 1);
		assert.strictEqual(monster.IMAGE_WIDTH, 50);
		assert.strictEqual(monster.hp, 5);
	});

	it('should move the monster correctly', () => {
		monster.move(canvas);
		assert.strictEqual(monster.position.X, 2);
		assert.strictEqual(monster.position.Y, 6);
	});
});
