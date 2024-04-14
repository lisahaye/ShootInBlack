export default class Entity {
	DEFAULT_HP = -1;
	FACTION = null;
	IMAGE_WIDTH = 50;
	IMAGE_HEIGHT = 50;
	IMAGE_SOURCE = '/images/error.png';
	TYPE = null;

	constructor() {
		this.hp = this.DEFAULT_HP;
		this.position = { X: 0, Y: 0 };
		this.size = { X: 10, Y: 10 };
		this.countDown = 0;
	}

	addDamage(damage) {
		if (this.hp != -1) {
			this.hp -= damage;
			if (this.hp < 0) {
				this.hp = 0;
			}
		}
	}

	move() {
		return;
	}

	isDead() {
		return this.hp == 0;
	}

	setPosition(x, y) {
		this.position.X = x;
		this.position.Y = y;
	}

	/**
	 * Inflige des dégâts à l'entité en cas de collision avec une entité ennemie.
	 * @param {Array} enemies - La liste des monstres.
	 */
	collision(enemies, delay) {
		if (this.countDown > 0) {
			this.countDown = this.countDown - 1;
		} else {
			for (const enemy of enemies) {
				if (
					enemy.FACTION != this.FACTION &&
					(this.collisionTopLeft(enemy) ||
						this.collisionBottomLeft(enemy) ||
						this.collisionTopRight(enemy) ||
						this.collisionBottomRight(enemy))
				) {
					if (this.TYPE == 'player') {
						this.hp = this.hp - 1;
						this.countDown = delay;
						break;
					} else if (this.TYPE == 'projectile') {
						enemy.hp = enemy.hp - 1;
					}
				} else if (
					enemy.FACTION == this.FACTION &&
					(this.collisionTopLeft(enemy) ||
						this.collisionBottomLeft(enemy) ||
						this.collisionTopRight(enemy) ||
						this.collisionBottomRight(enemy))
				) {
					if (enemy.TYPE == 'item' && this.TYPE == 'player') {
						if (enemy.name == 'nbShot' && this.nbShot == 1) {
							this.nbShot = 2;
						} else if (enemy.name == 'nbShot' && this.nbShot == 2) {
							this.nbShot = 3;
						} else if (enemy.name == 'doubleShotSpeed') {
							this.doubleShotSpeed = true;
						}
						enemy.hp = 0;
					}
				}
			}
		}
	}

	/**
	 * Vérifie si le point de coordonnées (X,Y) en haut à gauche de l'entité entre en collision avec un ennemi.
	 * @param {Entity} enemy
	 */
	collisionTopLeft(enemy) {
		let posEnemyX = enemy.position.X;
		let posEnemyY = enemy.position.Y;
		if (
			this.position.X >= posEnemyX &&
			this.position.X <= posEnemyX + enemy.IMAGE_WIDTH
		) {
			if (
				this.position.Y >= posEnemyY &&
				this.position.Y <= posEnemyY + enemy.IMAGE_HEIGHT
			) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Vérifie si le point de coordonnées (X,Y) en bas à gauche de l'entité entre en collision avec un ennemi.
	 * @param {Entity} enemy
	 */
	collisionBottomLeft(enemy) {
		let posEnemyX = enemy.position.X;
		let posEnemyY = enemy.position.Y;
		if (
			this.position.X >= posEnemyX &&
			this.position.X <= posEnemyX + enemy.IMAGE_WIDTH
		) {
			if (
				this.position.Y + this.IMAGE_HEIGHT >= posEnemyY &&
				this.position.Y + this.IMAGE_HEIGHT <= posEnemyY + enemy.IMAGE_HEIGHT
			) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Vérifie si le point de coordonnées (X,Y) en haut à droite de l'entité entre en collision avec un ennemi.
	 * @param {Entity} enemy
	 */
	collisionTopRight(enemy) {
		let posEnemyX = enemy.position.X;
		let posEnemyY = enemy.position.Y;
		if (
			this.position.X + this.IMAGE_WIDTH >= posEnemyX &&
			this.position.X + this.IMAGE_WIDTH <= posEnemyX + enemy.IMAGE_WIDTH
		) {
			if (
				this.position.Y >= posEnemyY &&
				this.position.Y <= posEnemyY + enemy.IMAGE_HEIGHT
			) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Vérifie si le point de coordonnées (X,Y) en bas à droite de l'entité entre en collision avec un ennemi.
	 * @param {Entity} enemy
	 */
	collisionBottomRight(enemy) {
		let posEnemyX = enemy.position.X;
		let posEnemyY = enemy.position.Y;
		if (
			this.position.X + this.IMAGE_WIDTH >= posEnemyX &&
			this.position.X + this.IMAGE_WIDTH <= posEnemyX + enemy.IMAGE_WIDTH
		) {
			if (
				this.position.Y + this.IMAGE_HEIGHT >= posEnemyY &&
				this.position.Y + this.IMAGE_HEIGHT <= posEnemyY + enemy.IMAGE_HEIGHT
			) {
				return true;
			}
		}
		return false;
	}
}
