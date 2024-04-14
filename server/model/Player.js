import Entity from './Entity.js';

export default class Player extends Entity {
	DEFAULT_SPEED = 0.58;
	DEFAULT_SHOOT_CONTDOWN = 2;
	MAX_SPEED = 10;
	BOOST = 2;
	DEFAULT_HP = 3;
	IMAGE_WIDTH = 56;
	IMAGE_HEIGHT = 52;
	IMAGE_SOURCE = '/images/player0.png';
	FACTION = 'ally';
	TYPE = 'player';

	/**
	 * Constructeur de la classe Player.
	 *
	 * @param {string} name - Le nom du joueur.
	 */
	constructor(name, id) {
		super();
		this.id = id;
		this.skin = this.IMAGE_SOURCE;
		this.name = name;
		this.shootCountdown = 0;
		this.countDown = 0;
		this.nbShot = 1;
		this.doubleShotSpeed = false;
		this.score = 0;

		// Gestion des déplcements
		this.hp = this.DEFAULT_HP;
		this.speed = this.DEFAULT_SPEED;
		this.boost = false;
		this.direction = {
			top: false,
			bottom: false,
			left: false,
			right: false,
		};
		this.velocity = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		};

		// Position initiale

		this.shoot = false;
		this.position = {
			X: 1280 / 2 - this.IMAGE_HEIGHT,
			Y: 720 - 100,
		};
	}

	replaceOutOfBounds(canva) {
		if (this.position.X >= canva.clientWidth - this.IMAGE_WIDTH) {
			this.position.X = canva.clientWidth - this.IMAGE_WIDTH;
		}
		if (this.position.X < 0) {
			this.position.X = 0;
		}
		if (this.position.Y >= canva.clientHeight - this.IMAGE_HEIGHT) {
			this.position.Y = canva.clientHeight - this.IMAGE_HEIGHT;
		}
		if (this.position.Y < 0) {
			this.position.Y = 0;
		}
	}

	/**
	 * Déplace le joueur en fonction de la direction actuelle.
	 * @param {number} velocity
	 * @param {number} direction
	 * @returns {number} La velocitée finale
	 */
	calculVelocity(velocity, direction) {
		if (direction) {
			velocity += this.speed;
			if (velocity > this.MAX_SPEED) {
				return this.MAX_SPEED;
			}
		} else {
			velocity -= this.speed;
			if (velocity < 0) {
				return 0;
			}
		}
		return velocity;
	}

	move(canva) {
		this.velocity.top = this.calculVelocity(
			this.velocity.top,
			this.direction.top
		);
		this.velocity.bottom = this.calculVelocity(
			this.velocity.bottom,
			this.direction.bottom
		);
		this.velocity.right = this.calculVelocity(
			this.velocity.right,
			this.direction.right
		);
		this.velocity.left = this.calculVelocity(
			this.velocity.left,
			this.direction.left
		);

		this.position.X += this.velocity.right - this.velocity.left;
		this.position.Y += this.velocity.bottom - this.velocity.top;

		this.replaceOutOfBounds(canva);
	}

	calcut;

	/**
	 * Inflige des dégâts au joueur en cas de collision avec un monstre.
	 * @param {Array} monsters - La liste des monstres.
	 */
	collision(monsters) {
		super.collision(monsters, 60);
	}

	/**
	 *
	 * @param {*} boolean
	 */
	setBoost(boolean) {
		if (boolean) {
			this.speed = this.BOOST;
		} else {
			this.speed = this.DEFAULT_SPEED;
		}
	}

	reduceCountDown() {
		if (this.shootCountdown > 0) {
			this.shootCountdown = this.shootCountdown - 1;
		}

		if (this.countDown > 0) {
			this.countDown = this.countDown - 1;
		}
	}
}
