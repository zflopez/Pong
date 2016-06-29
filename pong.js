var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	window.setTimeOut(callback, 1000/60);
}

var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
	document.body.appendChild(canvas);
	animate(step);

	window.addEventListener('keydown', function(event) {
		if(event.keyCode === 39) {
			player.move("right");
		} 

		if(event.keyCode === 37) {
			player.move("left");
		}

	}, false);

}

var step = function() {
	update();
	render();
	animate(step);		// setea el fps de los paddle y la pelota
}

var update = function() {	// actualiza los movimientos constantes de la pelota y los palos
	ball.update();
	ball.move();
}

/*
var render = function() {	// te pinta to'
	context.fillStyle = '#a6e5ff';
	context.fillRect(0,0,width, height);
}*/

function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 5; 	//setea la velocidad en el eje X 
	this.y_speed = 0;
}

Paddle.prototype.render = function() {
	context.fillStyle = '#ed143d';
	context.fillRect(this.x, this.y, this.width, this.height);
}

function Player() {
	this.paddle = new Paddle(175, 580, 50, 10);
}

function Computer() {
	this.paddle = new Paddle(175, 10, 50, 10);
}

Player.prototype.render = function() {
	this.paddle.render();
}

Computer.prototype.render = function() {
	this.paddle.render();
}

function Ball(x,y) {
	this.x = x;
	this.y = y;
	this.x_speed = 5;
	this.y_speed = 3;
	this.radius = 5;
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2*Math.PI, false);
	context.fillStyle = '#000';
	context.fill();
}

Ball.prototype.move = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
}

Ball.prototype.update = function() {
	var bounceLeft = this.x - this.radius;
	var bounceRight = this.x + this.radius;
	var bounceTop = this.y - this.radius;
	var bounceBottom = this.y + this.radius;

	if(bounceRight >= width) {
		this.x_speed = this.x_speed * -1;
	}

	if(bounceLeft <= 0) {
		this.x_speed = this.x_speed * -1;
	}

	if(bounceBottom >= height) {
		this.y_speed = this.y_speed * -1;
	}

	if(bounceTop <= 0) {
		this.y_speed = this.y_speed * -1;
	}
	
}



var player = new Player();
var computer = new Computer();
var ball = new Ball(200,300);

var render = function() {
	context.fillStyle = '#a6e5ff';
	context.fillRect(0,0, width, height);
	player.render();
	computer.render();
	ball.render();
}


Player.prototype.move = function(direction) {
	if(direction === "right") {
		if(player.paddle.x + player.paddle.width + player.paddle.x_speed <= width) {
			player.paddle.x += player.paddle.x_speed;
		}
	}

	if(direction === "left") {
		if(player.paddle.x - player.paddle.x_speed >= 0) {
			player.paddle.x -= player.paddle.x_speed;
		}
	}
}


