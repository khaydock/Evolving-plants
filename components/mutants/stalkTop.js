class StalkTop extends Growable {
  // This makes the stalk top for broccoli and cauliflower
  // Each stalk top has a number of branches on it 
  // Each branch has many stems 
  // Each stem has one bud
  //  Mutations that cause gobi and broccoli
  //    gobi = 0 : normal plant without mutation
  //    gobi = 1 : cauliflower
  //    gobi = 2 : broccoli
  // The selection variables (genes) that affect it are thresh, numPods, & stemLength; where thresh determines the stalkTop height (gobiHeight), numPods determines the number of branches as well as the average number of buds on each branch, & stemLength determines branchLength
  // (the number of stems on each branch is not selectable)
  // The branchWidth need not be a selection variable
  // There is a random mutation in genes that causes cauliflower (if gobi=1) or broccoli (if gobi=2)
  // This mutation delays the buds from producing flowers and seedpods and makes a broccoli or cauliflower stalkTop instead
  // After a delay, a stalk bolts: it grows up the plantHeight and produces regular buds, flowers, & seedpods 

  // Cauliflower is similar to broccoli except for the colour and bud shape, and it should grow closer to the ground, surrounded by leaves, and the buds have a different shape

  // Actually, in cauliflower the bud/flower (inflorescence meristem) stops developing, and the stem does not elongate. In broccoli, the inflorescence meristem develops a little further before it stops developing, and this happens higher up from the ground
 
  constructor(x, y, plant, gobi) {
    super()
    this.pos = createVector(x, y)
    this.plant = plant
    this.gobi = gobi
    if (this.gobi == 1) {
      this.gobiHeight = ((this.plant.genes.plantHeight - this.plant.genes.thresh)*.3)
      // this.thresh = this.genes.thresh *.3
    }
    if (this.gobi == 2) {
      this.gobiHeight = ((this.plant.genes.plantHeight - this.plant.genes.thresh) *.5)
      // this.thresh = this.genes.thresh *.5
    }

    // Count the height of the growing stalk with this.currHeight
    this.currHeight = 0
    // Count the width of the growing plant with this.currWidth
    this.currWidth = 10
    this.finalWidth = this.plant.genes.thresh *.15
    
    this.numBranches = floor(this.plant.genes.numPods * .8) 
    if (this.numBranches < 1) this.numBranches = 1  

    this.branches = [] 
    this.gobi = gobi

    this.growthRate = 1
      
    this.init()
  } 

  init() {
    // Figure out where to put each branch               
    this.branchPositions = []
    this.branchPositionsIndex = 0
    let sum = 0
    for(let i = 0; i < this.numBranches; i++) {
      const r = Math.random()
      sum += r
      this.branchPositions.push(sum)             
    }
    // Map random branch positions to the stalk top
    this.branchPositions = this.branchPositions.map(value => Math.floor(value / sum * this.gobiHeight))

    // Define the branches      
    for (let i = 0; i < this.numBranches; i++) {
      const branch = new Branch(this.pos.x, this.branchPositions[i], this.plant, this.gobi)
      this.branches.push(branch)
    }
    
    // Define the stalk top colours for broccoli
    this.stalkR = 100
    this.stalkG = 200
    this.stalkB = 90

    // Define the stalk top colours for cauliflower
    if (this.gobi == 1) {
      this.stalkR = 230
      this.stalkG = 250
      this.stalkB = 190
    }
  }

  grow() { 
  // Grow until the stalk reaches gobiHeight
    if (this.currHeight <= this.gobiHeight) {
      this.currHeight += 1 * this.timer.inc
    }
    if (this.currWidth <= this.finalWidth) {
      this.currWidth += .05 * this.timer.inc
    }

    // the colour starts fading after the stalk is fully grown
    if (this.currHeight > this.gobiHeight) {
      // for broccoli
      if (this.gobi == 2) {
      this.stalkR += (this.stalkR < 190) ? .3 * this.timer.inc : 0.
      this.stalkG -= (this.stalkG > 205) ? .1 * this.timer.inc : 0.
      this.stalkB += (this.stalkB < 135) ? .1 * this.timer.inc : 0.
      }
      // for cauliflower
      if (this.gobi == 1) {
        this.stalkR -= (this.stalkR > 225) ? .1 * this.timer.inc : 0.
        this.stalkG -= (this.stalkG > 225) ? .1 * this.timer.inc : 0.
        this.stalkB -= (this.stalkB > 160) ? .2 * this.timer.inc : 0.
        }
    }
  }

  grown() { 
    // The stalk is already fully grown to gobiHeight
    this.currHeight = this.gobiHeight 
  }

  draw() {
    // The colour changes with day/night
    let amount = back.darkness*4
    stroke(this.stalkR-amount,this.stalkG-amount, this.stalkB-amount)
    strokeWeight(this.currWidth) 

    push()
    translate (this.pos.x, this.pos.y)

    // Draw the stalk top
    line(0, 0, 0, -this.currHeight) 
    
    // Draw the branches 
    for (let i = 0; i < this.branchPositions.length; i++) {
      if (this.currHeight >= this.branchPositions[i]) { 
        this.branches[i].grow()
        this.branches[i].draw()
      }
      // To draw the branches all at once:
      // for (let branch of this.branches) {
      //    branch.grow()
      //    branch.draw()
      // }
    }
    pop ()
  } 
}     