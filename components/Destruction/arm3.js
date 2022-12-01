class Arm3 {
  // Makes the third arm of the excavator
  // ( called by Arm1(), calls Shovel() )
  constructor(x,y){
    // x,y is the pivot point of the arm
      this.pos = createVector(x, y)
      this.rotSpeed = -.6 //-random (.5,-.7) //-.6
      this.angle = -60 
      this.dir = -1
      // Define shovel 
      this.shovel = new Shovel(this.pos.x,this.pos.y)
    }
    
  rotate() {
    this.angle += (this.rotSpeed * this.dir) 
    if (this.angle > 20 | this.angle < -90) { 
      this.dir *= -1
      return
    }
  } 
    
  show() {
    // Draw the third arm

    fill(240,170,40)
    strokeWeight(8)
    let unit = width*.017
    let vx = random() //(-1.5,1.5)
    let vy = random() //random(-1.5,1.5)
    push()
      translate(this.pos.x+4.0*unit, this.pos.y+22.0*unit)
      rotate(-this.angle) 
     
      // Draw 2 circles, 220 pixels apart
      circle(vx, vy, 4.0*unit)
      circle(vx+18.0*unit, vy, 5.6*unit)

      // Connect the circles by a quadrilateral without stroke
      noStroke()
      beginShape()
        vertex(vx, vy+2.0*unit)
        vertex(vx+18.0*unit, vy+2.8*unit)
        vertex(vx+18.0*unit, vy-2.8*unit)
        vertex(vx, vy-2.0*unit)
      endShape(CLOSE)

      // Draw the outlines at the 2 sides
      stroke(100,90,80)
      beginShape(LINES)
      vertex(vx, vy+2.0*unit)
      vertex(vx+18.0*unit, vy+2.8*unit)

      vertex(vx+18.0*unit, vy-2.8*unit)
      vertex(vx, vy-2.0*unit)
      endShape(CLOSE)

      // Draw the axel circles
      circle(vx, vy, 2.5*unit)
      circle(vx, vy, 1.5*unit)

      // Direct the shovel to be made
      this.shovel.rotate(0,0)
      this.shovel.show(0,0)

    pop()     
  }
}