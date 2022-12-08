class Bud extends Growable {
  // Makes a bud at (x,y) with given angle from the stem & opens it
  // The bud opens by incrementing bx & blen, moving the tip in a semicircle 
  // (when this.bx = 0, the bud does not open)

  constructor(x, y, angle, budlength, plant){
    super()
    this.pos = createVector(x, y)
    this.angle = angle
    this.length = budlength
    this.plant = plant

    // deathTime and deathAng count the rotation and flow during death
    this.deathTime = 0
    this.deathAng = 0
    // dirAng is for buds on different sides of the stalk
    this.dirAng = -1

    this.bx = 0 
    // The initial bud colours:
    this.plantR = 30
    this.plantG = 240
    this.plantB = 10

    this.flower = new Flower(
      this.pos.x, 
      this.pos.y,
      this.angle,
      this.plant
    )
    // The flowers are the children of the buds
    this.children.push(this.flower)
    this.plant.allChildren.push(this.flower)
  } 

// The bud is at the end of the stem, at the same angle as the stem
// The position is updated as the stem grows
  update(pos, angle) { 
    this.pos = pos
    this.angle = angle
    this.flower.update(pos, angle)
  }
 
  grow() {
    
    // Let the flower appear at this time
    if(this.time > 107) {
      this.growChildren()
    }
    // Check if it is time for the bud to start fading
    if(this.time > 150) {
      this.plantR += (this.plantR < 230) ? .3 * this.timer.inc : 0.
      this.plantG -= (this.plantG > 205) ? .1 * this.timer.inc : 0.
      this.plantB += (this.plantB < 135) ? .1 * this.timer.inc : 0.
      this.bx -= (this.bx > .1) ? .004 * this.timer.inc : 0.
    } 
    // Check if it is time for the bud to open
    else if (this.time > 90) {
      this.blen = sin(this.time*1.5 - 90/4) * this.length
      // The bud opens
      this.open()
    } else {
      this.blen = this.length/2 + sin(this.time) * this.length/2; 
    }
  }

  grown() {
    // The bud has already blossomed - do not grow any bud

    this.grownChildren()
  }


  draw() {
    // if(this.time > .90) {
      // this.flower.drawBack()
      // this.seedpod.draw()
      // this.flower.drawFront()
      this.flower.draw()
    // } 

    // Draw bud 
    let amount = back.darkness*4
    stroke(this.plantR-amount,this.plantG-amount, this.plantB-amount)
    fill(this.plantR-amount,this.plantG-amount, this.plantB-amount)
    // stroke(30, 240, 10)
    // fill(30, 240, 10)
    strokeWeight(1)

// The plant falls over
if (death && !this.plant.selected) {
  // limit determines how far the plant moves to the right as it falls over
  let limit = 200
  if (bulldozer) limit = 70
  // flow determines how fast the plants move to the right
  let flow = 1
  if (stormy) flow = 10
  if (this.deathTime < limit) {
    this.deathTime += 1
    this.pos.x += flow * this.deathTime* .02
    this.pos.y -= (this.deathTime < 70) ? this.deathTime*.02 : 0
  }
  if (this.deathAng < 1) {
    this.deathAng += 1
    this.angle += .4 * this.dirAng
  } else {
    this.dirAng = -this.dirAng
    this.deathAng = 0
  }
}

    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      // The bud width is defined here 
      let wid = this.blen
      bezier(0, 0,   -wid+1.2, -10,  -wid*2, -20,    this.bx*5, -this.blen*5.5)
      bezier(0, 0,    wid+1.2, -10,   wid*2, -20,   -this.bx*5, -this.blen*5.5)
      circle(0,-1,7)
    pop()
  }

  open() {
    // The bud opens 
    // The tip y coordinate decreases from +(bud length) to -(bud length),
    // The tip x coordinate increases until crossing the x-axis, then decreases
  
    if (this.blen > 0) {
      this.bx += .15 * this.timer.inc 
    } else {
      this.bx -= .15 * this.timer.inc 
    } 
    
  }
}