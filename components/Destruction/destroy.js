class Destroy {
  // Directs destruction by an excavator
  // ( called by selection.js )
constructor() {

  // Define excavator

  // this.excavator = new Excavator(width*.3, height *.8)

  this.excavator = new Excavator(0, height-250)

 
  }

draw() {

  this.excavator.move() 
  this.excavator.show() 
 
  }
} 