class Wheels {
  // Makes and turns wheels
  // ( called by excavator() )
  constructor(x, y){

    this.pos = createVector(x, y)
    this.ang = 0
    this.speed = 1

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
    strokeWeight(16)
    let unit = width*.017
    let spokeunit = 2.1*unit
    push()
      translate(-unit, 2.5*unit)
    
      //Draw wheels
      let yjiggle = random(-2,2)
        circle(0, 0+ yjiggle, 6.0*unit)
        circle(23.0*unit+ random (), 0+ yjiggle, 6.0*unit)
   
      noStroke()
      beginShape()
        vertex(0, 3.0*unit)
        vertex(23.0*unit, 3.0*unit)
        vertex(23.0*unit, -3.0*unit)
        vertex(0, -3.0*unit)
      endShape(CLOSE)

      //Draw track
      stroke(100,90,80)
      line(0, -3.0*unit+yjiggle, 23.0*unit, -3.0*unit+yjiggle)
      line(0,  3.0*unit+yjiggle, 23.0*unit,  3.0*unit+yjiggle)
 
      // circle(0, 0, 4.5*unit)
      // circle(23.0*unit, 0, 4.5*unit)
      // Draw crooked wheels
      strokeWeight(10) 
      ellipse(0, 0, 4.3*unit, 4.2*unit) 
      ellipse(23.0*unit, 0, 4.3*unit, 4.2*unit)
      ellipse(0, 0, 1.0*unit, 1.0*unit) 
      ellipse(23.0*unit, 0, 1.0*unit, 1.0*unit) 

   pop()    

    //Draw spokes
    for (let i = 0; i <2; i++) {
    push()
    //translate(-360+(i*230), 40)
      translate(-unit+(i*23.0*unit), 2.5*unit)
      rotate (this.ang)
      this.sx = spokeunit * cos(this.ang)
      this.sy = spokeunit * sin(this.ang)
      line(-this.sx,-this.sy, this.sx, this.sy)
      rotate (90)
      line(-this.sx,-this.sy, this.sx, this.sy)
      pop()
    } 
  }
}