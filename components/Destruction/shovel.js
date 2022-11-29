class Shovel {
  // Makes and rotates the shovel of the excavator
  // ( called by Arm3(), calls Arm3() )
  constructor(x,y){
    // x,y is the pivot point of the shovel
      this.pos = createVector(x, y)
      this.rotSpeed = .6
      this.angle = 50
      this.dir = 1
      this.dust = createVector(this.dx,this.dy)
    }
    
  rotate() {
    this.angle += (this.rotSpeed * this.dir)
    if (this.angle > 90 | this.angle < -90) {
      this.dir *= -1 
      return 
    }
  }
    
  show() {
    // Draw the shovel part 
    fill(240,170,40)
    strokeWeight(4)
    let vx = random(-1.5,1.5)
    let vy = random(-1.5,1.5)
    push()
      translate(this.pos.x+40, this.pos.y+220)
      rotate(-this.angle) 
     
      circle(vx, vy, 40)

      bezier(vx, vy,    90, -80,   100, -90,   vx+150, vy)

      circle(vx, vy, 25)
      circle(vx, vy, 15)

      beginShape()
        vertex(150, 0)
        vertex(152, 25)
        vertex(140, 0)
      endShape()

      // Dirt 
      fill(170,120,90)
      stroke(120,110,100,80)
      strokeWeight(6)
      for (let i = 0; i < 20; i++) {
        circle(vx-6*i+138+random(0,3), vy+random(-2,2), random(4,8))
        fill(170,120,90,150)
        if (i < 10) {
          circle(vx-9*i+134+random(-2,2), vy+10+random(-2,2), random(6,12))
        } else {
          fill(150,120,100,170)
          stroke(170,130,90,200)
        circle(vx-4*i+164+random(-3,3), vy+21+random(-3,3), random(7,15))
        } 
      }
       // Also show some dust moving with the shovel
    fill(210,150,110,50)
    noStroke ()
    ellipse (35,60 + random (0,20), 150 + random (0,100), 100 + random (20,100))
    ellipse (65,20 + random (10,20), 180 + random (0,100), 100 + random (20,80))
    pop()
  }
}