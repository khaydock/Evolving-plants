class Root extends Growable {
    // Makes a main root at the base of the stem
     // The main root consists of 3 segments
     // Rootlets branch off of the main axis at x = 0
     // The length and width of the main root are selectable
   
     constructor(x, y, plant) {
      super()
      this.pos = createVector(x, y)
      this.plant = plant
      this.death = death
      this.deathTime = 0
      
      // The selectable variables:
      this.rootLength = this.plant.genes.rootLength
      this.rootWidth = this.plant.genes.rootWidth

      this.rgrow = [] 
      this.rootlet = []
  
      // Find the random number of rootlets on this root 
      this.rootletNum = floor(random(4,11)) 
  
      //Find y-positions of rootlets
      this.rootletPos = [0]
      this.rootletPosIndex = 1
      let sum = 0
        for(let i = 0; i < this.rootletNum-1; i++) {
          const r = Math.random(1,2)
          sum += r
          this.rootletPos.push(sum)
        }
        // Random rootlet positions will be mapped to be between the beginning of the root and 80% to the bottom
        this.rootletPos = this.rootletPos.map(value => Math.floor((value / sum) * this.rootLength*.8))
       
      // Define rootlets
      for (let i = 0; i < this.rootletNum; i++) {
        let dir = floor(random(0,2))
        if (dir == 0) { dir = -1}
        let p = this.rootletPos[i]
        this.rootlet[i] = new Rootlet(0,p, dir)
       }
      
       this.init()
     }    
     
    init() {
   
      this.rGro = 0
      this.bezPos = []
      this.rootCurve = []
      this.rgrow[0] = 0
      this.rgrow[1] = 0
      this.rgrow[2] = 0
   
      this.beg1 = 0
      this.beg2 = 0
   
      //Find positions of root bezier points
      let sum = 0
      for(let i = 0; i < 3; i++) {
        const r = Math.random(1,2)
        sum += r
        this.bezPos.push(sum)
      }
      this.bezPos = this.bezPos.map(value => Math.floor((value / sum) * this.rootLength))
   
      this.beg1 = this.bezPos[0] *.8
      this.beg2 = this.beg1 + ((this.bezPos[1] - this.bezPos[0]) *.8)
               
      // Find random curvature values
      for (let i = 0; i < 3; i++) {
        this.rootCurve[i] = random(-5,5) 
      }
    }  
        
    grow() {
       // I can't figure out how to get the roots to grow with the global timer

      // The main root grows in length
      if (this.rGro < this.rootLength) {
        this.rGro += 0.5                
      }
       
      // Each segment of the main root grows until it reaches the bezier position
      if (this.rgrow[0] <= this.bezPos[0]) {
        this.rgrow[0] = this.rGro
      }
      if (this.rgrow[1] <= this.bezPos[1] && this.rgrow[0] >= this.beg1) {
        this.rgrow[1] = this.rGro
      }
   
      if (this.rgrow[2] <= this.bezPos[2] && this.rgrow[1] >= this.beg2) {
        this.rgrow[2] = this.rGro
      }
      //The rootlets grow        
      for(let i=0; i< this.rootletNum; i++) {
        if(this.rGro >= this.rootletPos[i]) {
          this.rootlet[i].grow()
        }
      }         
    }     
    
    grown() {
      // To show the roots already grown
      for (let i=0; i<3; i++) {
        this.rgrow[i] = this.bezPos[i]
      }
       for(let i=0; i< this.rootletNum; i++) {
        if(this.rGro = this.rootletPos[i]) {
          this.rootlet[i].grown()
        }
      }     
    }
       
    draw() {
      // Draw the main root 
      strokeWeight(2)
      let amount = back.darkness*5
      stroke(230-amount, 250-amount, 240-amount)
      fill(230-amount, 250-amount, 240-amount)

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

      push()
      translate(this.pos.x, this.pos.y)
      // Draw the 1st root segment
        let xend = this.rootCurve[0]
        let yend = this.rgrow[0]
        let xhand = 0.04 * this.rootWidth * yend
        bezier(0,0,  xhand,5,  xend+2,yend-5,  xend,yend)
        bezier(0,0,  -xhand,5,  xend-2,yend-5,  xend,yend)
        // strokeWeight(1)
        bezier(xend,yend,  xhand*.4,1,  xend+4,yend,  xend,yend+10)
        strokeWeight(3)             
                
        // Draw the 2nd root segment
        if (this.rgrow[1]   > 0) {
          let xend = this.rootCurve[1] 
          let yend = this.rgrow[1]
          bezier(this.rootCurve[0]*1.5,this.beg1,  xhand*.3,this.beg1,  xend*1.2,yend,  xend,yend)
          bezier(this.rootCurve[0]*1.5,this.beg1, -xhand*.3,this.beg1,  xend,yend,  xend,yend) 
        }
        // Draw the 3rd root segment
        strokeWeight(2) 
        if (this.rgrow[2] > 0) { 
          let xend = this.rootCurve[2]
          let yend = this.rgrow[2]
          bezier(this.rootCurve[1]*.8,this.beg2,  xend*.8 + 5,this.beg2,  xend,yend,  xend,yend)
          bezier(this.rootCurve[1]*.8,this.beg2,  xend*.8 - 5,this.beg2,  xend,yend,  xend,yend)
        }  
      
        // Draw the rootlet as soon as the main root reaches the rootlet position  
        for(let i=0; i< this.rootletNum; i++) {
          let x = xend
          if(this.rGro >= this.rootletPos[i]-10) {
            this.rootlet[i].show()
          }               
        }
      pop ()
     }
    }  