class Leaf extends Growable {
  // A leaf shape is defined by the leafLength and 3 leaf widths at different positions along the main vein of the leaf:
  // wid1 is closest to the origin
  constructor(pos, angle, finLength, fWid1, fWid2, fWid3, plant) {
    super(finLength)
    this.generationCounter = generationCounter
    this.death = death
    this.deathTime = 0
    this.plant = plant
    this.pos = pos
    this.angle = angle
   
    this.length = 10
    this.wid1 = fWid1/10
    this.wid2 = fWid2/15
    this.wid3 = fWid3/20
    this.finLength = finLength
    this.finWid1 = fWid1
    this.finWid2 = fWid2
    this.finWid3 = fWid3
    this.growthRate = 15
    this.numveins = 7
    this.rib1 = 2
    this.rib2 = 4
    this.rib3 = 6  

    this.leafR = 50
    this.leafG = 200
    this.leafB = 20
    this.ribsR = 30
    this.ribsG = 240
    this.ribsB = 10

    this.diff1 = this.finLength-this.length
    this.diff2 = this.finWid1-this.wid1
    this.diff3 = this.finWid2-this.wid2
    this.diff4 = this.finWid3-this.wid3
  }

  update(pos, angle) { 
    this.pos = pos
    this.angle = angle
  }

  grow() {
    
    if(this.time > this.timer.bp) {
      this.growChildren()      // Why is this here ????????????
      this.whither()
    }
    // Check for when the leaves should stop growing
    // else if (this.time > this.timer.bp/2 && this.time <= this.timer.bp) {
    //   this.growChildren()
    // }
    else {
      // Adjust the growth rate of the leaves here 
      // this.length += this.diff1/this.timer.bp
      
      // this.wid1 += this.diff2/abs(this.timer.bp-50) 
      // this.wid2 += this.diff3/abs(this.timer.bp-50)
      // this.wid3 += this.diff4/abs(this.timer.bp-10)

      // Following parameteres were: .005, .01, .01
      this.length += (this.length < this.finLength) ? this.timer.inc : 0.
      this.wid1 += (this.wid1 < this.finWid1)  ? this.growthRate*.04* this.timer.inc : 0. 
      this.wid2 += (this.wid2 < this.finWid2)  ? this.growthRate*.06 * this.timer.inc : 0.
      this.wid3 += (this.wid3 < this.finWid3)  ? this.growthRate*.03 * this.timer.inc : 0.
 
    }
 
    // if(this.time == this.timer.bp) { 
    //   console.log("leaf growing end: params")
    //   console.log("Leaf Length",this.length) // 100
    //   console.log(this.wid1) // 30.3
    //   console.log(this.wid2) // 30.3
    //   console.log(this.wid3) // 30.3

  }

  grown() {
    this.grownChildren()
    this.length = this.finLength
    this.wid1 = this.finWid1 
    this.wid2 = this.finWid2
    this.wid3 = this.finWid3
    
  }

  draw() {
    strokeWeight(2)
    let amount = back.darkness*4
    stroke(this.leafR-amount,this.leafG-amount, this.leafB-amount)
    fill(this.leafR-amount,this.leafG-amount, this.leafB-amount)
    // fill(this.leafR, this.leafG, this.leafB)
    // stroke(this.ribsR, this.ribsG, this.ribsB)
    // fill(50, 200, 20)

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
    }

  // The first vein will be at sepx*2 
    let sepx = this.length / (this.numveins+2)
    let sep = (this.wid2) / this.rib2
  // the above works with rib2 - but should it be numveins????
  // Top of leaf
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle - 90)
    beginShape()
      vertex(0, 0)
      let x1 = sepx
      let y1 = -this.wid1/(this.rib1+1)
      let xs = 0
      let ys = 0
      let sepy = 0

      for (let i = 0; i < this.numveins; i++) {
        x1 += sepx
        if (i < this.rib1) {
          sepy = this.wid1/(this.rib1+1)
          y1 -= sepy
        }
        if (i >= this.rib1 && i < this.rib2) {
          sepy = (this.wid2-this.wid1)/(this.rib2+1-this.rib1)
          y1 -= sepy 
        }
        if (i >= this.rib2 && i < this.rib3) { 
          sepy = (this.wid2-this.wid3)/(this.rib3+1-this.rib2)
          y1 += sepy 
        }
        if (i >= this.rib3) { 
          sepy = (this.wid3-this.wid2/2.0)/(this.numveins+1-this.rib3)
          y1 += sepy
          
        }
        if (y1 >= 0) {
          y1 = 0
          bezierVertex(x1-sepx/4, y1-sep,  x1-sep, y1-sep,  x1, y1)
        } else {
          bezierVertex(x1-sepx+sep*.3, y1+sep*.8,  x1-sep*.5, y1-sep*.8,  x1, y1)
        }
      }
      bezierVertex(x1+sepx/2, -sep, this.length, y1,  this.length, 0);
    endShape();
  pop()
  
  // Bottom of leaf
  push()
  translate(this.pos.x, this.pos.y)
  rotate(this.angle - 90)
    beginShape();
      vertex(0, 0);
      x1 = 0
      y1 = -this.wid1/(this.rib1+1)
      xs = 0
      ys = 0
      for (let i = 0; i < this.numveins; i++) {
        x1 += sepx
        if (i < this.rib1) {
          sepy = this.wid1/(this.rib1+1)
          y1 -= sepy
        }
        if (i >= this.rib1 && i < this.rib2) {
          sepy = (this.wid2-this.wid1)/(this.rib2+1-this.rib1)
          y1 -= sepy 
        }
        if (i >= this.rib2 && i < this.rib3) {
          sepy = (this.wid2-this.wid3)/(this.rib3+1-this.rib2)
          y1 += sepy 
        }
        if (i >= this.rib3) {
          sepy = (this.wid3-this.wid2/2.0)/(this.numveins+1-this.rib3) 
          y1 += sepy
        }
        if (y1 >= 0) { 
          y1 = 0
          bezierVertex(x1-sepx/4, -y1+sep,  x1-sep, -y1+sep,  x1, -y1)
        } else {
          bezierVertex(x1-sepx+sep*.3, -y1-sep*.8,  x1-sep*.5, -y1+sep*.8,  x1, -y1) 
        }    
      }
      bezierVertex(x1+2*sepx/2-sepx, sep, this.length+sepx/2, -y1,  this.length, 0);
    endShape();
  pop()

  push()
  translate(this.pos.x, this.pos.y)
  rotate(this.angle - 90)
  
  // Draw main rib
    // noStroke();
    //The following is for the ribs
    fill(this.ribsR-amount, this.ribsG-amount, this.ribsB-amount)
    stroke(this.ribsR-amount, this.ribsG-amount, this.ribsB-amount)
    
    let lc = this.length
    let wc = this.wid2
    bezier( -sepx/2, 0,  lc*.3, wc*.1,  lc*.3,-wc*.25,   lc, 0)
    bezier( -sepx/2, 0,  lc*.2, wc*.3,  lc*.7,-wc*.2,   lc, 0)
    
  // Draw the veins
      x1 = sepx
      y1 = -this.wid1/(this.rib1+1)
      xs = 0
      ys = 0
      for (let i = 0; i < this.numveins; i++) {
        x1 += sepx
        if (i < this.rib1) {
          sepy = this.wid1/(this.rib1+1)
          y1 -= sepy
        }
        if (i >= this.rib1 && i < this.rib2) {
          sepy = (this.wid2-this.wid1)/(this.rib2+1-this.rib1)
          y1 -= sepy 
        }
        if (i >= this.rib2 && i < this.rib3) {
          sepy = (this.wid2-this.wid3)/(this.rib3+1-this.rib2)
          y1 += sepy 
        }
        if (i >= this.rib3) {
          sepy = (this.wid3-this.wid2/2.0)/(this.numveins+1-this.rib3)
          y1 += sepy
        }
        if (y1 | 0) { 
          bezier(x1-1.5*sepx, 0,   x1-sepx*.8,0,  x1-sepx*.1, y1,   x1, y1)  
          bezier(x1-1.5*sepx, 0,   x1-sepx,0,  x1-sepx, -y1,   x1-sepx, -y1)
        }
      } 
  pop() 
}
whither() {
  if (bulldozer) {
    this.timer.inc = 1
  }
  // Make the leaf fade to the final values given here
  this.leafR += (this.leafR < 230) ? .3 * this.timer.inc : 0.
  this.leafG += (this.leafG < 230) ? .2 * this.timer.inc : 0.
  this.leafB += (this.leafB < 150) ? .3 * this.timer.inc : 0.
  
  this.ribsR += (this.ribsR < 230) ? .2 * this.timer.inc : 0.
  this.ribsG -= (this.ribsG > 205) ? .06 * this.timer.inc : 0.
  this.ribsB += (this.ribsB < 135) ? .1 * this.timer.inc : 0.

  // Make the leaf dry up and whither away 
  this.length -= (this.length > this.finLength*0.7) ? this.growthRate*.003 * this.timer.inc : 0.
  this.wid1 -= (this.wid1 > this.finWid1*0.3)  ? this.growthRate*.001     * this.timer.inc : 0.
  this.wid2 -= (this.wid2 > this.finWid2*0.5)  ? this.growthRate*.002     * this.timer.inc : 0.
  this.wid3 -= (this.wid3 > this.finWid3*0.6)  ? this.growthRate*.001     * this.timer.inc : 0. 

  // turn on newSeason Switch when the leaves are withered
  if(this.length <= this.finLength*0.7) { 

    // Check for a flood
    if (this.generationCounter % 3 == 0 && !bulldozer) {
      stormy = true
      // death = false
      console.log ("stormy")
      timeSlider.value(0)
    }
    newSeasonSwitch = true
  }
}
}