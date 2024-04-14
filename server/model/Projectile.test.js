import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import Projectile from './Projectile.js';

describe('Projectile', () => {
	const projectile = new Projectile('faction');

	it('should have default values', () => {
		assert.strictEqual(projectile.hp, -1);
		assert.strictEqual(projectile.FACTION, 'ally');
		assert.strictEqual(projectile.TYPE, 'projectile');
	});

	it('should move the projectile', () => {
		projectile.position.Y = 10;
		projectile.move();
		assert.strictEqual(projectile.position.Y, -5);
	});
});
