class Arm1 {
  // Makes the first arm (boom) of the excavator
  // ( called by excavator(), calls Arm2() )
  constructor(x,y){
    // x,y is the pivot point of the arm
      this.pos = createVector(x, y)
      this.rotSpeed = .3 //random (-.1,.3)
      this.angle = 120
      this.dir = 1
      // Define arm2 
      this.arm2 = new Arm2(this.pos.x+width*.017*11,-22.0*width*.017) 
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
    let unit = width*.017
    let vx = random(-2,2)
    let vy = random(-2,2)
    push()
      translate(this.pos.x+unit*11, this.pos.y-3.0*unit)
      rotate(-this.angle)
    
      // Draw 2 circles, 220 pixels apart 
      circle(vx, vy, 4.0*unit)
      circle(22.0*unit+vx, vy, 5.6*unit)

      // Connect the circles by a quadrilateral without stroke
      noStroke()
      beginShape() 
        vertex(vx, vy+2.0*unit)
        vertex(22.0*unit, 2.8*unit)
        vertex(22.0*unit, -2.8*unit)
        vertex(0, -2.0*unit)
      endShape(CLOSE)

      // Draw the outlines at the 2 sides
      stroke(100,90,80)
      beginShape(LINES)
      vertex(vx, vy+2.0*unit)
      vertex(vx+22.0*unit, vy+2.8*unit)

      vertex(vx+22.0*unit, vy-2.8*unit)
      vertex(vx,vy -2.0*unit)
      endShape(CLOSE)

      // Draw the axel circles
      circle(vx, vy, 2.5*unit)
      circle(vx, vy, 1.5*unit) 

      // Direct the second arm to be made
      this.arm2.rotate()
      this.arm2.show() 
    pop()     
  } 
} 