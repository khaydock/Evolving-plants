class Body {
  // Makes and moves the body of the excavator
  // (called by excavator() )
  constructor(x,y){
      this.pos = createVector(x, y)
      this.speed = .5 
      // Define arm1 
      this.arm1 = new Arm1(this.pos.x+180,this.pos.y,20)

    }
    
  move() {
    this.pos.x += this.speed  
    if (this.pos.x > 400) {
      return 
    }
  }
  
  showShovel() {

  } 

  show() {
    strokeWeight(4)
    stroke(110,90,80)
    fill(240,170,40)
    push()
      translate(-400, 0); 
  
      let x1 = this.pos.x + random (-2,2)
      let x2 = x1 + 220
      let y1 = 0 + random(-3,3)
      let y2 = y1 - 50
     
    //Car body
      
      beginShape()
        vertex(x1, y1)
        vertex(x2, y1)
        vertex(x2, y1-20)
        vertex(x2-40, y1-30)
        vertex(x2-40, y2)
        vertex(x1, y2)
      endShape(CLOSE)
     
      beginShape()
      vertex(x2-60, y1)
      vertex(x2, y1)
      vertex(x2+20, y1-30)
      vertex(x2, y1-110)
      vertex(x2-60, y1-110)
      vertex(x2-60, y1)
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