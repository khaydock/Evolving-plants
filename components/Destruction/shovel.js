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
    strokeWeight(8)
    let unit = width*.017
    let vx = random(-1.5,1.5)
    let vy = random(-1.5,1.5)
    push()
      translate(this.pos.x+4.0*unit, this.pos.y+22.0*unit)
      rotate(-this.angle) 
     
      circle(vx, vy, 4.0*unit)

      bezier(vx, vy,    9.0*unit, -8.0*unit,   10.0*unit, -9.0*unit,   vx+15.0*unit, vy)

      circle(vx, vy, 2.5*unit)
      circle(vx, vy, 1.5*unit)

      beginShape()
        vertex(15.0*unit, 0)
        vertex(15.2*unit, 2.5*unit)
        vertex(14.0*unit, 0)
      endShape()

      // Dirt 
      fill(170,120,90)
      stroke(120,110,100,80)
      strokeWeight(12)
      for (let i = 0; i < 20; i++) {
        circle(vx-.6*unit*i+13.8*unit+random(0,.3*unit), vy+random(-.2*unit,.2*unit), random(.4*unit,.8*unit))
        fill(170,120,90,150)
        if (i < 10) {
          circle(vx-.9*unit*i+13.4*unit+random(-.2*unit,.2*unit), vy+1.0*unit+random(-.2*unit,.2*unit), random(.6*unit,1.2*unit))
        } else {
          fill(150,120,100,170)
          stroke(170,130,90,200)
        circle(vx-.4*unit*i+16.4*unit+random(-.3*unit,.3*unit), vy+2.1*unit+random(-.3*unit,.3*unit), random(.7*unit,1.5*unit))
        } 
      }
       // Also show some dust moving with the shovel
    fill(210,150,110,50)
    noStroke ()
    ellipse (3.5*unit,6.0*unit + random (0,2.0*unit), 15.0*unit + random (0,10.0*unit), 10.0*unit + random (2.0*unit,10.0*unit))
    ellipse (6.5*unit,2.0*unit + random (1.0*unit,2.0*unit), 18.0*unit + random (0,10.0*unit), 10.0*unit + random (2.0*unit,8.0*unit))
    pop()
  }
}