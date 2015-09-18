var carCount = 1;
var copcarCount = 2;
var motorcycleCount = 3;
var tankCount = 4;

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
  this.move();
};

Vehicle.prototype = {
	move: function() {
    var div_ref = $('#'+this.name);
    var newq = makeNewPosition();
    var oldq = div_ref.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    div_ref.animate({ top: newq[0], left: newq[1] }, speed, this.move.bind(this));
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
  this.move();
};
Car.prototype = inherit(Vehicle.prototype);
Car.prototype.health = 2;
Car.prototype.reverse = false;

function CopCar(name){
	this.name = name;
  this.move();
};
CopCar.prototype = inherit(Car.prototype);
CopCar.prototype.health = 3;
CopCar.prototype.siren_interval = 500;

function Motorcycle(name){
	this.name = name;
  this.move();
};
Motorcycle.prototype = inherit(Vehicle.prototype);
Motorcycle.prototype.health = 1;
Motorcycle.prototype.speed = 2;

function Tank(name){
	this.name = name;
  this.move();
};
Tank.prototype = inherit(Vehicle.prototype);
Tank.prototype.health = 10;
Tank.prototype.speed = 0.5;

$(document).ready(function(){

  var carCount = 0, copcarCount = 0, motorcycleCount = 0, tankCount = 0;

  $('#newCar').click(function(){
    console.log("new car");
    var pos = makeNewPosition();
    $('body').append('<div class="car" id="car' + carCount.toString() + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px"></div>');
    eval( "var car" + carCount.toString() + " = new Car('car" + carCount.toString() + "');" );
    carCount++;
  });

  $('#newCopcar').click(function(){
    console.log("new copcar");
    var pos = makeNewPosition();
    $('body').append('<div class="copcar" id="copcar' + copcarCount.toString() + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px"></div>' );
    eval( "var copcar" + copcarCount.toString() + " = new CopCar('copcar" + copcarCount.toString() + "');" );
    copcarCount++;
  });

  $('#newMotorcycle').click(function(){
    console.log("new motorcycle");
    var pos = makeNewPosition();
    $('body').append('<div class="motorcycle" id="motorcycle' + motorcycleCount.toString() + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px"></div>' );
    eval( "var motorcycle" + motorcycleCount.toString() + " = new Motorcycle('motorcycle" + motorcycleCount.toString() + "');" );
    motorcycleCount++;
  });

  $('#newTank').click(function(){
    console.log("new tank");
    var pos = makeNewPosition();
    $('body').append('<div class="tank" id="tank' + tankCount.toString() + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px"></div>' );
    eval( "var tank" + tankCount.toString() + " = new Tank('tank" + tankCount.toString() + "');" );
    tankCount++;
  });

  // var carpos = makeNewPosition();
  // var copcarpos = makeNewPosition();
  // var motopos = makeNewPosition();
  // var tankpos = makeNewPosition();
  //
  // $('body').append('<div class="car" id="car1" style="top:' + carpos[0] + 'px;left:' + carpos[1] + 'px"></div>' );
  // $('body').append('<div class="copcar" id="copcar1" style="top:' + copcarpos[0] + 'px;left:' + copcarpos[1] + 'px"></div>' );
  // $('body').append('<div class="motorcycle" id="motorcycle1" style="top:' + motopos[0] + 'px;left:' + motopos[1] + 'px"></div>' );
  // $('body').append('<div class="tank" id="tank1" style="top:' + tankpos[0] + 'px;left:' + tankpos[1] + 'px"></div>' );
  // $('body').append('<div class="tank" id="tank2" style="top:' + tankpos[0] + 'px;left:' + tankpos[1] + 'px"></div>' );
  //
  // var car_counter = 1;
  // name = "car1";
	// eval( "var car" + car_counter + " = new Car('car1');" );
  // console.log(eval(name + ' instanceof Car;'));
	// var copcar1 = new CopCar('copcar1');
	// var motorcycle1 = new Motorcycle('motorcycle1');
	// var tank1 = new Tank('tank1');
  // var tank2 = new Tank('tank2');

	// setInterval(car1.move.bind(car1),5000);
	// setInterval(copcar1.move.bind(copcar1),5000);
	// setInterval(motorcycle1.move.bind(motorcycle1),5000);
	// setInterval(tank1.move.bind(tank1),5000);

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
