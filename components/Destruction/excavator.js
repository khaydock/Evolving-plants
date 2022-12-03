class Excavator {
  // Makes and moves an excavator (sort of bulldozer)
  // ( called by Destroy() )
  constructor(x,y){
    // x,y is the position of the right (front) axel
    this.pos = createVector(x, y)
    this.speed = 2 
    this.rotSpeed = .5

    this.reset()

  }

  reset() {
    this.goingBack = false
    this.clumpPos = 0
    this.pos.x = -width*.4
    this.pos.y = height*.8

     // Define body of excavator
     this.excavatorBody = new Body(0,0)  

     // Define wheels 
     this.wheels = new Wheels(50,0)

      // Define person 
      this.person = new Person((width)/20,-(height*.8)/20)

       // Define clumps of earth that will be deposited ahead of the excavator
    this.clumps = []
    for (let i = 0; i < 20; i++) {
      let clump = new Stone(random(-width*.7,width*.05), random(-150,110), 20, 90)
      this.clumps.push(clump)
    }
 
  }
    
  move() {
    // Move the excavator from left to right and back
    if (this.pos.x < width*.32 && this.goingBack == false) {
      this.pos.x += this.speed  

       // Move the clumps of earth
    this.clumpPos += (this.clumpPos < width*.66) ? 2 : 0

    } else {
      this.goingBack = true
    }
    
    if (this.pos.x > -width*.42 && this.goingBack == true) {
      this.pos.x -= this.speed 
    }
  }

  show() {
    let unit = width*.017
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
    translate(this.pos.x, this.pos.y)
    // scale (1.8)
    fill (140,120,70,120)
    stroke (150,100,90,80) 
    strokeWeight (50)

    this.wheels.rotate()
    this.wheels.show()
    this.excavatorBody.show()

    // Also show some dust moving with the excavator
    fill(180,120,160,50)
    noStroke ()
    ellipse (20*unit,1*unit + random (0,2.0*unit), 28.0*unit + random (0,10.0*unit), 5.0*unit + random (2.0*unit,10.0*unit))
    fill('red')
    ellipse (-65.0*unit,-8.0*unit + random (0,2.0*unit), 30.0*unit + random (0,10.0*unit), 10.0*unit + random (2.0*unit,8.0*unit))
    // ellipse (-250,-100 + random (0,50), 400 + random (0,100), 200 + random (0,100))
    // ellipse (-100,-60 + random (0,20), 220 + random (0,100), 100 + random (0,80))
    // ellipse (-220,-90 + random (0,20), 180 + random (0,100), 150 + random (0,80))

    pop()

    if (this.goingBack) {
       this.person.move()
    this.person.show()
    }
   
  } 
}
 