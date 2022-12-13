class Design {
  // Makes design
  // Directs the creation of seeds
  // Also draws the red selection circle
 
  constructor(x, y, genes=null) {
    // Create vector for the position of each design
    this.pos = createVector(x, y)
    this.ground = height - 100
    this.selected = false
    this.seeds = []
    this.nSeeds = 7
   

    if(genes != null) {
      this.setGenes(genes)
    } 
    else {
    // Set the initial genes for each design at the start of the simulation 
      let randomGenes = {
        designHeight: (random(300,400)),
        designWidth: (random(50,100))
      }
      this.setGenes(randomGenes)
    }

    this.init()  
  } 
   
  init() {

    // Define the seeds
    for(let i = 0; i < this.nSeeds; i++) {
      console.log("designHeight", height-this.genes.designHeight)
      let ysep = (floor(this.genes.designHeight)/this.nSeeds)
      let y = height-this.genes.designHeight + (i*ysep)
      const seed = new Seed(this.pos.x, y, this)
      this.seeds.push(seed)
    }

    // this.designHeight = this.genes.designHeight
    // this.designWidth = this.genes.designWidth

  }
        
  draw() {
    
    // Draw a circle to show that the design is selected 
    if(this.selected) {
      stroke('red')
      strokeWeight(3)
      noFill()
      circle(this.pos.x, this.pos.y-this.genes.designHeight, 200)  
    }    
       
    // Draw the design
    stroke(190,160, 230)
    fill(210, 140, 190)
    strokeWeight(5)

    let len = this.genes.designHeight
    let wid1 = this.genes.designWidth
    let wid2 = wid1 * .5
    let x = this.pos.x
    let y = this.pos.y

    push()
    translate (x,y)

    line(0, 0,    0, -len) 
    bezier (0, 0,    -wid1, -40,    -wid2, -len+60,    0, -len) 
    bezier (0, 0,    wid1, 40,    wid2, -len-60,    0, -len) 

    fill ('blue')
    circle (-wid1, -40,10)
    circle (-wid2, -len+60, 10)
    circle (wid1, 40,10)
    circle (wid2, -len-60, 10)
    pop ()

    // Call Seeds to make and draw the seeds
    for (let i = 0; i < this.seeds.length; i++) {
      this.seeds.forEach((seed, i) => {
      // seed.update()
      // seed.make()
      seed.draw()

      })
    }
  }
     
  make() {
    this.currHeight = this.genes.designHeight   
        }
 

  select() {
    this.selected = true
    console.log ("Selected")
    return this
  }

  toggleSelect() {
  // If design was already selected, unselect
    this.selected = this.selected === true ? false : true
    return this
  }


  // Dropping seeds after the design is selected
    dropSeeds() {
      if(this.seeds != null) {
        console.log ("NOT NULL")
        let seeds = this.seeds
        seeds.forEach(seed => {
          seed.dropping = true
          if(seed.dropVector != null) return
          console.log ("dropVector null")
          // If no seeds were selected, all seeds are selected
          seed.dropVector = p5.Vector.sub(seed.dropPoint, seed.pos).normalize().mult(10) 
        })
      }
  }


  setGenes(genes) {
    this.genes = genes
    this.initFromGenes()
  }

  initFromGenes() {
    this.designHeight = this.genes.designHeight
    this.designWidth = this.genes.designWidth
  }
}