class Rootlet extends Growable {
  // Makes a small rootlet coming off of the main root
  // The rootlet begins at x,y and goes to the left or right, depending on dir
  // The rootlet consists of this.numseg segments
  constructor(x,y,dir){
    super()
    this.x = x
    this.y = y
    this.dir = dir 

    this.numseg = floor(random(10,30))
    this.segn = 1

    // Define the end position of each segment of the rootlet   
    this.xran = []
    this.yran = []
    let xpos = 0
    let ypos = 0
    for (let i=0; i <= this.numseg; i++) {
      this.xran[i] = xpos + random(-1,5)
      this.yran[i] = ypos + random(1,5)
      xpos = this.xran[i]
      ypos = this.yran[i]
      if (this.dir == 1) {
        this.xran[i] = -this.xran[i]
      } 
    }
  }    

  grow() {
    if (this.segn <= this.numseg) {
      this.segn += .1
    }
  }   
  grown() {
    this.segn = this.numseg
  }    
  
  show() {
    let amount = back.darkness*5
    stroke(240-amount,250-amount,250-amount)  
    strokeWeight(1)
      let xp = this.x 
      let yp = 0
      for (let i = 0; i<this.segn-1; i++) {
        push () 
        translate (this.x, this.y)
        line (0, 0, this.xran[0], this.yran[0])
        xp = this.x + this.xran[i]
        yp = this.yran[i]
        line (xp, yp, this.xran[i+1], this.yran[i+1])
        pop () 
      }   

  }   
}