class Arm2 {
   // Makes the second arm of the excavator, attatches to arm3
  // ( called by Arm1(), calls Arm3() )
  constructor(x,y){
    // x,y is the pivot point of the arm 
      this.pos = createVector(x, y)
      this.rotSpeed = random(.2,.6) //.4
      this.angle = 60 //70 //-10 
      this.dir = 1
      // Define arm3 
      this.arm3 = new Arm3(this.pos.x,this.pos.y)
    }
    
  rotate() {
    this.angle -= (this.rotSpeed * this.dir) 
    if (this.angle > 60 | this.angle < -90) { 
      this.dir *= -1
      return
    }
  }
    
  show() {
    // Draw second arm

    fill(240,170,40)
    stroke(160,90,80,150)
    strokeWeight(4)
    let vx = random(-1.5,1.5)
    let vy = random(-1.5,1.5)
    push()
      translate(this.pos.x+40, this.pos.y+220)
      rotate(-this.angle) 
     
      //Draw 2 circles, 220 pixels apart 
      circle(vx, vy, 40)
      circle(vx+220, vy, 56)

      noStroke()
      beginShape()
      // Connect the circles by a quadrilateral without stroke
        vertex(vx, vy+20)
        vertex(vx+220, vy+28)
        vertex(vx+220, vy-28)
        vertex(vx, vy-20)
      endShape(CLOSE) 

      // Draw the outlines at the 2 sides
      stroke(130,90,60,150)
      beginShape(LINES)
      vertex(vx, vy+20)
      vertex(vx+220, vy+28)
      vertex(vx+220, vy-28)
      vertex(vx, vy-20)
      endShape(CLOSE)

      // Draw the axel circles
      circle(vx, vy, 25)
      circle(vx, vy, 15)

      // Direct the third arm to be made
      this.arm3.rotate()
      this.arm3.show()

    pop()     
  }
}