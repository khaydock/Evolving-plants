class mutantStem extends Growable {
  // Each stem has one bud
  // Each stem will has length budStemLen, and a random angle
  constructor(x,y,budStemLen,budStemWid, gobi) {
    super()
  this.pos = createVector(x,y)
  this.budStemLen = budStemLen
  this.budStemWid = budStemWid
  this.gobi = gobi
  
  this.init()
} 

init() {
   // Put each stem on a random side, determined by dir = 1 or -1  
   this.dir = Math.random() < 0.5 ? 1 : -1
   // The angle is randomly assigned between 4 and 80 degrees, in steps of 4
   this.angle = 4 * floor(random (1,20))
  let xend = this.pos.x + cos(this.angle*this.dir) * (this.budStemLen) //*.5)
  let yend = this.pos.y + sin(this.angle*this.dir) * this.budStemLen
  this.bud = new mutantBud(xend, yend, this.budStemLen, this.gobi) 

    // Define the colour for broccoli
    this.stemR = 80
    this.stemG = 175
    this.stemB = 50

    // Define the colour for cauliflower
    if (this.gobi == 1) {
      this.stemR = 250
      this.stemG = 255
      this.stemB = 240
    }

  }

  draw() {   

    // The colour starts fading after ...?????
    // for broccoli
    if (this.gobi == 2) {
      this.stemR += (this.stemR < 120) ? .3 * this.timer.inc : 0.
      this.stemG -= (this.stemG > 215) ? .1 * this.timer.inc : 0.
      this.stemB += (this.stemB <  85) ? .1 * this.timer.inc : 0.
    }
    // for cauliflower
    if (this.gobi == 1) {
      this.stemR -= (this.stemR > 240) ? .1 * this.timer.inc : 0.
      this.stemG -= (this.stemG > 240) ? .1 * this.timer.inc : 0.
      this.stemB -= (this.stemB > 145) ? .1 * this.timer.inc : 0.
    }
    // Set the colour for day & night
    let amount = back.darkness*4
    stroke(this.stemR-amount, this.stemG-amount, this.stemB-amount)

    push()
    translate(0, -this.pos.y)
    rotate(this.angle*this.dir)
    strokeWeight(this.budStemWid+2)

    // Draw the stem 
    line(0, 0, 0, -this.budStemLen) 

    // Draw the bud  
    strokeWeight(this.budStemWid)              
    this.bud.draw() 
    pop()
  }
}