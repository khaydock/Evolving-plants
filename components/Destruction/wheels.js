class Wheels {
  // Makes and turns wheels
  // ( called by excavator() )
  constructor(x, y){

    this.pos = createVector(x, y)
    this.ang = 0
    this.speed = 1
    this.spokelen = 21

    this.reset()

  }

  reset() {
    this.goingBack = false
    this.pos.x = 0
  }

  rotate() {
    // Calculate the x position (as in excavator())in order to find out whether to rotate the wheels clockwise or counter-clockwise
    if (this.pos.x < width*.35 && this.goingBack == false) {
      this.pos.x += this.speed  
    } else {
      this.goingBack = true
    }
    if (this.pos.x > 0 && this.goingBack == true) {
      this.pos.x -= this.speed 
    }
    // Increment ang to rotate the wheels
    this.ang -= (this.goingBack) ? this.speed : -this.speed

  }

  show() { 
    // Draw wheels, the first one at x,y
    fill(140,120,110)
    stroke(100,90,80)
    strokeWeight(8)
    push()
      translate(-360, 40)
    
      //Draw wheels
      let yjiggle = random(-2,2)
        circle(0, 0+ yjiggle, 60)
        circle(230+ random (), 0+ yjiggle, 60)
   
      noStroke()
      beginShape()
        vertex(0, 30)
        vertex(230, 30)
        vertex(230, -30)
        vertex(0, -30)
      endShape(CLOSE)

      //Draw track
      stroke(100,90,80)
      line(0, -30+yjiggle, 230, -30+yjiggle)
      line(0,  30+yjiggle, 230,  30+yjiggle)
 
      // circle(0, 0, 45)
      // circle(230, 0, 45)
      // Draw crooked wheels
      strokeWeight(5) 
      ellipse(0, 0, 43, 42) 
      ellipse(230, 0, 43, 42)
      ellipse(0, 0, 10, 10) 
      ellipse(230, 0, 10, 10) 

   pop()    

    //Draw spokes
    for (let i = 0; i <2; i++) {
    push()
      translate(-360+(i*230), 40)
      rotate (this.ang)
      this.sx = this.spokelen * cos(this.ang)
      this.sy = this.spokelen * sin(this.ang)
      line(-this.sx,-this.sy, this.sx, this.sy)
      rotate (90)
      line(-this.sx,-this.sy, this.sx, this.sy)
      pop()
    } 
  }
}