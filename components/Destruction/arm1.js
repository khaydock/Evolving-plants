class Arm1 {
  // Makes the first arm (boom) of the excavator
  // ( called by excavator(), calls Arm2() )
  constructor(x,y){
    // x,y is the pivot point of the arm
    this.pos = createVector(x, y)
    this.rotSpeed = .3 //random (-.1,.3)
    this.angle = 120
    this.dir = 1
    this.unit = width*.017
      
    // Define arm2 
    this.arm2 = new Arm2(this.pos.x+this.unit*4, this.pos.y+this.unit*4) 
  }
  
  rotate() {
    this.angle += (this.rotSpeed * this.dir)
    if (this.angle > 140 | this.angle < 80) {
      this.dir *= -1
      return 
    }
  }
    
  show() {
    // Draw the first arm

    fill(240,170,40)
    stroke(100,90,60,120)
    strokeWeight(8)
    this.unit = width*.017
    let vx = random(-2,2)
    let vy = random(-2,2)
    push()
      // translate(this.pos.x+300+this.unit*22, this.pos.y-100+this.unit*22)
      translate (this.pos.x,this.pos.y)
      rotate(-this.angle)
    
      // Draw 2 circles, 220 pixels apart 
      circle(vx, vy, 4.0*this.unit)
      circle(22.0*this.unit+vx, vy, 5.6*this.unit)

      // Connect the circles by a quadrilateral without stroke
      noStroke()
      beginShape() 
        vertex(vx, vy+2.0*this.unit)
        vertex(22.0*this.unit, 2.8*this.unit)
        vertex(22.0*this.unit, -2.8*this.unit)
        vertex(0, -2.0*this.unit)
      endShape(CLOSE)

      // Draw the outlines at the 2 sides
      stroke(100,90,80)
      beginShape(LINES)
      vertex(vx, vy+2.0*this.unit)
      vertex(vx+22.0*this.unit, vy+2.8*this.unit)

      vertex(vx+22.0*this.unit, vy-2.8*this.unit)
      vertex(vx,vy -2.0*this.unit)
      endShape(CLOSE)

      // Draw the axel circles
      circle(vx, vy, 2.5*this.unit)
      circle(vx, vy, 1.5*this.unit) 

      // Direct the second arm to be made
      this.arm2.rotate()
      this.arm2.show() 
    pop()     
  } 
} 