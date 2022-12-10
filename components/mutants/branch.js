class Branch  extends Growable {
  // Each branch has many stems (each stem with 1 bud)
   // The length of each branch is selectable, proportional to this.plant.genes.stemLength (which is also the stemlength of the bud/flower/seedpods)
  // The number of stems on a branch is numBuds, which is selectable, proportional to this.plant.genes.numPods (and the number of branches is also proportional to numPods)
 
  constructor(x,y, plant, gobi) {
    super()
  this.pos = createVector(x, y)
  this.plant = plant
  this.gobi = gobi
  this.branchLength = (this.plant.genes.stemLength)*.2 //+ random (50,100)
  this.branchWidth = random(5,12)//5//floor(random (20,45))
  // Let the branches suddenly appear fully grown
  this.length = this.branchLength // this.length = 0
  if (this.branchLength < 75) {
    this.brThresh = random (this.branchLength*.4,this.branchLength*.6)
  } else {
    this.brThresh = random (this.branchLength*.7,this.branchLength*.8) 
  }

  // if (this.branchLength < 150) {
  //   this.brThresh = random (this.branchLength*.4,this.branchLength*.6)
  // } else {
  //   this.brThresh = random (this.branchLength*.7,this.branchLength*.8) 
  // }
  // this.brThresh = random (this.branchLength*.7,this.branchLength*.8)
  // this.brThresh = random(50, 100)

  this.angle = random (-70,70)
  this.numBuds = 3 + this.plant.genes.numPods

  this.growthRate = 1
  
  this.budStems = [] 
  this.buds = []
    
  this.init()
} 

  init() {
    // Figure out where to put each stem & bud (except for the last 3, which will be at the end)   
    // Put them in between brThresh and the end of the branch 
    this.budPositions = []
    let sum = 0
    for(let i = 0; i < this.numBuds-3; i++) {
      const r = Math.random()
      sum += r
      this.budPositions.push(sum)             
    }
    this.budPositions = this.budPositions.map(value => Math.floor(value / sum * (this.branchLength-this.brThresh))+this.brThresh) 
    // The last 3 bud positions are at the end of the branch
    for(let i = 0; i < 3; i++) {
      this.budPositions.push(this.branchLength)             
    }

    // Define the stems  
    this.budStemLen = random (5,10)// (1,5)//(10,50)
    if (this.gobi == 1) {
      this.budStemLen = random (10,20)//(5,10)
    }
    this.budStemWid = 2 //floor(random (5,this.branchWidth))

    for (let i = 0; i < this.numBuds-3; i++) {
      // this.dir = Math.random() < 0.5 ? 1 : -1
      const stem = new mutantStem(this.pos.x, this.budPositions[i], this.budStemLen, this.budStemWid, this.gobi)
      this.budStems.push(stem)
    }
    // Add three extra buds at the end 
    this.dir = 1
    let stem = new mutantStem(this.pos.x, this.branchLength, this.budStemLen, this.budStemWid, this.gobi)
    this.budStems.push(stem)
    this.dir = -1
    stem = new mutantStem(this.pos.x, this.branchLength, this.budStemLen, this.budStemWid, this.gobi)
    this.budStems.push(stem)
    stem = new mutantStem(this.pos.x, this.branchLength, this.budStemLen, this.budStemWid, this.gobi)
    this.budStems.push(stem)

    // Define the branch colour for broccoli
    this.branchR = 80
    this.branchG = 190 //150
    this.branchB = 70

    // Define the branch colour for cauliflower
    if (this.gobi == 1) {
      this.branchR = 250  //240
      this.branchG = 255  //250
      this.branchB = 230  //200
    }
  }

  grow() {
  if (this.length < this.branchLength) {
    this.length += this.growthRate
  } else {
    // the colour starts fading after the branch is fully grown
    // for broccoli
    if (this.gobi == 2) {
    this.branchR += (this.branchR < 170) ? .3 * this.timer.inc : 0.
    this.branchG -= (this.branchG > 205) ? .1 * this.timer.inc : 0.
    this.branchB += (this.branchB < 115) ? .1 * this.timer.inc : 0.
    }
    // for cauliflower
    if (this.gobi == 1) {
      this.branchR -= (this.branchR > 240) ? .1 * this.timer.inc : 0.
      this.branchG -= (this.branchG > 235) ? .1 * this.timer.inc : 0.
      this.branchB -= (this.branchB > 170) ? .2 * this.timer.inc : 0.
  }
  }
}

draw() {
  // Set the colour for day & night
  let amount = back.darkness*4
  stroke(this.branchR-amount, this.branchG-amount, this.branchB-amount)
  strokeWeight (this.branchWidth)

  push()
  translate (0, -this.pos.y)
  rotate (this.angle)
  // scale (.4)  

  // Draw the branch
  line(0, 0, 0, -this.length) 
  // bezier(this.pos.x, this.pos.y,   this.pos.x*1.01, this.pos.y*.98,   this.pos.x*.99, this.pos.y-this.currHeight*0.8,    this.pos.x, this.pos.y-this.currHeight) 

   // Draw the bud stems 
  for (let i = 0; i < this.budStems.length; i++) {
    if (this.length >= this.budPositions[i]) {  
      this.budStems[i].draw()
    }
  }
  pop ()
  }
}