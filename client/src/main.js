import { io } from 'socket.io-client';
const socket = io();

let entitys = [];

const canvas = document.querySelector('.gameCanvas');
const context = canvas.getContext('2d');
const images = new Map();
const direction = {
	top: false,
	bottom: false,
	left: false,
	right: false,
	boost: false,
};
let shoot = false;

/**@type HTMLCanvasElement */
const canvasResizeObserver = new ResizeObserver(() => resampleCanvas());
canvasResizeObserver.observe(canvas);

function resampleCanvas() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

document.addEventListener('keydown', handleCanvasKeyDown);
document.addEventListener('keyup', handleCanvasKeyUp);

socket.on('dead', entity => {
	window.location.href = '../rejouer.html';
});

function findImage(imagePath) {
	if (!images.has(imagePath)) {
		const image = new Image();
		image.src = imagePath;
		images.set(imagePath, image);
	}
	return images.get(imagePath);
}

const paramURL = new URLSearchParams(window.location.search);
const skin = paramURL.get('skin');
const userName = paramURL.get('user');
updateSkin(`images/${skin}`);
updateUsername(paramURL.get('username'));

render();
function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (const entity of entitys) {
		context.drawImage(
			findImage(entity.IMAGE_SOURCE),
			entity.position.X,
			entity.position.Y,
			entity.IMAGE_WIDTH,
			entity.IMAGE_HEIGHT
		);
		if (entity.TYPE == 'player') {
			context.fillStyle = 'white';
			let x = 0;
			let y = 0;
			context.font = '10px serif';
			const nameWidth = context.measureText(entity.name).width;
			x = entity.position.X + entity.IMAGE_WIDTH / 2 - nameWidth / 2;
			y = entity.position.Y + entity.IMAGE_HEIGHT + 5;
			context.fillText(entity.name, x, y);
			context.font = '20px serif';
			context.fillStyle = 'white';
			const hpWidth = context.measureText(entity.hp).width;
			x = entity.position.X + entity.IMAGE_WIDTH / 2 - hpWidth / 2;
			y = entity.position.Y + entity.IMAGE_HEIGHT / 2 + 20 / 2;
			context.fillText(`${entity.hp}`, x, y);
		}
	}
	requestAnimationFrame(render);
}

socket.on('entitys', event => {
	entitys = event;
});

function handleCanvasKeyDown(event) {
	event.preventDefault();
	if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd')
		direction.right = true;
	if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'q')
		direction.left = true;
	if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's')
		direction.bottom = true;
	if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'z')
		direction.top = true;
	if (event.key === 'Shift') direction.boost = true;
	if (event.code === 'Space') {
		shoot = true;
		playerShoot();
	}
	updateDirection();
}

function handleCanvasKeyUp(event) {
	event.preventDefault();
	if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd')
		direction.right = false;
	if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'q')
		direction.left = false;
	if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's')
		direction.bottom = false;
	if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'z') {
		direction.top = false;
	}
	if (event.key === 'Shift') direction.boost = false;
	if (event.key === ' ') {
		shoot = false;
		playerShoot();
	}
	updateDirection();
}

function updateDirection() {
	socket.emit('direction', direction);
}

function updateSkin(skinName) {
	socket.emit('skinChange', skinName);
}

function updateUsername(userName) {
	socket.emit('usernameChange', userName);
}

function playerShoot() {
	socket.emit('shoot', shoot);
}
