class Flood {
  // Makes a flood flowing from left to right              
  // The flood will consist of numSeg water segments at pos[x,y]
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.groundLevel = y
    // Find the random number of water segments for this flood 
    this.numSeg = 7
    // this.numSeg = 3 //floor(random(3,6)) 
    this.waterSeg = []
    this.px = []
    this.py = []
    // Find the random sizes of the water segments
    this.len = random(width*.8,width*1.5) //(width*.8,width*2)//(400,600)
    this.wid = random (height*.05,height*.1)//(5,50)

    //Define new water segments at random x positions distributed over width*2 
    let sum = 0
    for(let i = 0; i < this.numSeg; i++) {
      const r = random(1,2)
      sum += r
      this.px.push(sum)
    }
    this.px = this.px.map(value => Math.floor((value / sum) * width*2))

    // Define random y positions for each water segment
    let maxy = height*.05
    let miny = height*.01
    for(let i = 0; i < this.numSeg; i++) {
      this.py[i] = random(this.pos.y-maxy,this.pos.y+miny)
      let ppx = this.px[i]
      let ppy = this.py[i]
      this.waterSeg[i] = new WaterSeg(ppx-width*3,ppy,this.len,this.wid, this.groundLevel)
    } 
    this.waterR = random (150,200)
    this.waterG = random (130,140)
    this.waterB = random (60,80) 
  }    
     
  move () {
    this.pos.x += 10
  }
  show() {
    if (this.pos.x < 6000) {
      for (let water of this.waterSeg) {
        water.flow()
        water.show()
      }
    }
     // Add a large wet bottom
     fill(this.waterR, this.waterG, this.waterB,90)
     noStroke()
     let w = width
     // the large wet spot will extend to a depth of groundLevel - d
     let d = height*.1
     push()
     translate(this.pos.x, this.groundLevel)
     beginShape()
     vertex(-4*w, 0)
       bezierVertex(-3*w, 0,  0,-d*.3,   w*.12,0)  // right end
       bezierVertex(0,d*.2,  -w, d,  -w, d) // bottom
       vertex(-4*w, 0)
       noStroke()
   endShape()
   pop()
  }
}  