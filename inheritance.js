var carCount = 0;
var copcarCount = 0;
var motorcycleCount = 0;
var tankCount = 0;

function makeNewPosition(){
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 5;
    var w = $(window).width() - 5;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh,nw];
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = 0.1;
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
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
    var div_ref = $('#'+this.name);
    var newq = makeNewPosition();
    var oldq = div_ref.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    div_ref.animate({ top: newq[0], left: newq[1] }, speed, this.move.bind(this));
	},
  addDiv: function() {
    var pos = makeNewPosition();
    if (this.name.indexOf('copcar') > -1) var oName = 'copcar';
    else if (this.name.indexOf('car') > -1) var oName = 'car';
    else if (this.name.indexOf('motorcycle') > -1) var oName = 'motorcycle';
    else if (this.name.indexOf('tank') > -1) var oName = 'tank';
    var idNum = eval( oName + "Count++;" );
    $('body').append('<div class="vehicle ' + oName + '" id="' + oName + idNum.toString() + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px"><span></span></div>' );
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
  this.addDiv();
  this.move();
};
Car.prototype = inherit(Vehicle.prototype);
Car.prototype.health = 2;
Car.prototype.reverse = false;

function CopCar(name){
	this.name = name;
  this.addDiv();
  this.move();
};
CopCar.prototype = inherit(Car.prototype);
CopCar.prototype.health = 3;
CopCar.prototype.siren_interval = 500;

function Motorcycle(name){
	this.name = name;
  this.addDiv();
  this.move();
};
Motorcycle.prototype = inherit(Vehicle.prototype);
Motorcycle.prototype.health = 1;
Motorcycle.prototype.speed = 2;

function Tank(name){
	this.name = name;
  this.addDiv();
  this.move();
};
Tank.prototype = inherit(Vehicle.prototype);
Tank.prototype.health = 10;
Tank.prototype.speed = 0.5;

function CheckForCollisions() {
	var div_list = $('.vehicle');
	console.log(div_list.length);
	for (var i=0; i<div_list.length; i++ ) {
		for ( j=i+1; j<div_list.length; j++ ) {
			console.log(div_list[i] + " " + div_list[j]);
			if ( (div_list[i].offset().top - div_list[j].offset().top).abs() <= 50 && (div_list[i].offset().left - div_list[j].offset().left).abs() <= 50 ) {
				// we have a collision, check colliding with lists and add each to their lists if not present and call damage if not in the colliding with lists
			} else if ( (div_list[i].offset().top - div_list[j].offset().top).abs() > 50 || (div_list[i].offset().left - div_list[j].offset().left).abs() > 50 ) {
				// these two divs are not in collision, check their colliding with list and remove each from their lists if present
			}
		}
	}
}

$(document).ready(function(){

  $('#newCar').click(function(){
    eval( "var car" + carCount.toString() + " = new Car('car" + carCount.toString() + "');" );
  });

  $('#newCopcar').click(function(){
    eval( "var copcar" + copcarCount.toString() + " = new CopCar('copcar" + copcarCount.toString() + "');" );
  });

  $('#newMotorcycle').click(function(){
    eval( "var motorcycle" + motorcycleCount.toString() + " = new Motorcycle('motorcycle" + motorcycleCount.toString() + "');" );
  });

  $('#newTank').click(function(){
    eval( "var tank" + tankCount.toString() + " = new Tank('tank" + tankCount.toString() + "');" );
  });
	
	setInterval(CheckForCollisions, 100);

});
