class Destroy extends Growable {
  // Directs destruction by an excavator
  // ( called by selection.js )
  constructor() {
    super(0)

    // Define excavator

    // this.excavator = new Excavator(width*.3, height *.8)

    this.excavator = new Excavator(0, height-250)

  }

  reset() {
    this.excavator.reset()
  }


  draw() {

    this.excavator.move() 
    this.excavator.show() 
  
    if (newSeasonSwitch) { 
      return 
    }
  }
} 