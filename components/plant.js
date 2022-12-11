class Plant extends Growable {
  // Makes plant: draws the stalk, root, calls stem for leaves or buds/flowers/seedpods
  // Draws red circle when selected
  // Directs seed dropping

  constructor(x, y, grownUp, genes = null, bulldozer) {
    super()
    // Create vector for the initial position on the stalk
    this.pos = createVector(x, y)
    this.grownUp = grownUp
    this.death = death
    this.deathTime = 0

    // bulldozer = true if a bulldozer is coming
    this.bulldozer = bulldozer
    // Count the height of the growing plant with currHeight
    this.currHeight = 0
    // Count the width of the growing plant with currWidth
    this.currWidth = 1
    this.finalWidth = 9

    this.allChildren = []

    // Create the stems array for making new stems 
    this.stems = []

    //Create the roots array
    this.roots = []

    // No plants are selected initially
    this.selected = false

    // If isLeaf is true, a leaf will be put on the stem, otherwise a bud/flower/seed  
    this.isLeaf = true

    // Normal plant colours
    this.plantR = 30
    this.plantG = 240
    this.plantB = 10

    if (genes != null) {
      this.setGenes(genes)
    }
    else {
      // Set the initial genes for each plant at the start of the simulation 
      let randomGenes = {
        plantHeight: (random(300, 400)),
        // Initial leaf dimensions - was 110,180;  -50,50;  50,70;  50,70
        stemLength: floor(random(100, 150)),
        leafLength: random(210, 280), // 110,180
        leafWid1: random(-30, 30), // random(a-10, a+10)
        leafWid2: random(50, 90), //30,70
        leafWid3: random(50, 0),
        // Set the number of leaves for each plant 
        numLeaves: floor(random(4, 6)), // was (2,4) 
        // Set the threshold height (below thresh will be leaves, above will be seedpods) 
        thresh: (random(100, 150)),   // thresh: floor(random (100, 150)),
        numPods: floor(random(2, 6)),
        numSeeds: floor(random(5, 7)),
        seediam: random(4, 6),
        rootLength: random(100, 200),
        rootWidth: random(6, 10),
        gobi: 0
      }

      this.setGenes(randomGenes)
    }

    this.init()
  }

  init() {
    // Define the heights for gobi & broccoli
    if (this.gobi == 1) {
      this.gobiHeight = ((this.genes.plantHeight - this.genes.thresh) * .2) + this.genes.thresh
    }
    if (this.gobi == 2) {
      this.gobiHeight = ((this.genes.plantHeight - this.genes.thresh) * .4) + this.genes.thresh
    }

    // Define the roots
    const root = new Root(this.pos.x, this.pos.y, this)
    this.roots.push(root)
    this.children.push(root)

    // Define the first leaf stem on the stalk
    // Put the first stem on a random side
    this.dir = Math.random() < 0.5 ? 1 : -1
    const stem = new Stem(this.pos.x, this.pos.y, this.dir, this, this.isLeaf)
    this.stems.push(stem)
    this.children.push(stem)

    // Find random LEAF positions
    this.leafPositions = [0]
    this.leafPositionsIndex = 1
    let sum = 0
    for (let i = 0; i < this.numLeaves - 1; i++) {
      const r = Math.random()
      sum += r
      this.leafPositions.push(sum)
    }
    // Map the random leaf positions to be between the beginning of the stalk and thresh
    this.leafPositions = this.leafPositions.map(value => Math.floor((value / sum) * this.thresh))

    // Find random BUD/FLOWER/SEEDPOD positions
    this.podPositions = []
    this.podPositionsIndex = 0
    let sumPod = 0
    for (let i = 0; i < this.numPods; i++) {
      const r = Math.random()
      sumPod += r
      this.podPositions.push(sumPod)
    }
    // Map the random pod positions to be between thresh and the top of the stalk
    this.podPositions = this.podPositions.map(value => Math.floor(value / sumPod * (this.plantHeight - this.thresh)) + this.thresh)


    this.groundLevel = height * .75
    if (this.grownUp) {
      for (let i = 1; i < this.numLeaves; i++) {
        // Put the leaves on alternate sides usually
        const ranDir = Math.random() < 0.1 ? 1 : -1
        this.dir = this.dir * ranDir

        let place = this.groundLevel - this.leafPositions[i]
        let leaf = new Stem(this.pos.x, place, this.dir, this, true)
        this.stems.push(leaf)
        this.children.push(leaf)
      }
      for (let i = 0; i < this.numPods; i++) {
        // Put the pods on alternate sides usually
        const ranDir = Math.random() < 0.1 ? 1 : -1
        this.dir = this.dir * ranDir
        let pod = new Stem(this.pos.x, this.groundLevel - this.podPositions[i], this.dir, this, false)
        this.stems.push(pod)
        this.children.push(pod)
      }

      this.grownChildren()
    }

    // Mutations that cause gobi and broccoli
    // gobi = 0 : normal plant without mutation
    // gobi = 1 : cauliflower
    // gobi = 2 : broccoli

    // Define the stalk top for cauliflower and broccoli
    if (this.gobi > 0) {
      this.stalkTop = new StalkTop(this.pos.x, this.groundLevel - this.thresh, this, this.gobi)
    }
  }


  grow() {
    
    // The width will grow until finalWidth is reached.
    if (this.currWidth <= this.finalWidth) {
      this.currWidth += .01 * this.timer.inc
    }
    
      // How to make this.time stop for awhile while gobi grows?????
      // ... too difficult

    // The height grows
    if (this.time <= this.plantHeight) {
      this.currHeight += 1 * this.timer.inc

      // Start growing a stem & leaf when the stalk reaches the leaf stem position
      if (
        this.leafPositionsIndex < this.leafPositions.length &&
        this.time >= this.leafPositions[this.leafPositionsIndex] - this.timer.inc &&
        this.time <= this.leafPositions[this.leafPositionsIndex] + this.timer.inc) {

        // Put the leaves on alternate sides usually
        const ranDir = Math.random() < 0.2 ? 1 : -1
        this.dir = this.dir * ranDir

        let leaf = new Stem(this.pos.x, this.groundLevel - this.currHeight, this.dir, this, true)

        // const dir = Math.random() < 0.5 ? 1 : -1
        // let leaf = new Stem(this.pos.x, this.groundLevel-this.currHeight, dir, this, true) 

        this.stems.push(leaf)
        this.children.push(leaf)

        this.leafPositionsIndex += 1
      }

      // Start growing a stem & bud/flower/seedpod when the stalk reaches the pod stem position,
      if (this.podPositionsIndex < this.podPositions.length &&
        this.time >= this.podPositions[this.podPositionsIndex] - this.timer.inc &&
        this.time <= this.podPositions[this.podPositionsIndex] + this.timer.inc) {

        // Put the pods on alternate sides usually 
        const ranDir = Math.random() < 0.1 ? 1 : -1
        this.dir = this.dir * ranDir
        let pod = new Stem(this.pos.x, this.groundLevel - this.currHeight, this.dir, this, false)

        this.stems.push(pod)
        this.children.push(pod)

        this.podPositionsIndex += 1
      }

    } else {

      // the colour starts fading after the stalk is fully grown
      this.plantR += (this.plantR < 230) ? .3 * this.timer.inc : 0.
      this.plantG -= (this.plantG > 205) ? .1 * this.timer.inc : 0.
      this.plantB += (this.plantB < 135) ? .1 * this.timer.inc : 0.

    }

    // Make the stems grow in length and angle 
    // (this starts happening immediately & continues even after the stalk stops growing)
    this.growChildren()

  }

  grown() {
    // Instead of growing, the plant is already fully grown
    this.currHeight = this.genes.plantHeight
    // If death is true, unselected plants die
    if (death && !this.selected) {

      // Increase limit to make plant rotate further (and travel further) when falling down
      let limit = 200
      if (bulldozer) limit = 70
      let flow = 1
      if (stormy) flow = 10
      if (this.deathTime < limit) {
        this.deathTime += 1
        this.pos.x += flow * this.deathTime * .02
        this.pos.y -= (this.deathTime < 70) ? this.deathTime * .02 : 0
      }
    }
  }


  draw() {
    // fill('blue')
    // circle(this.pos.x, this.groundLevel-this.thresh, 30) 
    // fill ('orange')
    // circle(this.pos.x, this.groundLevel-this.plantHeight, 30)

    //Let the plant fall over if it was not selected and death = true
    push()
    if (death && !this.selected) {
      translate(this.pos.x, this.pos.y)
      rotate(this.deathTime) //+ random(0, 2)) random may slow things down too much
      translate(-this.pos.x, -this.pos.y)
    }


    // Draw a circle to show that the plant is selected 
    if (this.selected && (timeSlider.value() != 0)) {
    // if (this.selected && (!stormy && !bulldozer)) {
      // if(this.selected)) {
      stroke('red')
      strokeWeight(3)
      noFill()
      circle(this.pos.x, this.groundLevel - this.currHeight, 200)
    }
    // Draw the stems
    for (let i = 0; i < this.stems.length; i++) {
      let b = this.stems[i]
      b.draw()
    }

    // Draw the stalk 
    // The colour has to be mentioned here
    // The colour changes with day/night
    let amount = back.darkness * 4

    stroke(this.plantR - amount, this.plantG - amount, this.plantB - amount)
    strokeWeight(this.currWidth)

    // Draw a stalk that gets thinner towards the top
    let segment = this.currHeight / 15
    let beg = 0
    let inc = 12
    push()
    translate(this.pos.x, this.pos.y)
    for (let i = 0; i < 15; i++) {
      let wid = this.currWidth + inc
      strokeWeight(wid)
      let end = beg + segment
      line(0, -beg, 0, -end)
      beg += segment
      inc = inc - .6
    }
    pop()


    // Draw a little bud at the top of the growing stalk  
    let cx = this.pos.x
    let cy = this.pos.y - this.currHeight
    stroke(this.plantR - amount, this.plantG - amount, this.plantB - amount)
    strokeWeight(2)
    bezier(cx, cy, cx + 7, cy - 5, cx + 8, cy - 12, cx, cy - 20)
    bezier(cx, cy, cx - 7, cy - 5, cx - 8, cy - 12, cx, cy - 20)


    // Draw the roots already grown if grownUp
    if (this.grownUp) {
      for (let root of this.roots) {
        root.grown()
        root.draw()
      }
      // ... or draw the roots growing:
    } else {
      for (let root of this.roots) {
        root.grow()
        root.draw()
      }
    }
    pop()


    if (this.gobi > 0) {
      // Draw the cauliflower or broccoli stalk top
      if (this.currHeight >= this.thresh) {
        // change the following to grow to see the stalk grow
        this.stalkTop.grown()
        this.stalkTop.draw()
      }
    }
  }


  select() {
    // Do not allow selection before the stalk is fully grown
    if (this.time <= this.plantHeight) return
    this.selected = true
    return this
  }

  toggleSelect() {
    // check if plantheight is still growing
    if (this.time <= this.plantHeight && this.time != 0) return

    this.selected = this.selected === true ? false : true
    return this
  }

  // Dropping seeds after the plant is selected
  dropSeeds() {
    this.stems.forEach(stem => {
      if (stem.seedpod != null) {
        let seeds = stem.seedpod.seeds
        seeds.forEach(seed => {
          seed.dropping = true
          if (seed.dropVector != null) return
          // If no seeds were selected, all seeds are selected
          seed.dropVector = p5.Vector.sub(seed.dropPoint, seed.pos).normalize().mult(10)
        })
      }
    })
  }


  setGenes(genes) {
    this.genes = genes
    this.initFromGenes()
  }

  initFromGenes() {
    this.plantHeight = this.genes.plantHeight
    // this.stemLength = this.genes.stemLength
    // this.leafLength = this.genes.leafLength
    // this.leafWid1 = this.genes.leafWid1
    // this.leafWid2 = this.genes.leafWid2
    // this.leafWid3 = this.genes.leafWid3
    this.numLeaves = this.genes.numLeaves
    this.thresh = this.genes.thresh
    this.numPods = this.genes.numPods
    this.numSeeds = this.genes.numSeeds
    this.seediam = this.genes.seediam
    this.rootLength = this.genes.rootLength
    this.rootWidth = this.genes.rootWidth
    this.gobi = this.genes.gobi
  }
}