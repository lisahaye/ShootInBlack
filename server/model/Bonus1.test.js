import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import Bonus1 from './Bonus1.js';

describe('Entity', () => {
	describe('#name', () => {
		it('should return the correct name of the bonus'),
			() => {
				const bonus = new Bonus1();
				assert.strictEqual(bonus.name, 'doubleShot');
			};
	});

	describe('#image_source', () => {
		it('should return the correct image of the bonus'),
			() => {
				const bonus = new Bonus1();
				assert.strictEqual(bonus.IMAGE_SOURCE, '/images/monster.png');
			};
	});
});
