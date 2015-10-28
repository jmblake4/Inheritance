var carCount = 0;
var copcarCount = 0;
var motorcycleCount = 0;
var tankCount = 0;
var nameCount = 0;
var vehicleCount = 0;
var vehicles = [];
var CheckCount = 0;

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
		if ( oldq == undefined ) return;
		if ( oldq.top <= 0 || oldq.top >= $(window).height() ) this.delta_y *= -1;
		if ( oldq.left <= 0 || oldq.left >= $(window).width() ) this.delta_x *= -1;
		div_ref.animate({ top: oldq.top + 50*this.delta_y, left: oldq.left + 50*this.delta_x }, 100*this.speed, this.move.bind(this));
	},
	// addDiv: function() {
	// 	var pos = makeNewPosition();
	// 	if (this.name.indexOf('copcar') > -1) var oName = 'copcar';
	// 	else if (this.name.indexOf('car') > -1) var oName = 'car';
	// 	else if (this.name.indexOf('motorcycle') > -1) var oName = 'motorcycle';
	// 	else if (this.name.indexOf('tank') > -1) var oName = 'tank';
	// 	var idNum = eval( oName + "Count++;" );
	// 	$('body').append('<div class="vehicle ' + oName + '" id="' + oName + idNum.toString() + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px"><span></span></div>' );
	// },
	remove: function() {
		console.log("Moving " + this.name);
	},
	damage: function() {
		this.health--;
		$('#'+this.name).html(this.health.toString());
	},
	health: 0,
	speed: 1,
	delta_x: 0,
	delta_y: 0,
	collidingWith: []
}

function Car(name){
	this.name = name;
	this.addDiv();
	this.move();
};
Car.prototype = inherit(Vehicle.prototype);
Car.prototype.health = 2;
Car.prototype.reverse = false;
Car.prototype.delta_x = 1;
Car.prototype.delta_y = 0;
Car.prototype.addDiv = function() {
	var pos = makeNewPosition();
	$('body').append('<div class="vehicle car" id="' + this.name + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px">' + this.health + '</div>' );
};

function CopCar(name){
	this.name = name;
	this.addDiv();
	this.move();
};
CopCar.prototype = inherit(Car.prototype);
CopCar.prototype.health = 3;
CopCar.prototype.siren_interval = 500;
CopCar.prototype.delta_x = 0;
CopCar.prototype.delta_y = 1;
CopCar.prototype.addDiv = function() {
	var pos = makeNewPosition();
	$('body').append('<div class="vehicle copcar" id="' + this.name + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px">' + this.health + '</div>' );
};

function Motorcycle(name){
	this.name = name;
	this.addDiv();
	this.move();
};
Motorcycle.prototype = inherit(Vehicle.prototype);
Motorcycle.prototype.health = 1;
Motorcycle.prototype.speed = 2;
Motorcycle.prototype.delta_x = 1;
Motorcycle.prototype.delta_y = 1;
Motorcycle.prototype.addDiv = function() {
	var pos = makeNewPosition();
	$('body').append('<div class="vehicle motorcycle" id="' + this.name + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px">' + this.health + '</div>' );
};

function Tank(name){
	this.name = name;
	this.addDiv();
	this.move();
};
Tank.prototype = inherit(Vehicle.prototype);
Tank.prototype.health = 10;
Tank.prototype.speed = 0.5;
Tank.prototype.addDiv = function() {
	var pos = makeNewPosition();
	$('body').append('<div class="vehicle tank" id="' + this.name + '" style="top:' + pos[0].toString() + 'px;left:' + pos[1].toString() + 'px">' + this.health + '</div>' );
};
Tank.prototype.move = function() {
	var div_ref = $('#'+this.name);
	var newq = makeNewPosition();
	var oldq = div_ref.offset();
	if ( oldq == undefined ) return;
	var speed = calcSpeed([oldq.top, oldq.left], newq);
	div_ref.animate({ top: newq[0], left: newq[1] }, speed, this.move.bind(this));
}

function CheckForCollisions() {
//	console.log(++CheckCount);
	var removed_vehicles_indices = [];
	var iPos, jPos, iTopPos, jTopPos, iLeftPos, jLeftPos, iId, jId, topDiff, leftDiff, widthCheck, heightCheck, indexOfJ, indexOfI;
	for (var i=0; i<vehicles.length; i++ ) {
		for ( j=i+1; j<vehicles.length; j++ ) {
			iPos = $('#'+vehicles[i].name).offset();
			jPos = $('#'+vehicles[j].name).offset();
			if (iPos === undefined || jPos === undefined) break;
			iTopPos = iPos.top;
			jTopPos = jPos.top;
			iLeftPos = iPos.left;
			jLeftPos = jPos.left;
			if ( iTopPos <= jTopPos ) heightCheck = $('#'+vehicles[i].name).height();
			else heightCheck = $('#'+vehicles[j].name).height();
			if ( iLeftPos <= jLeftPos ) widthCheck = $('#'+vehicles[i].name).width();
			else widthCheck = $('#'+vehicles[j].name).width();
			topDiff = Math.abs(iTopPos - jTopPos);
			leftDiff = Math.abs(iLeftPos - jLeftPos);
			iId = $('#'+vehicles[i].name).attr('id');
			jId = $('#'+vehicles[j].name).attr('id');
			indexOfJ = vehicles[i].collidingWith.indexOf(jId);			
			indexOfI = vehicles[j].collidingWith.indexOf(iId);
			if ( topDiff <= heightCheck && leftDiff <= widthCheck ) {
				if ( indexOfJ == -1 ) {
					vehicles[i].collidingWith.push(jId);
					vehicles[i].damage();
					if ( vehicles[i].health === 0 ) {
						$('#' + vehicles[i].name).remove();
						removed_vehicles_indices.push(i);
						vehicles[j].collidingWith.splice(indexOfI,1);
					}
				}
				if ( indexOfI == -1 ) {
					vehicles[j].collidingWith.push(iId);
					vehicles[j].damage();
					if ( vehicles[j].health === 0 ) {
						$('#' + vehicles[j].name).remove();
						removed_vehicles_indices.push(j);
						vehicles[i].collidingWith.splice(indexOfJ,1);
						// i++;
					}
				}
			} else {
				if ( indexOfJ != -1 && indexOfI != -1 ) {
					console.log("removing collision");
					console.log(vehicles[i].collidingWith);
					console.log(vehicles[j].collidingWith);
					vehicles[i].collidingWith.splice(indexOfJ,1);
					vehicles[j].collidingWith.splice(indexOfI,1);
				}
			}
		}
	}
	for (var k = removed_vehicles_indices.length -1; k >= 0; k--) {
		console.log(vehicles);
		vehicles.splice(removed_vehicles_indices[k],1);
		console.log(vehicles);
		vehicleCount--;
	}
}

$(document).ready(function(){

	$('#newCar').click(function(){
		// eval( "var car" + carCount.toString() + " = new Car('car" + carCount.toString() + "');" );
		vehicles[vehicleCount] = new Car('v' + nameCount.toString());
		vehicleCount++;
		nameCount++;
	});

	$('#newCopcar').click(function(){
		// eval( "var copcar" + copcarCount.toString() + " = new CopCar('copcar" + copcarCount.toString() + "');" );
		vehicles[vehicleCount] = new CopCar('v' + nameCount.toString());
		vehicleCount++;	
		nameCount++;
	});

	$('#newMotorcycle').click(function(){
		// eval( "var motorcycle" + motorcycleCount.toString() + " = new Motorcycle('motorcycle" + motorcycleCount.toString() + "');" );
		vehicles[vehicleCount] = new Motorcycle('v' + nameCount.toString());
		vehicleCount++;	
		nameCount++;
	});

	$('#newTank').click(function(){
		// eval( "var tank" + tankCount.toString() + " = new Tank('tank" + tankCount.toString() + "');" );
		vehicles[vehicleCount] = new Tank('v' + nameCount.toString());
		vehicleCount++;	
		nameCount++;
	});
	
	setInterval(CheckForCollisions.bind(this), 10);

});
