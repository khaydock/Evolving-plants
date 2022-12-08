class Hills {
constructor(posx, speed) {
this.posx = posx
this.speed = speed
this.speed = 1
this.posx = 0
this.curve = 0
}
  move() {
    if (this.posx <= 500) {
    this.posx += this.speed
    this.curve += .5 
    }
  }
    draw() {
    this.groundLevel = height *.75
   
  // Hills with a valley in between
    beginShape()
      vertex(-10, height)
      bezierVertex(-10,height,   0,height*.5,   0,height*.5)
      bezierVertex(width*.3,height*.7,  width*.8,height*.6,  width,height*.55)
      bezierVertex(width,height*.6,   width,height,   width,height)
    endShape() 
    // The ground
  fill(210,120,10,120)
  rect (-10,this.groundLevel,width+10,height)
  }
}