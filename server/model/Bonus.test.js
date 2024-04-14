import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import Bonus from './Bonus1.js';

describe('Entity', () => {
	describe('#isDead()', () => {
		it('should return true when HP is 0', () => {
			const bonus = new Bonus();
			bonus.hp = 0;
			assert.strictEqual(bonus.isDead(), true);
		});

		it('should return false when HP is greater than 0', () => {
			const bonus = new Bonus();
			bonus.hp = 10;
			assert.strictEqual(bonus.isDead(), false);
		});

		it('should return true when HP is equals -1 (godmode)', () => {
			const bonus = new Bonus();
			bonus.hp = -1;
			assert.strictEqual(bonus.isDead(), false);
		});
	});
});
