class Flood {
  // Makes a flood flowing from left to right              
  // The flood will consist of numSeg water segments at pos[x,y]
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.ground = y
    // Find the random number of water segments for this flood 
    this.numSeg = 7
    // this.numSeg = floor(random(3,6)) 
    this.waterSeg = []
    this.px = []
    this.py = []

    this.len = random (width*.8,width*2)//(400,600)
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
    for(let i = 0; i < this.numSeg; i++) {
      this.py[i] = random(this.pos.y-50,this.pos.y)
      // console.log ('numSeg', this.numSeg,'px', this.px) 
      let ppx = this.px[i]
      let ppy = this.py[i]
      this.waterSeg[i] = new WaterSeg(ppx-width*3,ppy,this.len,this.wid, this.ground)
    } 
  }    
     
  show() {
    for (let water of this.waterSeg) {
      water.flow()
      water.show()
    }
  }
}  
