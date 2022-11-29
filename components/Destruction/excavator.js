class Excavator {
  // Makes and moves an excavator (sort of bulldozer)
  // ( called by Destroy() )
  constructor(x,y){
    this.pos = createVector(x, y)
    this.speed = 1 
    this.rotSpeed = .5

    this.reset()

  }

  reset() {
    this.goingBack = false
    this.clumpPos = 0
    this.pos.x = 0
    this.pos.y = height-250

     // Define body of excavator
     this.excavatorBody = new Body(0,0)  

     // Define wheels 
     this.wheels = new Wheels(50,0)

       // Define clumps of earth
    this.clumps = []
    for (let i = 0; i < 20; i++) {
      let clump = new Stone(random(-800,50), random(-150,110), 20, 90)
      this.clumps.push(clump)
    }
 
  }
    
  move() {
    // Move the excavator from left to right and back
    if (this.pos.x < width*.35 && this.goingBack == false) {
      this.pos.x += this.speed  

       // Move the clumps of earth
    this.clumpPos += (this.clumpPos < width*.66) ? 2 : 0

    } else {
      this.goingBack = true
    }
    
    if (this.pos.x > 0 && this.goingBack == true) {
      this.pos.x -= this.speed 
    }
  }

  show() {
    // Show the clumps of earth
    push()
    translate (this.clumpPos+random(0,5),this.pos.y)
    // fill(210,160,110)
    for (let clump of this.clumps) {
      clump.draw()
    }
    pop()

    // Show the body and wheels of the excavator
    push()
    scale (1.8)
    translate(this.pos.x, this.pos.y-400)
    fill (140,120,70,120)
    stroke (150,100,90,80) 
    strokeWeight (50)

    this.wheels.rotate()
    this.wheels.show()
    this.excavatorBody.show()

    // Also show some dust moving with the excavator
    fill(210,160,110,20)
    noStroke ()
    ellipse (-350,-60 + random (0,20), 280 + random (0,100), 100 + random (20,100))
    ellipse (-650,-80 + random (0,20), 300 + random (0,100), 100 + random (20,80))
    // ellipse (-250,-100 + random (0,50), 400 + random (0,100), 200 + random (0,100))
    // ellipse (-100,-60 + random (0,20), 220 + random (0,100), 100 + random (0,80))
    // ellipse (-220,-90 + random (0,20), 180 + random (0,100), 150 + random (0,80))

    pop()
  } 
}
 