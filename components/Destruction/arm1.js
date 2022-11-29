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
      this.arm2 = new Arm2(this.pos.x,-220) 
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
    stroke(100,90,60,80)
    strokeWeight(4)
    let vx = random(-2,2)
    let vy = random(-2,2)
    push()
      translate(this.pos.x, this.pos.y-30)
      rotate(-this.angle)
    
      // Draw 2 circles, 220 pixels apart 
      circle(vx, vy, 40)
      circle(220+vx, vy, 56)

      // Connect the circles by a quadrilateral without stroke
      noStroke()
      beginShape() 
        vertex(vx, vy+20)
        vertex(220, 28)
        vertex(220, -28)
        vertex(0, -20)
      endShape(CLOSE)

      // Draw the outlines at the 2 sides
      stroke(100,90,80)
      beginShape(LINES)
      vertex(vx, vy+20)
      vertex(vx+220, vy+28)

      vertex(vx+220, vy-28)
      vertex(vx,vy -20)
      endShape(CLOSE)

      // Draw the axel circles
      circle(vx, vy, 25)
      circle(vx, vy, 15) 

      // Direct the second arm to be made
      this.arm2.rotate()
      this.arm2.show() 
    pop()     
  } 
} 