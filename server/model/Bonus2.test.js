import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import Bonus2 from './Bonus2.js';

describe('Entity', () => {
	describe('#name', () => {
		it('should return the correct name of the bonus'),
			() => {
				const bonus = new Bonus2();
				assert.strictEqual(bonus.name, 'doubleShotSpeed');
			};
	});

	describe('#image_source', () => {
		it('should return the correct image of the bonus'),
			() => {
				const bonus = new Bonus2();
				assert.strictEqual(bonus.IMAGE_SOURCE, '/images/Thunder.png');
			};
	});
});
