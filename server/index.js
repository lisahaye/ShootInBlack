import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';
import Player from './model/Player.js';
import Projectile from './model/Projectile.js';
import {
	createWallOfMonster1,
	createWallOfMonster2,
	createWallOfMonster3,
} from './model/Patern.js';
import Bonus2 from './model/Bonus2.js';
import Bonus1 from './model/Bonus1.js';

const skins = [];
skins.push('images/player0.png');
skins.push('images/player1.png');
skins.push('images/player2.png');
skins.push('images/player3.png');

const canvaSize = { clientWidth: '1280', clientHeight: '720' };
const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);
addWebpackMiddleware(app);
const PORT = getPort();

let bonusCountDown = 0;
let entitys;
let nbplayer = 0;
let players = new Map();
let scores = [];

let countDownMonster1 = 0;
let countDownMonster2 = 0;
let countDownMonster3 = 0;

httpServer.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});

function initGame(params) {
	entitys = [];
	createWallOfMonster3(entitys, 1000);
}

function addMonster() {
	addWallMonster1();
	addWallMonster2();
	addWallMonster3();
}

function addWallMonster1() {
	if (countDownMonster1 > 0) {
		countDownMonster1 = countDownMonster1 - 1;
	} else {
		createWallOfMonster1(entitys, 1000);
		countDownMonster1 = 60 * 15;
	}
}

function addWallMonster2() {
	if (countDownMonster2 > 0) {
		countDownMonster2 = countDownMonster2 - 1;
	} else {
		createWallOfMonster2(entitys, 1000);
		countDownMonster2 = 60 * 12;
	}
}

function addWallMonster3() {
	if (countDownMonster3 > 0) {
		countDownMonster3 = countDownMonster3 - 1;
	} else {
		createWallOfMonster3(entitys, 1000);
		countDownMonster3 = 60 * 8;
	}
}

io.on('connection', socket => {
	nbplayer++;
	if (nbplayer == 1) {
		initGame();
	}
	players.set(socket.id, new Player('default_name', socket.id));
	entitys.push(players.get(socket.id));

	socket.on('direction', direction => {
		const player = players.get(socket.id);
		if (player != undefined) {
			player.direction = direction;
			player.setBoost(direction.boost);
		}
	});

	socket.on('skinChange', skin => {
		const player = players.get(socket.id);
		if (skins.includes(skin)) player.IMAGE_SOURCE = skin;
		else player.IMAGE_SOURCE = 'images/player0.png';
	});

	socket.on('usernameChange', name => {
		const player = players.get(socket.id);
		if (name != null) player.name = name;
		else player.name = 'default_name';
	});

	socket.on('shoot', shoot => {
		const player = players.get(socket.id);
		if (player != undefined) {
			player.shoot = shoot;
		}
	});

	socket.on('disconnect', () => {
		nbplayer--;
		const player = players.get(socket.id);
		updateJson(player);
		entitys = entitys.filter(player => player.id !== socket.id);
		players.delete(socket.id);
	});
});

/**
 * Cherche le port dans les arguments du lancement du serveur sinon donne un port par defaut
 * @returns {number} le port à utiliser pour le serveur
 */
function getPort() {
	const DEAFAULT_PORT = 8000;
	let port = DEAFAULT_PORT;
	if (process.env.PORT != undefined) {
		port = process.env.PORT;
	}
	return port;
}

setInterval(serverLogic, 1000 / 60);

function serverLogic() {
	if (nbplayer > 0) {
		sendPosition();
		moveEntity();
		isDead();
		bonus();
		shootEntity();
		addScore();
		addMonster();
	}
}

function isDead() {
	for (const entity of entitys) {
		if (entity.isDead()) {
			if (entity.TYPE == 'player') {
				const deadPlayerSocket = io.sockets.sockets.get(entity.id);
				if (deadPlayerSocket) {
					deadPlayerSocket.emit('dead', entity);
				}
			} else {
				entitys = entitys.filter(elm => elm != entity);
			}
		}
	}
}

function bonus() {
	if (bonusCountDown > 0) {
		bonusCountDown = bonusCountDown - 1;
	} else {
		let x = Math.random();
		let bonus;
		if (x < 0.5) {
			bonus = new Bonus1();
		} else {
			bonus = new Bonus2();
		}
		bonus.setPosition();
		entitys.push(bonus);
		bonusCountDown = 60 * 20;
		addScore();
	}
}
function addScore() {
	for (const player of players.values()) {
		player.score += 1;
	}
}

function shootEntity() {
	for (const player of players.values()) {
		if (player.shoot && player.shootCountdown == 0) {
			if (player.nbShot == 1) {
				oneShot(player);
			} else if (player.nbShot == 2) {
				doubleShot(player);
			} else if (player.nbShot == 3) {
				tripleShot(player);
			}
			if (player.doubleShotSpeed) {
				player.shootCountdown = 5;
			} else {
				player.shootCountdown = 10;
			}
		} else if (player.shootCountdown > 0) {
			player.shootCountdown = player.shootCountdown - 1;
		}
	}
}

function oneShot(player) {
	const projectile = new Projectile();
	projectile.position.X = player.position.X + player.IMAGE_HEIGHT / 2;
	projectile.position.Y = player.position.Y;
	entitys.push(projectile);
}

function doubleShot(player) {
	const projectile = new Projectile();
	projectile.position.X = player.position.X + 6;
	projectile.position.Y = player.position.Y;
	const projectile2 = new Projectile();
	projectile2.position.X = player.position.X + player.IMAGE_WIDTH - 10;
	projectile2.position.Y = player.position.Y;
	entitys.push(projectile);
	entitys.push(projectile2);
}

function tripleShot(player) {
	oneShot(player);
	doubleShot(player);
}

function sendPosition() {
	io.emit('entitys', entitys);
}

// Chemin absolu du fichier episodes.json
const scoresFilePath = 'scores.json';

app.get('/api/scores', (req, res) => {
	fs.readFile(scoresFilePath, (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			res.status(500).send('Internal Server Error');
			return;
		}
		try {
			const episodes = JSON.parse(data);
			res.json(episodes);
		} catch (error) {
			console.error('Error parsing JSON:', error);
			res.status(500).send('Internal Server Error');
		}
	});
});

app.get('/api/scores/:name', (req, res) => {
	fs.readFile(scoresFilePath, (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			res.status(500).send('Internal Server Error');
			return;
		}
		try {
			const episodes = JSON.parse(data);
			const episode = episodes.find(e => e.name == req.params.name);
			res.json(episode);
		} catch (error) {
			console.error('Error parsing JSON:', error);
			res.status(500).send('Internal Server Error');
		}
	});
});

const publicDirectoryPath = path.join(process.cwd(), 'client', 'public');
app.use(express.static(publicDirectoryPath));

function moveEntity() {
	for (const entity of entitys) {
		entity.move(canvaSize);
		entity.collision(entitys);
		if (entity.FACTION == 'monster') {
			outOfMap(entity);
		}
	}
}

function outOfMap(entity) {
	if (
		entity.position.X >= canvaSize.clientWidth ||
		entity.position.X < 0 - canvaSize.clientWidth ||
		entity.position.Y >= canvaSize.clientHeight
	) {
		entity.hp = 0;
	}
}

function updateJson(player) {
	fs.readFile(scoresFilePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return;
		}

		try {
			scores = JSON.parse(data);

			if (player !== undefined) {
				scores.push({ name: player.name, score: player.score });
				fs.writeFile(scoresFilePath, JSON.stringify(scores), err => {
					if (err) throw err;
				});
			}
		} catch (error) {
			console.error('Error parsing JSON:', error);
		}
	});
}
