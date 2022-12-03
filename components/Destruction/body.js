class Body {
  // Makes and moves the body of the excavator
  // (called by excavator() )
  constructor(x,y){
    this.pos = createVector(x, y)
    this.speed = .5 
    this.unit = width*.017

    // Define arm1 
    this.arm1 = new Arm1(this.pos.x+this.unit*18,    this.pos.y-this.unit*4)
  }
    
  move() {
    this.pos.x += this.speed  
    if (this.pos.x > 400) {
      return 
    }
  }

  show() {
    strokeWeight(8)
    stroke(110,90,80)
    fill(240,170,40)
    // let this.unit = width*.017
    push()
      translate(-this.unit, -1*this.unit); 
  
      let x1 = this.pos.x + random (-2,2)
      let x2 = x1 + 22.0*this.unit
      let y1 = 0 + random(-3,3)
      let y2 = y1 - 5.0*this.unit
     
    //Car body
      
      beginShape()
        vertex(x1, y1)
        vertex(x2, y1)
        vertex(x2, y1-2.0*this.unit)
        vertex(x2-4.0*this.unit, y1-3.0*this.unit)
        vertex(x2-4.0, y2)
        vertex(x1, y2)
      endShape(CLOSE)
     
      beginShape()
      vertex(x2-6.0*this.unit, y1)
      vertex(x2, y1)
      vertex(x2+2.0*this.unit, y1-3.0*this.unit)
      vertex(x2, y1-11.0*this.unit)
      vertex(x2-6.0*this.unit, y1-11.0*this.unit)
      vertex(x2-6.0*this.unit, y1)
      endShape(CLOSE)

    this.arm1.rotate()
    this.arm1.show()
    // arms.forEach((arm, index) => {
    //   arm.draw()
    //   arm.rot += 0.1
    // }) 

    pop()     
  }
}