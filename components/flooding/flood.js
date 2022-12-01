class Flood {
  // Makes a flood flowing from left to right              
  // The flood will consist of numSeg water segments at pos[x,y]
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.ground = y
    // Find the random number of water segments for this flood 
    this.numSeg = 7
    // this.numSeg = 3 //floor(random(3,6)) 
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
     // Add a large wet bottom
  //    let w = width
  //    let g = height *.75 
  //    let d = 150
  //    push()
  //    translate(this.pos.x, g-d)
  //    g = 0
  //    beginShape()
  //        stroke('red')
  //        fill("blue")
  //    vertex(-w*.2, g+d)
  //      bezierVertex(-w*.18, g+d*1.1,  -w*.12, g+d*1.1,  -w*.1, g+d*1.2)
  //      bezierVertex(-w*.05, g+d*1.3,  w*.11,g+d*1.2,   w*.12,g+d)   
  //      bezierVertex(w*.08,g+d*.95,  -w*.2, g+d*1.1,  -w*.2, g+d)
  //      vertex(-w*.2, g+d)
  //      noStroke()
  //  endShape() 
  //  pop()
  }
}  
