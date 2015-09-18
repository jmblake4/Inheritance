function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
};

function inherit(proto) {
	function F() {}
	F.prototype = proto;
	return new F;
}

var Vehicle = function(name) {
	this.name = name;
};

Vehicle.prototype = {
	move: function() {
		console.log("Moving " + this.name);
	},
	remove: function() {
		console.log("Moving " + this.name);
	},
	damage: function() {
		// if (this.health === 0 ) this.remove;
		// else this.health -= 1;
		console.log("Damaging vehicle");
	},
	health: 0,
	speed: 1
}

function Car(name){
	this.name = name;
};
Car.prototype = inherit(Vehicle.prototype);
Car.prototype.health = 2;
// Car.prototype.move = function() {
// 	console.log("Moving car horizontally")
// 	var newq = makeNewPosition();
// 	var oldq = $('#'+this.name).offset();
// 	console.log(this.name);
// 	var speed = calcSpeed([oldq.top, oldq.left], newq);
	
// 	$('#'+this.name).animate({ top: newq[0], left: newq[1] }, speed);
// };
Car.prototype.reverse=false;


function CopCar(name){
	this.name = name;
};
CopCar.prototype = inherit(Car.prototype);
CopCar.prototype.health = 3;
CopCar.prototype.siren_interval = 500;
CopCar.prototype.move = function() {
	console.log("Moving cop car vertically");
};

function Motorcycle(name){
	this.name = name;
};
Motorcycle.prototype = inherit(Vehicle.prototype);
Motorcycle.prototype.health = 1;
Motorcycle.prototype.speed = 2;
Motorcycle.prototype.move = function() {
		console.log("Moving motorcyle diagonally at " + this.speed + "x speed.");
};

function Tank(name){
	this.name = name;
};
Tank.prototype = inherit(Vehicle.prototype);
Tank.prototype.health = 10;
Tank.prototype.speed = 0.5;
Tank.prototype.move = function() {
		console.log("Moving tank at " + this.speed + "x speed.")
}

$(document).ready(function(){
//	animateDiv();
	var car1 = new Car('car1');
	var copcar1 = new CopCar('copcar1');
	var motorcycle1 = new Motorcycle('motorcycle1');
	var tank1 = new Tank('tank1');

	var carpos = makeNewPosition();
	var copcarpos = makeNewPosition();
	var motopos = makeNewPosition();
	var tankpos = makeNewPosition();

	console.log(car1 instanceof Vehicle);
	console.log(copcar1 instanceof Vehicle);
	console.log(motorcycle1 instanceof Vehicle);
	console.log(tank1 instanceof Vehicle);

	$('body').append('<div class="car" id="car1" style="top:' + carpos[0] + 'px;left:' + carpos[1] + 'px"></div>' );
	$('body').append('<div class="copcar" id="copcar1" style="top:' + copcarpos[0] + 'px;left:' + copcarpos[1] + 'px"></div>' );
	$('body').append('<div class="motorcyle" id="motorcycle1" style="top:' + motopos[0] + 'px;left:' + motopos[1] + 'px"></div>' );
	$('body').append('<div class="tank" id="tank1" style="top:' + tankpos[0] + 'px;left:' + tankpos[1] + 'px"></div>' );
	
	setInterval(car1.move,5000);
	setInterval(copcar1.move,5000);
	setInterval(motorcycle1.move,5000);
	setInterval(tank1.move,5000);

});

function animateCar(){
    var newq = makeNewPosition();
    var oldq = $('.car').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.car').animate({ top: newq[0], left: newq[1] }, speed);
    
};

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('.car').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.car').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;
};