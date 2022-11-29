class WaterSeg {
  // Makes a water segment flowing from left to right
  constructor(x,y,segLength,segWidth,ground) {
    this.pos = createVector(x, y)
    this.segLength = segLength
    this.segWidth = segWidth
    this.ground = ground

    // Find the random bezier points that define the initial shape of the water segment
    this.bezx = []
    this.bezy = []
    //Find x,y positions of bezier points    
    let sumx = 0
    let sumy = 0
    this.bezx[0] = 0.
    this.bezy[0] = 0.
      for(let i = 0; i < 8; i++) {
        const rx = random(1,2)
        sumx += rx
        this.bezx.push(sumx)
      }
      this.bezx = this.bezx.map(value => floor((value / sumx) * this.segLength))

      for(let i = 0; i < 7; i++) {
        let ry = random(10,50)
        this.bezy.push(ry) 
      }
      let ry = 0
      this.bezy.push(ry) 

      // this.bezy = this.bezy.map(value => floor((value / sumy) * this.segLength*.3)) 
      this.wave = []
      this.ang = 0
      this.init()
    }    
    
   init() {
    // Initialise the speed and colour of each water segment
     this.speed = 1  
    //Find the random colour
    this.waterR = random (150,200)
    this.waterG = random (130,140)
    this.waterB = random (60,80)       
    // this.waterR = random (120,150)
    // this.waterG = random (140,150)
    // this.waterB = random (120,180)      
   }  
  
  flow () {
    // Make the water segment flow from left to right
    // When a water segment goes off the right side of the canvas, it comes back on the left side
    this.pos.x += 6
    if (this.pos.x >= width) {
      this.pos.x = this.pos.x - width*2 + random (-20,20)
      this.pos.x += .1
      this.pos.y += random (-10,10)
      if (this.pos.y > this.ground+10) { 
        this.pos.y = this.ground
      }
      if (this.pos.y < this.ground-10) {
        this.pos.y = this.ground
      }
    }
    // Make the water segment undulate
    for (let i = 0; i <= 8; i++) {
      this.ang += .5
      this.wave[i] = cos(this.ang+i*10) * this.segWidth 
    }
  }

  show() {
    strokeWeight(2);
    fill(this.waterR, this.waterG, this.waterB,80)
    stroke(this.waterR+10, this.waterG-10, this.waterB+10,100)
    noStroke ()
    push()
    translate(this.pos.x, this.pos.y)
    //Draw the water segment
    beginShape()
      vertex(0, 0)
      for(let i = 2; i <= 8; i=i+2) {  
        let bx0 = this.bezx[i-2]
        let by0 = this.bezy[i-2]
        let bx1 = this.bezx[i]
        let by1 = this.bezy[i]
        let hand = (bx1-bx0)*.3
        bezierVertex(bx0+hand,-by0,  bx1-hand,-by1,  bx1-this.wave[i]/2,-by1+this.wave[i]/2)
        // circle (bx0+hand,-by0,3) 
        // circle (bx1-hand,-by1,5)  
        // circle (bx1,-by1,10) 
      }
      for(let i = 6; i >= 0; i=i-2) {
        let bx0 = this.bezx[i+2]
        let by0 = this.bezy[i+2]
        let bx1 = this.bezx[i]
        let by1 = this.bezy[i]
        let hand = (bx0-bx1)*.3
        bezierVertex(bx0-hand,by0,  bx1+hand,by1,  bx1+this.wave[i]/2,by1+this.wave[i]/2)     
        // circle (bx0+hand,by0,3) 
        // circle (bx1-hand,by1,5) 
        // circle (bx1,by1,10) 
      }
        vertex(0, 0)
    endShape()

    // Add a large wet bottom
     let w = width
     let g = -485 
     let d = 500
     beginShape()
     vertex(-w*4, g+d*1.3)
       bezierVertex(-w*3, g+d*1.1,  -w*2, g+d*1.1,  -w*4, g+d*1.2)
       bezierVertex(-w*2, g+d*1.3,  w*1.1,g+d*1.2,   w*1.2,g+d)
       bezierVertex(w*1.2, g+d,    -w*.6, g+d*.95,  -w*.7, g+d*.9)    
       bezierVertex(-w*.8,g+d*.95,  -w*5, g+d*1.1,  -w*8., g+d)
       vertex(-w*6, g+d*1.3)
   endShape()
  pop()
  }
}