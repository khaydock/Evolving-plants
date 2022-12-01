class mutantBud extends Growable {
  // Making a bud at (x,y,angle) (at the end of the bud) 
  constructor(x, y, budLength, gobi){
    super()
    this.pos = createVector(x, y)
    this.budLength = budLength
    this.gobi = gobi
    this.blen = 8
    this.bx = 0.1
    this.init()
  } 
  
  init() {
      // Define the colours of broccoli
      this.budR = 80
      this.budG = 150
      this.budB = 50

      // Define the colours of cauliflower
      if (this.gobi == 1) {
        this.budR = 230
        this.budG = 240
        this.budB = 160
        }


  }
  draw() {
    // The colour starts fading
    this.budR += (this.budR < 120) ? .3 * this.timer.inc : 0.
    this.budG -= (this.budG > 190) ? .1 * this.timer.inc : 0.
    this.budB += (this.budB <  85) ? .1 * this.timer.inc : 0.

    // Set the colour for day & night
    let amount = back.darkness*4
    stroke(this.budR-amount, this.budG-amount, this.budB-amount)

    // Fill for broccoli 
    fill (this.budR-10-amount, this.budG+30-amount, this.budB-amount) //(30, 180, 40)

    // Draw cauliflower bud
    if (this.gobi == 1) {
      fill(255-amount)
      // strokeWeight(1)
      push()  
      translate(0, -this.budLength)
      bezier(0, 0,  -4.3, -4,   -7.7, -12,   .12, -9.6)
      bezier(0, 0,   3.8, -2,   -3.8,  -4,   .12, -9.6)
      bezier(0, 0,   4.3, -4,    7.7, -12,  -.12, -9.6)

      // let wid = this.blen*1.2
      // bezier(0, 0, -wid+1.5,-10,  -wid*2, -30,  this.bx*3, -this.blen*3)
      // bezier(0, 0,      wid, -5,   -wid, -10,   this.bx*3, -this.blen*3)
      // bezier(0, 0,  wid+1.2,-10,   wid*2, -30, -this.bx*3, -this.blen*3)
    pop()
    return

    }
    // Draw broccoli bud
    // strokeWeight(2)
    push()  
      translate(0, -this.budLength)
      bezier(0, 0,  -4.3, -4,   -7.7, -16,   .2, -17.6)
      bezier(0, 0,   3.8, -2,   -3.8,  -4,   .2, -17.6)
      bezier(0, 0,   4.3, -4,    7.7, -16,  -.2, -17.6)

      // let wid = 9.6 //this.blen*1.2
      // bezier(0, 0,  -wid+1.5, -10,  -wid*2, -40,   this.bx*5, -this.blen*5.5)
      // bezier(0, 0,     wid,    -5,  -wid,   -10,   this.bx*5, -this.blen*5.5)
      // bezier(0, 0,   wid+1.2, -10,   wid*2, -40,  -this.bx*5, -this.blen*5.5)
    pop()

  }
}