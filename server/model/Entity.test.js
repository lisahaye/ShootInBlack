import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import Entity from './Entity.js';


describe('Entity', () => {
    describe('#addDamage()', () => {
        it('should subtract damage from HP', () => {
            const entity = new Entity();
            entity.hp = 10;
            entity.addDamage(5);
            assert.strictEqual(entity.hp, 5);
        });

        it('should not allow negative HP', () => {
            const entity = new Entity();
            entity.hp = 3;
            entity.addDamage(10);
            assert.strictEqual(entity.hp, 0);
        });

        it('should not allow damage HP', () => {
            const entity = new Entity();
            entity.hp = -1;
            entity.addDamage(10);
            assert.strictEqual(entity.hp, -1);
        });
    });

    describe('#isDead()', () => {
        it('should return true when HP is 0', () => {
            const entity = new Entity();
            entity.hp = 0;
            assert.strictEqual(entity.isDead(), true);
        });

        it('should return false when HP is greater than 0', () => {
            const entity = new Entity();
            entity.hp = 10;
            assert.strictEqual(entity.isDead(), false);
        });

        it('should return true when HP is equals -1 (godmode)', () => {
            const entity = new Entity();
            entity.hp = -1;
            assert.strictEqual(entity.isDead(), false);
        });
    });

    describe('#setPosition()', () => {
        it('should set the position correctly', () => {
            const entity = new Entity();
            entity.setPosition(2, 4);
            assert.strictEqual(entity.position.X, 2);
            assert.strictEqual(entity.position.Y, 4);
        });
    });
});