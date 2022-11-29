class Stone {
  // Make a stone at x,y
  constructor(x,y,size, alpha) {
    this.x = x
    this.y = y
    this.size = size
    // Alpha is the transparency (0 to 255)
    this.alpha = alpha
    
    this.stoneWid = random (this.size*10,this.size*30)//(53,200)
    this.stoneHi = random (this.size*2,this.size*20)//(3, 70)
    this.angle = random(-18,18)

     //Find the random colour
     this.stoneR = random (160,200)
     this.stoneG = random (130,140) 
     this.stoneB = random (60,120)      
  }

  draw () {
     // Draw the stone 
     console.log ("alpha",this.alpha)
  fill (this.stoneR,this.stoneG,this.stoneB, this.alpha) 
  noStroke ()
  push ()
  translate (this.x, this.y)
  rotate (this.angle)
  ellipse (0, 0, this.stoneWid,this.stoneHi)
  pop ()
  }
}