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
Car.prototype.reverse = false;
Car.prototype.move = function() {
	console.log(this.name);
	console.log($('#'+this.name).offset());
}

// {
// 	health: 2,
// 	move: function() {
// 		console.log("Moving car horizontally")
// 		var newq = makeNewPosition();
// 		var oldq = $('#'+this.name).offset();
// 		console.log($('#'+this.name));
// 		var speed = calcSpeed([oldq.top, oldq.left], newq);
    
// 		$('#'+this.name).animate({ top: newq[0], left: newq[1] }, speed);
// 	},
// 	reverse: false
// }

function CopCar(name){
	this.name = name;
};
CopCar.prototype = inherit(Car.prototype);
CopCar.prototype.health = 3;
CopCar.prototype.siren_interval = 500;

function Motorcycle(name){
	this.name = name;
};
Motorcycle.prototype = inherit(Vehicle.prototype);
Motorcycle.prototype.health = 1;
Motorcycle.prototype.speed = 2;

function Tank(name){
	this.name = name;
};
Tank.prototype = inherit(Vehicle.prototype);
Tank.prototype.health = 10;
Tank.prototype.speed = 0.5;

$(document).ready(function(){
	var car1 = new Car('car1');
	var tank1=new Tank('tank1');
	$('body').append( '<div class="car" id="car1" style="top:0px;left:0px"></div>' );
//	console.log($('#car1').offset());
	car1.move();
	console.log(car1 instanceof Vehicle);
	console.log(tank1 instanceof Vehicle);
});