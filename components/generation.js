class Generation extends Growable {
  // Makes population of plants - tells plant to drop seeds
  constructor(nPlants = 3) {
    super(0)
    this.nPlants = nPlants
    this.grownUp = false
    this.plants = []
    this.selectedPlants = []
    this.droppedSeeds = []
    this.newSeasonPlants = []
  } 

  init() {
    // Sets the initial position of each plant on the ground 
    // (a random value near the equally spaced position)
    let sep = width / (this.nPlants * 2)
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = sep * (((i+1)*2)-1)
      xpos = xpos + random(-sep*.4, sep*.4)
      // let xpos = (width*(i+1)/this.nPlants - width/6) + random(-20, 20)
     
      ///////////change grownUp to true to bypass growth, and change growable///not needed
        // console.log ("this.grownUp", this.grownUp)
        if (showGrowth) {
          this.grownUp = false
        } else {
          this.grownUp = true
        }
      
      this.groundLevel = height *.75
      let newPlant = new Plant(xpos, this.groundLevel, this.grownUp) 

      this.plants.push(newPlant)
      this.children.push(newPlant) 
    }
  }

  grow() {
    // Grow all plants
    this.growChildren()

    // Directs the dropping of all seeds of selected plants
    for(let i = 0; i < this.plants.length; i++) {
      let p = this.plants[i]
      if(p.selected == true) {
        p.dropSeeds()
      }
    }
  }

  grown() {
    this.grownChildren()

    // Directs the making and dropping of seeds of each plant
    for(let i = 0; i < this.plants.length; i++) {
      let p = this.plants[i]
      if(p.selected == true) {
        p.dropSeeds()
      }
    }
  }

  draw() {
    this.children.forEach(child => child.draw())
  }
  

  newSeason() {
    // Make a new season of plants
    // Called by selection.js

    // Filter puts each plant (from the this.plants array) that is selected into the selectedPlants array
    let selectedPlants = this.plants.filter(plant => plant.selected === true)

    // select all plants if no plant is selected 
    if(selectedPlants.length == 0) selectedPlants = this.plants
  
    // For each plant in the selectedPlants array, all its seeds are put in the dropped seeds array
    
    // Filter puts every child from the plant.allChildren array that is an instanceof seeds into the seeds array)
    selectedPlants.forEach(plant => {
      let seeds = plant.allChildren.filter(child => child instanceof Seed)
      // ... means to extract all the individual properties one by one and transfer them to the new object 
      this.droppedSeeds.push(...seeds)
    })

    // make new season
    this.newSeasonPlants = []
  
    // Find the position in which each new plant will grow
    let sep = width/(this.nPlants*2)
    for(let i = 0; i < this.nPlants; i++) {
      let xpos = sep * (((i+1) * 2)-1)
      // xpos = xpos + random(-sep*.4, sep*.4)
      // the above sets randx (the new growing point)

      // Find the seed that dropped closest to this position
      let selectedSeed = this.selectSeed(this.droppedSeeds, xpos)
      
      // Filter puts all seeds from the droppedSeeds array that are selected into the droppedSeeds array
      this.droppedSeeds = this.droppedSeeds.filter(seed => seed.dropPoint.x != selectedSeed.dropPoint.x)

      let oldPlant = selectedSeed.plant
      // The genes of the new plants are based on the genes of the old plant (with some randomness added in)
      let newGenes = this.getGenes(oldPlant)
      // Define the new plant, which will grow from the position of the dropped seed
      let newPlant = new Plant(selectedSeed.dropPoint.x, this.groundLevel, this.grownUp, newGenes)
      // Put each new plant into the newSeasonPlants array
      this.newSeasonPlants.push(newPlant)
    }

    // reset parameters for new generation
    this.plants = this.newSeasonPlants
    this.children = this.newSeasonPlants
    this.droppedSeeds = []   
    this.selectedPlants = []

  }

  selectSeed(droppedSeeds, randx) {
    // Find the dropped seed closest to randx
    droppedSeeds.sort((a, b) => {
      let dist = Math.abs(a.dropPoint.x - randx) - Math.abs(b.dropPoint.x - randx)
      return dist
    })
    let seed = droppedSeeds[0]
    return seed
  }


  getGenes(oldPlant) {

    // Make new genes for the new plant
    // Note that the genes in the new plant will not be exactly the same as the genes of the parent plant - random values nearby are found 

    // Find new leaf length and widths
    // Find average leaf length and widths for each parent plant, 
    // then select each new average (random from a range) for new plant 
    // Note that p5 random(1,1) returns a random number from -1 up to (but not including) 1, so floor(random(-1,1)) will almost always be 0 (but, rarely, -1)
    let avgLeafLength = 0, avgLeafWid1 = 0, avgLeafWid2 = 0, avgLeafWid3 = 0
    oldPlant.stems.forEach(stem => {
      if(stem.leaf != null) {
        avgLeafLength += stem.leaf.finLength
        avgLeafWid1 += stem.leaf.finWid1
        avgLeafWid2 += stem.leaf.finWid2
        avgLeafWid3 += stem.leaf.finWid3
      }
    })
    const numLeaves = oldPlant.stems.filter(stem => stem.leaf != null).length
    avgLeafLength /= numLeaves
    if (avgLeafLength > 250) {
      avgLeafLength = 250
    }
    if (avgLeafLength < 35) {
      avgLeafLength = 35
    }
    avgLeafWid1 /= numLeaves
    avgLeafWid2 /= numLeaves
    avgLeafWid3 /= numLeaves
    avgLeafLength += random(-25, 25) // originally 29 
    avgLeafWid1 += random(-20, 20)   // rest originally 23 
    avgLeafWid2 += random(-20, 20)
    avgLeafWid3 += random(-20, 20)
    // Keep the width from getting more than .8 * the length
    if (avgLeafWid1 > avgLeafLength*.5) { avgLeafWid1 = avgLeafLength*.5 }
    if (avgLeafWid2 > avgLeafLength*.7) { avgLeafWid2 = avgLeafLength*.7 } 
    if (avgLeafWid3 > avgLeafLength*.7) { avgLeafWid3 = avgLeafLength*.7 } 

    if (avgLeafWid3 > avgLeafWid2*1.2) { avgLeafWid3 = avgLeafWid3*.9 }          
    if (avgLeafWid3 < avgLeafWid2*1.2) { avgLeafWid3 = avgLeafWid3*1.1 } 
    // The above adjusts relations between wid2 and wid3 to prevent overly strange  shapes - was 1.2. .9;  1.2,1.1 
    // also tried 2.2, 1.8;  1.1, 1.0 

    // Make new plant height genes
    let newPlantHeight = oldPlant.genes.plantHeight + floor(random(-50, 50))
    // Don't let the plant be too tall 
    if (newPlantHeight > height-250) { 
      newPlantHeight = height-random(250,280) 
    }
    // Don't let the plant be too short 
    if (newPlantHeight < 100) { 
      newPlantHeight = 100 
    }


    // Make new root length genes
    let newRootLength = oldPlant.genes.rootLength + floor(random(-20, 20))
    // Don't let the roots be too short 
    if (newRootLength < 30) { 
      newRootLength = 30 
    }
    // Don't let the roots be too long 
    if (newRootLength > height-30) { 
      newRootLength = height-30 
    }

    // Make new root width genes
    let newRootWidth = oldPlant.genes.rootWidth + floor(random(-2, 2))
    // Don't let the roots be too thin
    if (newRootWidth < 6) { 
      newRootWidth = 6 
    }
    // Don't let the roots be too fat 
    if (newRootWidth > 100) { 
      newRootWidth = 100 
    }

    // Make new stemLength genes for each plant
    let newStemLength = oldPlant.genes.stemLength + floor(random(-8, 8))

    // Make new numLeaves genes 
    let newNumLeaves = oldPlant.genes.numLeaves + floor(random(-3, 3))
      if(newNumLeaves < 2) { newNumLeaves = 2 }
      if(newNumLeaves > 16) { newNumLeaves = 16 }

    // Make new threshold for each plant 
    let newThresh = (oldPlant.genes.thresh + random(-20, 20)) // was -7,7
    // let newThresh = floor(oldPlant.genes.thresh + random(-20, 20)) // was -7,7
    if (newThresh >= newPlantHeight) { newThresh = newPlantHeight/2 }
    if (newThresh < 30) { newThresh = 30 }

    // Make new number of seedpods for each plant
    let newPods = oldPlant.genes.numPods + floor(random(-3, 3))
      console.log ("NEWPODS", newPods)
    if (newPods < 2) {
      newPods = floor(random(2,4))
      console.log ("NEWerPODS", newPods)
    }
    if (newPods > 16) {
      newPods = 16
    }

    // Make new number of seeds in each pod for each plant
    let newSeeds = oldPlant.genes.numSeeds + floor(random(-1.1, 1.1))
    if (newSeeds < 4) {
      newSeeds = floor(random(4,5))
    }
    if (newSeeds > 14) {
      newSeeds = 14
    }

    // Make new seed diameter for each plant
    let newSeediam = oldPlant.genes.seediam + random(-2, 2)
    if (newSeediam < 1) {
      newSeediam = 1
    }
    if (newSeediam > 12) {
      newSeediam = 12
    }

    // Make new gobi mutation
      let newGobi = 0
      let ranMut = random(0,1)
      // Increase .02 to make a broccoli mutation more likely
      if (ranMut < .02) {
        newGobi = 1
        newPods = 1} 
      // Decrease .98 to make a broccoli mutation more likely
      if (ranMut > .98) {newGobi = 2}
      if (oldPlant.genes.gobi != 0) {
        newGobi = oldPlant.genes.gobi
      }
    
    let newGenes = {
      plantHeight: abs(newPlantHeight),
      stemLength: abs(newStemLength),
      leafLength: abs(avgLeafLength), 
      leafWid1: abs(avgLeafWid1),
      leafWid2: abs(avgLeafWid2),
      leafWid3: abs(avgLeafWid3),
      numLeaves: abs(newNumLeaves), 
      thresh: newThresh, 
      numPods: newPods,
      numSeeds: newSeeds,
      seediam: newSeediam,
      rootLength: newRootLength,
      rootWidth: newRootWidth,
      gobi: newGobi
    }
    
    return newGenes
  }
}