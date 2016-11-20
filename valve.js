// Valve class

// valve.js

'use strict'; 



class Valve{

constructor(switchport, motorport){
    this.switchport = switchport ;
	this.motorport = motorport ;
	
	this.state = null;
	
	this.gpio = require('onoff').Gpio,
	this.switchgpio = new Gpio(switchport, 'in', 'both'),
	this.motorgpio  = new Gpio(motorport, 'out');
 }

open(){

	this.state = "OPEN";
} 
 
Close(){

	this.state = "CLOSE";

}

isOpen(){
	if ( this.state == "OPEN" )
		return true;
	else
		return false;
} 
 
 print(){
    console.log('Valve switch port :'+ this.switchport + ' motor port : ' + this.motorport );
 }
}


var a1 = new Valve(1,2);
a1.print();

var a2 = new Valve(7,8);
a2.print();