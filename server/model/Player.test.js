import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import Player from './Player.js';

const PLAYER = new Player('samy');

describe('Player', () => {
	it('should have the correct name', () => {
		assert.strictEqual(PLAYER.name, 'samy');
	});

	it('should have the correct initial direction', () => {
		const direction = PLAYER.direction;
		assert.deepStrictEqual(direction, {
			top: false,
			bottom: false,
			left: false,
			right: false,
		});
	});

	it('should move the player correctly', () => {
		const canvas = { clientWidth: 800, clientHeight: 800 };
		PLAYER.direction.right = true;
		const newPositionX = PLAYER.position.X + PLAYER.DEFAULT_SPEED;
		PLAYER.move(canvas);
		assert.strictEqual(newPositionX, 588.58);

		PLAYER.direction.right = false;
		PLAYER.direction.left = true;
		PLAYER.move(canvas);
		assert.strictEqual(PLAYER.position.X, 1280 / 2 - 52);
		assert.strictEqual(PLAYER.position.Y, 720 - 100);
	});

	it('should inflict damage correctly', () => {
		PLAYER.addDamage(1);
		assert.strictEqual(PLAYER.hp, PLAYER.DEFAULT_HP - 1);
	});

	it('should check if the player is alive', () => {
		PLAYER.hp = 0;
		assert.strictEqual(PLAYER.isDead(), true);

		PLAYER.hp = 100;
		assert.strictEqual(PLAYER.isDead(), false);

		PLAYER.hp = -1;
		assert.strictEqual(PLAYER.isDead(), false);
	});
});
