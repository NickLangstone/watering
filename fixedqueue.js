'use strict'; 

class fixedQueue { 
    
	 constructor( mazSize){
		this.arr = [];
		this.itemCount = 0;
		this.MAX = mazSize;
	}

     getCount() {
        return this.arr.length;
    }

     getItem(index) { 
        return this.arr[index]; 
    }

    setItem(index, value) {
        if(this.arr[index] === undefined)
            this.itemCount++;
        this.arr[index] = value; 
    }
	getItems() {
	    return this.arr;
	}

	push( value ) {
	 this.arr.unshift(value );
	 if  ( this.arr.length > this.MAX ) {
		//console.log( "Array is too big; " + this.arr.length +"  MAX : " + this.MAX + " removing items")
	      for ( var idx = this.MAX; idx < this.arr.length; idx ++ ) {
		      this.arr.pop();
		  }
	 }
	}
    delete(index){ 
        if(this.arr[index] === undefined) 
            return;
        delete this.arr[index]; 
        this.itemCount--;
    }
}


module.exports = fixedQueue;
