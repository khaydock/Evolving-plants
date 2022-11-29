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

  // Flat plateau
  //  let h = 1000
  //    beginShape()
  //    vertex(this.posx+this.curve, height)
  //    bezierVertex(this.posx+this.curve,height,   this.posx+this.curve*1.2,height*.7,   this.posx,height-h)
  //    bezierVertex(width,height-h,  width,height-h,  width,height-h)
  //    bezierVertex(width,height,   width,height,   width,height)
  //  endShape() 
   
  // Hills with a valley in between
    beginShape()
      vertex(-10, height)
      bezierVertex(-10,height,   0,height*.5,   0,height*.5)
      bezierVertex(width*.3,height*.7,  width*.8,height*.6,  width,height*.55)
      bezierVertex(width,height*.6,   width,height,   width,height)
    endShape() 
    // The ground
  fill(210,120,10,120)
  rect (0,height-250,width,height)
  }
}